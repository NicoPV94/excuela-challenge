import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoPlayerComponent } from "../../shared/components/video-player/video-player.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player-page',
  standalone: true,
  templateUrl: './video-player-page.component.html',
  styleUrl: './video-player-page.component.scss',
  imports: [VideoPlayerComponent, TranslateModule]
})
export class VideoPlayerPageComponent implements OnInit, OnDestroy {

  videoTitle: string = 'Cómo Hacer un Sándwich de Desayuno';

  videoSources = [
    { label: '360p', src: 'assets/video/sample-video(360p).mp4' },
    { label: '480p', src: 'assets/video/sample-video(480p).mp4' }
  ];

  subtitles = [
    {label: 'English', src: 'assets/video/Subtitles-[English].vtt', srclang: 'en', default: false},
    {label: 'Español', src: 'assets/video/Subtitles-[Spanish].vtt', srclang: 'es', default: false}
  ];

  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService){}

  ngOnInit(): void {
    this.subs.add(this.translate.get('vid_player_page.video_title')
    .subscribe(translatedString => {
      this.videoTitle = translatedString;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
