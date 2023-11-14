'use client'
import { handleChangeStatus,  } from "@/app/Func/controllers";
import { ToastContainer, toast } from "react-toastify";
import {
  displaySuccessMessage, displayFailedMessage
} from "@/app/components/Toastify";



function BankModal({open, handleOpen, status, id, company }) {
    const endpoint = "bankAccounts"
    const completeStatus = {
      status: status,
      statusMessage: "Cuenta Aprobada",
    };
    const handleStatus = async () => {
      try {
        const response = await handleChangeStatus(id, completeStatus, endpoint);
        displaySuccessMessage("Cuenta Aprobada exitosamente")
        setTimeout(()=> {
            window.location.reload()
            handleOpen();
        }, 1000)
      } catch (error) {
        displayFailedMessage("Error al aprobar la cuenta")
      }
       
    }
   
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5 h-screem">
            <p>
              Dando click en continuar, estas aprobando de manera permanente la
              Apertura de Cuenta Bancaria de{" "}
              <span className="font-bold">{company}</span>
            </p>
            <p>Estas seguro?</p>
            <div className="flex gap-2">
              <button
                className="bg-primary-500 py-2 px-4 rounded-sm text-white font-bold m-5"
                onClick={handleStatus}
              >
                Continuar
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

export default BankModal