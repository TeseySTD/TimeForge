import type React from 'react'
import './NotFound.scss'
import { useNavigate } from 'react-router'
import { useEffect, useRef } from 'react';
import { setVisibleWithDelay } from '@/utils/uiUtils';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setVisibleWithDelay(ref);
    }, []);

    return (
        <div id="not-found" role="status" ref={ref} aria-label="Page not found">
            <div className="nf-card">
                <h1 className="nf-code">404</h1>
                <p className="nf-msg">Page not found</p>
                <p className="nf-sub">Maybe the link was broken or not correct timer\timer set id.</p>

                <div className="nf-controls">
                    <button onClick={() => navigate('/')} >To Home</button>
                    <button onClick={() => navigate(-1)} >Go back</button>
                </div>
            </div>
        </div>
    )
}

export default NotFound