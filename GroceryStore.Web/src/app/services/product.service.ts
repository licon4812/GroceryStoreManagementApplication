import { Injectable, signal } from '@angular/core';
import { IProductService } from '../interfaces/product-service.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { CreateProductRequest, GetInventoryOverviewRequest, UpdateProductRequest } from '../models/requests/product-requests';
import { CreateProductResponse, GetProductResponse, GetProductsResponse, UpdateProductResponse, DeleteProductResponse, GetInventoryOverviewResponse } from '../models/responses/product-responses';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { AisleService } from './aisle.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService implements IProductService{
    private apiUrl = `${environment.apiUrl}/products`

    private productsSignal = signal<Product[] | undefined>(undefined)

    private today: Date = new Date();
    private oneWeekAgo: Date = new Date();
    private oneWeekAhead: Date = new Date();

    constructor(private http: HttpClient, private aisleService: AisleService) { 
        this.oneWeekAgo.setDate(this.today.getDate() - 7)
        this.oneWeekAhead.setDate(this.today.getDate() + 7)
    }

    createProduct(request: CreateProductRequest): Observable<CreateProductResponse> {
        return this.http.post<CreateProductResponse>(`${this.apiUrl}/create`, request);
    }

    getProduct(id: string): Observable<GetProductResponse> {
        return this.http.get<GetProductResponse>(`${this.apiUrl}/${id}`);
    }

    getProducts(): Observable<GetProductsResponse> {
        // Note: Caching and joins in the back end were considered, but not implemented due to project scope.
        // For demo purposes, joining is handled on the front end, which is acknowledges as less efficient.
        // Further optimization could invvolve implementing joining in the back end/db, and caching/cache
        // busting in the front end.
        return forkJoin({
            aisles: this.aisleService.getAisles(),
            products: this.http.get<GetProductsResponse>(`${this.apiUrl}`)
        }).pipe(
            map(({aisles: aisleResponse, products: productResponse}) => {
                const aisleMap = new Map<string, string>();

                aisleResponse.aisles.forEach(aisle => {
                    aisleMap.set(aisle.id, aisle.name);
                });

                const products = productResponse.products.map(product => {
                    product.aisleName = aisleMap.get(product.aisleId) || 'Unknown';
                    product.createdOn = new Date(product.createdOn);
                    product.purchaseDate = new Date(product.purchaseDate);
                    product.expiryDate = new Date(product.expiryDate);
                    if (product.modifiedOn) {
                        product.modifiedOn = new Date(product.modifiedOn);
                    }
                    return product;
                });

                this.productsSignal.set(products);
                return productResponse;
            })
        );
    }

    getProductsByAisleId(aisleId: string): Observable<Product[]> {
        return this.getProducts().pipe(
            map(response => response.products.filter(product => aisleId === product.aisleId))
        );
    }
    
    updateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse> {
        return this.http.put<UpdateProductResponse>(`${this.apiUrl}/update`, request)
    }

    deleteProduct(id: string): Observable<DeleteProductResponse> {
        return this.http.delete<DeleteProductResponse>(`${this.apiUrl}/delete/${id}`)
    }

    getInventoryOverview(request: GetInventoryOverviewRequest): Observable<GetInventoryOverviewResponse> {
        const params = new HttpParams()
        .set('purchaseDate', request.purchaseDate.toISOString())
        .set('expiryDate', request.expiryDate.toISOString());

        return this.http.get<GetInventoryOverviewResponse>(`${this.apiUrl}/overview`, {params});
    }
}
