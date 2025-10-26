import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {HeroSection, LoginSection, FeaturesSection} from "../components";

const HomePage = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToLogin) {
      const section = document.getElementById("login-section");
      if (section) {
        // ✅ Scroll instantáneo, sin efecto smooth
        setTimeout(() => {
          section.scrollIntoView({ behavior: "auto" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <HeroSection />
      <div id="login-section">
        <LoginSection />
      </div>
      <FeaturesSection />
    </>
  );
};

export default HomePage;
