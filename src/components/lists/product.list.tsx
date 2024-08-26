import { ProductType } from "../../types/types";
import FilledButton from "../buttons/filled.button";
import { useCart } from "../context/cart.provider";

const ProductItem = ({
  product,
  onClick,
}: {
  product: ProductType;
  onClick: () => void;
}) => {
  const { dispatch: cartDispatch } = useCart();

  return (
    <div className="md:w-1/4 w-full md:p-8 p-4">
      <div className="w-full flex flex-col items-center shadow-lg rounded-lg bg-white">
        {product.images?.length > 0 && (
          <img
            src={product.images[0]}
            className="w-full h-[250px] object-cover"
          />
        )}

        <h3 className="text-xs font-medium mt-4 px-4 w-full">
          {product.title}
        </h3>

        <div className="w-full flex flex-row justify-between items-center px-4 mt-4 mb-4">
          <h4 className="text-[10px] font-medium text-gray-600">
            {product.category}
          </h4>
          <h4 className="text-[10px] font-medium">${product.price}</h4>
        </div>

        <div className="w-full flex flex-row px-4 pb-4 space-x-2">
          <FilledButton onClick={() => onClick()}>Edit</FilledButton>
          <FilledButton
            onClick={() => {
              cartDispatch({
                type: "insert",
                payload: [product],
              });
            }}
          >
            Add To Cart
          </FilledButton>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
