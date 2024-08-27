import { BaseEntity } from "./base-entity";

export interface Product extends BaseEntity{
    name: string;
    price: number;
    quantity: number;
    expiryDate: Date;
    purchaseDate: Date;
    aisleId: string;
    aisleName: string | undefined;
}
