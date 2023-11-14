"use client";
import { BankCard } from "@/app/components/CardBankDashboard";
import { SortableTableProducts } from "@/app/components/TableFinanceProducts";
import { useGetFinanceProductsQuery } from "@/app/redux/services/financeProductsApi";
import { useGetBankAccountQuery } from "@/app/redux/services/bankAccountApi";

function FinanceProductsPage() {
  const { data: financeProducts, isLoading } = useGetFinanceProductsQuery();

  return (
    <>
      <div className="flex w-full gap-4 justify-evenly mb-4">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          
          <div className="flex justify-between w-full">
            <BankCard
              data={financeProducts}
              title="Pendientes"
              status="waiting approval"
            />
            <BankCard data={financeProducts} title="Aprobados" status="accepted" />
            <BankCard
              data={financeProducts}
              title="En revisión"
              status="require changes"
            />
          </div>
        )}
      </div>
      <SortableTableProducts data={financeProducts} />
    </>
  );
}

export default FinanceProductsPage;
