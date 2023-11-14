"use client";
import { handleChangeStatus } from "@/app/Func/controllers";
import { ToastContainer } from "react-toastify";
import { displaySuccessMessage, displayFailedMessage } from "@/app/components/Toastify";
import {useState} from 'react'




function TextModal({ open, handleOpen, id, company, status }) {
    const [review, setReview] = useState('')

    const completeStatus = {
      status: status,
      statusMessage: review
    };
     const handleStatus = async () => {
        if(completeStatus.statusMessage === ''){
            displayFailedMessage("Por favor ingresa un mensaje");
            return;
        }
       const response = await handleChangeStatus(
         id,
         completeStatus,
         "bankAccounts"
       );
       console.log(response);
       displaySuccessMessage("Solicitud de revisión enviada correctamente");
       setTimeout(() => {
         window.location.reload();
         handleOpen();
       }, 1000);
     };

     const handleMessage = (e) => {
        setReview(e.target.value)
     }

     console.log(review)

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white px-1 py-5 rounded flex flex-col justify-center items-center gap-5 h-screem">
            <p>Por favor indica los motivos de la revisión</p>
            <textarea
              name="review"
              id=""
              cols="30"
              rows="10"
              className="border-gray-500 border-1 rounded p-2"
              onChange={handleMessage}
            ></textarea>
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

export default TextModal;
