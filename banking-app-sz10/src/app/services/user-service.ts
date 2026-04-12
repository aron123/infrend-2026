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
}
