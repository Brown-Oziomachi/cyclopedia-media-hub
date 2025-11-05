import React, { useEffect } from 'react';

const AdSenseAd = ({
    client = "ca-pub-8408243121163767",
    slot = "6386778121",
    format = "horizontal",
    style = { display: 'inline-block', width: '728px', height: '90px' }
}) => {
    useEffect(() => {
        try {
            // Push ad after component mounts
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className="ad-container">
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client={client}
                data-ad-slot={slot}
            />
        </div>
    );
};

export default AdSenseAd;

// Usage examples:
//
// 1. Basic usage (uses your default values):
// <AdSenseAd />
//
// 2. Custom ad slot:
// <AdSenseAd slot="1234567890" />
//
// 3. Responsive ad:
// <AdSenseAd
//   slot="1234567890"
//   format="auto"
//   style={{ display: 'block' }}
// />
//
// 4. Different size:
// <AdSenseAd
//   slot="1234567890"
//   style={{ display: 'inline-block', width: '300px', height: '250px' }}
// />

// Don't forget to add the AdSense script to your HTML <head> or _document.js:
// <script
//   async
//   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8408243121163767"
//   crossOrigin="anonymous"
// />