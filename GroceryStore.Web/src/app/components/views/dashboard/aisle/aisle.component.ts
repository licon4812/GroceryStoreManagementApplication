import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AisleService } from '../../../../services/aisle.service';
import { Aisle } from '../../../../models/aisle';
import { GetAislesResponse } from '../../../../models/responses/aisle-responses';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StringUtils } from '../../../../utils/extensions/string-utils';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { UpdateAisleRequest } from '../../../../models/requests/aisle-requests';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProductService } from '../../../../services/product.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAisleComponent } from './create-aisle/create-aisle.component';

@Component({
  selector: 'app-aisle',
  standalone: true,
  imports: [
    TableModule,
    DatePipe, 
    InputTextModule, 
    ButtonModule, 
    CalendarModule, 
    FormsModule, 
    ToastModule, 
    ConfirmPopupModule,
    DynamicDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './aisle.component.html',
  styleUrl: './aisle.component.css'
})
export class AislesViewComponent implements OnInit{
    aisles: Aisle[] = []

    clonedAisles: { [s: string]: Aisle } = {};
    
    dialogRef: DynamicDialogRef | undefined;

    constructor(private aisleService: AisleService, 
                private productService: ProductService,
                private messageService: MessageService, 
                private dialogService: DialogService,
                private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.loadAisles();
    }

    loadAisles() {
        this.aisleService.getAisles().subscribe({
            next: (response: GetAislesResponse) => {
                this.aisles = response.aisles
            }
        })
    }

    onRowEditInit(aisle: Aisle) {
        this.clonedAisles[aisle.id as string] = { ...aisle };
    }

    onRowEditSave(aisle: Aisle) {
        const request: UpdateAisleRequest = {
            id: aisle.id,
            name: aisle.name
        }

        this.aisleService.updateAisle(request).subscribe({
            next: (response) => {
                delete this.clonedAisles[aisle.id as string];
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Aisle updated' });

                this.loadAisles();
            },
            error: (response) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.error?.title || 'An error occurred' });
            }
        })
        
    }

    onRowEditCancel(aisle: Aisle, index: number) {
        this.aisles[index] = this.clonedAisles[aisle.id as string];
        delete this.clonedAisles[aisle.id as string];
    }

    onRowDeleteInit(event: Event, aisle: Aisle) {
        this.productService.getProductsByAisleId(aisle.id).subscribe({
            next: (resp) => {
                if (resp.length > 0)
                {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Warning',
                        detail: `Unable to delete aisle, '${aisle.name}' because aisle is not empty.`
                    });
                } else {
                    this.onRowDeleteConfirm(event, aisle);
                }
            }
        })
    }

    onRowDeleteConfirm(event: Event, aisle: Aisle) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure you want to delete this aisle?',
            icon: 'pi pi-exclamation-circle',
            acceptIcon: 'pi pi-check mr-1',
            rejectIcon: 'pi pi-times mr-1',
            acceptLabel: 'Confirm',
            rejectLabel: 'Cancel',
            rejectButtonStyleClass: 'p-button-outlined p-button-sm',
            acceptButtonStyleClass: 'p-button-sm',
            accept: () => {
                this.aisleService.deleteAisle(aisle.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Aisle deleted', life: 3000 });
                        this.loadAisles();
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was a problem deleting the aisle: '+ error.error?.message, life: 3000 });
                    }
                })
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'Cancelled deletion', life: 3000 });
            }
        });
    }

    openAddRowDialog() {
        this.dialogRef = this.dialogService.open(CreateAisleComponent, { 
            header: 'Add New Aisle',
            width: '480px',
            data: { aisles: this.aisles }
        });

        this.dialogRef.onClose.subscribe((created) => {
            if (created) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'New aisle created!'
                });

                this.loadAisles();
            }
        })
    }
}
