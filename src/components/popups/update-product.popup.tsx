import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateProduct } from "../../services/products.service";
import { ProductType } from "../../types/types";
import { useProducts } from "../context/products.provider";

const UpdateProductPopup = ({
  onClose,
  product,
}: {
  onClose: () => void;
  product: ProductType;
}) => {
  const queryClient = useQueryClient();
  const { dispatch } = useProducts();

  const [newProduct, setNewProduct] = useState(product.title);

  const { mutate: updateProductItem } = useMutation({
    mutationFn: () =>
      updateProduct(product.id, {
        title: newProduct,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      dispatch({
        type: "update",
        payload: {
          ...product,
          title: newProduct,
        },
      });
      onClose();
    },
  });

  return (
    <div className="w-1/2  flex flex-col  bg-white shadow-xl rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-10 px-8 ">
      <h1>Update Product</h1>
      <input
        className="bh-gray-300 mt-4 w-full border border-gray-300 p-2 rounded-lg"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />

      <button
        className="mt-4 bg-black text-white rounded-lg px-8 py-2"
        onClick={() => updateProductItem()}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateProductPopup;
