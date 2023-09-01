import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import companieReducer from "./features/companieSlice";
import { locationApi } from "./services/locationApi";


const store = configureStore({
  reducer: {
    user: userReducer,
    company: companieReducer,
    [locationApi.reducerPath]: locationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(locationApi.middleware),
});

export default store