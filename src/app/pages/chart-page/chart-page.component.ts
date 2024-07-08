import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from '../../components/chart/chart.component';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { ColorService } from '../../shared/services/color.service';
import { Store, select } from '@ngrx/store';
import { selectDataState } from '../../store/data.selectors';

@Component({
  selector: 'app-chart-page',
  standalone: true,
  imports: [ChartComponent, ReactiveFormsModule],
  templateUrl: './chart-page.component.html',
  styleUrl: './chart-page.component.scss'
})
export class ChartPageComponent implements OnInit, OnDestroy {

  chartType: ChartType = 'bar';
  chartTypeForm: FormGroup;
  borderColors: string[] = [];
  chartsData: {bar: ChartConfiguration['data'], pie: ChartConfiguration['data'], line: ChartConfiguration['data']} = {
    bar: {labels: [], datasets: []},
    pie: {labels: [], datasets: []},
    line: {labels: [], datasets: []}
  };
  chartData: ChartConfiguration['data'] = {labels: [], datasets: []};
  subs: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private colorService: ColorService, private store: Store) {
    this.chartTypeForm = this.fb.group({
      selectedChartType: ['bar', Validators.required]
    });
  }

  //Inicializar componente para renderizar un gráfico por defecto
  ngOnInit(): void {
    //Cargar data desde el store
    const data$ = this.store.pipe(select(selectDataState));
    this.subs.add(data$.subscribe({next: (data) => {
      this.chartsData = JSON.parse(JSON.stringify(data.data));
      if (!this.chartsData) return;
      this.setChartData();
    }}));

    //Escuchar a cambios en el formControl que maneja el tipo de gráfico para asignar el nuevo valor.
    this.subs.add(this.chartTypeForm.get('selectedChartType')?.valueChanges.subscribe({
      next: (value) => {
        this.chartType = value;
        this.setChartData();
      }
    }));
  }

  //Cambiar de tipo de gráfico
  setChartData(): void {
    switch(this.chartType) {
      case 'bar':
        this.chartData = this.chartsData.bar;
        break;
      case 'pie':
        this.chartData =this.chartsData.pie;
        break;
      case 'line':
        this.chartData = this.chartsData.line;
        break;
    }
  }

  //Desubscribirse de subspcripciones añadidas.
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
