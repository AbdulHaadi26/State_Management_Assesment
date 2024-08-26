import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import FilledButton from "./components/buttons/filled.button";
import FluidContainer from "./components/containers/fluid.container";
import { useProducts } from "./components/context/products.provider";
import useProductsHook from "./components/hooks/useProducts.hook";
import ProductItem from "./components/lists/product.list";
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

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.01,
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
      <div className="w-full flex flex-row justify-end px-8 py-10 space-x-2">
        <FilledButton onClick={() => setShowAddProductPopup(true)}>
          Add Product
        </FilledButton>
        <FilledButton onClick={() => setShowCartPopup(true)}>
          Show Cart
        </FilledButton>
      </div>
      {products?.map((product: ProductType) => (
        <ProductItem
          key={product.id}
          product={product}
          onClick={() => setShowUpdateProductPopup(product)}
        />
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
