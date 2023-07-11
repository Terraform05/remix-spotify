//description: This is the callback page for the app. It will handle the callback from spotify and then redirect back to the app with the access token.
// app/routes/auth.callback.tsx

import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

export default function LoginCallback() {
    const [code, setCode] = useState('');
    const [codeVerifier, setCodeVerifier] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [tokenTime, setTokenTime] = useState('');


    useEffect(() => {
        const storedCode = window.localStorage.getItem('code');
        setCode(storedCode || '');
        const storedCodeVerifier = window.localStorage.getItem('codeVerifier');
        setCodeVerifier(storedCodeVerifier || '');
        const storedAccessToken = window.localStorage.getItem('access_token');
        setAccessToken(storedAccessToken || '');
        const storedRefreshToken = window.localStorage.getItem('refresh_token');
        setRefreshToken(storedRefreshToken || '');
        const storedTokenTime = window.localStorage.getItem('token_time');
        setTokenTime(storedTokenTime || '');
    }, []);

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
            <h1>LoginCallback page</h1>
            <Link to="/">index</Link>{' '}
            <ul>
                <li>code: {code}</li>
                <li>codeVerifier: {codeVerifier}</li>
                <li>accessToken: {accessToken}</li>
                <li>refreshToken: {refreshToken}</li>
                <li>tokenTime: {tokenTime ? new Date(parseInt(tokenTime)).toLocaleString() : ''}</li>
            </ul>
        </div>
    );
}
