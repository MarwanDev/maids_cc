import { Component, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { HeaderComponent } from '../header/header.component';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    RouterModule,
    UserListComponent,
    HeaderComponent
  ],
  template: `
    <a [routerLink]="['']">
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo">
      </header>
    </a>
    <section>
      <form>
        <input (input)="filterResults(filter.value)" type="text" placeholder="Search by name, email or ID" #filter>
      </form>
    </section>
    <section class="results">
      <app-user
        *ngFor="let user of filteredUserList"
        [user]="user">
      </app-user>
    </section>
    <nav class="pagination">
      <button (click)="navigateToPage(1)">1</button>
      <button (click)="navigateToPage(2)">2</button>
    </nav>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userList: User[] = [];
  userService: UserService = inject(UserService);
  filteredUserList: User[] = [];
  page = 1;
  constructor() {
    this.userService.getAllUsers(this.page).then((userList: User[]) => {
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
        user.email?.toLowerCase().includes(searchTerm) ||
        user.id.toString().toLowerCase().includes(searchTerm)
      );
    });
  }
  navigateToPage(page: number) {
    this.page = page;
    this.userService.getAllUsers(page).then((userList: User[]) => {
      this.userList = userList;
      this.filteredUserList = userList;
    });
  }
}
