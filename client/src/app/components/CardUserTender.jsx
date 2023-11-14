'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";


function CardUserTender({item}) {
    console.log(item)
    const totalProposal = item.proposals.length;
    console.log(totalProposal)
   const id = item.id
   const router = useRouter()
  return (
    <div className="rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:min-w-[1000px] mb-4 flex justify-between text-sm">
      <div className="md:min-w-[800px]">
        <h5 className="mb-2 text-xl font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
          {item.title}
        </h5>
        <div className="w-full mb-3 flex justify-start gap-3">
          {item.subcategories.map((sub) => (
            <span className="inline-block whitespace-nowrap rounded-full bg-neutral-200 py-1 px-2   text-center align-baseline text-[0.70em] font-bold leading-none text-neutral-600">
              {sub.name}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="inline-block rounded bg-primary-800 px-3 py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={() => router.push(`/tenders/${item.id}`)}
        >
          Ver Licitación
        </button>
      </div>
      <div className="w-full flex flex-col item-center gap-3">
        <span class="inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
          Monto: U$S {item.budget}
        </span>

        <span
          className={`${
            item.location.id === "e8bbe98e-a725-44bb-b7d8-990013794f5c"
              ? "bg-success-100 text-success-700"
              : item.location.id === "9a83f3bb-0472-4e7e-bb67-9c8bdf996cd3"
              ? "bg-danger-500 text-danger-700"
              : "bg-info-800 text-info-700"
          } inline-block whitespace-nowrap rounded-[0.27rem]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none `}
        >
          Lugar: {item.location.name}
        </span>
        <span class="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-500 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-200">
          Vence: {item.validityDate}
        </span>
        <div className="flex flex-col items-center gap-2">
          <p>Total de Propuestas</p>
          <Link href={`tenders/tenderProposals/${id}`} className="text-white">
            <div
              className={`${
                totalProposal > 0 ? "border-green-500" : "border-red-500"
              } border-3  w-16 h-16 rounded-full flex justify-center items-center cursor-pointer`}
            >
              <span className={`${totalProposal > 0 ? "text-green-500" : "text-red-500"}  font-semibold`}>
                {totalProposal > 0 ? totalProposal : "0"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardUserTender