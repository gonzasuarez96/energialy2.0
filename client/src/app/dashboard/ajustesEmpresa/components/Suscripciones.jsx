// Componente SubscriptionBlocks.js
import React, { useState } from "react";
import Plan from "./Plan";
import {
  displayFailedMessage,
  displaySuccessMessage,
} from "../../../components/Toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubscriptionBlocks = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [error, setError] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleOptionSelected = (optionPlan) => {
    setSelectedPlan(optionPlan);
    console.log(optionPlan);
  };

  const handleSubmit = () => {
    if (!selectedOption || !selectedPlan) {
      setError("Debes seleccionar el plan y la duración.");
      return;
    } else {
      setError("");

      if (selectedPlan === "GRATIS") {
        setError("Usted ya tiene el plan Gratuito.");
      } else if (selectedPlan === "BASE" && selectedOption === "MENSUAL") {
        setError("");
        window.open(
          "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848c5ac783018c5b75641d0088",
          "_blank"
        );
      } else if (selectedPlan === "BASE" && selectedOption === "SEMESTRAL") {
        setError("");
        window.open(
          "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848c5ac790018c5b74aa7b008a",
          "_blank"
        );
      } else if (selectedPlan === "PLUS" && selectedOption === "MENSUAL") {
        setError("");
        window.open(
          "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380847b62931d017b88b8f4931d36",
          "_blank"
        );
      } else if (selectedPlan === "PLUS" && selectedOption === "SEMESTRAL") {
        setError("");
        window.open(
          "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848c5ac783018c5b71ed4c0084",
          "_blank"
        );
      }
    }
  };

  const plansData = [
    {
      name: "GRATIS",
      pricePerMonth: null,
      linkMounth: null,
      pricePerSemester: null,
      linkSemester: null,
      features: [
        "Presencia en el Directorio energético.",
        "Página de Empresa.",
        "Acceso a financiamiento bancario.",
        "Creá Licitaciones ilimitadas sin cargo.",
        "Enviá Invitaciones.",
        "Recibí Propuestas de Proveedores.",
        "Contratá sin cargo.",
        "Servicio de Búsqueda de Proveedores.",
      ],
    },
    {
      name: "BASE",
      pricePerMonth: "19",
      linkMonth: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848c5ac783018c5b75641d0088",
      pricePerSemester: "95",
      linkSemester: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848c5ac790018c5b74aa7b008a",
      features: [
        "Suscripción GRATIS incluída.",
        "Recibí Invitaciones.",
        "Enviá Propuestas a Contratistas.",
        "Abonás Fee (2,5%) por cada Licitación ganada.",
      ],
    },
    {
      name: "PLUS",
      pricePerMonth: "69",
      linkMonth: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380847b62931d017b88b8f4931d36",
      pricePerSemester: "345",
      linkSemester: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848c5ac783018c5b71ed4c0084",
      features: [
        "Suscripción BASE incluída.",
        "Creá Licitaciones Privadas.",
        "Abonás Fee (1%) por cada Licitación ganada.",
      ],
    },
  ];

  return (
    <div className="text-primary-500">
      <div className="flex m-2 p-2 gap-4">
        <div className="w-3/5 flex flex-col justify-end">
          <div className="border-2 border-secondary-500 p-2">
            <div className="flex items-center pl-2 font-bold">
              Tu suscripción actual es el plan Gratuito.
            </div>
          </div>
        </div>
        <div className="w-2/5 p-4 text-center bg-bgGris">
          <div className="flex flex-col gap-2">
            <button
              className={`border-2 py-2 ${
                selectedOption === "MENSUAL"
                  ? "bg-secondary-500 text-white"
                  : "hover:bg-[#191654] transition duration-300 hover:text-white"
              }`}
              onClick={() => handleOptionClick("MENSUAL")}
            >
              MENSUAL
            </button>
            <button
              className={`border-2 py-2 ${
                selectedOption === "SEMESTRAL"
                  ? "bg-secondary-500 text-white"
                  : "hover:bg-[#191654] transition duration-300 hover:text-white"
              }`}
              onClick={() => handleOptionClick("SEMESTRAL")}
            >
              SEMESTRAL (1 mes GRATIS )
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex p-2">
          {plansData.map((plan, index) => (
            <Plan
              key={index}
              name={plan.name}
              pricePerMonth={plan.pricePerMonth}
              pricePerSemester={plan.pricePerSemester}
              features={plan.features}
              linkMonth={plan.linkMonth}
              linkSemester={plan.linkSemester}
              handleOptionSelected={handleOptionSelected}
              selectedPlan={selectedPlan}
              selectedOption={selectedOption}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBlocks;
