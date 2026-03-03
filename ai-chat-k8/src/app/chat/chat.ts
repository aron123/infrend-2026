import { Component } from '@angular/core';
import { ChatHistory } from '../models';
import { Message } from '../message/message';

@Component({
  selector: 'app-chat',
  imports: [Message],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  history: ChatHistory = {
    contents: [
      {
        role: 'model',
        parts: [
          { text: 'Hello, I\'m an AI assistant.' }
        ]
      },
      {
        role: 'user',
        parts: [
          { text: 'Szia, tudsz magyarul?' }
        ]
      }
    ]
  };


}
