'use client'
import { BankCard } from "@/app/components/CardBankDashboard"
import { SortableTableAccount } from "@/app/components/Table"
import { useGetBankAccountQuery } from "@/app/redux/services/bankAccountApi";
import axios from "axios";
import { urlProduction } from "@/app/data/dataGeneric";
import { useEffect, useState } from 'react';


function BankDashboard() {
  const {data: bankAccounts, isLoading} = useGetBankAccountQuery()
  console.log(bankAccounts)
  const [updatedBankAccounts, setUpdatedBankAccounts] = useState([]);

  useEffect(() => {
    const getCompanyInfo = async (companyId) => {
      const response = await axios.get(`${urlProduction}/companies/${companyId}`);
      return response.data;
    }

    const updateBankAccounts = async () => {
      const updatedAccounts = await Promise.all(
        bankAccounts.map(async (account) => {
          const companyInfo = await getCompanyInfo(account.company.id);
          const userInfo = companyInfo.users[0];
          const legalManagerPhoneNumber = companyInfo.legalManager.phoneNumber;

          return {
            ...account,
            company: {
              ...account.company,
              users: [userInfo],
              legalManager: {
                phoneNumber: legalManagerPhoneNumber,
              },
            },
          };
        })
      );

      setUpdatedBankAccounts(updatedAccounts);
      console.log('Updated Bank Accounts:', updatedAccounts);
    }

    if (!isLoading) {
      updateBankAccounts();
    }
  }, [bankAccounts, isLoading]);

  return (
    <>
      <div className="flex w-full gap-4 justify-evenly mb-4">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="flex justify-between w-full">
            <BankCard
              data={updatedBankAccounts}
              title="Pendientes"
              status="waiting approval"
            />
            <BankCard data={updatedBankAccounts} title="Abiertas" status="open" />
            <BankCard
              data={updatedBankAccounts}
              title="En revisión"
              status="require changes"
            />
          </div>
        )}
      </div>
      <SortableTableAccount data={updatedBankAccounts} isLoading={isLoading} />
    </>
  );
}

export default BankDashboard