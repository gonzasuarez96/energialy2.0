import Link from "next/link";

function Licitaciones() {
  return (
    <div>
      <Link href="/dashboard/tenders/createTender" className="text-white">
        <button>Crear Licitación</button>
      </Link>
    </div>
  );
}

export default Licitaciones