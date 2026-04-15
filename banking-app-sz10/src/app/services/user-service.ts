import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<UserDTO[]>('/api/user');
  }

  getOne(id: number) {
    return this.http.get<UserDTO>('/api/user/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete('/api/user/' + id);
  }

  createUser(user: UserDTO) {
    return this.http.post<UserDTO>('/api/user', user);
  }

  updateUser(user: UserDTO) {
    return this.http.put<UserDTO>('/api/user', user);
  }
}
