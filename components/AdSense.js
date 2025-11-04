"use client";

import { useEffect, useRef } from 'react';

export default function AdSense({
    slot = "9662897902",
    format = "auto",
    responsive = "true",
    style = {}
}) {
    const adRef = useRef(null);
    const hasLoadedAd = useRef(false);

    useEffect(() => {
        // Prevent duplicate ad loading
        if (hasLoadedAd.current) return;

        const loadAd = () => {
            try {
                // Check if adsbygoogle is available and ad hasn't been loaded
                if (
                    window.adsbygoogle &&
                    adRef.current &&
                    !adRef.current.dataset.adsbygoogleStatus
                ) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    hasLoadedAd.current = true;
                }
            } catch (err) {
                console.error('AdSense error:', err);
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(loadAd, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="my-8 w-full flex justify-center overflow-hidden">
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                    display: 'block',
                    minHeight: '250px',
                    minWidth: '300px',
                    ...style
                }}
                data-ad-client="ca-pub-8408243121163767"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
}