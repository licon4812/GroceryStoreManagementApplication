import { Aisle } from "../aisle";

export interface CreateAisleResponse 
{

}

export interface GetAisleResponse 
{
    aisle: Aisle;
}

export interface GetAislesResponse 
{
    aisles: Aisle[];
    total: number;
}

export interface DeleteAisleResponse 
{

}

export interface UpdateAisleResponse {

}
