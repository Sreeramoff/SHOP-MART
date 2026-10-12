import axios from "axios";

const BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET PRODUCTS
export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data;
};

// GET CARTS
export const getCarts = async () => {
  const response = await api.get("/carts");

  return response.data;
};

// GET SINGLE PRODUCT
export const getProduct = async (id = 1) => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
};

// SEARCH PRODUCTS
export const searchProducts = async (
  query = "phone"
) => {
  const response = await api.get(
    "/products/search",
    {
      params: {
        q: query,
      },
    }
  );

  return response.data;
};

// SORTED PRODUCTS
export const getSortedProducts = async () => {
  const response = await api.get(
    "/products",
    {
      params: {
        sortBy: "title",
        order: "asc",
      },
    }
  );

  return response.data;
};

// GET CATEGORIES
export const getCategories = async () => {
  const response = await api.get(
    "/products/categories"
  );

  return response.data;
};

// GET CATEGORY LIST
export const getCategoryList = async () => {
  const response = await api.get(
    "/products/category-list"
  );

  return response.data;
};

// GET PRODUCTS BY CATEGORY


export const getProductsByCategory = async (category) => {
  const response = await api.get(
    `/products/category/${category}`
  );

  return response.data;
};



export default api;
