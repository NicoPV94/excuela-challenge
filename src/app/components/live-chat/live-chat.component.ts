import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
  StreamAutocompleteTextareaModule,
  StreamChatModule,
} from 'stream-chat-angular';

@Component({
  selector: 'app-live-chat',
  standalone: true,
  imports: [TranslateModule, StreamAutocompleteTextareaModule, StreamChatModule],
  templateUrl: './live-chat.component.html',
  styleUrl: './live-chat.component.scss'
})
export class LiveChatComponent implements OnInit {
  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) {
    //Esta es información que debería de venir de un backend, pero por motivos demostrativos, ya que este es un challenge de frontend, estar variables se están hardcoding aquí.
    //Idealmente esto estaría implementado con un sistema de autenticación y cada usuario de la aplicación tendría asignado un JWT token generado con el server client de Stream Chat.
    //Esta implementación demo simula un canal al que pueden entrar varios usuarios y enviar/recibir mensajes. Claramente por demostración solo está un usuario dentro del canal.
    const apiKey = 'n4zhq2zcd4fu';
    const userId = 'viento-nica-1';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmllbnRvLW5pY2EtMSJ9.2QdeaZ2fpAa79fSZFpoIDkuds3SNumMyKKVDCas-mmo';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();
  }

  async ngOnInit() {
    //Aquí se crea el canal/conversación
    const channel = this.chatService.chatClient.channel('messaging', 'excuela-conocimiento', {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Excuela - Conocimiento Compartido',
    });
    await channel.create();

    //Se añade condición para filtrar canales al inicializar el channelService, en este caso estamos filtrando por el ID que le dimos al canal cuando fue creado 'conocimiento-excuela'.
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'excuela-conocimiento' },
    });
  }
}
