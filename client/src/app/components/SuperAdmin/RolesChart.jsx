"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart, Pie, Cell} from 'recharts';
import { useDataProvider, Loading } from 'react-admin';

const COLORS = {
  free: '#0088FE',
  base: '#00C49F',
  plus: '#FFBB28',
};
const UserRolesChart = () => {
  const dataProvider = useDataProvider();
  const [userData, setUserData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [tendersData, setTendersData] = useState([]);
  const [tendersStatusData, setTendersStatusData] = useState([]);
  const [bankAccountsData, setBankAccountsData] = useState([]);
  const [bankAccountsStatusData, setBankAccountsStatusData] = useState([]);
  const [financeProductsData, setFinanceProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await dataProvider.getList('users', {});

        const userRoleCounts = {};
        userData.forEach(user => {
          const role = user.role;
          if (userRoleCounts[role]) {
            userRoleCounts[role]++;
          } else {
            userRoleCounts[role] = 1;
          }
        });
        const userDataWithCount = Object.keys(userRoleCounts).map(role => ({
          role,
          count: userRoleCounts[role]
        }));
        setUserData(userDataWithCount);


        const { data: companyData } = await dataProvider.getList('companies', {});

        const companySubscriptionCounts = {};
        companyData.forEach(company => {
          const subscription = company.subscription;
          if (companySubscriptionCounts[subscription]) {
            companySubscriptionCounts[subscription]++;
          } else {
            companySubscriptionCounts[subscription] = 1;
          }
        });
        const companyDataWithCount = Object.keys(companySubscriptionCounts).map(subscription => ({
          name: subscription,
          value: companySubscriptionCounts[subscription]
        }));
        setCompanyData(companyDataWithCount);


        const { data: tendersData } = await dataProvider.getList('tenders', {});
        const tendersPublicCounts = {};
        tendersData.forEach(tender => {
          const publicStatus = tender.public;
          if (tendersPublicCounts[publicStatus]) {
            tendersPublicCounts[publicStatus]++;
          } else {
            tendersPublicCounts[publicStatus] = 1;
          }
        });
        const tendersDataWithCount = Object.keys(tendersPublicCounts).map(publicStatus => ({
          name: publicStatus,
          value: tendersPublicCounts[publicStatus]
        }));
        setTendersData(tendersDataWithCount);

        const tendersStatusCounts = {};
        tendersData.forEach(tender => {
          const status = tender.status;
          if (tendersStatusCounts[status]) {
            tendersStatusCounts[status]++;
          } else {
            tendersStatusCounts[status] = 1;
          }
        });
        const tendersStatusDataWithCount = Object.keys(tendersStatusCounts).map(status => ({
          name: status,
          value: tendersStatusCounts[status]
        }));
        setTendersStatusData(tendersStatusDataWithCount);



        const { data: bankAccountsData } = await dataProvider.getList('bankAccounts', {});
        const bankAccountsStatusCounts = {};
        bankAccountsData.forEach(account => {
          const status = account.status;
          if (bankAccountsStatusCounts[status]) {
            bankAccountsStatusCounts[status]++;
          } else {
            bankAccountsStatusCounts[status] = 1;
          }
        });
        const bankAccountsDataWithCount = Object.keys(bankAccountsStatusCounts).map(status => ({
          name: status,
          value: bankAccountsStatusCounts[status]
        }));
        setBankAccountsData(bankAccountsDataWithCount);


        const { data: financeProductsData } = await dataProvider.getList('financeProducts', {});
        const productsStatusCounts = {};

        financeProductsData.forEach(product => {
          const productName = product.productName;
          const status = product.status;

          if (!productsStatusCounts[productName]) {
            productsStatusCounts[productName] = {
              'sent': 0,
              'accepted': 0,
              'declined': 0
            };
          }

          productsStatusCounts[productName][status]++;
        });

        const chartData = Object.keys(productsStatusCounts).map(productName => ({
          productName,
          'sent': productsStatusCounts[productName]['sent'],
          'accepted': productsStatusCounts[productName]['accepted'],
          'declined': productsStatusCounts[productName]['declined']
        }));

        setFinanceProductsData(chartData);

        } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dataProvider]);

  if (userData.length === 0 || companyData.length === 0 ) {
    return <Loading />;
  }

  return (
    <div>
      <BarChart width={300} height={300} data={userData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="role" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      <PieChart width={600} height={300}>
      <Pie
    data={companyData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={80}
    fill="#8884d8"
    label
    labelLine={false}
  >
    {companyData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
    ))}
  </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <BarChart width={800} height={400} data={financeProductsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="productName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sent" stackId="a" fill="#8884d8" />
        <Bar dataKey="accepted" stackId="a" fill="#82ca9d" />
        <Bar dataKey="declined" stackId="a" fill="#ffc658" />
      </BarChart>

      <PieChart width={600} height={300}>
      <Pie data={bankAccountsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
        <Tooltip />
        <Legend />
      </PieChart>

      <PieChart width={600} height={300}>
      <Pie data={tendersData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
        <Tooltip />
        <Legend />
      </PieChart>


      <PieChart width={600} height={300}>
      <Pie data={tendersStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
        <Tooltip />
        <Legend />
      </PieChart>

    </div>
  );
};

export default UserRolesChart;