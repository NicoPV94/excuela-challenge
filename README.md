# Excuela Challenge

Este proyecto fue generado con Angular CLI versión `17.2.1`.

## Servidor de Prueba y Demo

Ejecuta `npm install` para instalar las dependencias del proyecto.

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias cualquier archivo fuente.

Demo: https://excuela-challenge.web.app

# Instrucciones de Uso

Aquí se detallaran las instrucciones de uso de cada uno de los componentes personalizables.

## Chart Component

El componente utiliza la librería `ng2-charts` para crear los gráficos, que a su vez utiliza `chart.js` para renderizarlos. 
**Nota:** Para más información de todas las posibles opciones por favor ver la documentación oficial de [ng2-charts](https://github.com/valor-software/ng2-charts) y [chart.js](http://www.chartjs.org/docs).  

El componente de gráficos posee dos inputs:
  `chartType`: Indica el tipo de gráfico que se desea utilizar. Es un string que contiene como valor el nombre del gráfico, por ejemplo `pie` para un gráfico circular.
  `chartData`: Un objeto que contiene la configuración y data que utilizará el gráfico para renderizar.

  ### Ejemplo de uso

  Data en componente padre
  
  ```typescript
    chartType: ChartType = 'bar';
    chartData: ChartConfiguration['data'] = {
      labels: ["Usuarios Gratuitos", "Usuarios de Paga", "Usuarios en Prueba"],
      datasets: [
        {
          data: [30, 55, 15]
        },
      ]
    };
  ```

  Invocación del componente

  ```html
    <app-chart [chartType]="chartType" [chartData]="chartData"></app-chart>
  ```

## Live Chat Component

Este componente hace uso del servicio Stream Chat para implementar un chat con: canales, respuestas, hilos, envío de archivos, entre otras funcionalidades básicas de una aplicación de chat contemporánea.  
**Nota:** Para más información sobre todas las poisbles opciones de configuración de Stream Chat, por favor visitar su documentación oficial [Stream Chat Angular Docs](https://getstream.io/chat/docs/sdk/angular/).

Para que el componente funcione hay que importar el `chatService` poporcionado por Stream Chat y utilizarlo en el constructor del componente para inicializar el chat. Se corre la función `init` 
y se le pasan como argumentos el API Key (brindado por Stream Chat cuando se crea una cuenta), userId (generado por nosotros) y el userToken (token JWT generado por el client service de Stream Chat).

```typescript
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
    private channelService: ChannelService
  ) {
    //Esta es información que debería de venir de un backend, pero por motivos demostrativos estas variables se están hardcoding aquí.
    const apiKey = '[your-api-key]';
    const userId = '[userId]';
    const userToken = '[JWT Token]';
    this.chatService.init(apiKey, userId, userToken);
  }
```

Luego se crea un canal accediendo a la función `channel` dentro de `clientService.chatClient` y se pasan como argumentos el tipo de canal (en este caso "messaging"), un ID (generado por nosotros) y un objeto
de configuración (referirse a la documentación de Stream Chat para ver posibles opciones de configuración). Se pueden añadir miembros con la referencia creada por la función ejecutada anteriormente, al igual
que filtrar canales.

 ```typescript
    async ngOnInit() {
      //Aquí se crea el canal/conversación
      const channel = this.chatService.chatClient.channel('messaging', '[channel-id]', {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
        name: 'Excuela - Conocimiento Compartido',
      });
      await channel.create();
  
      //Ejemplo de cómo añadir miembros
      await channel.addMembers([{ user_id: "[userId]", channel_role: "channel_moderator" }, { user_id: "[userId]", channel_role: "channel_moderator" }]);
  
      //Se añade condición para filtrar canales al inicializar el channelService, en este caso estamos filtrando por el ID que le dimos al canal cuando fue creado 'conocimiento-excuela'.
      this.channelService.init({
        type: 'messaging',
        id: { $eq: 'excuela-conocimiento' },
      });
    }
  }
```

## Video Player Component

El VideoPlayerComponent es un reproductor de video con estílos y controles personalizados.    

Este componente posee tres inputs:  
  `videoTitle`: Un string que indica el título del video. Es una propiedad opcional; si provee, se renderiza el área del título, de lo contrario, no.  
  `videoSources`: Un arreglo de objetos de tipo VideoSource (modelo creado en el proyecto) en el cual se proveen los orígenes del video a mostrar, en otras palabras,
  las distintas calidades de video a mostrar.  
  `subtitleSources`: Un arreglo de objetos de tipo SubtitleSource (modelo creado en el proyecto) en el cual se proveen los orígenes de los subtítulos a mostrar
  en el video.  

Data en componente padre
  
  ```typescript
    videoTitle: string = 'Cómo Hacer un Sándwich de Desayuno';

    videoSources: VideoSource[] = [
      { label: '360p', src: 'assets/video/sample-video(360p).mp4' },
      { label: '480p', src: 'assets/video/sample-video(480p).mp4' }
    ];
  
    subtitles: SubtitleSource[] = [
      {label: 'English', src: 'assets/video/Subtitles-[English].vtt', srclang: 'en', default: false},
      {label: 'Español', src: 'assets/video/Subtitles-[Spanish].vtt', srclang: 'es', default: false}
    ];
  ```

  Invocación del componente

  ```html
    <app-video-player [videoTitle]="videoTitle" [videoSources]="videoSources" [subtitleSources]="subtitles"></app-video-player>
  ```






