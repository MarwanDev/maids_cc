import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    RouterModule,
    UserListComponent
  ],
  template: `
    <section>
      <form (keyup.enter)="filterResults(filter.value)">
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-user
        *ngFor="let user of filteredUserList"
        [user]="user">
      </app-user>
    </section>
    <nav class="pagination">
      <button (click)="navigateToHome(1)">1</button>
      <button (click)="navigateToHome(2)">2</button>
    </nav>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userList: User[] = [];
  userService: UserService = inject(UserService);
  filteredUserList: User[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(private router: Router) {
    var page = parseInt(this.route.snapshot.params['page']);
    this.userService.getAllUsers(page).then((userList: User[]) => {
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
  navigateToHome(page: number) {
    this.router.navigate(['/home', page]).then(() => {
      window.location.reload();
    });
  }
}
