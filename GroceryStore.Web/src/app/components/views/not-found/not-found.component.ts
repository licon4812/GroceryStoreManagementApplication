import { Component } from '@angular/core';
import { LandingCardComponent } from "../../common/landing-card/landing-card.component";
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LandingCardComponent, ButtonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styles: ``
})
export class NotFoundComponent {
    constructor(private router: Router) {}

    goBack(): void {
        if (window.history.length < 1) {
            this.router.navigate(environment.loggedInRedirect);
        } else {
            window.history.back();
        }
    }
}
