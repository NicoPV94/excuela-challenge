import { Component } from '@angular/core';
import { LiveChatComponent } from '../../components/live-chat/live-chat.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [LiveChatComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {

}
