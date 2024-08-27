import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { StatCardComponent } from "../../common/stat-card/stat-card.component";
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ProductService } from '../../../services/product.service';
import { AisleService } from '../../../services/aisle.service';
import { GetInventoryOverviewResponse } from '../../../models/responses/product-responses';
import { GetInventoryOverviewRequest } from '../../../models/requests/product-requests';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, StatCardComponent, ButtonModule, TabMenuModule, PanelModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
    today: Date = new Date();
    oneWeekAgo: Date = new Date();
    oneWeekAhead: Date = new Date();
    overviewResponse = signal<GetInventoryOverviewResponse | undefined>(undefined)
    path: string[] = []
    items: MenuItem[] | undefined;
    activeItem!: MenuItem;

    constructor(private router: Router, public productService: ProductService, public aisleService: AisleService) {
        this.oneWeekAgo.setDate(this.today.getDate() - 7);
        this.oneWeekAhead.setDate(this.today.getDate() + 7)
    }

    ngOnInit(): void {
        this.path = this.router.url.split('/').filter(segment=> segment)
        this.items = [
            { label: 'Overview', icon: 'pi pi-chart-line' },
            { label: 'Products', icon: 'pi pi-box' },
            { label: 'Aisles', icon: 'pi pi-warehouse' }
        ]

        this.activeItem = this.items.find((item) => item.label?.toLowerCase() === localStorage.getItem('dashboardPage')) ?? this.items[0]
        
        const request: GetInventoryOverviewRequest = {
            expiryDate: this.oneWeekAhead,
            purchaseDate: this.oneWeekAgo
        }

        this.productService.getInventoryOverview(request).subscribe({
            next: (response) => {
                this.overviewResponse.set(response);
            }
        })
    }

    onActiveItemChange(event: MenuItem){
        this.router.navigate(['dashboard', event.label!.toLowerCase()]);
        localStorage.setItem('dashboardPage', event.label!.toLowerCase())
    }
}
