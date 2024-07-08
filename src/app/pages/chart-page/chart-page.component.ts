import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from '../../components/chart/chart.component';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { ColorService } from '../../shared/services/color.service';
import { Store, select } from '@ngrx/store';
import { selectDataState } from '../../store/data.selectors';

const DATA = [
  { "name": "Angular", "categoy": "web", "value": 290, "id": 1 },
  { "name": "React", "categoy": "web", "value": 450, "id": 2 },
  { "name": "Vue", "categoy": "web", "value": 380, "id": 3 },
  { "name": "jQuery", "categoy": "web", "value": 400, "id": 4 },
  { "name": "Django", "categoy": "web", "value": 300, "id": 5 },
  { "name": "Ruby", "categoy": "web", "value": 775, "id": 6 },
  { "name": "Gatsby", "categoy": "web", "value": 450, "id": 7 },
  { "name": "Anatomía", "categoy": "ciencia", "value": 85, "id": 8 },
  { "name": "Meteorología", "categoy": "ciencia", "value": 420, "id": 9 },
  { "name": "Física", "categoy": "web", "value": 180, "id": 10 },
  {
    "name": "Medicina de Deportes",
    "categoy": "salud",
    "value": 286,
    "id": 11
  },
  { "name": "Aviation", "categoy": "mecanica", "value": 267, "id": 12 },
  { "name": "Auto Repair", "categoy": "mecanica", "value": 232, "id": 13 },
  { "name": "Chemistry", "categoy": "ciencia", "value": 251, "id": 14 },
  { "name": "Industrial", "categoy": "mecanica", "value": 290, "id": 15 },
  {
    "name": "Pool Maintenance",
    "categoy": "mecanica",
    "value": 230,
    "id": 16
  },
  { "name": "Ortopedia", "categoy": "salud", "value": 367, "id": 17 },
  { "name": "Medicina", "categoy": "salud", "value": 325, "id": 18 },
  { "name": "Radiología", "categoy": "salud", "value": 300, "id": 19 },
  { "name": "Botánica", "categoy": "ciencia", "value": 775, "id": 20 },
  {
    "name": "Horticultua",
    "categoy": "ciencia",
    "value": 450,
    "id": 21
  }
]

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
  //sampleChartData: ChartConfiguration['data'] = {labels: [], datasets: []};
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

  ngOnInit(): void {
    // this.sampleChartData = {
    //   labels: DATA.map((e) => e.name),
    //   datasets: [
    //     {
    //       label: 'Total de minutos vistos',
    //       data: DATA.map((e) => e.value),
    //       backgroundColor: this.colorService.getRandomColors(DATA.length, 0.4),
    //       borderColor: this.colorService.getBorderColors(),
    //       borderWidth: 1,
    //     },
    //   ]
    // }
    const data$ = this.store.pipe(select(selectDataState));
    this.subs.add(data$.subscribe({next: (data) => {
      this.chartsData = JSON.parse(JSON.stringify(data.data));
      if (!this.chartsData) return;
      this.setChartData();
    }}));
    // console.log(this.chartsData);
    //this.chartData = this.chartsData?[this.chartType]

    this.subs.add(this.chartTypeForm.get('selectedChartType')?.valueChanges.subscribe({
      next: (value) => {
        this.chartType = value;
        this.setChartData();
        // this.sampleChartData = {
        //   labels: DATA.map((e) => e.name),
        //   datasets: [
        //     {
        //       label: 'Total de minutos vistos',
        //       data: DATA.map((e) => e.value),
        //       backgroundColor: this.colorService.getRandomColors(DATA.length, 0.4),
        //       borderWidth: 1,
        //     },
        //   ]
        // }
      }
    }));
  }

  setChartData(): void {
    switch(this.chartType) {
      case 'bar':
        this.chartData = this.chartsData.bar;
        break;
      case 'pie':
        console.log(this.chartsData.pie);
        this.chartData =this.chartsData.pie;
        break;
      case 'line':
        this.chartData = this.chartsData.line;
        break;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
