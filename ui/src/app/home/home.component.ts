import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Address } from '../shared/interface/address.interface';
import { Forecast } from '../shared/interface/forecast.interface';
import { AddressService } from '../shared/service/address.service';
import { ForecastService } from '../shared/service/forecast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public model!: Address;
  public error!: boolean;
  public forecasts: Forecast[] = [];

  constructor(
    private addressService: AddressService,
    private forecastService: ForecastService
  ) {
    this.model = {
      state: '',
      zipCode: '',
      address: '',
    };
  }




  buildUrl() {
    this.error = false;
    this.forecasts.length = 0;
    const {  address } = this.model;

    this.addressService
      .getCoordinates(address)
      .pipe(
        switchMap(({ result }) => {
          const {x, y} = result.addressMatches[0].coordinates;
          return this.forecastService.getForecast(y, x);
        }),
        switchMap(({ properties }) =>
          this.forecastService.getForecastSevenDays(properties.forecast)
        )
     )
      .subscribe({
        next: (forecast) => {
          this.fillForecast(forecast);
        },
        error: () => {
          this.error = true;
          this.forecasts.length = 0;
        },
      });
  }

  private fillForecast(next: { properties: { periods: Forecast[]; }; }) {
    const { periods } = next.properties;
    this.forecasts = periods;
    this.error = false;
  }
}
