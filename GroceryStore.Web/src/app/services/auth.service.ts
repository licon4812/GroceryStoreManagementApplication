import { Injectable, signal } from '@angular/core';
import { IAuthService } from '../interfaces/auth-service.interface';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/requests/login-request';
import { LoginResponse, LogoutResponse } from '../models/responses/auth-responses';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StringUtils } from '../utils/extensions/string-utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements IAuthService {
    private apiUrl = `${environment.apiUrl}/auth`
    private token = signal<string | null>(null);

    constructor(private http: HttpClient, private router: Router) { 
        const storedToken = localStorage.getItem('authToken')
        if (!StringUtils.isNullOrEmpty(storedToken)) {
            this.token.set(storedToken);
        }
    }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
            tap(response => {
                // Note: For the purpose of this demonstration, the JWT token is stored in localStorage.
                // In a production environment, it is recommended to use more secure methods, such as HTTP-only cookies,
                // to handle authentication tokens and mitigate potential security risks, such as XSS attacks.
                this.token.set(response.token);
                localStorage.setItem('authToken', response.token);
            })
        );
    }

    check(): Observable<string> {
        return this.http.get<string>(`${this.apiUrl}/check`);
    }

    logout(): Observable<LogoutResponse> {
        this.flushToken();
        this.router.navigate(['login'])
        return this.http.post<LogoutResponse>(`${this.apiUrl}/logout`, {});
    }
    
    isAuthed(): boolean {
        return !StringUtils.isNullOrEmpty(this.token());
    }
    
    flushToken(): void {
        this.token.set(null);
        localStorage.removeItem('authToken');
    }

    getToken(): string | null
    {
        return this.token();
    }
}
