import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { UserDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  userService = inject(UserService);
  router = inject(Router);

  users = signal<UserDTO[]>([]);

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (users) => { this.users.set(users); },
      error: (err) => {
        alert('Hiba az ügyfelek betöltése során.');
        console.error(err);
      }
    });
  }

  deleteUser(user: UserDTO) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        const users = this.users();
        const index = users.indexOf(user);
        if (index > -1) {
          users.splice(index, 1);
          this.users.set([...users]);
        }
      },
      error: (err) => {
        alert('Hiba történt a törlés során.');
        console.error(err);
      }
    });
  }

  editUser(user: UserDTO) {
    this.router.navigate([ '/edit-user', user.id ]);
  }
}
