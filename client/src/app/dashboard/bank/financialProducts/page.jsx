"use client";
import { BankCard } from "@/app/components/CardBankDashboard";
import { SortableTableProducts } from "@/app/components/TableFinanceProducts";
import { useGetFinanceProductsQuery } from "@/app/redux/services/financeProductsApi";
import { useGetBankAccountQuery } from "@/app/redux/services/bankAccountApi";
import axios from "axios";
import { useState, useEffect } from 'react';
import { urlProduction } from "@/app/data/dataGeneric";

function FinanceProductsPage() {
  const { data: financeProducts, isLoading } = useGetFinanceProductsQuery();
  console.log(financeProducts)
  const [updatedFinanceProducts, setUpdatedFinanceProducts] = useState([]);

  useEffect(() => {
    const fetchCompanyInfo = async (companyId) => {
      try {
        const response = await axios.get(`${urlProduction}/companies/${companyId}`);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error(`Error fetching company info for ${companyId}:`, error);
        return null;
      }
    };

    const updateFinanceProducts = async () => {
      const updatedProducts = await Promise.all(
        financeProducts.map(async (product) => {
          const companyInfo = await fetchCompanyInfo(product.bankAccount.Company.id);
          console.log(product.bankAccount.Company.id)
          console.log(companyInfo)
          if (companyInfo) {
            console.log(companyInfo)
            const userInfo = companyInfo.users[0];
            const legalManagerPhoneNumber = companyInfo.legalManager.phoneNumber;

            return {
              ...product,
              bankAccount: {
                ...product.bankAccount,
                Company: {
                  ...product.bankAccount.Company,
                  users: [userInfo],
                  legalManager: {
                    phoneNumber: legalManagerPhoneNumber,
                  },
                },
              },
            };
          } else {
            return product;
          }
        })
      );

      setUpdatedFinanceProducts(updatedProducts);
      console.log(updatedProducts)
    };

    if (!isLoading) {
      updateFinanceProducts();
    }
  }, [financeProducts, isLoading]);

  return (
    <>
      <div className="flex w-full gap-4 justify-evenly mb-4">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          
          <div className="flex justify-between w-full">
            <BankCard
              data={updatedFinanceProducts}
              title="Pendientes"
              status="sent"
            />
            <BankCard data={updatedFinanceProducts} title="Aprobados" status="accepted" />
            <BankCard
              data={updatedFinanceProducts}
              title="En revisión"
              status="declined"
            />
          </div>
        )}
      </div>
      <SortableTableProducts data={updatedFinanceProducts} />
    </>
  );
}

export default FinanceProductsPage;
