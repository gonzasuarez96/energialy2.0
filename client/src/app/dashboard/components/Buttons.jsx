'use client';
import EmailModal from "@/app/components/Modals/EmailModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

import  getLocalStorage  from "@/app/Func/localStorage";




const buttonsOptions = [
    'INVITAR EMPRESAS',
    'CREAR LICITACION',
    'FINANCIAMIENTO'
];





export default function Buttons() {

    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = (id, company) => {
      const user = getLocalStorage('user');
      console.log(user);
      setModalData({ id: user.company.id });
      setOpenModal((cur) => !cur);
    };

    const handleOption = (index) => {
      if ( index === 0){
        handleOpenModal();
      }else if (index === 1){
        router.push('/dashboard/tenders/createTender');
      }else if(index === 2){
        router.push('/dashboard/finanzas/aperturaCuenta');
      }
    }


    return(
        <div className="flex h-100 justify-end">
            {buttonsOptions.map((option, index) => (
                <button key={index} className="m-4 p-4 text-white font-semibold bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
                onClick={() => handleOption(index)}>
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
