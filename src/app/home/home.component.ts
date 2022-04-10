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
export class HomeComponent implements OnInit {
  public model!: Address;
  public error!: boolean;
  public forecasts: Forecast[] = [];

  constructor(
    private addressService: AddressService,
    private forecastService: ForecastService
  ) {
    this.model = {
      city: '',
      numberAndStreetName: '',
      state: '',
      zipCode: '',
      returntype: 'location',
      searchtype: 'onelineaddress',
      benchmark: '2020',
      address: '',
    };
  }

  ngOnInit(): void {
    //to do remove code for test
    // this.forecastService.getForecastSevenDays('https://api.weather.gov/gridpoints/MTR/93,87/forecast')
    // .subscribe(({next: (next)=> {
    //   this.fillForecast(next);
    // }}))
  }


  buildUrl() {
    this.error = false;
    const { searchtype, address, benchmark } = this.model;

    this.addressService
      .getCoordinates(searchtype, address, benchmark)
      .pipe(
        switchMap(() => this.forecastService.getForecast()),
        switchMap(({ properties }) =>
          this.forecastService.getForecastSevenDays(properties.forecast)
        )
      )
      .subscribe({
        next: (next) => {
          this.fillForecast(next);
        },
        error: () => {
          this.error = true;
        },
      });
  }

  private fillForecast(next: { properties: { periods: Forecast[]; }; }) {
    const { periods } = next.properties;
    this.forecasts = periods;
    this.error = false;
  }
}
