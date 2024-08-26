import axios from "axios";

export const getProducts = async (pageNumber: number = 1) => {
  const skip = 10 * (Number(pageNumber) - 1);
  const res = await axios.get(
    `https://dummyjson.com/products?limit=10&skip=${skip}`
  );

  return res.data ?? [];
};

export const addProduct = async (data: {
  title: string;
  price: number;
  category: string;
}) => {
  const res = await axios.post("https://dummyjson.com/products/add", data);
  return res.data;
};

export const updateProduct = async (id: number, data: { title: string }) => {
  const res = await axios.put(`https://dummyjson.com/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axios.delete(`https://dummyjson.com/products/${id}`);
  return res.data;
};
