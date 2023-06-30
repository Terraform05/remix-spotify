// description: This is the login page for the app. It will redirect to the spotify login page and then redirect back to the app with the access token.
// app/routes/auth.login.tsx

import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { generateRandomString, initiateAuthorization, requestAccessToken } from '../spotifyAuthPKCE';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const codeVerifier = generateRandomString(128);

  window.localStorage.setItem('codeVerifier', codeVerifier);

  const [authorizationUrl, setAuthorizationUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorizationUrl = async () => {
      const url = await initiateAuthorization(codeVerifier);
      setAuthorizationUrl(url);
      window.location.href = url;
    };

    fetchAuthorizationUrl();
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Link to="/">Home</Link>
      <div>
        <div>
          <ul>
            <li>{authorizationUrl}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
