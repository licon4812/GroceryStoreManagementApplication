import { Aisle } from "../aisle";
import { Product } from "../product";

export interface CreateProductResponse {
    
}

export interface GetProductResponse {
    product: Product
}

export interface GetProductsResponse {
    products: Product[];
    aisles: Aisle[];
    total: number;
}

export interface UpdateProductResponse {
    
}

export interface DeleteProductResponse {

}

export interface ProductOverview {
    name: string;
    sumProducts: number;
    sumExpiring: number;
    sumPurchased: number;
}

export interface GetInventoryOverviewResponse {
    totalProducts: number;
    totalAisles: number;
    totalExpiring: number;
    totalPurchased: number;
    productOverviews: ProductOverview[]
}

