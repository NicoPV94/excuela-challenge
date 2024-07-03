import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface VideoSource {
  label: string;
  src: string;
}

interface SubtitleSource {
  label: string;
  src: string;
  srclang: string;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoTitle: string = 'Sample Video';
  @Input() videoSources: VideoSource[] = [];
  @Input() subtitlesUrls: SubtitleSource[] = [];
  @Input() width: string = '';
  @Input() height: string = '';
  @ViewChild('videoElement') videoElement?: ElementRef;

  selectedSource: VideoSource = {label: '', src: ''};

  ngOnInit(): void {
    this.selectedSource = this.videoSources[0];
  }

  changeQuality(event: Event) {
    if (!this.videoElement) return;
    const videoElement = this.videoElement.nativeElement as HTMLVideoElement;
    const currentTime = videoElement.currentTime;
    const eventSource = (event.target as HTMLSelectElement).value;
    this.selectedSource = this.videoSources.find((source) => source.label === eventSource)!;
    videoElement.load();
    videoElement.addEventListener('loadedmetadata', () => {
        videoElement.currentTime = currentTime;
    });
    videoElement.play();
  }
}
