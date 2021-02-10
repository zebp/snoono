import { buildUrl, encodeBase64 } from "./deps.ts";

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
}

export async function authorize(clientId: string, clientSecret: string, code: string, redirectUri: string) {
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
        expiresIn: raw.expires_in
    };
}