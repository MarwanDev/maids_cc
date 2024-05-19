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
    <a class="user-container" [routerLink]="['/details/', user.id]">
      <img [src]="user.avatar" alt="{{user.first_name}} {{user.last_name}}" />
      <div class="content-container">
        <h2 class="user-name">{{user.first_name}} {{user.last_name}}</h2>
        <h2 class="user-name">{{user.email}}</h2>
      </div>
    </a>
  `,
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user!: User;
}
