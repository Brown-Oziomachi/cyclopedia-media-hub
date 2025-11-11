'use client';

import { useEffect } from 'react';

const AdSenseAd = ({
    client = "ca-pub-8408243121163767",
    slot = "6386778121",
    format = "auto",
    responsive = true,
    style = { display: 'block' }
}) => {
    useEffect(() => {
        try {
            // Push ad after component mounts
            if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className="ad-container my-8 flex justify-center">
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
};

export default AdSenseAd;