import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { AisleService } from '../../../../services/aisle.service';
import { Aisle } from '../../../../models/aisle';
import { DropdownModule } from 'primeng/dropdown';
import { UpdateProductRequest } from '../../../../models/requests/product-requests';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateProductComponent } from './create-product/create-product.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ConfirmPopupModule,
    TableModule,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    DynamicDialogModule,
    KeyFilterModule,
    ToastModule
],
  providers: [MessageService, ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductsViewComponent implements OnInit{
    products: Product[] = []
    aisles: Aisle[] = []

    uniqueProducts: { name: string }[] = []
    clonedProducts: { [s: string]: Product } = {};
    
    dialogRef: DynamicDialogRef | undefined;

    constructor(private productService: ProductService, 
                private aisleService: AisleService, 
                private messageService: MessageService, 
                private dialogService: DialogService,
                private confirmationService: ConfirmationService) {

    }

    ngOnInit(): void {
        this.loadProducts();

        this.aisleService.getAisles().subscribe({
            next: (response) => {
                this.aisles = response.aisles;
            }
        })
    }

    loadProducts() {
        this.productService.getProducts().subscribe({
            next: (response) => {
                this.products = response.products
                this.uniqueProducts = [...new Set(response.products.map(product => product.name))].map(product => {
                    return { name: product }
                });
            }
        });
    }

    onRowEditInit(product: Product) {
        this.clonedProducts[product.id as string] = { ...product };
    }

    onRowEditSave(product: Product) {
        const request: UpdateProductRequest = {
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            expiryDate: product.expiryDate,
            purchaseDate: product.purchaseDate,
            aisleId: this.aisles.find(aisle => aisle.name == product.aisleName)!.id || this.aisles[0]?.id
        };

        this.productService.updateProduct(request).subscribe({
            next: (response) => {
                delete this.clonedProducts[product.id as string];
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated' });

                this.loadProducts();
            }, 
            error: (response) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error.title });
            }
        })

    }

    onRowEditCancel(product: Product, index: number) {
        this.products[index] = this.clonedProducts[product.id as string];
        delete this.clonedProducts[product.id as string];
    }

    onRowDelete(event: Event, product: Product) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure you want to delete this product?',
            icon: 'pi pi-exclamation-circle',
            acceptIcon: 'pi pi-check mr-1',
            rejectIcon: 'pi pi-times mr-1',
            acceptLabel: 'Confirm',
            rejectLabel: 'Cancel',
            rejectButtonStyleClass: 'p-button-outlined p-button-sm',
            acceptButtonStyleClass: 'p-button-sm',
            accept: () => {
                this.productService.deleteProduct(product.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Product deleted', life: 3000 });
                        this.loadProducts();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was a problem deleting the product.', life: 3000 });
                    }
                })
            },
            reject: () => {
                this.messageService.add({ severity: 'warn', summary: 'Aborted', detail: 'Cancelled deleting product', life: 3000 });
            }
        });
    }

    openAddRowDialog() {
        this.dialogRef = this.dialogService.open(CreateProductComponent, { 
            header: 'Add New Product',
            width: '480px',
            data: { aisles: this.aisles, products: this.uniqueProducts }
        });

        this.dialogRef.onClose.subscribe((created) => {
            if (created) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'New product created!'
                });

                this.loadProducts();
            }
        })
    }
}
