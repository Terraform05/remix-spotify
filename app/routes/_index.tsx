// description: initial landing page checking authentication. login button if logged in and refresh tokens. logout button if logged out.
// app/routes/_index.tsx

import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useState } from 'react';

import { refreshTokens, checkValidTokenTime } from '../spotifyAuthPKCE';

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function check_login() {
  if (typeof window !== 'undefined') {
    const access_token = window.localStorage.getItem('access_token');
    const refresh_token = window.localStorage.getItem('refresh_token');
    if (access_token !== null && refresh_token !== null) {
      const token_time = window.localStorage.getItem('token_time');
      if (token_time === null) {
        return false;
      }
      const current_time = Date.now().toString();
      console.log('current_time:', current_time)
      console.log('token_time:', token_time)
      console.log(parseInt(current_time) - parseInt(token_time));
      return checkValidTokenTime(token_time, current_time);
    }
  }
  return false;
}

export default function Index() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [tokenTime, setTokenTime] = useState('');

  useEffect(() => {
    function refresh_token() {
      const refresh_token = window.localStorage.getItem('refresh_token');

      if (refresh_token !== null) {
        refreshTokens(refresh_token)
          .then(({ access_token, refresh_token }) => {
            window.localStorage.setItem('access_token', access_token);
            window.localStorage.setItem('refresh_token', refresh_token);
            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            const token_time = Date.now().toString();
            window.localStorage.setItem('token_time', token_time);
            console.log('token_time:', token_time);

            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            setTokenTime(token_time);
          });
      }
    }

    let status = '';
    if (check_login()) {
      status = 'logged in';
      const token_time = window.localStorage.getItem('token_time');
      const current_time = Date.now().toString();
      if (token_time !== null && checkValidTokenTime(token_time, current_time)) {
        // Token is still valid, no need to refresh
        setAccessToken(window.localStorage.getItem('access_token') || '');
        setRefreshToken(window.localStorage.getItem('refresh_token') || '');
        setTokenTime(token_time || '');
      } else {
        // Token is invalid, refresh the tokens
        refresh_token();
      }
    } else {
      status = 'logged out';
    }
    setUserStatus(status);
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Alex' Spotify Remix App</h1>
      <h2>{userStatus}</h2>
      <ul>
        <li>accessToken: {accessToken}</li>
        <li>refreshToken: {refreshToken}</li>
        <li>tokenTime: {tokenTime ? new Date(parseInt(tokenTime)).toLocaleString() : ''}</li>
      </ul>

      <Link to="/auth/login">login</Link>{" "}
      <Link to="/auth/logout">logout</Link>{" "}
    </div>
  );
}
