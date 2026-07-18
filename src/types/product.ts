export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
  brand: string;
  stock: number;
  discountPercentage: number;
  description: string;
  tags: string[];
  sku: string;
  images: string[];
  weight: number;
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
}
