import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {

  username = '';
  apiKey = '';

  storageService = inject(StorageService);
  router = inject(Router);

  login() {
    if (!this.username) {
      alert('Felhasználónév megadása kötelező!');
      return;
    }

    if (!this.apiKey) {
      alert('API kulcs megadása kötelező!');
      return;
    }

    this.storageService.setCredentials(this.username, this.apiKey);
    this.router.navigateByUrl('/');
  }

}
