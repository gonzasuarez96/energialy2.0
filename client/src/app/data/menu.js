import { MdSpaceDashboard } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import {BiSolidMessageRounded} from 'react-icons/bi'
import {BiSolidBank} from 'react-icons/bi'
import {FaBriefcase} from 'react-icons/fa'
export const menuBar = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: <BiSolidMessageRounded />,
  },
  {
    title: "Perfiles",
    url: "",
    icon: <MdAccountBox />,
    submenu: true,
    //spacing: true,
    submenuItems: [
      { title: "Ajustes de Usuario", url: "/dashboard/ajustesProfile" },
      { title: "Ajustes de Empresa", url: "/dashboard/ajustesEmpresa" },
    ],
  },
  {
    title: "Licitaciones",
    // url: "/dashboard/licitaciones",
    //auth: ['admin', 'superAdmin'],
    spacing: true,
    icon: <FaBriefcase />,
    submenu: true,
    submenuItems: [
      {
        title: "Mis Licitaciones",
        url: "/dashboard/tenders",
        //auth: ['admin', 'superAdmin'],
      },
      { title: "Mis Propuestas", url: "/dashboard/proposals" },
    ],
  },
  {
    title: "Financiamiento",
    url: "/dashboard/finanzas",
    icon: <BiSolidBank />,
    submenu: true,
    submenuItems: [
      {
        title: "Mis Solicitudes",
        url: "/dashboard/finanzas/solicitudes",
      },
      {
        title: "Apertura de cuenta",
        url: "/dashboard/finanzas/aperturaCuenta",
      },
      {
        title: "Solicitar producto",
        url: "/dashboard/finanzas/solicitarProducto",
      },
    ],
  },
  {
    title: "Banco",
    //url: "/dashboard/bank",
    icon: <BiSolidBank />,
    submenu: true,
    submenuItems: [
      {
        title: "Cuentas Bancarias",
        url: "/dashboard/bank/accounts",
      },
      {
        title: "Productos Financieros",
        url: "/dashboard/bank/financialProducts",
      },
    ],
  },
];
