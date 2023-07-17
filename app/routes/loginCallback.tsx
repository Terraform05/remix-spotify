//description: This is the callback page for the app. It will handle the callback from spotify and then redirect back to the home page with login credentials
// app/routes/loginCallback.tsx

import { useEffect, useState } from "react";

import { requestTokens } from "../spotifyAuthPKCE";

export default function LoginCallback() {
  const [code, setCode] = useState("");
  const [codeVerifier, setCodeVerifier] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [tokenTime, setTokenTime] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const code_verifier = window.localStorage.getItem("code_verifier");

    if (code && code_verifier !== null) {
      setCode(code);
      setCodeVerifier(code_verifier);
      window.localStorage.setItem("code", code);
      window.localStorage.setItem("code_verifier", code_verifier);

      requestTokens(code, code_verifier).then(
        ({ access_token, refresh_token }) => {
          var token_time = Date.now().toString();

          // Set tokens in state
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          setTokenTime(token_time);

          //log to console before storage
          console.log("access_token before storage:", access_token);
          console.log("refresh_token before storage:", refresh_token);
          console.log("token_time before storage:", token_time);

          // Set tokens in localStorage
          window.localStorage.setItem("access_token", access_token);
          window.localStorage.setItem("refresh_token", refresh_token);
          window.localStorage.setItem("token_time", token_time);

          //log to console after storage
          console.log(
            "access_token after storage:",
            window.localStorage.getItem("access_token")
          ); //logging
          console.log(
            "refresh_token after storage:",
            window.localStorage.getItem("refresh_token")
          ); //logging
          console.log(
            "token_time after storage:",
            window.localStorage.getItem("token_time")
          ); //logging

          //logged in, now redirect to home page
          window.location.href = "/example";
        }
      );
    } else {
      //error here - no code or code_verifier
    }
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>LoginCallback page</h1>
      <ul>
        <li>code: {code}</li>
        <li>code_verifier: {codeVerifier}</li>
        <li>access_token: {accessToken}</li>
        <li>refresh_token: {refreshToken}</li>
        <li>
          token_time:{" "}
          {tokenTime ? new Date(parseInt(tokenTime)).toLocaleString() : ""}
        </li>
      </ul>
    </div>
  );
}
