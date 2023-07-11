// description: initial landing page checking authentication. login button if logged in and refresh tokens. logout button if logged out.
// app/routes/_index.tsx

import { redirect, type V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useState } from 'react';

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

/*
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
      return is_valid_token_time(token_time, current_time);
    }
  }
  return false;
}*/

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
        }

      }
      else {
        // Redirect to login explanation page: Spotify Auth PKCE 
        redirect("/login");
      }
    }
    else {
      // refresh page
      redirect("/");
    }
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Alex' Spotify Remix App</h1>
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
/*
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
      if (token_time !== null && is_valid_token_time(token_time, current_time)) {
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

*/