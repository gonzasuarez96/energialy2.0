import { BankCard } from "@/app/components/CardBankDashboard"

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
    </>
  );
}

export default BankDashboard