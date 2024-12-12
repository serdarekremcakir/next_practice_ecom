export interface Product {
  id: string;
  name: string;
  description: string;
  price: number ;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'undefined';

export interface FilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  search?: string;
  page?: number;
  limit?: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  productName?: string;  
  productImage?: string; 
  userName?: string;     
  userImage?: string;    
}

export interface ProductWithReviews extends Product {
  reviews: Review[];
}