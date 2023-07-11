// description: This is the login page for the app. It will redirect to the spotify login page and then redirect back to the app with the access token.
// app/routes/auth.login.tsx
import { Link } from '@remix-run/react';
import { generateRandomString, initiateAuthorization } from '../spotifyAuthPKCE';

export function spotify_login_redirect() {
  const codeVerifier = generateRandomString(128);
  window.localStorage.setItem('codeVerifier', codeVerifier);

  console.log('codeVerifier: ', codeVerifier);

  initiateAuthorization(codeVerifier)
    .then(url => {
      window.location.href = url;
    });
}

export default function Login() {

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Link to="/">Login Here</Link>
      <a>You are agreeing to allow this app to access your spotify data</a>
      <button onClick={() => spotify_login_redirect()}>Login to Spotify</button>
    </div>
  );
}
