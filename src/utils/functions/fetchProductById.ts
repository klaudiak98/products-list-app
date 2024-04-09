import axios, { AxiosError } from "axios";
import { Product } from "../types/ProductType";
import { ErrorType } from "../types/ErrorType";

export const fetchProductById = async (
  productId: number,
  setProductsList: (products: Product[]) => void,
  setError: (error: ErrorType | null) => void,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://reqres.in/api/products?id=${productId}`
    );
    setProductsList([response.data.data]);
    setError(null);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        setError({
          code: axiosError.response?.status,
          message: "Not Found. Please change your parameters.",
        });
      } else if (axiosError.response?.status === 500) {
        setError({
          code: axiosError.response?.status,
          message: "Internal Server Error",
        });
      }
    } else {
      setError({ code: 500, message: "Unknown error" });
    }
  }
  setLoading(false);
};
