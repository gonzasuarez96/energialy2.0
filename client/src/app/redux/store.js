import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import companieReducer from "./features/companieSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    company: companieReducer,
  },
});

export default store