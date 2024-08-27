import { Observable } from "rxjs";
import { CreateProductRequest, GetInventoryOverviewRequest, UpdateProductRequest } from "../models/requests/product-requests";
import { CreateProductResponse, DeleteProductResponse, GetInventoryOverviewResponse, GetProductResponse, GetProductsResponse, UpdateProductResponse } from "../models/responses/product-responses";
import { Product } from "../models/product";

export interface IProductService {
    createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;
    getProduct(id: string): Observable<GetProductResponse>;
    getProducts(): Observable<GetProductsResponse>;
    updateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse>;
    deleteProduct(id: string): Observable<DeleteProductResponse>;
    getProductsByAisleId(aisleId: string): Observable<Product[]>
    getInventoryOverview(request: GetInventoryOverviewRequest): Observable<GetInventoryOverviewResponse>;
}
