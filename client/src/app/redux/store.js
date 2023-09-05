import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import companieReducer from "./features/companieSlice";
import { locationApi } from "./services/locationApi";
import { companiesApi } from "./services/companiesApi";
import { categoriesApi } from "./services/categoriesApi";


const store = configureStore({
  reducer: {
    user: userReducer,
    company: companieReducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      locationApi.middleware,
      companiesApi.middleware,
      categoriesApi.middleware
    ),
});

export default store