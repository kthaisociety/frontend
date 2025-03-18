import { useState, useEffect } from "react";

export function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // set Mobile if screen width is 768px or less
    };

    checkScreenSize(); // Run once when component mounts
    window.addEventListener("resize", checkScreenSize); // Update any time resize

    return () => window.removeEventListener("resize", checkScreenSize); 
  }, []);

  return isMobile;
}
