import { Observable } from "rxjs";
import { CreateAisleRequest, UpdateAisleRequest } from "../models/requests/aisle-requests";
import { DeleteAisleResponse, GetAisleResponse, GetAislesResponse, UpdateAisleResponse } from "../models/responses/aisle-responses";

export interface IAisleService {
    getAisles(): Observable<GetAislesResponse>;
    getAisleById(id: string): Observable<GetAisleResponse>;
    createAisle(request: CreateAisleRequest): Observable<GetAisleResponse>;
    updateAisle(request: UpdateAisleRequest): Observable<UpdateAisleResponse>;
    deleteAisle(id: string): Observable<DeleteAisleResponse>;
}
