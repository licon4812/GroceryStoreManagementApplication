import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StatCardComponent } from '../../../common/stat-card/stat-card.component';
import { TopbarComponent } from '../../../layout/topbar/topbar.component';
import { ProductService } from '../../../../services/product.service';
import { AisleService } from '../../../../services/aisle.service';
import { GetInventoryOverviewRequest } from '../../../../models/requests/product-requests';
import { GetInventoryOverviewResponse } from '../../../../models/responses/product-responses';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, StatCardComponent, ButtonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})

export class OverviewViewComponent implements OnInit, AfterViewInit {
    path: string[] = []
    today: Date = new Date();
    oneWeekAgo: Date = new Date();
    oneWeekAhead: Date = new Date();

    overviewResponse = signal<GetInventoryOverviewResponse | undefined>(undefined)

    constructor(public productService: ProductService, public aisleService: AisleService) {
        this.oneWeekAgo.setDate(this.today.getDate() - 7);
        this.oneWeekAhead.setDate(this.today.getDate() + 7)
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
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
}
