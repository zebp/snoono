import { buildUrl, serve, ServerRequest } from "./deps.ts";
import { Authorization, authorize, refreshAuthorization } from "./authorization.ts";

export type { Authorization };
export { authorize, refreshAuthorization};

export enum OAuthScope {
    Creddits = "creddits",
    Modcontributors = "modcontributors",
    Modmail = "modmail",
    Modconfig = "modconfig",
    Subscribe = "subscribe",
    Structuredstyles = "structuredstyles",
    Vote = "vote",
    Wikiedit = "wikiedit",
    Mysubreddits = "mysubreddits",
    Submit = "submit",
    Modlog = "modlog",
    Modposts = "modposts",
    Modflair = "modflair",
    Save = "save",
    Modothers = "modothers",
    Read = "read",
    Privatemessages = "privatemessages",
    Report = "report",
    Identity = "identity",
    Livemanage = "livemanage",
    Account = "account",
    Modtraffic = "modtraffic",
    Wikiread = "wikiread",
    Edit = "edit",
    Modwiki = "modwiki",
    Modself = "modself",
    History = "history",
    Flair = "flair",
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

export interface BaseAuthorizationOptions {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    duration: "temporary" | "permanent";
    scopes: OAuthScope[];
}

export interface AuthorizationOptions extends BaseAuthorizationOptions {
    oauthCodeProvider: OAuthCodeProvider,
    authUrlCallback: (authUrl: string) => Promise<void>;
}

export class RedditClient {
    public accessToken: string;
    public refreshToken?: string;
    public scopes: OAuthScope[];
    private expiresAt: number;

    public constructor(authorization: Authorization) {
        this.accessToken = authorization.accessToken;
        this.expiresAt = Date.now() + authorization.expiresIn;
        this.refreshToken = authorization.refreshToken;
        this.scopes = authorization.scopes;
    }

    public static async authorizeWithOAuth(
        options: AuthorizationOptions,
        state: string = Math.random().toString()
    ): Promise<RedditClient> {
        const authUrl = RedditClient.createAuthorizationUrl(options, state);
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

    public static createAuthorizationUrl(options: BaseAuthorizationOptions, state: string): string {
        return encodeURI(buildUrl("https://www.reddit.com", {
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
        if (Date.now() < this.expiresAt || !this.refreshToken) {
            return;
        }

        const auth = await refreshAuthorization(this.accessToken, this.refreshToken);
        this.accessToken = auth.accessToken;
        this.expiresAt = Date.now() + auth.expiresIn;
    }
}
