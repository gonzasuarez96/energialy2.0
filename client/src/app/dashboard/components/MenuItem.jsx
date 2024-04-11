'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Loader from '@/app/components/Loader';
import Swal from 'sweetalert2';
import getLocalStorage from '@/app/Func/localStorage';

function MenuItem({ menuItem, index, isOpen, user, isBankAccountOpen }) {
  const [company, setCompany] = useState(null);
  useEffect(() => {
    const user = getLocalStorage();
    setCompany(user?.company?.id || null);
  }, []);

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const router = useRouter();
  const handleProductRequest = (url) => {
    if (url === '/dashboard/finanzas/solicitarProducto') {
      
      if (!company) {
        Swal.fire({
          title: 'No tienes una empresa registrada',
          text: 'Por favor registra tu empresa para avanzar.',
          icon: 'warning',
        });
         return; 
      } else {
        router.push(url);
      }
      

    } else if (url === '/dashboard/finanzas/aperturaCuenta') {
      if (!company) {
        Swal.fire({
          title: 'No tienes una empresa registrada',
          text: 'Por favor registra tu empresa para avanzar.',
          icon: 'warning',
        });
        return; 
      }
      if (isBankAccountOpen) {
        Swal.fire({
          title: 'Ya tienes una cuenta',
          text: 'Ahora puedes solicitar un producto en Financiamiento > Solicitar productos',
          icon: 'warning',
        });
      } else {
        router.push(url);
      }
    } else if (url === '/dashboard/ajustesEmpresa') {
      if (!company) {
        Swal.fire({
          title: 'No tienes una empresa registrada',
          text: 'Por favor registra tu empresa para avanzar.',
          icon: 'warning',
        });
        return; 
      } else {
        router.push(url);
      }
    } else if (url === '/dashboard/tenders') {
      if (!company) {
        Swal.fire({
          title: 'No tienes una empresa registrada',
          text: 'Por favor registra tu empresa para avanzar.',
          icon: 'warning',
        });
        return;
      } else {
        router.push(url);
      }
    } else if (url === '/dashboard/proposals') {
      if (!company) {
        Swal.fire({
          title: 'No tienes una empresa registrada',
          text: 'Por favor registra tu empresa para avanzar.',
          icon: 'warning',
        });
        return;
      } else {
        router.push(url);
      }
    } else {
      router.push(url);
    }
  };

  return (
    <>
      {user ? (
        <li
          key={index}
          className={`text-gray-800 text-sm  cursor-pointer flex items-center p-2 hover:bg-slate-200 rounded-md ${
            isOpen ? 'gap-x-4 w-full  ' : 'gap-x-0 w-auto justify-center'
          } ${menuItem.spacing ? 'mt-9' : 'mt-2'}`}
          onClick={() => {
            if (!menuItem.submenu) {
              router.push(`${menuItem.url}`);
            } else {
              setSubMenuOpen(!subMenuOpen);
            }
          }}
        >
          <span className="text-2xl block float-left">{menuItem.icon}</span>
          <span className={`text-base font-medium flex-1 ${!isOpen && 'hidden'}`}>{menuItem.title}</span>
          {menuItem.submenu && isOpen && <MdOutlineArrowDropDown className={`${subMenuOpen && 'rotate-180 duration-300'}`} />}
        </li>
      ) : null}
      {menuItem.submenu && isOpen && subMenuOpen && (
        <ul>
          {menuItem.submenuItems.map((item, index) => (
            <li
              key={index}
              className={`text-gray-800 text-xs flex items-center gap-x-4 cursor-pointer p-1 px-3 hover:bg-slate-200 rounded-md`}
              onClick={() => handleProductRequest(item.url)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MenuItem;
