"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
  const companyId = useSelector((state) => state.user.userData.company.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/bankAccounts", {
        companyId,
      });
      console.log("resBank:", res);
    } catch (error) {
      console.log(error);
    }
  };

  const fields = [
    {
      label:
        "Copia del Estatuto social actualizado y debidamente inscripto en el Registro de Comercio correspondiente.",
      value: "estatutoSocial",
    },
    {
      label: "Constancia de Inscripción en AFIP.",
      value: "inscripcionAFIP",
    },
    {
      label: "Constancia de CUIT/CIE/CDI.",
      value: "cuit",
    },
    {
      label:
        "Copias de Actas de Reunión de Directorio y Actas de Asamblea (o su equivalente en otro tipo societario) en las cuales se designan autoridades; y Constancia de su inscripción ante el Registro Público correspondiente.",
      value: "actasReunion",
    },
    {
      label:
        "Copia certificada del poder otorgado en favor de los apoderados que los autorice a representar al cliente frente a la institución financiera.",
      value: "cartaPoder",
    },
    {
      label:
        "Copia de los 2(dos) últimos estados contables anuales certificados ante el Congreso Profesional correspondiente.",
      value: "estadosContables",
    },
    {
      label:
        "Licencias o autorizaciones otorgadas por organismos gubernamentales (en caso que corresponda).",
      value: "licencias",
    },
    {
      label:
        'Certificado de Censo Nacional Agropecuario (solo para actividades alcanzadas según Com."B"11788 del BCRA).',
      value: "censoAgropecuario",
    },
    {
      label:
        "Registro de accionistas (rúbricas y fojas que demuestren la composición total) o su equivalente en otros tipos societarios.",
      value: "registroAccionistas",
    },
    {
      label: 'Certificado de Cumplimiento Censal (Com. "B" 12100 del BCRA).',
      value: "cumplimientoCensal",
    },
    {
      label:
        "DD.JJ. IVA y comprobante de pago de todos los meses posteriores al cierre del último balance y/o documentación que demuestre el ingreso de fondos del cliente.",
      value: "ddjjIVA",
    },
    {
      label: "DD.JJ. Sujeto Obligado (en caso que corresponda).",
      value: "ddjjSujetoObligado",
    },
    {
      label: "Constancia de UIF (en caso que corresponda).",
      value: "constanciaUIF",
    },
    {
      label: "Compre Neuquino",
      value: "compreNeuquino",
    },
  ];

  const uploadFile = async (e, fieldName) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tu_upload_preset"); // Reemplaza 'tu_upload_preset' con tu propio upload preset de Cloudinary

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbraa6jpj/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileUrl = res.data.secure_url;
      console.log("URL del archivo subido:", fileUrl);

      setFiles((prevFiles) => ({
        ...prevFiles,
        [fieldName]: fileUrl,
      }));
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
    }
  };

  return (
    <main className="flex justify-center items-start w-full h-screen bg-white p-3 shadow overflow-y-auto">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 bg-[#f7f7f7] py-4 pl-7 mt-4 font-bold border-l-4 border-primary-500 text-left">
          Informacion y Documentacion del Cliente
        </label>
        {fields.map((field, index) => (
          <div key={index} className="flex text-left">
            <label className="text-left border p-4 m-2 font-bold w-[100vh]">
              {field.label}
            </label>
            <div className="ml-4 p-2">
              <input
                type="file"
                id={index}
                accept="image/*,.pdf"
                onChange={(e) => uploadFile(e, field.value)}
                className="w-full border rounded px-2 py-1"
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
    </main>
  );
}
