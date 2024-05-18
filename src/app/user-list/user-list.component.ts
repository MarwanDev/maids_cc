import { Component, inject } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent
  ],
  template: `
    <section class="results">
      <app-user
        *ngFor="let user of filteredUserList"
        [user]="user">
      </app-user>
    </section>
  `,
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
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
