import axios, { AxiosError } from "axios";
import { Product } from "./productType";
import { ErrorType } from "./ErrorType";
import { ROWS_PER_PAGE } from "../data/tableData";

export const fetchProductsByPage = async (
    page: number,
    setProductsList: (products: Product[]) => void,
    setError: (error: ErrorType | null) => void,
    setLoading: (loading: boolean) => void
) => {
    setLoading(true);
    try {
        const response = await axios.get(
        `https://reqres.in/api/products?per_page=${ROWS_PER_PAGE}&page=${
            page + 1
        }`
        );
        setProductsList(response.data.data);
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
