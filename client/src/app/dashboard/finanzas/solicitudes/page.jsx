"use client";
import { BankCardClient } from "@/app/components/CardBankClient";
import { SortableTableClient } from "@/app/components/FinanceProductsClient";
// import { financeProducts } from "@/app/dashboard/bank/financialProducts/data";
import { useGetBankAccountByIdQuery } from "@/app/redux/services/bankAccountApi";
import { useGetCompaniesByIdQuery } from "@/app/redux/services/companiesApi";
import getLocalStorage from "@/app/Func/localStorage";
import { useState, useEffect } from "react";

function BankDashboard() {
  const user = getLocalStorage();
  const [financeProducts, setFinanceProducts] = useState([]);

  const [groupedData, setGroupedData] = useState([
    { title: "Aprobados", quantity: 0, status: "accepted" },
    { title: "Solicitados", quantity: 0, status: "sent" },
    { title: "Rechazados", quantity: 0, status: "declined" },
  ]);

  const {
    data: companyData,
    error: companyError,
    isLoading: companyLoading,
  } = useGetCompaniesByIdQuery(user?.company?.id);



  const {
    data: bankAccount,
    error,
    isLoading,
  } = useGetBankAccountByIdQuery(companyData?.bankAccount?.id);
  console.log(bankAccount)

  useEffect(() => {
    if (bankAccount) {
      const products = bankAccount.financeProducts;
      const updatedFinanceProducts = [
        ...products,
        {
          productName: 'Apertura de Cuenta',
          status: bankAccount.status,
          updatedAt: bankAccount.updatedAt,
        },
      ];
      setFinanceProducts(updatedFinanceProducts);

      const updatedGroupedData = updatedFinanceProducts.reduce(
        (acc, item) => {
          if (item.status === "accepted" || item.status === "open") {
            acc[0].quantity++;
          } else if (item.status === "sent" || item.status === "waiting approval") {
            acc[1].quantity++;
          } else if (item.status === "declined" || item.status === "require changes") {
            acc[2].quantity++;
          }
          return acc;
        },
        [...groupedData]
      );

      setGroupedData(updatedGroupedData);
    }
  }, [bankAccount]);



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No tienes solicitudes</div>;
  }

  return (
    <>
      <div className="flex w-full gap-4 justify-evenly mb-4">
        {groupedData.map((item) => (
          <BankCardClient
            key={item.title}
            data={item}
          />
        ))}
      </div>
      <SortableTableClient
        data={financeProducts}
        isLoading={isLoading}
      />
    </>
  );
}

export default BankDashboard;
