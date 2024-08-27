import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
    const authService = inject(AuthService);
    const dialogRef = inject(DynamicDialogRef);
    const apiUrlMatch = environment.apiUrlMatch
    
    return next(req).pipe(
        catchError((error) => { 
            if (req.url.match(apiUrlMatch) && error.status === 401) {
                dialogRef.close(null);
                authService.logout();
            };

            return throwError(() => error);
        })
    );
};
