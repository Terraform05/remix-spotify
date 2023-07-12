// description: this page should clear all the tokens stored in localstorage and redirect to the login page
// app/routes/logout.tsx
import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

export default function Error() {

    const [timeDiff, setTimeDiff] = useState('');

    const time_diff = window.localStorage.get('time_diff');
    setTimeDiff(time_diff);

    window.localStorage.clear();
    //window.location.href = '/';

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
            <h1>ERROR</h1>
            {/*<ul>
                <li>time_diff: {timeDiff ? new Date(parseInt(timeDiff)).toLocaleString() : ''}</li>
            </ul>*/}
            <Link to="/login">Log In</Link>{' '}
        </div>
    );
}
