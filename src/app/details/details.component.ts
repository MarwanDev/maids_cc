import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="details-container">
    <img class="listing-photo" [src]="user?.avatar"
      alt="{{user?.first_name}} {{user?.last_name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{user?.first_name}} {{user?.last_name}}</h2>
      <p class="listing-location">{{user?.email}}</p>
    </section>
  </div>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  user: User | undefined;

  constructor() {
    const userId = parseInt(this.route.snapshot.params['id']);
    this.userService.getUserById(userId).then(user => {
      this.user = user;
    });
  }
}
