'use client'
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";

const createProposal = async (proposal) => {
  
  const data = await axios.post(
    "http://localhost:3001/proposals",
    proposal
  );
  console.log(data);

}

export function ProposalModal({open, handleOpen, data}) {

    const [proposal, setProposal] = useState({
      totalAmount: 0,
      projectDuration: "",
      description: "",
      tenderId: "",
      companyId: "",
      // attachments: [],
    });

    const handleSubmit = async (e) => {
        console.log(proposal)
        e.preventDefault();
        createProposal(proposal);
        //crear tostify que diga que se ha enviado la propuesta
        //setOpen(false);
        //ver si lo redireccionamos a algun lugar puntual
    }
  const optionDuration = [
        "Menos de una semana",
        "Menos de un mes",
        "De 1 a 3 meses",
        "De 3 a 6 meses",
        "Más de 6 meses",
      ];
    console.log(data)
      useEffect(() => {
        setProposal({
          ...proposal,
          tenderId: data.id,
          companyId: data.company.id,
        });
      },[])
  return (
    <>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[75%] p-4">
          <div className="flex flex-col gap-2 md:flex-row ">
            <div className="md:min-w-[75%]">
              <Typography variant="h4" className="mb-4">
                {data.company.name}
              </Typography>
              <Typography variant="h5" className="mb-4">
                {data.title}
              </Typography>
              <Typography variant="small" className="mb-4">
                Duración del proyecto: {data.projectDuration}
              </Typography>
              <Typography variant="paragraph" className="mb-1">
                Completa todos los campos para presentar tu propuesta. <br />
                <span className="text-red-500 text-xs font-bold">
                  Una vez enviada, no podrá ser modificada
                </span>
              </Typography>
              <Typography
                variant="small"
                className="mb-4 text-green-700  text-xs font-bold"
              >
                Puedes guardar tu propuesta antes de enviarla.{" "}
              </Typography>
            </div>
            <div className="flex flex-col gap-4">
              <span class="inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                U$S: {data.budget}
              </span>
              <span
                class={`${
                  data.location.id === "e8bbe98e-a725-44bb-b7d8-990013794f5c"
                    ? "bg-success-100 text-success-700"
                    : data.location.id ===
                      "9a83f3bb-0472-4e7e-bb67-9c8bdf996cd3"
                    ? "bg-danger-500 text-danger-700"
                    : "bg-info-800 text-info-700"
                } inline-block whitespace-nowrap rounded-[0.27rem]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none `}
              >
                {data.location.name}
              </span>
              <span class="inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                {data.majorSector}
              </span>
            </div>
          </div>
          <CardBody className="flex flex-col gap-3">
            <div>
              <label htmlFor="">Ingrese el monto de su propuesta:</label>
              <Input
                type="number"
                size="lg"
                placeholder="U$S"
                name="totalAmount"
                className="border-1 mt-1"
                onChange={(e) => {
                  const amount = parseFloat(e.target.value)
                  setProposal({
                    ...proposal,
                    totalAmount: amount,
                  });
                }
                  
                }
              />
              <div>Acá se tiene que mostrar la cuenta de la comisión</div>
            </div>
            <label htmlFor="">Duración:</label>
            <Select
              defaultInputValue={"TIEMPO DE EJECUCIÓN DE LA LICITACION"}
              options={optionDuration?.map((duration) => ({
                value: duration,
                label: duration,
              }))}
              onChange={(e) =>
                setProposal({ ...proposal, projectDuration: e.value })
              }
            />
            <div className="flex flex-col gap-3">
              <label htmlFor="">Descripción del Trabajo</label>
              <textarea
                name="description"
                id="description"
                rows={10}
                cols={70}
                className="border-2 border-gray-300 rounded-md p-2"
                onChange={(e) =>
                  setProposal({ ...proposal, description: e.target.value })
                }
              ></textarea>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex justify-around">
              <Button className="bg-green-700" onClick={handleSubmit}>
                Enviar
              </Button>
              <Button className="bg-green-600">Guardar</Button>
              <Button className="bg-red-700" onClick={handleOpen}>
                Cancelar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}