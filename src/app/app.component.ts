import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { Store, select } from '@ngrx/store';
import * as DataActions from './store/data.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Excuela Challenge';
  data$?: Observable<any>;
  loading$?: Observable<boolean>;
  error$?: Observable<any>;
  subs: Subscription = new Subscription();
  isLoading: boolean = true;

  constructor(private store: Store) { }

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
    this.subs.add(this.error$.subscribe({next: (res) => alert(res)}));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
