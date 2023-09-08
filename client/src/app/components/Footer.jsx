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
      <div className="pt-20 relative z-10 w-full px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-3/12 px-4">
            <img
              src="https://energialy.ar/uploads/settings/footer/1624496061-Energialy-Logo-150.png"
              alt="company logo here"
            />
            <div>
              <p>La Plataforma de Licitaciones Fullstream de Vaca Muerta. Las herramientas de Energialy colaboran en tus procesos licitatorios.</p>
            </div>
            <ul>
              <li>
                <a href="https://twitter.com/energialy"><i className="fa fab fa-twitter"></i></a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/energialy/"><i className="fa fab fa-google-plus-g"></i></a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 xl:w-3/12 px-4">
            <h4>OPORTUNIDADES</h4>
            <ul className="text-white">
              <li>
                <a href="#" className="no-underline text-current hover:text-[#191654]">Financiamiento</a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 xl:w-3/12 px-4">
            <h4>COMPAÑIA</h4>
            <ul className="text-white"> 
              <li>
                <a href="#" className="no-underline text-current hover:text-[#191654]">Descubri Energialy</a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 xl:w-3/12 px-4">
            <h4>Seguinos</h4>
            <ul className="text-white">
              <li>
                <a href="#" className="no-underline text-current hover:text-[#191654]">logo redes</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
