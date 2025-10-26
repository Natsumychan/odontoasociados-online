import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hace scroll al inicio cada vez que cambia la ruta
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null; // No renderiza nada
};

export default ScrollToTop;
