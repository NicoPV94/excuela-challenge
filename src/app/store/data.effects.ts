import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as DataActions from './data.actions';
import { LocalDataService } from '../shared/services/localData.service';
import { ColorService } from '../shared/services/color.service';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';

@Injectable()
export class DataEffects {

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.loadData),
      mergeMap(() =>
        this.localDataService.getData().pipe(
          map((data) => {
            const formattedData: { bar: ChartConfiguration['data'], pie: ChartConfiguration['data'], line: ChartConfiguration['data'] } = {
              bar: { labels: [], datasets: [] },
              pie: { labels: [], datasets: [] },
              line: { labels: [], datasets: [] }
            };
            //Formatear data de los gráficos para que queden en la estructura que ng2-charts ocupa al momento de
            //ser buscada del store.
            Object.keys(data).forEach((chartType) => {
              switch (chartType) {
                case 'bar':
                  const barChartData = data['bar'][0];
                  formattedData['bar'] = {
                    labels: barChartData.data.map((e) => e.name),
                    datasets: [
                      {
                        label: barChartData.label,
                        data: barChartData.data.map((e) => e.videoMinutes),
                        backgroundColor: this.colorService.getRandomColors(barChartData.data.length, 0.4),
                        borderColor: this.colorService.getBorderColors(),
                        borderWidth: 1,
                      },
                    ]
                  }
                  break;
                case 'pie':
                  const pieChartData = data['pie'][0];
                  formattedData['pie'] = {
                    labels: pieChartData.data.map((e) => e.label),
                    datasets: [
                      {
                        data: pieChartData.data.map((e) => e.value),
                        backgroundColor: this.colorService.getRandomColors(pieChartData.data.length, 0.8),
                        borderWidth: 1,
                      },
                    ]
                  }
                  break;
                case 'line':
                  const lineChartData = data['line'][0];
                  formattedData['line'] = {
                    labels: lineChartData.data.map((e) => e.month),
                    datasets: [
                      {
                        label: lineChartData.label,
                        data: lineChartData.data.map((e) => e.userCount),
                        backgroundColor: this.colorService.getRandomColor(),
                        tension: 0.5
                      },
                    ]
                  }
                  break;
              }
            });

            return DataActions.loadDataSuccess({ data: formattedData })
          }),
          catchError((error) => of(DataActions.loadDataFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private localDataService: LocalDataService,
    private colorService: ColorService
  ) { }
}
