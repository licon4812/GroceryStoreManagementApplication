import { Observable } from "rxjs";
import { LoginRequest } from "../models/requests/login-request";
import { LoginResponse } from "../models/responses/auth-responses";


export interface IAuthService {
    isAuthed(): boolean;
    flushToken(): any;
    getToken(): string | null;
    login(request: LoginRequest): Observable<LoginResponse>;
    check(): Observable<string>;
    logout() : Observable<any>;
}
