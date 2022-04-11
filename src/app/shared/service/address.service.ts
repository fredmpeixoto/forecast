import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

interface ResultAddress {
  result: {
    addressMatches: {
      coordinates: {
        x: number;
        y: number;
      };
    }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  //example https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=1600+Amphitheatre+Parkway+Mountain+View,+CA+9404&benchmark=2020&benchmark=4&vintage=4&format=json

  getCoordinates(requestType: string, address: string, benchmark: string) {
    const addressAndStreetName = address.trim().split(' ').join('+');

    const url = `https://geocoding.geo.census.gov/geocoder/locations/${requestType}?address=${addressAndStreetName}&benchmark=${benchmark}&format=json`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
      }),
    };
    return this.http.get<ResultAddress>(url, {
      responseType: 'json',
      headers: httpOptions.headers,
    });
  }
}
