import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <a class="listing" [routerLink]="['/details/', user.id]">
      <img class="listing-photo" [src]="user.avatar" alt="{{user.first_name}} {{user.last_name}}">
      <h2 class="listing-heading">{{ user.first_name }} {{ user.last_name }}</h2>
      <p class="listing-email">{{ user.email}}</p>
    </a>
  `,
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user!: User;
}
