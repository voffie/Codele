import { useEffect } from "react";

export const AdContainer = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <ins
      className="h-20"
      data-ad-client="ca-pub-1493256362939914"
      data-ad-slot="1485613071"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
