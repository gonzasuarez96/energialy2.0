'use client';
import React, { useState } from 'react';
import axios from 'axios';
import getLocalStorage from '@/app/Func/localStorage';
import { urlProduction } from '@/app/data/dataGeneric';
import { displayFailedMessage, displaySuccessMessage } from '@/app/components/Toastify';
import { ToastContainer } from 'react-toastify';

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
  const user = getLocalStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyId = user?.company.id;
    const id = {
      companyId: companyId,
    };
    console.log('companyIdAttach:', companyId);
    try {
      const res = await axios.post(`${urlProduction}/bankAccounts`, id);
      console.log('res bankAccount:', res);
      displaySuccessMessage('Solicitud de Apertura de cuenta enviada');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      console.log(error);
      if (error.response.data.error === 'Company Testing already has a bank account.')
        displayFailedMessage('La empresa ya tiene una solicitud de Apertura de Cuenta');
    }
  };

  const fields = [
    {
      label: 'Copia del Estatuto social actualizado y debidamente inscripto en el Registro de Comercio correspondiente.',
      value: 'estatutoSocial',
    },
    {
      label: 'Constancia de Inscripción en AFIP.',
      value: 'inscripcionAFIP',
    },
    {
      label: 'Constancia de CUIT/CIE/CDI.',
      value: 'cuit',
    },
    {
      label:
        'Copias de Actas de Reunión de Directorio y Actas de Asamblea (o su equivalente en otro tipo societario) en las cuales se designan autoridades; y Constancia de su inscripción ante el Registro Público correspondiente.',
      value: 'actasReunion',
    },
    {
      label:
        'Copia certificada del poder otorgado en favor de los apoderados que los autorice a representar al cliente frente a la institución financiera.',
      value: 'cartaPoder',
    },
    {
      label: 'Copia de los 2(dos) últimos estados contables anuales certificados ante el Congreso Profesional correspondiente.',
      value: 'estadosContables',
    },
    {
      label: 'Licencias o autorizaciones otorgadas por organismos gubernamentales (en caso que corresponda).',
      value: 'licencias',
    },
    {
      label: 'Certificado de Censo Nacional Agropecuario (solo para actividades alcanzadas según Com."B"11788 del BCRA).',
      value: 'censoAgropecuario',
    },
    {
      label: 'Registro de accionistas (rúbricas y fojas que demuestren la composición total) o su equivalente en otros tipos societarios.',
      value: 'registroAccionistas',
    },
    {
      label: 'Certificado de Cumplimiento Censal (Com. "B" 12100 del BCRA).',
      value: 'cumplimientoCensal',
    },
    {
      label:
        'DD.JJ. IVA y comprobante de pago de todos los meses posteriores al cierre del último balance y/o documentación que demuestre el ingreso de fondos del cliente.',
      value: 'ddjjIVA',
    },
    {
      label: 'DD.JJ. Sujeto Obligado (en caso que corresponda).',
      value: 'ddjjSujetoObligado',
    },
    {
      label: 'Constancia de UIF (en caso que corresponda).',
      value: 'constanciaUIF',
    },
    {
      label: 'Compre Neuquino',
      value: 'compreNeuquino',
    },
  ];

  const uploadFile = async (e, fieldName) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'energialy_users');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dkgpfpz6o/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fileUrl = res.data.secure_url;
      console.log('URL del archivo subido:', fileUrl);

      setFiles((prevFiles) => ({
        ...prevFiles,
        [fieldName]: fileUrl,
      }));

      const companyId = user.company.id;
      try {
        const response = await axios.post(`${urlProduction}/documents`, {
          companyId,
          name: fieldName,
          attachment: fileUrl,
        });
        console.log('Document uploaded:', response);
      } catch (error) {
        console.error('Error al subir el documento:', error);
      }
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  };

  return (
    <main className="flex justify-center items-start w-full  bg-white p-3 shadow ">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 bg-[#f7f7f7] py-4 pl-7 mt-4 font-bold border-l-4 border-primary-500 text-left">
          Informacion y Documentacion del Cliente
        </label>
        {fields.map((field, index) => (
          <div key={index} className="flex text-left">
            <label className="text-left border p-4 m-2 font-bold w-[100vh]">{field.label}</label>
            <div className="ml-4 p-2">
              <input type="file" id={index} accept="image/*,.pdf" onChange={(e) => uploadFile(e, field.value)} className="w-full border rounded " />
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            className="px-4 py-2 m-4 font-bold bg-white border-2 border-primary-500 rounded hover:bg-primary-500 hover:text-white transition duration-300"
            type="button"
            onClick={props.handleBack}
          >
            Volver
          </button>
          <button className="px-4 py-2 m-4 font-bold text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300" type="submit">
            Enviar
          </button>
        </div>
      </form>
      <ToastContainer style={{ marginTop: '100px' }} />
    </main>
  );
}
