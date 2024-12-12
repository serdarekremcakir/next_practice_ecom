export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
  }
  
  export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
  }
  
  export interface FilterParams {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
    search?: string;
    page?: number;
    limit?: number;
  }