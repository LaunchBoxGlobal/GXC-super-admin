import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/user/authApi";
import userReducer from "./slices/userSlice";
import { usersApi } from "../services/users/usersApi";
import { productsApi } from "../services/productsApi/productsApi";
import { ordersApi } from "../services/ordersApi/ordersApi";
import { reportsApi } from "../services/reportsApi/reportsApi";
import { categoriesApi } from "../services/categoriesApi/categoriesApi";
import { transactionHistoryApi } from "../services/transactionHistoryApi/transactionHistoryApi";
import { dashboardApi } from "../services/dashboardApi/dashboardApi";
import { communityApi } from "../services/communityApi/communityApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [transactionHistoryApi.reducerPath]: transactionHistoryApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(productsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(reportsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(transactionHistoryApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(communityApi.middleware),
});

setupListeners(store.dispatch);

export default store;
