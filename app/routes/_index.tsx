// description: initial landing page checking authentication. login button if logged in and refresh tokens. logout button if logged out.
// app/routes/_index.tsx

import { type V2_MetaFunction } from "@remix-run/node";
import { useEffect, useState } from 'react';

import { redirect } from "@remix-run/node";

import { refreshTokens, is_valid_token_time } from '../spotifyAuthPKCE';

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export function check_refresh_token() {
  const refresh_token = window.localStorage.getItem('refresh_token');
  if (refresh_token !== null) {
    return refresh_token;
  }
  return null;
}

export function check_access_token() {
  const access_token = window.localStorage.getItem('access_token');
  if (access_token !== null) {
    return access_token;
  }
  return null;
}

export function check_token_time() {
  const token_time = window.localStorage.getItem('token_time');
  const current_time = Date.now().toString();

  if (token_time !== null && is_valid_token_time(token_time, current_time)) {
    return token_time;
  }
  return null;
}

export default function Index() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [tokenTime, setTokenTime] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // page window exists
      var refresh_token = check_refresh_token();

      if (refresh_token != null) {
        // refresh token exists
        var access_token = check_access_token();
        var token_time = check_token_time();

        if (access_token != null && token_time != null) {
          // access token exists and token time is valid

          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          setTokenTime(token_time);

          console.log('access_token:', access_token); //logging
          console.log('refresh_token:', refresh_token); //logging
          console.log('token_time:', token_time); //logging

          //logged in, now redirect to home page
          window.location.href = '/home';

        }
        else {
          // Refresh tokens
          refreshTokens(refresh_token)
            .then(({ access_token, refresh_token }) => {
              window.localStorage.setItem('access_token', access_token);
              window.localStorage.setItem('refresh_token', refresh_token);

              console.log('access_token:', access_token); //logging
              console.log('refresh_token:', refresh_token); //logging

              var token_time = Date.now().toString();
              window.localStorage.setItem('token_time', token_time);

              console.log('token_time:', token_time); //logging

              setAccessToken(access_token);
              setRefreshToken(refresh_token);
              setTokenTime(token_time);
            });

          //logged in, now redirect to home page
          window.location.href = '/home';
        }

      }
      else {
        // Redirect to login explanation page: Spotify Auth PKCE 
        window.location.href = '/login';
      }
    }
    else {
      // refresh page
    }
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>This should not be showing. This should redirect to appropriate login</h1>
      <ul>
        <li>accessToken: {accessToken}</li>
        <li>refreshToken: {refreshToken}</li>
        <li>tokenTime: {tokenTime ? new Date(parseInt(tokenTime)).toLocaleString() : ''}</li>
      </ul>
    </div>
  );
}