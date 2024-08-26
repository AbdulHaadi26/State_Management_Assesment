import { createContext, useContext, useReducer } from "react";
import { ProductProviderType, ProductType } from "../../types/types";

const ProviderContext = createContext<ProductProviderType | null>(null);

function productsReucer(
  state: ProductType[],
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case "reset":
      return action.payload;
    case "add":
      return action.payload.concat(state);
    case "insert":
      return state.concat(action.payload);
    case "update":
      return state.map((item: ProductType) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    case "delete":
      return state.filter((item: ProductType) => item.id !== action.payload);
    default:
      return state;
  }
}

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, dispatch] = useReducer(productsReucer, []);

  return (
    <ProviderContext.Provider value={{ products, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export default ProductsProvider;
