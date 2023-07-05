// description: This is the login page for the app. It will redirect to the spotify login page and then redirect back to the app with the access token.
// app/routes/auth.login.tsx
import { Link } from '@remix-run/react';
import { generateRandomString, initiateAuthorization } from '../spotifyAuthPKCE';
import { check_login } from './_index';


export default function Login() {
  if (check_login() == true) {
    //go to index
    window.location.href = '/';
    return null;

  }
  // else continue and do login

  const codeVerifier = generateRandomString(128);
  window.localStorage.setItem('codeVerifier', codeVerifier);
  console.log('codeVerifier1: ', codeVerifier);

  initiateAuthorization(codeVerifier)
    .then(url => {
      window.location.href = url;
    });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Link to="/">Home</Link>
    </div>
  );
}
