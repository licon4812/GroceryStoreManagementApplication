import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAisleRequest } from '../../../../../models/requests/aisle-requests';
import { AisleService } from '../../../../../services/aisle.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-aisle',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './create-aisle.component.html',
  styles: ``
})
export class CreateAisleComponent {
    createProductForm = new FormGroup({
        name: new FormControl(`Aisle ${this.config.data.aisles.length+1}`)
    });
    
    constructor(public config: DynamicDialogConfig, 
                private dialogRef: DynamicDialogRef,
                private aisleService: AisleService) {}

    onSubmit() {
        if (!this.createProductForm.valid)
            return

        const request: CreateAisleRequest = {
            name: this.createProductForm.value.name!
        }
        
        this.aisleService.createAisle(request).subscribe({
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
