import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LandingCardComponent } from "../../common/landing-card/landing-card.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/requests/login-request';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, ButtonModule, InputTextModule, LandingCardComponent, ReactiveFormsModule ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styles: ``
})

export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        userName: new FormControl(''),
        password: new FormControl('')
    })

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

    ngOnInit(): void {
        if (this.authService.isAuthed())
            this.router.navigate(environment.loggedInRedirect);
    }

    onSubmit(): void {
        if (this.loginForm.invalid)
            return;
        
        const request: LoginRequest = {
            userName: this.loginForm.value.userName!,
            password: this.loginForm.value.password!
        }

        const message: Message = {
            severity: 'error',
            summary: 'Error',
            detail: 'There was a problem logging in'
        }

        this.authService.login(request).subscribe({
            next: () => {
                message.severity = 'success';
                message.summary = 'Login Successful'
                message.detail = 'You have been logged in successfully'
                this.router.navigate(['dashboard'])
            },
            complete: () => {
                this.messageService.add(message);
            }
        });
    }
}
