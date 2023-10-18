'use client'
import { BankCard } from "@/app/components/CardBankDashboard"
import { SortableTableAccount } from "@/app/components/Table"
import { useGetBankAccountQuery } from "@/app/redux/services/bankAccountApi";


const testingData = [
  {
    title: "Solicitados",
    quantity: 1,
  },
  {
    title: "Aprobados",
    quantity: 1,
  },
  {
    title: "En revisión",
    quantity: 0,
  },
];


function BankDashboard() {
  const {data: bankAccounts, isLoading} = useGetBankAccountQuery()
  console.log(bankAccounts)
  
  // const createStatus = (bankAccounts) => {

  //     let wApproval = bankAccounts.filter(
  //       (acc) => acc.status === "waiting approval"
  //     );
  //     let openAccont = bankAccounts.filter((acc) => acc.status === "open");
  //     let requireAccount = bankAccounts.filter(
  //       (acc) => acc.status === "require changes"
  //     );
  //     const statusAccounts = [
  //       {
  //         title: "Solicitados",
  //         quantity: wApproval.length,
  //       },
  //       {
  //         title: "Aprobados",
  //         quantity: openAccont.length,
  //       },
  //       {
  //         title: "En revisión",
  //         quantity: requireAccount.length,
  //       },
  //     ];

  //     return statusAccounts
  // };


  //const statusAccounts = setTimeout(createStatus(bankAccounts),2000)
  

  
  return (
    <>
      <div className="flex w-full gap-4 justify-evenly mb-4">
        {isLoading ? <p>Cargando...</p> : 
        testingData.map((item) => (
          <BankCard key={item.title} data={item} />
        ))
        }
      </div>
      <SortableTableAccount  data={bankAccounts} isLoading={isLoading}/>
    </>
  );
}

export default BankDashboard