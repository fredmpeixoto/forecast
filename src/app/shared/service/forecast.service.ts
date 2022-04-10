import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from '../interface/forecast.interface';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  //ex: https://api.weather.gov/points/37.4235,-122.0868
  getForecast(
    latitude: string = '37.4235',
    longitude: string = '-122.0868'
  ): Observable<{
    properties: { forecast: string };
  }> {
    const url = `https://api.weather.gov/points/${latitude},${longitude}`;
    return this.http.get<{ properties: { forecast: string } }>(url);
  }

  //ex: https://api.weather.gov/gridpoints/MTR/93,87/forecast
  getForecastSevenDays(url: string): Observable<{
    properties: { periods: Forecast[] };
  }> {
    return this.http.get<{
      properties: { periods: Forecast[] };
    }>(url);
  }
}
