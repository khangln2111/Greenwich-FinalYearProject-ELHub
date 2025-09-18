import { useEffect } from "react";

const AOSInit = () => {
  useEffect(() => {
    const loadAOS = async () => {
      // Lazy load JS
      const AOS = (await import("aos")).default;
      // Lazy load CSS
      await import("aos/dist/aos.css");

      // Init AOS
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: false,
        anchorPlacement: "top-bottom",
      });
    };

    loadAOS();
  }, []);

  return null;
};

export default AOSInit;
