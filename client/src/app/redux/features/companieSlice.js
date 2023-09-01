import { createSlice } from "@reduxjs/toolkit";

const companiesReducer = createSlice({
  name: "companies",
  initialState: {
    companies: [],
  },
  reducers: {
    setAllCompanies: (state, action) => {
      state.companies = action.payload;
    }
  },
});

export const { setAllCompanies } = companiesReducer.actions;
export default companiesReducer.reducer;
