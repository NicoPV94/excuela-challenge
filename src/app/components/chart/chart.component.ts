import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  imports: [BaseChartDirective],
})
export class ChartComponent {
  @Input() chartType: ChartType = 'bar';
  @Input() chartData: ChartConfiguration['data'] = {labels: [], datasets: []};
  chartOptions: ChartOptions = {};
  chartLegend = true;

  ngOnChanges(): void {
    this.updateChartOptions();
  }

  private updateChartOptions() {
    switch (this.chartType) {
      case 'bar':
        this.chartOptions = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: true
        };
        break;
    }
  }
}
