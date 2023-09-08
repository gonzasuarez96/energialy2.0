import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userData: {
      email: '',
      login: false
    },
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserData: (state,action) => {
        state.userData = action.payload;
    }
  },
});

export const { setAllCompanies, setAccessToken, setUserData } = userReducer.actions;
export default userReducer.reducer ;
