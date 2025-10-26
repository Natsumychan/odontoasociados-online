import "../styles/hero-styles.css"

const HeroSection = () => {
  return (
    <section
      className="relative h-[400px] hero-background bg-cover bg-center"
    >
      <div className="relative z-10 text-white pl-10 max-w-xl">
        <h2 className="text-4xl font-extrabold mb-3 leading-tight">
          Sonrisas saludables para toda la familia
        </h2>
        <p className="text-lg font-light">
          Bienvenido a <strong>Odontólogos Asociados</strong>, donde la
          excelencia dental se encuentra con la tecnología moderna para brindarle
          la mejor atención personalizada.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
