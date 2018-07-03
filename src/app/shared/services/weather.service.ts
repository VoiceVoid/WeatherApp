import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class WeatherService {
  apiKey = 'f591a0617876bc5bd4ff6c6223e0d27e';
  url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q='
  lat;
  long;
  city;
  CACHE_SIZE = 5;
 
  constructor(private http: Http) { }

  getWeatherCoord() {
    this.apiKey = localStorage.getItem('apiKey');
    this.lat = localStorage.getItem('lat');
    this.long = localStorage.getItem('long');
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=' + this.lat +
      '&lon=' + this.long +
      '&units=metric&APPID=' + this.apiKey).map(res => res.json()).publishReplay(5).refCount();
  }

  getWeather(city) {
    this.city = city;
    this.apiKey = localStorage.getItem('apiKey');
    return this.http.get(this.url + city + '&units=metric&APPID=' + this.apiKey).map(res =>
      res.json());
  }

  getForecast(city) {
    this.apiKey = localStorage.getItem('apiKey');
    return this.http.get(this.urlForecast + city + '&units=metric&APPID=' + this.apiKey).map(res => res.json());
  }

}
