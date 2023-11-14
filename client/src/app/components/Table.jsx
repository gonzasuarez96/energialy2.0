"use client";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  EyeIcon,
  CheckCircleIcon,
  DocumentMagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AttachmentsModal } from "./AttachmentsModal";
import { filterData } from "../Func/controllers";
import axios from "axios";
import { useRouter } from "next/navigation";
import BankModal from "./Modals/BankModal";
import TextModal from "./Modals/TextModal";
import PaginationComponent from "./PaginationComponent";



const TABS = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Pendientes",
    value: "waiting approval",
  },
  {
    label: "Aprobados",
    value: "open",
  },
  {
    label: "Revisión Solicitada",
    value: "require changes",
  },
];


export function SortableTableAccount({data, isLoading}) {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openTextModal, setOpenTextModal] = useState(false);
  const [idAttachments, setIdAttachments] = useState('')
  const [filteredData, setFilteredData] = useState(null)
  const [modalData, setModalData] = useState(null)
  
  //---- Logica de Paginación ----//

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filterData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const banckAccountToShow = filteredData?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //---- fin logica de paginación ----//

  
  
  const handleFilter = (status) => {
      if(status === 'all') {
        setFilteredData(data)
        return
      }
      const filtered = filterData(data, status)
      setFilteredData(filtered)
  }
  

  const handleOpen = (id) => {
    setIdAttachments(id)
    setOpen((cur) => !cur)
  }; 

  const handleOpenModal = (id, company) => {
    setModalData({id: id, company: company})
    setOpenModal((cur) => !cur)
  }

  const handleOpenTextModal = (id, company) => {
    setModalData({ id: id, company: company });
    setOpenTextModal((cur) => !cur);
  };

  useEffect(()=> {
    setFilteredData(data)
  }, [])



  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Card className="h-full w-full p-2">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Aperturas de Cuentas
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Listado de Cuentas
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  {/* <Button variant="outlined" size="sm">
                    Ver Todos
                  </Button> */}
                  {/* <div className="w-full md:w-72 rounded-md  border-1 border-gray-300 p-2 flex items-center justify-between">
                    <input
                      className="focus:border-none"
                      label="Search"
                      placeholder="Buscar..."
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div> */}
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:w-full">
                <Tabs value="all" className="md:w-full">
                  <TabsHeader className="w-full">
                    {TABS.map(({ label, value }) => (
                      <Tab
                        key={value}
                        value={value}
                        className="w-full cursor-pointer"
                        onClick={() => handleFilter(value)}
                      >
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3">Empresa</th>
                    <th className="py-2 px-3">Tipo de Cuenta</th>
                    <th className="py-2 px-3">Estado</th>
                    <th className="py-2 px-3">Acciones</th>
                    <th className="py-2 px-3">Mensajes</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData.length > 0 ? (
                    banckAccountToShow?.map(
                      ({ id, company, status, statusMessage }, index) => {
                        const isLast = index === data.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr
                            key={company.name}
                            className={`${
                              status === "open"
                                ? "bg-green-200"
                                : status === "require changes"
                                ? "bg-red-200"
                                : "bg-gray-50"
                            }`}
                          >
                            <td className={classes}>
                              <div className="flex items-center gap-3 align-middle">
                                <Avatar
                                  src={company.profilePicture}
                                  alt={company.name}
                                  size="sm"
                                />
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {company.name}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  Cuenta Empresa
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Chip
                                  variant="ghost"
                                  size="sm"
                                  value={
                                    status === "open"
                                      ? "Abierta"
                                      : status === "waiting approval"
                                      ? "Pendiente"
                                      : "En Revisión"
                                  }
                                />
                              </div>
                            </td>

                            <td className={classes}>
                              <Tooltip content="Ver Adjuntos">
                                <IconButton
                                  variant="text"
                                  onClick={() => handleOpen(id)}
                                >
                                  <DocumentMagnifyingGlassIcon className="h-4 w-4 text-blue-700" />
                                </IconButton>
                              </Tooltip>
                              {/*crear handler para realizar put a /account modificando el state */}
                              <Tooltip content="Aprobar solicitud">
                                <IconButton
                                  variant="text"
                                  onClick={() => {
                                    handleOpenModal(id, company.name);
                                    //handleChangeStatus(id, { status: "open" });
                                  }}
                                  className={`disabled: ${
                                    status === "open"
                                      ? "pointer-events-none opacity-50"
                                      : null
                                  }`}
                                >
                                  <CheckCircleIcon className="h-4 w-4 text-green-700" />
                                </IconButton>
                              </Tooltip>
                              {/*crear handler para realizar put a /account modificando el state */}
                              <Tooltip content="Solicitar Revisión">
                                <IconButton
                                  variant="text"
                                  onClick={() => {
                                    handleOpenTextModal(id, company.name);
                                    // handleChangeStatus(id, {
                                    //   status: "require changes",
                                    // });
                                  }}
                                  className={`disabled: ${
                                    status === "open" ||
                                    status === "require changes"
                                      ? "pointer-events-none opacity-50"
                                      : null
                                  }`}
                                >
                                  <EyeIcon className="h-4 w-4 text-red-700" />
                                </IconButton>
                              </Tooltip>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {statusMessage
                                    ? statusMessage
                                    : "Sin Mensajes"}
                                </Typography>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <h1>
                      No hay Cuentas Bancarias que coincidan con el filtro
                    </h1>
                  )}
                  {}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex flex-col items-center justify-between border-t border-blue-gray-50 p-4">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </CardFooter>
          </Card>
          {open && (
            <AttachmentsModal
              open={open}
              handleOpen={handleOpen}
              data={idAttachments}
            />
          )}
          {openModal && (
            <BankModal
              open={openModal}
              handleOpen={handleOpenModal}
              status="open"
              id={modalData?.id}
              company={modalData?.company}
            />
          )}
          {openTextModal && (
            <TextModal
              open={openTextModal}
              handleOpen={handleOpenTextModal}
              status="require changes"
              id={modalData?.id}
              company={modalData?.company}
            />
          )}
        </>
      )}
    </>
  );  
}
