import { Product } from '../types';

import productData from '../../assets/products.json';

export const dataService = {
  getProducts: (): Promise<Array<Product>> => {
    return Promise.resolve(productData);
  },
  getProductById: (id: string): Promise<Product> => {
    const product = productData.find((product: Product): boolean => product.id === id);

    return Promise.resolve(product);
  },
};
