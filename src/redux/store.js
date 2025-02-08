import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/productsReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
