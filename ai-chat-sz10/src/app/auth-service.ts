import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  storageService = inject(StorageService);
  router = inject(Router);
  
  refuseGuestAccess(): boolean {
    const username = this.storageService.username();
    const apiKey = this.storageService.apiKey();

    if (!username || !apiKey) {
      this.router.navigateByUrl('/welcome');
      return false;
    }

    return true;
  }
}
