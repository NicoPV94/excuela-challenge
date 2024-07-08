import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { Store, select } from '@ngrx/store';
import * as DataActions from './store/data.actions';
import { Observable, Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NavbarComponent, TranslateModule]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Excuela Challenge';
  data$?: Observable<any>;
  loading$?: Observable<boolean>;
  error$?: Observable<any>;
  subs: Subscription = new Subscription();
  isLoading: boolean = true;
  availableLanguages: {id: string, label: string}[] = [{id: 'en', label: 'English'}, {id: 'es', label: 'Español'}];
  selectedLanguage: string = 'es';

  constructor(private store: Store, private translate: TranslateService) {
    //Inicializar servicio detraducción y seleccionar lenguaje por defecto
    this.translate.addLangs(this.availableLanguages.map(lang => lang.id));
    this.translate.setDefaultLang('es');

    //Revisar el lenguaje del explorador en uso, si coincide con los lenguajes registrados, utilizar el
    //lenguaje del explorador, sino, caer en español como lenguaje por defecto.
    const browserLang = this.translate.getBrowserLang();
    this.selectedLanguage = browserLang?.match(/en|es/) ? browserLang : 'es';
    this.translate.use(this.selectedLanguage);
  }

  ngOnInit(): void {


    //Cargar data del archivo JSON
    this.store.dispatch(DataActions.loadData());

    //Guardar las observables que regresan los selectores de ngrx
    this.loading$ = this.store.pipe(select(state => (state as any).data.loading));
    this.error$ = this.store.pipe(select(state => (state as any).data.error));

    //Subscribirse a las observables para escuchar a los cambios de cuando está cargando la data
    //o si hay un error durante dicha carga. A la vez se guardan estas subscripciones en la
    //propiedad "subs" la cual es una subscripción también y en OnDestroy se utiliza para
    //desubscribirse a todas las subscripciones que fueron añadidas.
    this.subs.add(this.loading$.subscribe({next: (res) => this.isLoading = res}));
    //this.subs.add(this.error$.subscribe({next: (res) => alert(res)}));
  }

  changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
