"use client";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  EyeIcon,
  CheckCircleIcon,
  DocumentMagnifyingGlassIcon,
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
import { filterData } from "../Func/controllers";
import BankModal from "./Modals/BankModal";
import TextModal from "./Modals/TextModal";



const TABS = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Pendientes",
    value: "sent",
  },
  {
    label: "Aprobados",
    value: "accepted",
  },
  {
    label: "Revisión Solicitada",
    value: "declined",
  },
];

const TABLE_HEAD = [
  "Empresa",
  "Producto",
  "Estado",
  "Ultima revisión",
  "Monto",
  "Acciones",
];

export function SortableTableProducts({ data, isLoading }) {
  console.log(data)
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openTextModal, setOpenTextModal] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [modalData, setModalData] = useState(null);
   const handleFilter = (status) => {
     if (status === "all") {
       setFilteredData(data);
       return;
     }
     const filtered = filterData(data, status);
     setFilteredData(filtered);
   };

   const handleOpenModal = (id, company) => {
     setModalData({ id: id, company: company });
     setOpenModal((cur) => !cur);
   };

   const handleOpenTextModal = (id, company) => {
     setModalData({ id: id, company: company });
     setOpenTextModal((cur) => !cur);
   };

  
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
                    Productos Solicitados
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Listado de productos solicitados por las empresas
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  {/* <Button variant="outlined" size="sm">
                    Ver Todos
                  </Button>
                  <div className="w-full md:w-72 rounded-md  border-1 border-gray-300 p-2 flex items-center justify-between">
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
                  <tr className="bg-gray-300">
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 "
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-semibold leading-none opacity-70"
                        >
                          {head}{" "}
                          {index !== TABLE_HEAD.length - 1 && (
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                            />
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map(
                    (
                      {
                        id,
                        bankAccount,
                        productName,
                        //product,
                        //account,
                        status,
                        //date,
                      },
                      index
                    ) => {
                      const isLast = index === data.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr
                          key={id}
                          className={`${
                            status === "accepted"
                              ? "bg-green-200"
                              : status === "declined"
                              ? "bg-red-200"
                              : "bg-gray-50"
                          }`}
                        >
                          <td className={classes}>
                            <div className="flex items-center gap-3 align-middle">
                              <Avatar
                                src={bankAccount.Company.profilePicture}
                                alt={bankAccount.Company.name}
                                size="sm"
                                className="rounded-full"
                              />
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {bankAccount.Company.name}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {productName}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip variant="ghost" size="sm" value={status} />
                            </div>
                          </td>
                          <td className={classes}>
                            {/* <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography> */}
                          </td>
                          <td className={classes}>
                            {/* <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {typeof account === "number"
                          ? `U$S : ${account}`
                          : account}
                      </Typography> */}
                          </td>
                          <td className={classes}>
                            <Tooltip content="Ver Adjuntos">
                              <IconButton variant="text">
                                <DocumentMagnifyingGlassIcon className="h-4 w-4 text-blue-700" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Aprobar solicitud">
                              <IconButton
                                variant="text"
                                onClick={() => {
                                  handleOpenModal(id, bankAccount.Company.name);
                                }}
                                className={`disabled: ${
                                  status === "accepted"
                                    ? "pointer-events-none opacity-50"
                                    : null
                                }`}
                              >
                                <CheckCircleIcon className="h-4 w-4 text-green-700" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Solicitar Revisión">
                              <IconButton
                                variant="text"
                                onClick={() => {
                                  handleOpenTextModal(
                                    id,
                                    bankAccount.Company.name
                                  );
                                }}
                                className={`disabled: ${
                                  status === "accepted" || status === "declined"
                                    ? "pointer-events-none opacity-50"
                                    : null
                                }`}
                              >
                                <EyeIcon className="h-4 w-4 text-red-700" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex flex-col items-center justify-between border-t border-blue-gray-50 p-4">
              {/* <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Página 1 of 10
              </Typography>
              <div className="flex gap-2">
                <Button variant="outlined" size="sm">
                  Anterior
                </Button>
                <Button variant="outlined" size="sm">
                  Siguiente
                </Button>
              </div> */}
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
