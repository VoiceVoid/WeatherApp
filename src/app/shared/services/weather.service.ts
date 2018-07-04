import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cacheable, CacheBuster } from 'ngx-cacheable';
import 'rxjs/add/observable/of'; //proper way to import the 'of' operator
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {
  apiKey = 'f591a0617876bc5bd4ff6c6223e0d27e';
  url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q='
  lat;
  long;
  city;
  
  private data;
  private observable: Observable<any>;

  constructor(private http: Http) { }


  getWeatherCoord() {
    this.apiKey = localStorage.getItem('apiKey');
    this.lat = localStorage.getItem('lat');
    this.long = localStorage.getItem('long');
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=' + this.lat +
      '&lon=' + this.long +
      '&units=metric&APPID=' + this.apiKey).map(res => res.json());
  }


  getWeather(city) {
    const cacheTime = JSON.parse(localStorage.getItem('cacheTime'));
    const headers = new Headers();
    headers.append('Cache-Control:', 'public, max-age=' + cacheTime);
    this.city = city;
    this.apiKey = localStorage.getItem('apiKey');
    return this.http.get(this.url + city + '&units=metric&APPID=' + this.apiKey).map(res => res.json());
  }


  getForecast(city) {
    this.apiKey = localStorage.getItem('apiKey');
    return this.http.get(this.urlForecast + city + '&units=metric&APPID=' + this.apiKey).map(res => res.json());
  }


}
