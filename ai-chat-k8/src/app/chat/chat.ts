import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ChatHistory, Content } from '../models';
import { Message } from '../message/message';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat-service';

@Component({
  selector: 'app-chat',
  imports: [Message, FormsModule],
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
      }
    ]
  };

  newMessage = '';

  chatService = inject(ChatService);
  cdRef = inject(ChangeDetectorRef);

  sendMessage() {
    const content: Content = {
      role: 'user',
      parts: [
        { text: this.newMessage }
      ]
    };

    this.history.contents.push(content);
    this.newMessage = '';
    this.scrollToBottom();
    this.cdRef.markForCheck();

    this.chatService.getChatCompletion(this.history).subscribe({
      next: (completion) => {
        this.history.contents.push(completion.candidates[0].content);
        this.scrollToBottom();
        this.cdRef.markForCheck();
      },
      error: (err) => {
        console.error(err);

        const message = err.error?.error?.message;
        if (message) {
          alert(message);
        }
      }
    });
  }

  scrollToBottom() {
    setTimeout(() => window.scrollTo(0, document.querySelector('#message-box')!.scrollHeight), 200);
  }

}
