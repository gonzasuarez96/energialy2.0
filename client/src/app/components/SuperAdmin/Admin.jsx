"use client"

import { Admin, Resource, ListGuesser, EditGuesser, CreateGuesser} from "react-admin";
import dataProvider from "./ApiProviderUsers";
import UserRolesChart from "./RolesChart";
import CustomLayout from './CustomLayout';
import RegisterUser from '../Register'; 
import RegisterCompany from '../RegisterCompany'


const AdminApp = () => {
  console.log("AdminApp renderizado");
 
  return (
    <div className="admin-app-container">
    <Admin dataProvider={dataProvider} layout={CustomLayout}>
      <Resource name="Dashboard" list={UserRolesChart} />
      <Resource name="users" list={ListGuesser} edit={EditGuesser} create={RegisterUser} recordRepresentation="name" />
      <Resource name="companies" list={ListGuesser}  edit={EditGuesser} create={RegisterCompany} />
      <Resource name="tenders" list={ListGuesser} edit={EditGuesser} />
      <Resource name="financeProducts" list={ListGuesser} edit={EditGuesser} />
      <Resource name="bankAccounts" list={ListGuesser} edit={EditGuesser} />
      <Resource name="categories" list={ListGuesser} edit={EditGuesser} />
      <Resource name="subcategories" list={ListGuesser} edit={EditGuesser} />
      <Resource name="locations" list={ListGuesser} edit={EditGuesser} />
      <Resource name="proposals" list={ListGuesser} edit={EditGuesser} />
      <Resource name="documents" list={ListGuesser} edit={EditGuesser} />

    </Admin>
    </div>
  );
};

export default AdminApp;


