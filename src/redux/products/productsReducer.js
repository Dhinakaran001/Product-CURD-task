import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
  fetchSingleProduct,
} from "./productsAction";

const initialState = {
  productsList: [],
  isProductsLoading: false,
  productsError: null,
};

// Create the slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isProductsLoading = true;
        state.productsError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isProductsLoading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.productsError = action.payload || "Failed to fetch products";
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isProductsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.productsList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.productsError = action.payload || "Failed to fetch products";
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isProductsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.productsList = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.productsError = action.payload || "Failed to fetch products";
      })
      .addCase(editProduct.pending, (state) => {
        state.isProductsLoading = true;
        state.productsError = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isProductsLoading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.productsError = action.payload || "Failed to fetch products";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isProductsLoading = true;
        state.productsError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isProductsLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.productsError = action.payload || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
