"use client";
import React, { useState } from "react";
import UploadthingButtonMany from "@/app/components/UploadthingButtonOnly";

export default function Attachment(props) {
  const [files, setFiles] = useState({
    estatutoSocial: null,
    inscripcionAFIP: null,
    cuit: null,
    actasReunion: null,
    cartaPoder: null,
    estadosContables: null,
    licencias: null,
    censoAgropecuario: null,
    registroAccionistas: null,
    cumplimientoCensal: null,
    ddjjIVA: null,
    ddjjSujetoObligado: null,
    constanciaUIF: null,
    compreNeuquino: null,
  });

  const handleFileChange = (fieldName, file) => {
    setFiles({
      ...files,
      [fieldName]: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los archivos al servidor
  };

  const fields = [
    "Copia del Estatuto social actualizado y debidamente inscripto en el Registro de Comercio correspondiente.",
    "Constancia de Inscripción en AFIP.",
    "Constancia de CUIT/CIE/CDI.",
    "Copias de Actas de Reunión de Directorio y Actas de Asamblea (o su equivalente en otro tipo societario) en las cuales se designan autoridades; y Constancia de su inscripcion ante el Registro Publico correspondiente.",
    "Copia certificada del poder otorgado en favor de los apoderados que los autorice a representar al cliente frente a la institucion financiera.",
    "Copia de los 2(dos) ultimos estados contables anuales certificados ante el Congreso Profesional correspondiente.",
    "Licencias o autorizaciones otorgadas por organismos gubernamentales (en caso que corresponda).",
    'Certiﬁcado de Censo Nacional Agropecuario (solo para actividades alcanzadas segun Com."B"11788 del BCRA).',
    "Registro de accionistas (rubricas y fojas que demuestren la composicion total) o su equivalente en otros tipos societarios.",
    'Certificado de Cumplimiento Censal (Com. "B" 12100 del BCRA).',
    "DD.JJ. IVA y comprobante de pago de todos los meses posteriores al cierre del ultimo balance y/o documentacion que demuestre el ingreso de fondos del cliente.",
    "DD.JJ. Sujeto Obligado (en caso que corresponda).",
    "Constancia de UIF (en caso que corresponda).",
    "Compre Neuquino",
  ];

  return (
    <form className="h-screen overflow-y-auto" onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index} className="flex text-left">
          <label className="text-left border p-4 m-2 font-bold w-[100vh]">
            {field}
          </label>
          <div className="ml-4 p-2">
            <UploadthingButtonMany
              onChange={(file) => handleFileChange(field, file)}
              className=""
            />
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          className="px-4 py-2 m-4 font-bold text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
          type="button"
          onClick={props.handleBack}
        >
          Volver
        </button>
        <button
          className="px-4 py-2 m-4 font-bold text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
