import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://reqres.in/api/users';

  async getAllUsers(page: number = 1): Promise<User[]> {
    try {
      const response = await fetch(`${this.url}?page=${page}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      return data.data ?? [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${this.url}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }

    const data = await response.json();
    return data.data ?? {};
  }
}
