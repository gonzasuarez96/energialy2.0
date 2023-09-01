import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "auth",
  initialState: {
    companies: [],
    accessToken: null,
    userData: {},
  },
  reducers: {
    setAllCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserData: (state,action) => {
        state.userData = action.payload;
    }
  },
});

export const { setAllCompanies, setAccessToken, setUserData } = Slice.actions;
export default Slice.reducer;
