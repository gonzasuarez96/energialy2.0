"use client";
import { useEffect } from "react";
import "tw-elements/dist/css/tw-elements.min.css";
//import PaginationComp from "./Pagination";
import { useRouter } from "next/navigation";
// Initialization for ES Users


const CardTender = ({item}) => {
  
  const router = useRouter();
  const tenders = item.tenders
  

    useEffect(() => {
      const init = async () => {
        const { Ripple, initTE } = await import("tw-elements");
        initTE({ Ripple });
      };
      init();
  }, []);
  
  return (
    <>
      {tenders?.map((tender) => (
        <div class="rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:min-w-[1000px] mb-4 flex justify-between">
          <div className="md:min-w-[800px]">
            <h5 class="mb-2 text-xl font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
              {tender.title}
            </h5>
            <p class="mb-4 text-base font-medium text-neutral-600 dark:text-neutral-200">
              {tender.description}
            </p>
            {/* <div className="w-full mb-3 flex justify-start gap-3">
              {item.subcategories.map((sub) => (
                <span class="inline-block whitespace-nowrap rounded-full bg-neutral-200 p-3   text-center align-baseline text-[0.70em] font-bold leading-none text-neutral-600">
                  {sub.name}
                </span>
              ))}
            </div> */}

            <button
              type="button"
              class="inline-block rounded bg-primary-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={() => router.push(`/tenders/${tender.id}`)}
            >
              Ver Licitación
            </button>
          </div>
          <div className="w-full flex flex-col item-center gap-3">
            {tender.showBudget ? (
              <span class="inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                U$S: {tender.budget}
              </span>
            ) : (
              <span class="inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                No disponible
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CardTender;
