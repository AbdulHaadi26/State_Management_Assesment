import { createContext, useContext, useReducer } from "react";
import { CartProviderType, ProductType } from "../../types/types";

const ProviderContext = createContext<CartProviderType | null>(null);

function cartsReducer(
  state: ProductType[],
  action: {
    type: string;
    payload: ProductType[];
  }
) {
  switch (action.type) {
    case "insert":
      return action.payload.concat(state);
    case "delete":
      return state.filter(
        (item: ProductType) => item.id !== action.payload[0].id
      );
    default:
      return state;
  }
}

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartsReducer, []);

  return (
    <ProviderContext.Provider value={{ cart, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export default CartProvider;
