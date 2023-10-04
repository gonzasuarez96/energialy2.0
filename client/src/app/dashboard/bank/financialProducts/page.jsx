import { BankCard } from "@/app/components/CardBankDashboard"
import { SortableTable } from "@/app/components/Table"

const testingData = [
  {
    title: "Solicitados",
    quantity: 5,
  },
  {
    title: "Aprobados",
    quantity: 15,
  },
  {
    title: "En revisión",
    quantity: 4,
  },
];


function BankDashboard() {
  return (
    <>
      <div className="flex w-full gap-4 justify-evenly mb-4">
        {testingData.map((item) => (
            <BankCard key={item.title} data={item} />
        ))}
      </div>
      <SortableTable />
    </>
  );
}

export default BankDashboard