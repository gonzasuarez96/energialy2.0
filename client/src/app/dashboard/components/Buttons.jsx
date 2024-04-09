'use client';
import EmailModal from '@/app/components/Modals/EmailModal';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import getLocalStorage from '@/app/Func/localStorage';
import { useGetCompaniesByIdQuery } from '@/app/redux/services/companiesApi';
import Swal from 'sweetalert2';

const buttonsOptions = ['INVITAR EMPRESAS', 'CREAR LICITACION', 'FINANCIAMIENTO'];

export default function Buttons() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getLocalStorage();
    setUser(user);
  }, []);

  const company = useGetCompaniesByIdQuery(user?.company?.id).data;

  const handleOpenModal = (id, company) => {
    setModalData({ id: user.company.id });
    setOpenModal((cur) => !cur);
  };

  const handleOption = (index) => {
    if (index === 0) {
      if (!company) {
        Swal.fire({
          title: 'No tienes una empresa registrada',
          text: 'Para invitar empresas a que se sumen a Energialy, debes registrar tu empresa primero.',
          icon: 'warning',
        });
      } else {
        handleOpenModal();
      }
    } else if (index === 1) {
      if (!company) {
        Swal.fire({
          title: 'No tienes una empresa registrada',
          text: 'Para crear una licitación, debes registrar tu empresa primero',
          icon: 'warning',
        });
      } else {
        router.push('/dashboard/tenders/createTender');
      }
    } else if (index === 2) {
      if (!company ) {
        Swal.fire({
          title: 'No tienes una cuenta bancaria',
          text: 'Para solicitar algún producto debes solicitar una apertura de cuenta, dirígete a Financiamiento > Apertura de Cuenta',
          icon: 'warning',
        });
      } else {
        router.push('/dashboard/finanzas/solicitarProducto');
      }
    }
  };

  return (
    <div className="flex h-100 justify-end">
      {buttonsOptions.map((option, index) => (
        <button
          key={index}
          className="m-4 p-4 text-white font-semibold bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
          onClick={() => handleOption(index)}
        >
          {option}
        </button>
      ))}
      {openModal && <EmailModal open={openModal} handleOpen={handleOpenModal} status="open" id={modalData?.id} company={modalData?.company} />}
    </div>
  );
}
