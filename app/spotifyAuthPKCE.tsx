// Description: Spotify Authorization Code Flow with PKCE
// Path: app/spotifyAuthPKCE.tsx
import { client_id, client_secret, redirect_uri } from "./config_keys";

export function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomString = Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((value) => characters[value % characters.length])
    .join("");

  return randomString;
}

export async function generateCodeChallenge(
  codeVerifier: string
): Promise<string> {
  const base64encode = (string: ArrayBuffer): string => {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(string)));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export async function initiateAuthorization(codeVerifier: string) {
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email user-top-read";

  const args = new URLSearchParams({
    client_id: client_id,
    response_type: "code",
    redirect_uri: redirect_uri,
    state: state,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  const authorization_url = "https://accounts.spotify.com/authorize?" + args;
  return authorization_url;
}

export async function requestTokens(code: string, codeVerifier: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  console.log(response);

  if (response.ok === false) {
    throw new Error("HTTP status " + response.status);
  }

  const data = await response.json();
  return { access_token: data.access_token, refresh_token: data.refresh_token };
}

export async function refreshTokens(refreshToken: string) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: client_id,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
    body: body.toString(),
  });

  if (response.ok === false) {
    throw new Error("HTTP status " + response.status);
  }

  const data = await response.json();
  return { access_token: data.access_token, refresh_token: data.refresh_token };
}

export function is_valid_token_time(token_time: any, current_time: any) {
  //any but should be date type
  return current_time - token_time < 3590000; //true if token is less than 59 minutes old
}
