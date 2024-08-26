import { useQuery } from "react-query";
import { getProducts } from "../../services/products.service";

const useProductsHook = (pageNumber: number) => {
  const state = useQuery({
    queryKey: ["products", pageNumber],
    queryFn: () => getProducts(pageNumber),
  });

  return { ...state };
};

export default useProductsHook;
