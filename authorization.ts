import { buildUrl, encodeBase64 } from "./deps.ts";
import { OAuthScope } from "./mod.ts";

type RawAuthorization = {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    scope: string;
    refresh_token?: string;
};

export interface Authorization {
    readonly accessToken: string;
    readonly expiresIn: number;
    readonly refreshToken?: string;
    readonly scopes: OAuthScope[];
}

export async function authorize(clientId: string, clientSecret: string, code: string, redirectUri: string): Promise<Authorization> {
    const url = buildUrl("https://www.reddit.com/api/v1/access_token", {
        queryParams: {
            code,
            grant_type: "authorization_code",
            redirect_uri: redirectUri,
        }
    });

    const bearer = encodeBase64(`${clientId}:${clientSecret}`);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${bearer}`
        },
    });

    const raw: RawAuthorization = await response.json();

    return {
        accessToken: raw.access_token,
        refreshToken: raw.refresh_token,
        expiresIn: raw.expires_in,
        scopes: raw.scope.split(/\s+/).map(scope => scope as OAuthScope)
    };
}

export async function refreshAuthorization(accessToken: string, refreshToken: string): Promise<Authorization> {
    const url = buildUrl("https://www.reddit.com/api/v1/access_token", {
        queryParams: {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }
    });

    const raw: RawAuthorization = await fetch(url, {
        headers: {
            authorization: `bearer ${accessToken}`
        }
    }).then(res => res.json());

    return {
        accessToken: raw.access_token,
        refreshToken: refreshToken,
        expiresIn: raw.expires_in,
        scopes: raw.scope.split(/\s+/).map(scope => scope as OAuthScope)
    };
}