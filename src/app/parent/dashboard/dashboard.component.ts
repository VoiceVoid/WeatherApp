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
  constructor(private weatherService: WeatherService) { }
  city = '';
  ngOnInit() {
  
    this.findCurrentLocation();
    this.weatherService.getWeatherCoord().subscribe((data) => {
      this.weatherData = data;
      this.city = this.weatherData.name;
        localStorage.setItem('city', this.city);
      this.iconCode = this.weatherData.weather[0].icon;
      this.iconPath = "http://openweathermap.org/img/w/" + this.iconCode + ".png";
      console.log(this.weatherData);
    });
   
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
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
      localStorage.setItem('city', this.city);
      this.iconCode = this.weatherData.weather[0].icon;
      this.iconPath = "http://openweathermap.org/img/w/" + this.iconCode + ".png";
      console.log(this.weatherData);
    });
  }

  toggleTemp() {
    this.celsius = !this.celsius;
  }

}
