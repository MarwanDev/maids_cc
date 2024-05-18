import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    UserListComponent
  ],
  template: `
    <section>
      <form (keyup.enter)="filterResults(filter.value)">
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <app-user-list></app-user-list>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userList: User[] = [];
  userService: UserService = inject(UserService);
  filteredUserList: User[] = [];
  constructor() {
    this.userService.getAllUsers().then((userList: User[]) => {
      this.userList = userList;
      this.filteredUserList = userList;
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredUserList = this.userList;
      return;
    }

    const searchTerm = text.toLowerCase();

    this.filteredUserList = this.userList.filter(user => {
      if (!user) return false;

      const fullName = `${user.first_name?.toLowerCase()} ${user.last_name?.toLowerCase()}`;
      return (
        fullName.includes(searchTerm) ||
        user.email?.toLowerCase().includes(searchTerm)
      );
    });
  }
}
