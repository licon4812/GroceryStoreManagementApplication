import { mapToCanActivate, Routes } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { ProductsViewComponent } from './components/views/dashboard/product/product.component';
import { AislesViewComponent } from './components/views/dashboard/aisle/aisle.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { OverviewViewComponent } from './components/views/dashboard/overview/overview.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
                children: [
                    {
                        path: 'overview',
                        component: OverviewViewComponent
                    },
                    {
                        path: 'products',
                        component: ProductsViewComponent,
                        children: [
                            {
                                path: ':productId',
                                component: ProductsViewComponent
                            }
                        ]
                    },
                    {
                        path: 'aisles',
                        component: AislesViewComponent,
                        children: [
                            {
                                path: ':aisleId',
                                component: AislesViewComponent
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./components/views/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
