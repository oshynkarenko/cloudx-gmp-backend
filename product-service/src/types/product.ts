export interface ProductData {
  description: string;
  id: string;
  price: number;
  title: string;
}

export interface CreateProductData {
  product: {
    description: string;
    price: number;
    title: string;
  }
}

export interface StockData {
  product_id: string;
  count: number;
}

export type Stock = { count: number };

export type Product = ProductData & Stock;

export type ProductList = Array<Product>;

export type Message = string;
