//description: This is the homepage that the user sees once they are logged in.
// app/routes/home.tsx
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

import { MeResponse } from "../response_type";

export default function LoginCallback() {
  const [code, setCode] = useState("");
  const [codeVerifier, setCodeVerifier] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [tokenTime, setTokenTime] = useState("");
  const [profileInfo, setProfileInfo] = useState<MeResponse | null>(null);

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    setCode(storedCode || "");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    setCodeVerifier(storedCodeVerifier || "");
    const storedAccessToken = window.localStorage.getItem("access_token");
    setAccessToken(storedAccessToken || "");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    setRefreshToken(storedRefreshToken || "");
    const storedTokenTime = window.localStorage.getItem("token_time");
    setTokenTime(storedTokenTime || "");

    // Fetch profile information
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile information");
        }

        const data = await response.json();
        console.log(data);
        setProfileInfo(data);
      } catch (error) {
        console.error("Error fetching profile information:", error);
      }
    };

    if (accessToken) {
      fetchProfileInfo();
    }
  }, [accessToken]);

  // Define variables for profile info
  const displayName = profileInfo?.display_name || "";
  const externalUrls = profileInfo?.external_urls
    ? profileInfo.external_urls.spotify
    : "";
  const href = profileInfo?.href || "";
  const userId = profileInfo?.id || "";
  const image = profileInfo?.images ? profileInfo.images[1] : "";

  const imageLink = image ? image.url : "";
  const imageSize = image ? image.height : "";

  const type = profileInfo?.type || "";
  const uri = profileInfo?.uri || "";
  const followers = profileInfo?.followers ? profileInfo.followers.total : "";
  const country = profileInfo?.country || "";
  const product = profileInfo?.product || "";
  const explicitContent = profileInfo?.explicit_content
    ? profileInfo.explicit_content
    : "";
  const email = profileInfo?.email || "";
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>
        <h1>You are LOGGED IN page</h1>
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
        <Link to="/logout">LOG OUT</Link>
      </div>
      <hr></hr>
      <hr></hr>
      <div>
        <h2>Profile Info</h2>
        <ul>
          <li>display_name: {displayName}</li>
          <li>external_urls: {externalUrls}</li>
          <li>href: {href}</li>
          <li>id: {userId}</li>
          <li>image: {JSON.stringify(image)}</li>
          <li>imageLink: {imageLink}</li>
          <li>imageSize: {imageSize}</li>
          <img
            src={imageLink}
            alt="Profile Image"
            width={imageSize || "100"}
            height={imageSize || "100"}
          />
          <li>type: {type}</li>
          <li>uri: {uri}</li>
          <li>followers: {followers}</li>
          <li>country: {country}</li>
          <li>product: {product}</li>
          <li>explicit_content: {JSON.stringify(explicitContent)}</li>
          <li>
            explicit_content_filter_enabled:{" "}
            {explicitContent
              ? JSON.stringify(explicitContent.filter_enabled)
              : ""}
          </li>
          <li>
            explicit_content_filter_locked:{" "}
            {explicitContent
              ? JSON.stringify(explicitContent.filter_locked)
              : ""}
          </li>
          <li>email: {email}</li>
        </ul>
      </div>
      <hr></hr>
      <hr></hr>
      <div>
        <h1>Welcome, {displayName}!</h1>
        <img
          src={imageLink}
          alt="Profile Image"
          width={imageSize || "100"}
          height={imageSize || "100"}
          style={{ borderRadius: "50%" }}
        />
        <h2>Spotify Details:</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <strong>Product:</strong> {product}
          </li>
          <li>
            <strong>Profile URL:</strong> <a href={uri}>{uri}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
