import { Component, inject, input } from '@angular/core';
import { Content } from '../models';
import { StorageService } from '../storage-service';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message {
  content = input.required<Content>();

  storageService = inject(StorageService);
}
