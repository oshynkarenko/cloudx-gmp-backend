import {ProductData} from "../types";

export const validationService = {
  isValidProduct: (product: ProductData) => {
    return product && product.title && product.description && product.price;
  }
};
