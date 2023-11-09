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
      state.filterCompanies = action.payload;
    },
    filterCompaniesByName: (state, action) => {
      state.filterCompanies = state.companies.filter((comp) =>
        comp.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    fiterCompaniesByLocation: (state, action) => {
      if(action.payload.length === 0){
       state.filterCompanies = [...state.companies];
      }else{
        state.filterCompanies = state.companies.filter((comp) =>
          action.payload.every((locId) => comp.locations.some((loc) => loc.id === locId))
        );  
      }
    },
    filterCompaniesByCategorie: (state, action) => {
      state.filterCompanies = state.companies.filter((comp) => comp.categories.some((cat) => cat.id === action.payload))
    },
    filterCompaniesBySubcategorie: (state, action) => {
      state.filterCompanies = state.companies.filter((comp) => comp.subcategories.some((subcat) => subcat.id === action.payload))
    },
    resetFilter: (state) => {
      state.companies = [],
      state.filterCompanies = []
    }
  },
});

export const {
  setAllCompanies,
  filterCompaniesByName,
  fiterCompaniesByLocation,
  filterCompaniesByCategorie,
  filterCompaniesBySubcategorie,
  resetFilter
} = companiesReducer.actions;
export default companiesReducer.reducer;


