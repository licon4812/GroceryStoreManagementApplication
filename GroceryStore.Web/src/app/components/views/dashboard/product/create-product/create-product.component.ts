import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DateUtils } from '../../../../../utils/extensions/date-utils';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from '../../../../../services/product.service';
import { CreateProductRequest } from '../../../../../models/requests/product-requests';
import { Aisle } from '../../../../../models/aisle';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    InputTextModule, 
    CalendarModule, 
    ButtonModule, 
    AutoCompleteModule,
    DropdownModule,
    ToastModule
  ],
  templateUrl: './create-product.component.html',
  styles: ``
})
export class CreateProductComponent {
    today: Date = new Date()
    public filteredProducts: string[] = []
    public filteredAisles: string[] = []

    createProductForm = new FormGroup({
        name: new FormControl('New Product'),
        aisle: new FormControl<Aisle>(this.config.data?.aisles[0] || ''),
        price: new FormControl(1.00, Validators.min(0.01)),
        quantity: new FormControl(1, Validators.min(1)),
        expiryDate: new FormControl(DateUtils.addDays(this.today, 7)),
        purchaseDate: new FormControl(new Date())
    })

    constructor(public config: DynamicDialogConfig, 
                private dialogRef: DynamicDialogRef,
                private productService: ProductService) {

    }

    searchProducts(event: AutoCompleteCompleteEvent) {
        if (this.config.data.products && this.config.data.products.length > 0)
            this.filteredProducts = this.config.data.products.filter((product: { name: string}) => {
                return product.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0;
            });
        else
            return;
    }

    searchAisles(event: AutoCompleteCompleteEvent) {
        if (this.config.data.aisles && this.config.data.aisles.length > 0)
            this.filteredProducts = this.config.data.aisles.filter((aisles: Aisle) => {
                return aisles.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0;
            });
        else
            return;
    }

    onSubmit() {
        if (!this.createProductForm.valid)
            return

        const f = this.createProductForm.value;

        const request: CreateProductRequest = {
            name: f.name!,
            aisleId: f.aisle?.id!,
            price: f.price!,
            quantity: f.quantity!,
            expiryDate: f.expiryDate!,
            purchaseDate: f.purchaseDate!
        }
        
        this.productService.createProduct(request).subscribe({
            next: (response) => {
                this.submit();
            },
            error: (response) => {
                console.log(response);
            }
        })
    }

    submit() {
        this.dialogRef.close(true)
    }

    cancel() {
        this.dialogRef.close(false)
    }

    onCancel() {
        this.cancel()
    }
}
