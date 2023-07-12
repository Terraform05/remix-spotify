// description: Initial page that runs authentication. If already logged in, redirect to home page. If not logged in, redirect to login page.
// app/routes/_index.tsx

import { type V2_MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

import { refreshTokens, is_valid_token_time } from "../spotifyAuthPKCE";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function check_refresh_token() {
  const refresh_token = window.localStorage.getItem("refresh_token");
  ``;
  if (refresh_token !== null) {
    return refresh_token;
  }
  return null;
}

export function check_access_token() {
  const access_token = window.localStorage.getItem("access_token");
  if (access_token !== null) {
    return access_token;
  }
  return null;
}

export function check_token_time() {
  const token_time = window.localStorage.getItem("token_time");
  //const token_time = new Date(2023, 6, 11, 11, 30, 0, 0).valueOf();
  const current_time = Date.now();

  if (token_time !== null) {
    console.log("token_time: ", token_time);
    console.log("current_time: ", current_time);
    //console.log('time difference okay?', (current_time - token_time.valueOf()) < 3590000)
  }

  if (
    token_time !== null &&
    is_valid_token_time(token_time.valueOf(), current_time)
  ) {
    return token_time;
  }
  return null;
}

export default function Index() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [tokenTime, setTokenTime] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // page window exists
      var refresh_token = check_refresh_token();

      if (refresh_token != null) {
        // refresh token exists
        var access_token = check_access_token();
        var token_time = check_token_time();

        if (access_token !== null && token_time !== null) {
          // access token exists, token_time exists, and token time is valid

          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          setTokenTime(token_time);

          console.log("REFRESH AND TIME IS GOOD");
          console.log("access_token:", access_token); //logging
          console.log("refresh_token:", refresh_token); //logging
          console.log("token_time:", token_time); //logging

          return () => {};

          //logged in, now redirect to home page
          window.location.href = "/home";
        } else {
          console.log("ABOUT TO REFRESH TOKENS");
          // Refresh tokens
          let x = refreshTokens(refresh_token);
          console.log(x);
          return () => {};
          /*refreshTokens(refresh_token)
            .then(({ access_token, refresh_token }) => {
              window.localStorage.setItem('access_token', access_token);
              window.localStorage.setItem('refresh_token', refresh_token);

              var token_time = Date.now().toString();
              window.localStorage.setItem('token_time', token_time);

              setAccessToken(access_token);
              setRefreshToken(refresh_token);
              setTokenTime(token_time);

              console.log('TOKENS REFRESHED COMPLETED INSIDE');
              console.log('access_token:', access_token); // logging
              console.log('refresh_token:', refresh_token); // logging
              console.log('token_time:', token_time); // logging

              // Redirect to home page
              window.location.href = '/home';
            })
            .catch(error => {
              // Handle error if token refresh fails
              console.error('TOKEN REFRESH ERROR:', error);
            });*/
          console.log("TOKENS REFRESHED COMPLETED OUTSIDE");
          console.log("access_token:", access_token); //logging
          console.log("refresh_token:", refresh_token); //logging
          console.log("token_time:", token_time); //logging
          return () => {};
        }
      } else {
        // Redirect to login explanation page: Spotify Auth PKCE
        window.location.href = "/login";
      }
    } else {
      // refresh page
    }
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>
        This should not be showing. This should redirect to appropriate login
      </h1>
      <ul>
        <li>accessToken: {accessToken ? accessToken : ""}</li>
        <li>refreshToken: {refreshToken ? refreshToken : ""}</li>
        <li>
          tokenTime:{" "}
          {tokenTime ? new Date(parseInt(tokenTime)).toLocaleString() : ""}
        </li>
      </ul>
      <Link to="/logout">LOG OUT</Link>{" "}
    </div>
  );
}
