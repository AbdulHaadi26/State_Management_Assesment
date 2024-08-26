type ProductType = {
  id: number;
  title: string;
  price: string;
  category: string;
  images: string[];
};

type CartProviderType = {
  cart: ProductType[];
  dispatch: any;
};

type ProductProviderType = {
  products: ProductType[];
  dispatch: any;
};

export type { CartProviderType, ProductProviderType, ProductType };
