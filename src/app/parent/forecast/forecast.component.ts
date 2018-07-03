import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecast;
  forecast2;
  week = [];
  city;
  chart = [];
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.city = localStorage.getItem('city');
    console.log(this.city);
    this.weatherService.getForecast(this.city).subscribe(data => {
      this.forecast = data.list;
      this.forecast2 = this.forecast.map(each => {
        return {
          city: data.city.name,
          date: each.dt_txt,
          icon: each.weather[0].icon,
          wind: each.wind.deg,
          temperature: each.main.temp
        };

      });
      for (let i = 0; i < this.forecast2.length; i += 8) {
        this.week.push(this.forecast2[i]);
      }
      //for graph data
      const alldates = data['list'].map(resp => resp.dt);
      const temp = data['list'].map(resp => resp.main.temp);
      const weatherDates = [];
      alldates.forEach(element => {
        const jsdate = new Date(element * 1000);
        weatherDates.push(jsdate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
      });
      console.log(alldates);
      console.log(weatherDates);
      console.log(temp);
      // console.log(this.forecast);
      // console.log(this.week);
      // console.log(this.forecast2);
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp,
              borderColor: '#3cba9f',
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });
    });
   
}

}
