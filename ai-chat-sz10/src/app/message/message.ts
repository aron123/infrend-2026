import { Component, input } from '@angular/core';
import { Content } from '../models';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message {
  content = input.required<Content>();
}
