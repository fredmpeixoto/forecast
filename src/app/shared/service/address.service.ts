import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  //example https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=1600+Amphitheatre+Parkway+Mountain+View,+CA+9404&benchmark=2020&format=json
  
  getCoordinates(requestType:string, address:string, benchmark:string){
    const addressAndStreetName = address.trim().split(' ').join('+');
   
    const url = `https://geocoding.geo.census.gov/geocoder/locations/${requestType}?address=${addressAndStreetName}&benchmark=${benchmark}&format=json`
    console.log(url);

    return this.http.get(url)
  }
}