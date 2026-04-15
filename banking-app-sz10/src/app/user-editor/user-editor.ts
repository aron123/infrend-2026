import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserDTO } from '../../../models';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-editor',
  imports: [FormsModule],
  templateUrl: './user-editor.html',
  styleUrl: './user-editor.css',
})
export class UserEditor implements OnInit {
  user: UserDTO = {
    id: 0,
    name: '',
    address: '',
    balance: 0
  };

  userService = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);

  isNewUser = true;

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['id'];
    if (userId) {
      this.isNewUser = false;
      this.userService.getOne(userId).subscribe({
        next: (user) => {
          this.user = user;
          this.cdRef.markForCheck();
        },
        error: (err) => alert('Hiba az adatok betöltésekor.')
      });
    }
  }

  saveUser() {
    if (this.isNewUser) {
      this.userService.createUser(this.user).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => {
          alert('Hiba a mentés során.');
          console.error(err);
        }
      });
    } else {
      this.userService.updateUser(this.user).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => {
          alert('Hiba a mentés során.');
          console.error(err);
        }
      });
    }
  }
}
