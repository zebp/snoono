import { ServerRequest } from "https://deno.land/std@0.86.0/http/server.ts";
import { Authorization, authorize } from "./authorization.ts";
import { buildUrl, serve } from "./deps.ts";

export type { Authorization };

export enum OAuthScope {
    Read = "read",
    History = "history",
}

export interface ServerCodeProvider {
    serverPort: number,
    requestHandler?: (request: ServerRequest) => Promise<void>,
}

/**
 * We need some way to get the authorization code if we don't start the internal server,
 * so the user is responsible for somehow getting this code.
 */
export type ManualCodeProvider = (state: string) => Promise<string>;

export type OAuthCodeProvider = ServerCodeProvider | ManualCodeProvider;

export interface AuthorizationOptions {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    duration: "temporary" | "permanent";
    scopes: OAuthScope[];
    oauthCodeProvider: OAuthCodeProvider,
    authUrlCallback: (authUrl: string) => Promise<void>;
}

export class RedditClient {
    public readonly accessToken: string;
    private expiresAt: number;
    private refreshToken?: string;

    public constructor(authorization: Authorization) {
        this.accessToken = authorization.accessToken;
        this.expiresAt = Date.now() + authorization.expiresIn;
        this.refreshToken = authorization.refreshToken;
    }

    public static async authorizeWithOAuth(
        options: AuthorizationOptions,
    ): Promise<RedditClient> {
        const state = Math.random().toString();
        const authUrl = encodeURI(buildUrl("https://www.reddit.com", {
            path: ["api", "v1", "authorize"],
            queryParams: {
                client_id: options.clientId,
                response_type: "code",
                state,
                redirect_uri: options.redirectUri,
                duration: options.duration,
                scope: options.scopes.join(" "),
            },
        }));

        await options.authUrlCallback(authUrl);

        let code: string | undefined;

        if (typeof options.oauthCodeProvider === "object") {
            const provider = options.oauthCodeProvider;

            const server = serve({ hostname: "0.0.0.0", port: provider.serverPort });

            for await (const request of server) {
                code = /\&code=(.+)/.exec(request.url)?.[1];

                if (provider.requestHandler) {
                    await provider.requestHandler(request);
                } else {
                    await request.respond({ status: 200 });
                }

                break;
            }

            server.close();
        } else if (typeof options.oauthCodeProvider === "function") {
            code = await options.oauthCodeProvider(state);
        }

        const authorization = await authorize(options.clientId, options.clientSecret, code!, options.redirectUri);
        return new RedditClient(authorization);
    }

    public async get<T>(url: string): Promise<T> {
        await this.keepTokenAlive();

        const response = await fetch(url, {
            headers: {
                authorization: `bearer ${this.accessToken}`
            }
        });

        return response.json();
    }

    private async keepTokenAlive(): Promise<void> {
        if (Date.now() < this.expiresAt) {
            return;
        }

        // TODO: Implement!
        throw new Error("token refreshing is unimplemented");
    }
}
