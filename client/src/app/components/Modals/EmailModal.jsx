"use client";
import { useState } from 'react';
import { handleChangeStatus } from "@/app/Func/controllers";
import { ToastContainer, toast } from "react-toastify";
import {
  displaySuccessMessage,
  displayFailedMessage,
} from "@/app/components/Toastify";

function EmailModal({ open, handleOpen, status, id, company }) {
    const [emails, setEmails] = useState([]);
    const [email, setEmail] = useState('')
  const endpoint = "bankAccounts";
  const completeStatus = {
    status: status,
    statusMessage: "Cuenta Aprobada",
  };
  const handleStatus = async () => {
    if(emails.length <= 0) {
      displayFailedMessage("No existen Emails cargados para realizar la invitación");
    }
    try {
      const response = await handleChangeStatus(id, completeStatus, endpoint);
      displaySuccessMessage("Sus invitaciones se han enviando correctamente");
      setTimeout(() => {
        handleOpen();
      }, 1000);
    } catch (error) {
      displayFailedMessage("Error al invitar empresas");
    }
  };

  const hanbleEmail = (e) => {
    setEmail(e.target.value)
  }

  const saveEmail = (e) => {
    e.preventDefault()
    setEmails([...emails, email])
    e.target.reset()
    setEmail('')
    
  }

  const removeEmail = (index) => {
    const updatedEmails = [...emails]
    updatedEmails.splice(index, 1)
    setEmails(updatedEmails)
  }


  
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5 h-screem">
            <h4>
              Invita a tus empresas a formar parte de Energialy{" "}
              <span className="font-bold">{company}</span>
            </h4>
            <div className="w-full">
              <form onSubmit={saveEmail} className="flex gap-2 w-full">
                <input
                  className="p-2 rounded-sm w-full border-1 border-gray-100"
                  type="text"
                  placeholder="Correo electrónico"
                  onChange={hanbleEmail}
                />
                <button
                  className="rounded-md bg-secondary-400 font-semibold text-white px-4 py-2"
                  type="submit"
                >
                  Guardar
                </button>
              </form>
            </div>
            {emails.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {emails.map((email, index) => (
                  <div
                    key={index}
                    className="bg-gray-400 text-gray-50 flex gap-2  text-xs px-2 py-2 rounded-full justify-between items-center"
                  >
                    <span className="font-semibold">{email}</span>
                    <button
                      onClick={() => removeEmail(index)}
                      className="bg-gray-700 w-5 h-5 rounded-full"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <button
                className="bg-primary-500 py-2 px-4 rounded-sm text-white font-bold m-5"
                onClick={handleStatus}
              >
                Enviar
              </button>
              <button
                className="bg-secondary-500 py-2 px-4 rounded-sm text-white font-bold m-5"
                onClick={handleOpen}
              >
                Cerrar
              </button>
            </div>
            <ToastContainer style={{ marginTop: "100px" }} />
          </div>
        </div>
      )}
    </>
  );
}

export default EmailModal;
