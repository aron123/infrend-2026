import { Component, inject, OnInit, signal } from '@angular/core';
import { BankTransferDTO, UserDTO } from '../../../models';
import { UserService } from '../services/user-service';
import { TransactionService } from '../services/transaction-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-editor',
  imports: [FormsModule],
  templateUrl: './transaction-editor.html',
  styleUrl: './transaction-editor.css',
})
export class TransactionEditor implements OnInit {

  users = signal<UserDTO[]>([]);

  transaction = signal<BankTransferDTO>({
    id: 0,
    amount: 0,
    sender: { id: 0 } as UserDTO,
    receiver: { id : 0 } as UserDTO
  });

  userService = inject(UserService);
  transactionService = inject(TransactionService);
  router = inject(Router);

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (users) => this.users.set(users),
      error: (err) => {
        alert('Hiba történt a felhasználók betöltésekor.');
        console.error(err);
      }
    });
  }

  saveTransaction() {
    this.transactionService.create(this.transaction()).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        const message = err.error?.error;
        alert(message ? message : 'Hiba a tranzakció mentésekor.');

        console.error(err);
      }
    });
  }
}
