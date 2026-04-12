import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (users) => { console.log(users); }
    });
  }
}
