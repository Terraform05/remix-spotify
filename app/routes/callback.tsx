//description: This is the callback page for the app. It will handle the callback from spotify and then redirect back to the app with the access token.
// app/routes/auth.callback.tsx

import React, { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

import { requestAccessToken } from '../spotifyAuthPKCE';

export default function Callback() {
  const [accessToken, setAccessToken] = useState('');
  const [codeVerifier, setCodeVerifier] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const handleAccessToken = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      console.log('code: ', code)
      const codeVerifier = window.localStorage.getItem('codeVerifier');
      
      if (codeVerifier === null) {
        throw new Error('No codeVerifier found');
      }

      if (code !== null) {
        setCode(code);
        setCodeVerifier(codeVerifier);
        const token = await requestAccessToken(code, codeVerifier);
        setAccessToken(token);
      }
    };

    handleAccessToken();
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
