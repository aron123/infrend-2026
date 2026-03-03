import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly USERNAME_KEY = 'username';
  private readonly APIKEY_KEY = 'apiKey';

  setCredentials(username: string, apiKey: string) {
    localStorage.setItem(this.USERNAME_KEY, username);
    localStorage.setItem(this.APIKEY_KEY, apiKey);
  }

  username() {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  apiKey() {
    return localStorage.getItem(this.APIKEY_KEY);
  }
}
