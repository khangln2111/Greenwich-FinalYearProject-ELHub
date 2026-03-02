import { useEffect } from "react";
import "aos/dist/aos.css";

const AOSInit = () => {
  useEffect(() => {
    const loadAOS = async () => {
      // Lazy load JS
      const AOS = (await import("aos")).default;

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
