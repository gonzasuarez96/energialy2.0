"use client";
import { useEffect } from "react";
import "tw-elements/dist/css/tw-elements.min.css";
import { useRouter } from "next/navigation";
// Initialization for ES Users


const CardProposal = ({item}) => {
  const router = useRouter();

  console.log(item)
  
    useEffect(() => {
      const init = async () => {
        const { Ripple, initTE } = await import("tw-elements");
        initTE({ Ripple });
      };
      init();
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:min-w-[1000px] mb-4 flex justify-between">
      <div className="md:min-w-[800px]">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 p-3 text-center align-baseline text-base font-bold leading-none text-primary-700 mb-3">
              {item.tender.Company.name}
            </span>
          </div>
          <h5 className="mb-2 text-xl font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
            {item.tender.title}
          </h5>
          <p className="mb-4 text-base font-medium text-neutral-600">
            {item.tender.description
              ? item.tender.description
              : "Sin descripción"}
          </p>

          <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-orange-400-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-orange-800">
            {item.tender.majorSector}
          </span>
          {/* <div className="flex gap-3">
            <div className="w-full mb-3 flex justify-start gap-3 mt-1">
              {item.tender.status === "published" ? (
                <span className="inline-block whitespace-nowrap rounded-lg bg-green-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-neutral-200">
                  En evaluación de Propuestas
                </span>
              ) : (
                <span className="inline-block whitespace-nowrap rounded-lg bg-red-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-neutral-300">
                  Cerrada
                </span>
              )}
            </div>
            <div className="w-full mb-3 flex justify-start gap-3 mt-1">
              {item.status === "sent" ? (
                <span className="inline-block whitespace-nowrap rounded-lg bg-green-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-neutral-200">
                  Enviada
                </span>
              ) : (
                <span className="inline-block whitespace-nowrap rounded-lg bg-red-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-neutral-300">
                  Cerrada
                </span>
              )}
            </div>
          </div> */}
        </div>
        <button
          type="button"
          className="inline-block rounded bg-primary-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={() => router.push(`/tenders/${item.tender.id}`)}
        >
          Ver Licitación
        </button>
      </div>
      <div className=" w-full flex justify-around">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-neutral-600">
            Presupuesto Licitación
          </p>
          <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
            U$S: {item.tender.budget}
          </span>
          <p className="text-xs font-medium text-neutral-600">
            Estado Licitación
          </p>
          {item.tender.status === "published" ? (
            <span className="inline-block whitespace-nowrap rounded-lg bg-green-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-neutral-200">
              En evaluación de Propuestas
            </span>
          ) : (
            <span className="inline-block whitespace-nowrap rounded-lg bg-red-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-neutral-300">
              Cerrada
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-neutral-600">
            Presupuesto Propuesta
          </p>
          <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
            U$S: {item.totalAmount}
          </span>

          <p className="text-xs font-medium text-neutral-600">
            Estado Propuesta
          </p>
          {item.status === "sent" ? (
            <span className="inline-block whitespace-nowrap rounded-lg bg-green-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-neutral-200">
              Enviada
            </span>
          ) : item.status === "accepted" ? (
            <span className="inline-block whitespace-nowrap rounded-lg bg-green-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-white">
              Adjudicada
            </span>
          ) : (
            <span className="inline-block whitespace-nowrap rounded-lg bg-red-400 p-2   text-center align-baseline text-[0.80em] font-bold leading-none text-neutral-300">
              Cerrada
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProposal;
