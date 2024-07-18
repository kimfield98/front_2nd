import { useState } from 'react';
import { Product } from '../../types.ts';
import { addProductToList, updateProductInList } from './utils/cartUtils.ts';

export const useProductsData = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => addProductToList(prevProducts, newProduct));
  };
  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      updateProductInList(prevProducts, updatedProduct)
    );
  };
  return { products, updateProduct, addProduct };
};
