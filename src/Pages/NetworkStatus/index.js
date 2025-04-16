import React, { useState, useEffect } from 'react';

const NetworkStatus = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <>
            {isOnline ? (
                children
            ) : (
                <div className="network-status">
                    <div className="status-box">
                        <div className="icon">📡</div>
                        <h1>Oops! No Connection</h1>
                        <p>It looks like you're offline. Please check your internet and try again.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default NetworkStatus;
