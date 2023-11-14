'use client'
import { BankCard } from "@/app/components/CardBankDashboard"
import { SortableTableAccount } from "@/app/components/Table"
import { useGetBankAccountQuery } from "@/app/redux/services/bankAccountApi";


function BankDashboard() {
  const {data: bankAccounts, isLoading} = useGetBankAccountQuery()

  return (
    <>
      <div className="flex w-full gap-4 justify-evenly mb-4">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="flex justify-between w-full">
            <BankCard
              data={bankAccounts}
              title="Pendientes"
              status="waiting approval"
            />
            <BankCard data={bankAccounts} title="Abiertas" status="open" />
            <BankCard
              data={bankAccounts}
              title="En revisión"
              status="require changes"
            />
          </div>
        )}
      </div>
      <SortableTableAccount data={bankAccounts} isLoading={isLoading} />
    </>
  );
}

export default BankDashboard