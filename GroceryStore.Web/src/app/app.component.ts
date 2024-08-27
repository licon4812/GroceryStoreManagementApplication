import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ThemeService } from './services/theme.service';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'GroceryStore.Web';

    constructor(private config: PrimeNGConfig, private themeService: ThemeService, public messageService: MessageService) {}

    ngOnInit(): void {
        this.config.setTranslation({dateFormat: 'dd/mm/yy'});
    }
}
