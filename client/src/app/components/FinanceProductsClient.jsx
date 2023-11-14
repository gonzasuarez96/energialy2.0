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
import PaginationComponent from "./PaginationComponent";

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

const TABLE_HEAD = ["Producto", "Estado", "Ultima modificacion"];

export function SortableTableClient({ data, isLoading }) {
  console.log('data1:',data)
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(null);

  //---- Logica de Paginación ----//
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const financialProductsToShow = filteredData?.slice(startIndex, endIndex);
  const getLastUpdate = (id) => {
    const res = axios.get(`http://localhost:3001/financeProducts/${id}`)
    const update = res.updatedAt
    console.log('update:', update)
    return update;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //---- fin logica de paginación ----//

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredData(data);
      return;
    }
    const filtered = filterData(data, status);
    setFilteredData(filtered);
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
                    Listado de productos solicitados
                  </Typography>
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
                  {filterData.length > 0 ? (
                    financialProductsToShow?.map(
                      ({ id, productName, status }, index) => {
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
                                <Chip
                                  variant="ghost"
                                  size="sm"
                                  value={
                                    status === "accepted"
                                      ? "Aceptado"
                                      : status === "declined"
                                      ? "Rechazado"
                                      : status === "sent"
                                      ? "Pendiente"
                                      : "" // Valor predeterminado si no coincide con ninguno de los estados anteriores
                                  }
                                />
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Chip
                                  variant="ghost"
                                  size="sm"
                                  value={id}
                                />
                              </div>
                            </td>

                          </tr>
                        );
                      }
                    )
                  ) : (
                    <h1>
                      No hay Productos Financieros que coincidan con el filtro
                    </h1>
                  )}
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
        </>
      )}
    </>
  );
}
