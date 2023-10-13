import Link from "next/link";

function Licitaciones() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-3xl font-bold mt-10 mb-5 gap-4">
        <h1 >Todavía no hay licitaciones creadas.</h1>
      <Link href="/dashboard/tenders/createTender" className="text-white">
        <button className="bg-primary-600 rounded-md p-4 text-base">Crear tu primera Licitación</button>
      </Link>
      </div>
    </div>
  );
}

export default Licitaciones