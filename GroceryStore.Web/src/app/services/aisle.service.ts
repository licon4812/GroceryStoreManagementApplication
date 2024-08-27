import { Injectable, signal } from '@angular/core';
import { IAisleService } from '../interfaces/aisle-service.interface';
import { map, Observable, tap } from 'rxjs';
import { CreateAisleRequest, UpdateAisleRequest, DeleteAisleRequest } from '../models/requests/aisle-requests';
import { GetAislesResponse, GetAisleResponse, UpdateAisleResponse, DeleteAisleResponse } from '../models/responses/aisle-responses';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Aisle } from '../models/aisle';

@Injectable({
  providedIn: 'root'
})
export class AisleService implements IAisleService {
    private apiUrl = `${environment.apiUrl}/aisles`

    private aisles = signal<Aisle[]>([]);

    constructor(private http: HttpClient) { }

    getAisles(): Observable<GetAislesResponse> {
        return this.http.get<GetAislesResponse>(`${this.apiUrl}`).pipe(
                tap((response) => {
                this.aisles.set(response.aisles);
            }));
    }

    getAisleById(id: string): Observable<GetAisleResponse> {
        return this.http.get<GetAisleResponse>(`${this.apiUrl}/${id}`);
    }

    createAisle(request: CreateAisleRequest): Observable<GetAisleResponse> {
        return this.http.post<GetAisleResponse>(`${this.apiUrl}/create`, request);
    }

    updateAisle(request: UpdateAisleRequest): Observable<UpdateAisleResponse> {

        return this.http.put<UpdateAisleRequest>(`${this.apiUrl}/update`, request);
    }

    deleteAisle(id: string): Observable<DeleteAisleResponse> {
        return this.http.delete<DeleteAisleRequest>(`${this.apiUrl}/delete/${id}`); 
    }

}
