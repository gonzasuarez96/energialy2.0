"use client";
import { BankCardClient } from "@/app/components/CardBankClient";
import { SortableTableClient } from "@/app/components/FinanceProductsClient";
// import { financeProducts } from "@/app/dashboard/bank/financialProducts/data";
import { useGetBankAccountByIdQuery } from "@/app/redux/services/bankAccountApi";
import { useGetCompaniesByIdQuery } from "@/app/redux/services/companiesApi";
import getLocalStorage from "@/app/Func/localStorage";
import { useState, useEffect } from "react";

function BankDashboard() {
  const { company } = getLocalStorage();
  const [bankAccountId, setbankAccountId] = useState(null);
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
  } = useGetCompaniesByIdQuery(company.id);
  console.log(company.id)


  const {
    data: bankAccount,
    error,
    isLoading,
  } = useGetBankAccountByIdQuery(companyData?.bankAccount.id);
  console.log(bankAccount)

  useEffect(() => {
    if (bankAccount) {
      const products = bankAccount.financeProducts;
      setFinanceProducts(products);

      const updatedGroupedData = products.reduce(
        (acc, item) => {
          if (item.status === "accepted") {
            acc[0].quantity++;
          } else if (item.status === "sent") {
            acc[1].quantity++;
          } else if (item.status === "declined") {
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
    return <div>Error: {error.message}</div>;
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
