import { useEffect } from 'react';

export default function AdSense({ slot = "9662897902" }) {
    useEffect(() => {
        try {
            if (window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className="my-8 w-full flex justify-center">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-8408243121163767"
                data-ad-slot={slot}
            />
        </div>
    );
}