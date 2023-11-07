'use client';
import EmailModal from "@/app/components/Modals/EmailModal";
import { useState } from "react";
const buttonsOptions = [
    'INVITAR EMPRESAS',
    'CREAR LICITACION',
    'FINANCIAMIENTO'
];





export default function Buttons() {

    
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = (id, company) => {
      setModalData({ id: id, company: company });
      setOpenModal((cur) => !cur);
    };


    return(
        <div className="flex h-100 justify-end">
            {buttonsOptions.map((option, index) => (
                <button key={index} className="m-4 p-4 text-white font-semibold bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
                onClick={() => {handleOpenModal()}}>
                    {option}
                </button>
            ))}
            {openModal && (
            <EmailModal
              open={openModal}
              handleOpen={handleOpenModal}
              status="open"
              id={modalData?.id}
              company={modalData?.company}
            />
          )}
        </div>
    );
}
