import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  weatherData;
  weatherForecast;
  lat = 0;
  long = 0;
  celsius = true;
  iconCode;
  iconPath;
  cities = [];
  apiCalls = [];
  city = '';
  constructor(private weatherService: WeatherService) { }
 
  ngOnInit() {
    this.apiCalls = [];
    this.findCurrentLocation();
    this.getCity();

  }

  findCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = Math.round(position.coords.latitude);
        localStorage.setItem('lat', JSON.stringify(this.lat));
        this.long = Math.round(position.coords.longitude);
        localStorage.setItem('long', JSON.stringify(this.long));
      });
    } else {
      "Geolocation is not turned on";
    }
  }

  findCity() {
    this.cities = JSON.parse(localStorage.getItem('cities'));
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name.toLowerCase() === this.city.toLowerCase()) {
        console.log(this.cities[i].name);
        this.weatherData = this.cities[i];
        console.log('this is the city: ' + this.cities[i].name);
        localStorage.setItem('city', JSON.stringify(this.cities[i].name));
        this.city = this.cities[i].name;
        console.log('using cahce to get data');
        return;
      }
    }
    console.log('checking network');
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
      this.createApiCall();
      console.log("this is weather data: " + this.weatherData.name);
      this.cities = JSON.parse(localStorage.getItem('cities'));
      console.log(this.cities);
      if (this.cities.length === 5) {
        this.cities.shift();
        this.cities.push(this.weatherData);
        localStorage.setItem('cities', JSON.stringify(this.cities));
        console.log('added and took one out');
      } else {
        this.cities.push(this.weatherData)
        localStorage.setItem('cities', JSON.stringify(this.cities));
        console.log('added one');
      }

      localStorage.setItem('city', JSON.stringify(this.city));
      this.iconCode = this.weatherData.weather[0].icon;
      this.iconPath = "http://openweathermap.org/img/w/" + this.iconCode + ".png";
      console.log(this.weatherData);
    });
  }


  toggleTemp() {
    this.celsius = !this.celsius;
  }


  getCity() {
    if (localStorage.getItem('cities') === null) {
      this.weatherService.getWeatherCoord().subscribe((data) => {
        console.log(data);
        this.weatherData = data;
        console.log(this.weatherData);
        this.city = this.weatherData.name;
        this.cities.push(this.weatherData);
        localStorage.setItem('cities', JSON.stringify(this.cities));
        localStorage.setItem('city', JSON.stringify(this.city));
        this.iconCode = this.weatherData.weather[0].icon;
        this.iconPath = 'http://openweathermap.org/img/w/' + this.iconCode + '.png';
        ////saving API CALL
        this.createApiCall();
        console.log(this.weatherData);
      });
    } else {
      console.log('i am checking cache first');
      const oneCity = JSON.parse(localStorage.getItem('cities'));
      console.log(oneCity);
      this.weatherData = oneCity[0];
      console.log(this.weatherData);
      //this.city = oneCity[0].name;
      this.city = JSON.parse(localStorage.getItem('city'));
    }
  }


  createApiCall() {
    const apiKey = localStorage.getItem('apiKey');
    const apiCall = {
      apiId: apiKey,
      date: new Date(),
      city: this.city,
      type: 'city'
    };
    console.log('am i being used');
    if (localStorage.getItem('apiCalls') === null) {
      this.apiCalls.push(apiCall);
      localStorage.setItem('apiCalls', JSON.stringify(this.apiCalls));
    } else {
      this.apiCalls = JSON.parse(localStorage.getItem('apiCalls'));
      this.apiCalls.push(apiCall);
      localStorage.setItem('apiCalls', JSON.stringify(this.apiCalls));
    }
  }
}
