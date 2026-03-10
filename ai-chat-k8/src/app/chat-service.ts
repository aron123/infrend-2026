import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ChatCompletion, ChatHistory } from './models';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);
  storageService = inject(StorageService);

  getChatCompletion(history: ChatHistory) {
    return this.http.post<ChatCompletion>('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', history, {
      headers: {
        'x-goog-api-key': this.storageService.apiKey()
      }
    });
  }
}
