import { Routes } from '@angular/router';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { VideoPlayerPageComponent } from './pages/video-player-page/video-player-page.component';

export const routes: Routes = [
  { path: '', component: ChartPageComponent },
  { path: 'support', component: ChatPageComponent },
  { path: 'video-player', component: VideoPlayerPageComponent },
];
