import { createSlice } from "@reduxjs/toolkit";

const companiesReducer = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    filterCompanies: [],
  },
  reducers: {
    setAllCompanies: (state, action) => {
      state.companies = action.payload;
    },
    filterCompaniesByName: (state, action) => {
      state.filterCompanies = state.companies.filter((comp) =>
        comp.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    fiterCompaniesByLocation: (state, action) => {
        // state.filterCompanies = state.companies.locations?.filter((location) =>
        // action.payload.includes(location.id)
        state.filterCompanies = action.payload
        ;
    }
  },
});

export const { setAllCompanies, filterCompaniesByName, fiterCompaniesByLocation } =
  companiesReducer.actions;
export default companiesReducer.reducer;
