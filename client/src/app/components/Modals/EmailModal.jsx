'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { displaySuccessMessage, displayFailedMessage } from '@/app/components/Toastify';
import axios from 'axios';

function EmailModal({ open, handleOpen, id, company }) {
  const [email, setEmail] = useState('');
  const body = {
    companyId: id,
    email: email,
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailPattern.test(email);
  };

  const handleStatus = async () => {
    if (!isValidEmail(email)) {
      displayFailedMessage('Agregá un email válido para enviar la invitación');
    } else {
      try {
        const response = await sendInvitations();
        displaySuccessMessage('Invitaciones enviadas con exito');
        setTimeout(() => {
          handleOpen();
        }, 3000);
      } catch (error) {
        displayFailedMessage('Error al invitar empresas');
        console.log(error);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendInvitations = async () => {
    try {
      const response = axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/inviteCompanies`, body);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5 h-screem">
            <h4 className="">
              ¡Invita a otras empresas a formar parte de Energialy! <span className="font-bold">{company}</span>
            </h4>
            <div className="w-full">
              <input
                className="p-2 rounded-sm w-full border-1 bg-gray-100"
                type="text"
                placeholder="Correo electrónico"
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex gap-2">
              <button
                className="font-bold m-5 bg-white border-1 border-primary-500 py-2 px-4 rounded-md text-primary-500 hover:bg-gray-600 transition duration-300"
                onClick={handleOpen}
              >
                Cancelar
              </button>
              <button
                className="bg-primary-500 py-2 px-8 rounded-md
               text-white font-bold m-5 hover:bg-secondary-600 transition duration-300"
                onClick={handleStatus}
              >
                Enviar
              </button>
            </div>
            <ToastContainer style={{ marginTop: '100px' }} />
          </div>
        </div>
      )}
    </>
  );
}

export default EmailModal;
