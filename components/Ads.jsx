"use client";

import { useEffect } from "react";

const Ads = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8408243121163767"  /* Your AdSense publisher ID */
      data-ad-slot="8408243121163767"                /* Your Ad slot ID */
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default Ads;
