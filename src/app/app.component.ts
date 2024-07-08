import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { Store, select } from '@ngrx/store';
import * as DataActions from './store/data.actions';
import { selectDataState } from './store/data.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent implements OnInit {
  title = 'Excuela Challenge';
  data$?: Observable<any>;
  loading$?: Observable<boolean>;
  error$?: Observable<any>;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(DataActions.loadData());

    this.data$ = this.store.pipe(select(selectDataState));
    this.loading$ = this.store.pipe(select(state => (state as any).data.loading));
    this.error$ = this.store.pipe(select(state => (state as any).data.error));

    this.data$.subscribe({next: (value) => console.log(value)});
  }
}
