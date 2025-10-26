import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScrollToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Redirige al HomePage y pasa un estado para indicar el scroll
    navigate("/", { state: { scrollToLogin: true }, replace: true });
  }, [navigate]);

  return null;
};

export default ScrollToLogin;
