import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})

export class StatCardComponent {
    
    @Input() title: string = 'Product';
    @Input() body: string = '185';
    @Input() icon: string = 'box';
    @Input() colour: string = 'orange';
}
