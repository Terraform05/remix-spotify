//description: This is the callback page for the app. It will handle the callback from spotify and then redirect back to the app with the access token.
// app/routes/auth.callback.tsx

import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

import { requestTokens } from '../spotifyAuthPKCE';

export default function loginCallback() {
  const [code, setCode] = useState('');
  const [codeVerifier, setCodeVerifier] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [tokenTime, setTokenTime] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    const codeVerifier = window.localStorage.getItem('codeVerifier');

    if (code && codeVerifier !== null) {
      setCode(code);
      setCodeVerifier(codeVerifier);
      requestTokens(code, codeVerifier)
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
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>CheckLogin page</h1>
      <Link to="/">home</Link>{' '}
      <ul>
        <li>code: {code}</li>
        <li>codeVerifier: {codeVerifier}</li>
        <li>accessToken: {accessToken}</li>
        <li>refreshToken: {refreshToken}</li>
        <li>tokenTime: {tokenTime}</li>
      </ul>
    </div>
  );
}
