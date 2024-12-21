import axios from 'axios';
import { handleError } from '../helpers/apiHelpers';
import { Product } from '../types/product.types';

const api = import.meta.env.VITE_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${api}products`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const addProduct = async (productData: Product): Promise<Product> => {
  try {
    const response = await axios.post(`${api}products`, productData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const editProduct = async (id: string, productData: Product): Promise<Product> => {
  try {
    const response = await axios.put(`${api}products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${api}products/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};
