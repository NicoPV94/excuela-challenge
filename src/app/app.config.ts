import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TranslateModule } from '@ngx-translate/core';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideStore } from '@ngrx/store';
import { dataReducer } from './store/data.reducer';
import { provideEffects } from '@ngrx/effects';
import { DataEffects } from './store/data.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(TranslateModule.forRoot()),
    provideCharts(withDefaultRegisterables()),
    provideStore({data: dataReducer}),
    provideEffects([DataEffects]),
    provideHttpClient()
  ]
};
