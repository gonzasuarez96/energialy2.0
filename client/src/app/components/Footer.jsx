import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";

const oportunities = [
  { name: "Crear licitaciones", link: "/tenders" },
  { name: "Participar en Licitaciones", link: "/" },
  { name: "Financiamiento", link: "/" },
  { name: "Directorio Energetico", link: "directory" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#545353] bg-cover bg-center h-full">
      <div className="h-full flex items-center justify-center p-2 mx-4 mb-4 mt-12 border-b border-[#3D3D3D]">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-3/12 px-4 text-[#B4B4B4]">
            <a href="/">
              <img
                src="https://energialy.ar/uploads/settings/footer/1624496061-Energialy-Logo-150.png"
                alt="company logo here"
                className="w-60"
              />
            </a>
            <div>
              <p className="text-base mt-4">
                La Plataforma de Licitaciones Fullstream de Vaca Muerta. Las
                herramientas de Energialy colaboran en tus procesos
                licitatorios.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 xl:w-3/12 px-4 text-[#B4B4B4]">
            <h4 className="text-xl tracking-wider mb-4">OPORTUNIDADES</h4>
            <ul className="pl-0">
              {oportunities.map((option, index) => (
                <li key={index} className="pb-2">
                  <a
                    href={option.link}
                    className="no-underline text-current hover:text-primary-500 transition duration-300"
                  >
                    {option.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 xl:w-3/12 px-4 text-[#B4B4B4]">
            <h4 className="text-xl tracking-wider mb-4">COMPAÑIA</h4>
            <ul className="pl-0">
              <li>
                <a
                  href="/register"
                  className="no-underline text-current hover:text-primary-500 transition duration-300"
                >
                  Descubri Energialy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 xl:w-3/12 px-4 text-[#B4B4B4]">
            <h4 className="text-xl tracking-wider mb-4">Seguinos</h4>
            <ul className="flex list-none p-0">
              <li className="p-2 mx-2">
                <a
                  href="https://twitter.com/energialy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter
                    className="text-[#B4B4B4] hover:bg-primary-500 hover:text-white transition duration-300"
                    size="30px"
                  ></AiOutlineTwitter>
                </a>
              </li>
              <li className="p-2 mx-2">
                <a
                  href="https://www.linkedin.com/company/energialy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsLinkedin
                    className="text-[#B4B4B4] hover:bg-primary-500 hover:text-white transition duration-300"
                    size="30px"
                  ></BsLinkedin>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-4 m-4 text-base text-[#B4B4B4] tracking-wide">
        <span>2023 © | ENERGIALY SAS | Hecho en Neuquén</span>
      </div>
    </footer>
  );
}
