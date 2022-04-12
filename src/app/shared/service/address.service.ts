import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getCoordinates(address: string) {
    const addressAndStreetName = address.trim().split(' ').join('+');
    const url = `${environment.api}/Weather?address=${addressAndStreetName}`;
    return this.http.get<ResultAddress>(url);
  }
}
