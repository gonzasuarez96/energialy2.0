import React from "react";

export default function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://energialy.ar/uploads/settings/footer/1624496061-Energialy-Banner-footer-2-byn.jpg")',
        backgroundPosition: "center 60%",
        height: "300px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-yellow-300 opacity-80"></div>
      <div className="py-20">
        {/* Aquí puedes agregar el contenido que deseas mostrar sobre el degradado */}
      </div>
    </footer>
  );
};


