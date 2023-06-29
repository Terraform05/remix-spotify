// Description: Spotify Authorization Code Flow with PKCE
// Path: app/spotifyAuthPKCE.tsx
import { client_id, client_secret, redirect_uri } from './config_keys';

import { useNavigate } from "react-router-dom";


export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomString = Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((value) => characters[value % characters.length])
        .join('');
    return randomString;
}

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const base64encode = (string: ArrayBuffer): string => {
        const base64 = btoa(String.fromCharCode(...new Uint8Array(string)));
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    };

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}

export async function initiateAuthorization() {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    //localStorage.setItem('code_verifier', codeVerifier);

    const args = new URLSearchParams({
        client_id: client_id,
        response_type: 'code',
        redirect_uri: redirect_uri,
        state: state,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
    });

    const authorization_url = 'https://accounts.spotify.com/authorize?' + args;
    return authorization_url;
    //const navigate = useNavigate();
    //navigate(authorization_url);
}

