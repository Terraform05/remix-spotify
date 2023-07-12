// description: User not logged in, show information and start login process. Redirect to spotify login and then to callback page.
// app/routes/login.tsx
import {
  generateRandomString,
  initiateAuthorization,
} from "../spotifyAuthPKCE";
import { useEffect, useState } from "react";

export function spotify_login_redirect() {
  const code_verifier = generateRandomString(128);
  window.localStorage.setItem("code_verifier", code_verifier);

  console.log("code_verifier: ", code_verifier);

  initiateAuthorization(code_verifier).then((url) => {
    window.location.href = url;
  });
}

export default function Login() {
  const [code, setCode] = useState("");
  const [codeVerifier, setCodeVerifier] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [tokenTime, setTokenTime] = useState("");

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    console.log(storedCode);
    setCode(storedCode || "");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    console.log(storedCodeVerifier);
    setCodeVerifier(storedCodeVerifier || "");
    const storedAccessToken = window.localStorage.getItem("access_token");
    console.log(storedAccessToken);
    setAccessToken(storedAccessToken || "");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    console.log(storedRefreshToken);
    setRefreshToken(storedRefreshToken || "");
    const storedTokenTime = window.localStorage.getItem("token_time");
    console.log(storedTokenTime);
    setTokenTime(storedTokenTime || "");
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1> right before LOG IN process</h1>
      <p>You are agreeing to allow this app to access your spotify data</p>
      <ul>
        <li>code: {code}</li>
        <li>codeVerifier: {codeVerifier}</li>
        <li>accessToken: {accessToken}</li>
        <li>refreshToken: {refreshToken}</li>
        <li>
          tokenTime:{" "}
          {tokenTime ? new Date(parseInt(tokenTime)).toLocaleString() : ""}
        </li>
      </ul>
      <button onClick={() => spotify_login_redirect()}>Login to Spotify</button>
    </div>
  );
}
