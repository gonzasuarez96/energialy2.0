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
        title: "Administrar Licitaciones",
        url: "/dashboard/licitaciones/admin",
      },
      { title: "Liciataiones en curso", url: "/dashboard/licitaciones/active" },
      {
        title: "Liciataiones Completas",
        url: "/dashboard/licitaciones/complete",
      },
      {
        title: "Liciataiones Canceladas",
        url: "/dashboard/licitaciones/cancel",
      },
    ],
  },
  {
    title: "Financiamiento",
    url: "/dashboard/finanzas",
    icon: <BiSolidBank />,
    submenu: true,
    submenuItems: [
      {
        title: "Mis Facturas",
        url: "/dashboard/finanzas/facturas",
      },
    ],
  },
];
