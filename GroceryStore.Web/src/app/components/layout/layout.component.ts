import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from "./topbar/topbar.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent {

    constructor() {}
}
