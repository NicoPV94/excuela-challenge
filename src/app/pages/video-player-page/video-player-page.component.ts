import { Component } from '@angular/core';
import { VideoPlayerComponent } from "../../shared/video-player/video-player.component";

@Component({
  selector: 'app-video-player-page',
  standalone: true,
  templateUrl: './video-player-page.component.html',
  styleUrl: './video-player-page.component.scss',
  imports: [VideoPlayerComponent]
})
export class VideoPlayerPageComponent {

  videoSources = [
    { label: '360p', src: 'assets/video/sample-video(360p).mp4' },
    { label: '480p', src: 'assets/video/sample-video(480p).mp4' }
  ];

  subtitles = [
    {label: 'English', src: 'assets/video/Subtitles-[English].vtt', srclang: 'en', default: false},
    {label: 'Español', src: 'assets/video/Subtitles-[Spanish].vtt', srclang: 'es', default: false}
  ];

}
