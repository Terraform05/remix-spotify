import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { initiateAuthorization } from '../spotifyAuthPKCE';

export default function Login() {
  const [authorizationUrl, setAuthorizationUrl] = useState('');

  useEffect(() => {
    const fetchAuthorizationUrl = async () => {
      const url = await initiateAuthorization();
      setAuthorizationUrl(url);
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