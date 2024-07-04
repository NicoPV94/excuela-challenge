import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';

interface VideoSource {
  label: string;
  src: string;
}

interface SubtitleSource {
  label: string;
  src: string;
  srclang: string;
  default: boolean;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, FormsModule, SettingsMenuComponent],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  //Inputs
  @Input() videoTitle: string = 'Sample Video';
  @Input() videoSources: VideoSource[] = [];
  @Input() subtitleSources: SubtitleSource[] = [];

  //Referencias a elementos
  @ViewChild('videoElement') videoElementRef?: ElementRef;
  @ViewChild('videoContainer') videoContainerRef?: ElementRef;
  @ViewChild('volumeSlider') volumeSliderRef?: ElementRef;
  @ViewChild('timelineContainer') timelineContainerRef?: ElementRef;

  videoElement: HTMLVideoElement = this.videoElementRef?.nativeElement;
  videoContainer: HTMLDivElement = this.videoContainerRef?.nativeElement;
  volumeSlider: HTMLInputElement = this.volumeSliderRef?.nativeElement;
  timelineContainer: HTMLDivElement = this.timelineContainerRef?.nativeElement;

  //Propiedades para mostrar duración del video
  totalTime: string = '0:00';
  currentTime: string = '0:00';

  //Propiedades auxliares para la línea de tiempo
  isScrubbing = false;
  wasPaused = false;
  previewImgSrc: string = '';
  thumbnailImgSrc: string = '';

  //Propiedad auxliar para velocidad de reproducción
  playbackRate: string = '1x';

  //Propiedad auxiliar para subtítulos y CC
  subtitles: any;

  //Propiedades auxiliares para menus
  qualityMenuOpen: boolean = false;
  subtitleMenuOpen: boolean = false;
  selectedSource: VideoSource = { label: '', src: '' };
  selectedSubtitle?: SubtitleSource = { label: '', src: '', srclang: '', default: true };
  showDisableSubButton: boolean = false;

  //Propiedad auxiliar para cambio de calidad
  isVideoPaused: boolean = true;


  ngOnInit(): void {
    //Seleccionar una calidad por defecto
    this.selectedSource = this.videoSources[0];
  }

  ngAfterViewInit(): void {
    //Asignar los elementos HTML obtenidos de las referencias a sus respectivas propiedades después de que la vista haya sido inicializada.
    //Esto es para facilitar su uso sin tener que escribir siempre nativeElement cuando se accede a la referencia y también al estar tipadas en su declaración,
    //las propiedades tienen autocompletado con intelisense.
    this.videoElement = this.videoElementRef?.nativeElement;
    this.videoContainer = this.videoContainerRef?.nativeElement;
    this.volumeSlider = this.volumeSliderRef?.nativeElement;
    this.timelineContainer = this.timelineContainerRef?.nativeElement;

    this.subtitles = Object.values(this.videoElement.textTracks);
    this.showDisableSubButton = this.subtitles.some((textTrack: TextTrack) => textTrack.mode === 'showing');
  }

  //Reproducir y Pausa
  togglePlay() {
    if (!this.videoElement) return;
    this.videoElement.paused ? this.videoElement.play() : this.videoElement.pause();
  }

  //Modos de vista
  toggleTheaterMode() {
    this.videoContainer.classList.toggle("theater");
  }

  toggleFullScreenMode() {
    if (document.fullscreenElement == null) {
      this.videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  toggleMiniPlayerMode() {
    if (this.videoContainer.classList.contains("mini-player")) {
      document.exitPictureInPicture();
    } else {
      this.videoElement.requestPictureInPicture();
    }
  }

  @HostListener('document:fullscreenchange')
  @HostListener('webkitfullscreenchange')
  @HostListener('mozfullscreenchange')
  onScreenChange() {
    this.videoContainer.classList.toggle("full-screen", !!document.fullscreenElement);
  }

  @HostListener('document:enterpictureinpicture')
  @HostListener('webkitenterpictureinpicture')
  @HostListener('mozbrowserenterpictureinpicture')
  onEnterPictureInPicture() {
    this.videoContainer.classList.add("mini-player");
  }

  @HostListener('document:leavepictureinpicture')
  @HostListener('webkitleavepictureinpicture')
  @HostListener('mozbrowserleavepictureinpicture')
  onLeavePictureInPicture() {
    this.videoContainer.classList.remove("mini-player")
  }

  //Volumen del video
  toggleMute() {
    this.videoElement.muted = !this.videoElement.muted
  }

  onVolumeChange() {
    this.volumeSlider.value = this.videoElement.volume.toString();
    let volumeLevel;
    if (this.videoElement.muted || this.videoElement.volume === 0) {
      this.volumeSlider.value = '0';
      volumeLevel = "muted";
    } else if (this.videoElement.volume >= 0.5) {
      volumeLevel = "high";
    } else {
      volumeLevel = "low";
    }

    this.videoContainer.dataset.volumeLevel = volumeLevel;
  }

  onVolumeInput(event: Event) {
    this.videoElement.volume = +this.volumeSlider.value
    this.videoElement.muted = +this.volumeSlider.value === 0
  }

  //Duración del video
  @HostListener('document:keydown', ['$event'])
  @HostListener('webkitkeydown', ['$event'])
  @HostListener('mozbrowserkeydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!document.activeElement) return;
    const tagName = document.activeElement.tagName.toLowerCase();

    if (tagName === "input") return;

    switch (event.key.toLowerCase()) {
      case " ":
        if (tagName === "button") return;
        break;
      case "k":
        this.togglePlay();
        break;
      case "f":
        this.toggleFullScreenMode();
        break;
      case "t":
        this.toggleTheaterMode();
        break;
      case "i":
        this.toggleMiniPlayerMode();
        break;
      case "m":
        this.toggleMute();
        break;
      case "arrowleft":
      case "j":
        this.skip(-5);
        break;
      case "arrowright":
      case "l":
        this.skip(5);
        break;
      case "c":
        //this.toggleCaptions();
        break;
    }
  }

  onLoadedData() {
    this.totalTime = this.formatDuration(this.videoElement.duration);
    if (!this.isVideoPaused) {
      this.videoElement.play();
    }
  }

  onTimeUpdate() {
    this.currentTime = this.formatDuration(this.videoElement.currentTime);
    const percent = this.videoElement.currentTime / this.videoElement.duration;
    this.timelineContainer.style.setProperty("--progress-position", percent.toString());
  }

  formatDuration(time: number) {
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`;
    }
  }

  skip(duration: number) {
    this.videoElement.currentTime += duration;
  }

  //Línea de tiempo
  @HostListener('document:mouseup', ['$event'])
  @HostListener('webkitmouseup', ['$event'])
  @HostListener('mozbrowsermouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isScrubbing) this.toggleScrubbing(event);
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('webkitmousemove', ['$event'])
  @HostListener('mozbrowsermousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isScrubbing) this.handleTimelineUpdate(event);
  }

  toggleScrubbing(event: MouseEvent) {
    const rect = this.timelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, event.x - rect.x), rect.width) / rect.width;
    this.isScrubbing = (event.buttons & 1) === 1;
    this.videoContainer.classList.toggle("scrubbing", this.isScrubbing);
    if (this.isScrubbing) {
      this.wasPaused = this.videoElement.paused;
      this.videoElement.pause();
    } else {
      this.videoElement.currentTime = percent * this.videoElement.duration;
      if (!this.wasPaused) this.videoElement.play();
    }

    this.handleTimelineUpdate(event);
  }

  handleTimelineUpdate(event: MouseEvent) {
    const rect = this.timelineContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, event.x - rect.x), rect.width) / rect.width;
    const previewImgNumber = Math.max(
      1,
      Math.floor((percent * this.videoElement.duration) / 10)
    );
    const previewImgSrc = `assets/images/previewImgs/out${previewImgNumber}.png`;
    this.previewImgSrc = previewImgSrc;
    this.timelineContainer.style.setProperty("--preview-position", percent.toString());

    if (this.isScrubbing) {
      event.preventDefault();
      this.thumbnailImgSrc = previewImgSrc;
      this.timelineContainer.style.setProperty("--progress-position", percent.toString());
    }
  }

  //Velocidad de reproducción
  changePlaybackSpeed() {
    let newPlaybackRate = this.videoElement.playbackRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 0.25;
    this.videoElement.playbackRate = newPlaybackRate;
    this.playbackRate = `${newPlaybackRate}x`;
  }

  //Subtítulos y CC
  toggleCaptions(textTrack: TextTrack) {
    const activeTrack = this.subtitles.find((textTrack: TextTrack) => textTrack.mode === 'showing');
    if (activeTrack) activeTrack.mode = "hidden";
    textTrack.mode = "showing";
    this.showDisableSubButton = true;
    this.videoContainer.classList.toggle("captions", true);
  }

  toggleSubtitlesMenu() {
    if (this.qualityMenuOpen) this.qualityMenuOpen = false;
    this.subtitleMenuOpen = !this.subtitleMenuOpen;
  }

  changeSubtitle(event: any) {
    const source = event as SubtitleSource;
    if (!this.videoElement) return;
    if (this.subtitleMenuOpen || this.selectedSubtitle === source) this.toggleSubtitlesMenu();
    this.selectedSubtitle = source;
    const textTrack: TextTrack = this.subtitles.find((textTrack: TextTrack) => textTrack.language === this.selectedSubtitle?.srclang);
    this.toggleCaptions(textTrack);
  }

  disableSubtitles() {
    this.toggleSubtitlesMenu();
    const subTrack = this.subtitles.find((textTrack: TextTrack) => textTrack.mode === 'showing');
    if (subTrack) {
      subTrack.mode = "hidden";
      this.showDisableSubButton = false;
      this.selectedSubtitle = undefined;
      this.videoContainer.classList.toggle("captions", false);
    }
  }

  //Cambiar calidad del video
  toggleQualityMenu() {
    if (this.subtitleMenuOpen) this.subtitleMenuOpen = false;
    this.qualityMenuOpen = !this.qualityMenuOpen;
  }

  changeQuality(event: any) {
    const source = event as VideoSource;
    if (!this.videoElement) return;
    if (this.qualityMenuOpen || this.selectedSource === source) this.toggleQualityMenu();
    const currentTime = this.videoElement.currentTime;
    this.isVideoPaused = JSON.parse(JSON.stringify(this.videoElement.paused));
    this.selectedSource = source;
    this.videoElement.load();
    this.videoElement.addEventListener('loadedmetadata', () => {
      this.videoElement!.currentTime = currentTime;
      if (!this.isVideoPaused) {
        this.videoElement.play()
      };
    });
  }
}
