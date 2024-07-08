import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('channelList') channelList?: ElementRef;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) {
    this.streamI18nService.setTranslation('es');

    //Esta es información que debería de venir de un backend, pero por motivos demostrativos, ya que este es un challenge de frontend, estar variables se están hardcoding aquí.
    //Idealmente esto estaría implementado con un sistema de autenticación y cada usuario de la aplicación tendría asignado un JWT token generado con el server client de Stream Chat.
    //Esta implementación demo simula un canal al que pueden entrar varios usuarios y enviar/recibir mensajes. Claramente por demostración solo está un usuario dentro del canal.
    const apiKey = 'n4zhq2zcd4fu';
    const userId = 'viento-peruano-1';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmllbnRvLXBlcnVhbm8tMSJ9.tRCT7cbu-QuDb2AjyEEgaX-33U0TJR3RXw5pHGVWNkM';
    this.chatService.init(apiKey, userId, userToken);

  }

  async ngOnInit() {
    //Aquí se crea el canal/conversación
    const channel = this.chatService.chatClient.channel('messaging', 'excuela-conocimiento', {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Excuela - Conocimiento Compartido',
    });
    await channel.create();

    //Añado dos miembros de prueba al canal. Junto con el repositorio del proyecto estaré enviando un link a una instancia online en firebase del mismo proyecto pero con viento-nica-1 como
    //usuario por defecto para que cuando corran de manera local el proyecto puedan probar el chat en conjunto con el proyecto online.
    await channel.addMembers([{ user_id: "viento-peruano-1", channel_role: "channel_moderator" }, { user_id: "viento-nica-1", channel_role: "channel_moderator" }]);

    //Se añade condición para filtrar canales al inicializar el channelService, en este caso estamos filtrando por el ID que le dimos al canal cuando fue creado 'conocimiento-excuela'.
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'excuela-conocimiento' },
    });
  }

  ngAfterViewInit(): void {
    console.log(this.channelList?.nativeElement);
  }
}
