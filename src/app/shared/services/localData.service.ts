import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartData } from '../models/chartData.model';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<ChartData> {
    return this.http.get<ChartData>('assets/data/data.json');
  }
}
