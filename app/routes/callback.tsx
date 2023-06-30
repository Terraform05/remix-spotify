//description: This is the callback page for the app. It will handle the callback from spotify and then redirect back to the app with the access token.
// app/routes/auth.callback.tsx

import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

import { requestAccessToken } from '../spotifyAuthPKCE';

export default function Callback() {
  const [code, setCode] = useState('');
  const [codeVerifier, setCodeVerifier] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    const codeVerifier = window.localStorage.getItem('codeVerifier');

    if (code && codeVerifier !== null) {
      setCode(code);
      setCodeVerifier(codeVerifier);
      requestAccessToken(code, codeVerifier)
        .then((accessToken) => {
          window.localStorage.setItem('token', accessToken);
          console.log('token:', accessToken);
          setAccessToken(accessToken);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>CALLBACK page</h1>
      <Link to="/">home</Link>{' '}
      <ul>
        <li>code: {code}</li>
        <li>codeVerifier: {codeVerifier}</li>
        <li>accessToken: {accessToken}</li>
      </ul>
    </div>
  );
}
