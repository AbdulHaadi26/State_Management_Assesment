import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import FilledButton from "./components/buttons/filled.button";
import FluidContainer from "./components/containers/fluid.container";
import { useCart } from "./components/context/cart.provider";
import { useProducts } from "./components/context/products.provider";
import useProductsHook from "./components/hooks/useProducts.hook";
import Loader from "./components/loaders";
import CartPopup from "./components/popups/cart.popup";
import CreateProductPopup from "./components/popups/create-product.popup";
import UpdateProductPopup from "./components/popups/update-product.popup";
import { ProductType } from "./types/types";

function App() {
  const [pageNumber, setPageNumber] = useState(1),
    [maxPage, setMaxPage] = useState(0),
    [showAddProductPopup, setShowAddProductPopup] = useState(false),
    [showUpdateProductPopup, setShowUpdateProductPopup] =
      useState<ProductType | null>(null);

  const [showCartPopup, setShowCartPopup] = useState(false);

  const { products, dispatch } = useProducts();
  const { dispatch: cartDispatch } = useCart();

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
  });

  const { isFetching, data } = useProductsHook(pageNumber);

  useEffect(() => {
    if (data) {
      if (pageNumber === 1) {
        dispatch({
          type: "reset",
          payload: data?.products ?? [],
        });

        setMaxPage(Math.round(data.total / 10));
      } else {
        dispatch({
          type: "insert",
          payload: data?.products ?? [],
        });
      }
    }
  }, [data, pageNumber, dispatch]);

  useEffect(() => {
    if (isIntersecting && pageNumber < maxPage) {
      setPageNumber((prev) => prev + 1);
    }
  }, [isIntersecting]);

  return (
    <FluidContainer className="flex flex-row flex-wrap">
      {showAddProductPopup && (
        <CreateProductPopup onClose={() => setShowAddProductPopup(false)} />
      )}
      {showCartPopup && <CartPopup onClose={() => setShowCartPopup(false)} />}
      {showUpdateProductPopup && (
        <UpdateProductPopup
          onClose={() => setShowUpdateProductPopup(null)}
          product={showUpdateProductPopup}
        />
      )}
      <div className="w-full flex flex-row justify-end px-8 py-10">
        <FilledButton onClick={() => setShowAddProductPopup(true)}>
          Add Product
        </FilledButton>
        <button onClick={() => setShowCartPopup(true)}>Show Cart</button>
      </div>
      {products?.map((product: ProductType) => (
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

            <div className="w-full flex flex-row px-4 pb-4">
              <FilledButton onClick={() => setShowUpdateProductPopup(product)}>
                Edit
              </FilledButton>
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
      ))}
      {isFetching && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div ref={ref} className="w-full h-20 bg-transparent"></div>
    </FluidContainer>
  );
}

export default App;
