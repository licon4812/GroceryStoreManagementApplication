export interface CreateProductRequest {
    name: string;
    price: number;
    quantity: number;
    expiryDate: Date;
    purchaseDate: Date;
    aisleId: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
    id: string
}

export interface DeleteProductRequest{

}

export interface GetInventoryOverviewRequest {
    expiryDate: Date;
    purchaseDate: Date;
}
