import { ProductType } from "../../types/types";
import { useCart } from "../context/cart.provider";

const CartPopup = ({ onClose }: { onClose: () => void }) => {
  const { cart, dispatch } = useCart();

  let totalPrice = 0;

  if (cart?.length > 0) {
    cart.forEach((i) => (totalPrice += Number(i.price)));
  }

  return (
    <div className="w-1/2 flex flex-col  bg-white shadow-xl rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-10 px-8 ">
      <h1 className="text-2xl mb-4">Cart</h1>
      {cart.length > 0 &&
        cart.map((item: ProductType) => {
          return (
            <div className="w-full flex flex-row mb-4 items-center">
              <h1 className="w-1/3">{item.title}</h1>
              <h2 className="w-1/3">${item.price}</h2>
              <button
                onClick={() => {
                  dispatch({
                    type: "delete",
                    payload: item.id,
                  });
                }}
                className="bg-black px-8 py-2 h-auto text-white"
              >
                Delete
              </button>
            </div>
          );
        })}

      <button
        className="mt-4 bg-black text-white rounded-lg px-8 py-2"
        onClick={() => {
          alert("Your payment is succesful");
          onClose();
        }}
      >
        Pay ${totalPrice}
      </button>
    </div>
  );
};

export default CartPopup;
