import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
    primeConfig.ripple = true;
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(withInterceptors([
            authInterceptor,
            httpErrorInterceptor
        ])),
        DialogService,
        MessageService,
        DynamicDialogRef,
        RippleModule,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            deps: [PrimeNGConfig],
            multi: true
        },
        {
            provide: LOCALE_ID,
            useValue: 'en-au'
        }
    ]
};
