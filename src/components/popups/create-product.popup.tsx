import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addProduct } from "../../services/products.service";
import { useProducts } from "../context/products.provider";

const CreateProductPopup = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useProducts();

  const [newProduct, setNewProduct] = useState(""),
    [price, setPrice] = useState(0),
    [category, setCategory] = useState("");

  const { mutate: addProductItem } = useMutation({
    mutationFn: () =>
      addProduct({
        title: newProduct,
        price,
        category,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      dispatch({
        type: "add",
        payload: [data],
      });
      onClose();
    },
  });

  return (
    <div className="w-1/2  flex flex-col  bg-white shadow-xl rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-10 px-8 ">
      <h1>Create Product</h1>
      <input
        className="bh-gray-300 mt-4 w-full border border-gray-300 p-2 rounded-lg"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <input
        className="bh-gray-300 mt-4 w-full border border-gray-300 p-2 rounded-lg"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        className="bh-gray-300 mt-4 w-full border border-gray-300 p-2 rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button
        className="mt-4 bg-black text-white rounded-lg px-8 py-2"
        onClick={() => addProductItem()}
      >
        Create
      </button>
    </div>
  );
};

export default CreateProductPopup;
