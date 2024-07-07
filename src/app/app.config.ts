import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TranslateModule } from '@ngx-translate/core';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(TranslateModule.forRoot()), provideCharts(withDefaultRegisterables())]
};
