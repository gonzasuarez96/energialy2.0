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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getLocalStorage from "../Func/localStorage";
//import UploadthingButton from "./UploadthingButton";





//Toastify module for success message
const displaySuccessMessage = (mensaje) => {
  toast.success(mensaje, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// Toastify module for error messages
const displayFailedMessage = (mensaje) => {
  toast.error(mensaje, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};



export function ProposalModal({open, handleOpen, data}) {

    const [proposal, setProposal] = useState({
      totalAmount: 0,
      projectDuration: "",
      description: "",
      tenderId: "",
      companyId: "",
      // attachments: [],
    });
    const userData = getLocalStorage();
    const [serviceFeePercentage, setServiceFeePercentage] = useState(1);
    const [serviceAmount, setServiceAmount] = useState(0);
    const [receiverAmount, setReceiverAmount] = useState(0);

    // console.log(data)
    // console.log(userData)
    // console.log(proposal)

    const createProposal = async (proposal) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/proposals",
          proposal
        );
        displaySuccessMessage("Propuesta enviada");
        setProposal({
          totalAmount: 0,
          projectDuration: "",
          description: "",
          tenderId: "",
          companyId: "",
        });
        setTimeout(() => {
          handleOpen()
        }, 3000);
      } catch (error) {
        displayFailedMessage(
          "Error al enviar la propuesta, Por favor complete todos los campos"
        );
      }

    };
    const calculateFee = (totalAmount, serviceFeePercentage) => {
      if (
        typeof serviceFeePercentage !== "number" ||
        serviceFeePercentage < 0 ||
        serviceFeePercentage > 100
      ) {
        throw new Error(
          "Service fee percentage must be a number between 0 and 100."
        );
      }
      const serviceAmount = (totalAmount * serviceFeePercentage) / 100;
      const receiverAmount = totalAmount - serviceAmount;
      
      setServiceAmount(serviceAmount);
      setReceiverAmount(receiverAmount);
      return { serviceAmount, receiverAmount };
    
    };
    // const validations = (proposalCompanyId, tenderCompanyId) => {
    //   if(proposalCompanyId === tenderCompanyId) {
    //     displayFailedMessage(
    //       "No puede presentar propuestas a su propia Empresa"
    //     );
    //   }else{
    //     return 
    //   }

    // }

    // const handleSave = async (e) => {
    //   console.log(e)
    //   setProposal(...proposal, { proposalState: "save" });
    //   console.log(proposal);
    // }

    const handleSubmit = async (e) => {
      
        e.preventDefault();
        createProposal(proposal);
    }
  const optionDuration = [
        "Menos de una semana",
        "Menos de un mes",
        "De 1 a 3 meses",
        "De 3 a 6 meses",
        "Más de 6 meses",
      ];
      
      useEffect(() => {
        setProposal({
          ...proposal,
          tenderId: data.id,
          companyId: userData.company.id,
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
              {/* <Typography
                variant="small"
                className="mb-4 text-green-700  text-xs font-bold"
              >
                Puedes guardar tu propuesta antes de enviarla.{" "}
              </Typography> */}
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
                  const amount = parseFloat(e.target.value);
                  setProposal({
                    ...proposal,
                    totalAmount: amount,
                  });
                  calculateFee(amount, 1);
                }}
              />
              <div className="mt-2 flex justify-start gap-5 ml-2">
                <div className="text-xs">
                  <span className="font-bold">(U$S) {serviceAmount}</span>{" "}
                  {"  "}
                  <span className="font-bold text-secondary-600">
                    "Energialy"
                  </span>{" "}
                  ServiceFee ( Fee: {serviceFeePercentage}% )
                </div>
                <div className="text-xs">
                  <span className="font-bold">(U$S) {receiverAmount}</span>{" "}
                  Ingresos que recibirás si tu Propuesta es elegida{" "}
                </div>
              </div>
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
                placeholder="Mensaje a la empresa que contratará tus servicios. Indicá de forma detallada el trabajo que realizarás en esta licitación"
                id="description"
                rows={10}
                cols={70}
                className="border-2 border-gray-300 rounded-md p-2"
                onChange={(e) =>
                  setProposal({ ...proposal, description: e.target.value })
                }
              ></textarea>
            {/* <UploadthingButton/> */}
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex justify-around">
              <Button className="bg-green-700" onClick={handleSubmit}>
                Enviar
              </Button>
              {/* <Button className="bg-green-600" onClick={handleSave}>
                Guardar
              </Button> */}
              <Button className="bg-red-700" onClick={handleOpen}>
                Cancelar
              </Button>
            </div>
          </CardFooter>
        </Card>
        <ToastContainer style={{ marginTop: "100px" }} />
      </Dialog>
    </>
  );
}