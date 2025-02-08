import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../api/api";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.get(url, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching product");
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching product");
    }
  }
);

// Edit (update) a product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${product.id}`, product.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching product");
    }
  }
);
