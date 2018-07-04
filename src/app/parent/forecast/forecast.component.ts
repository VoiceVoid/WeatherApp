import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecast;
  forecast2 = [];
  forecasts = [];
  week = [];
  city;
  chart = [];
  apiCalls = [];
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    
    this.getForecasts();
  }



  getForecasts() {
    this.city = JSON.parse(localStorage.getItem('city'));
    console.log(this.city);


    if (localStorage.getItem('forecasts') !== null) {
      console.log('do i get this far');
      this.forecasts = JSON.parse(localStorage.getItem('forecasts'));
      console.log(this.forecasts);
      for (let i = 0; i < this.forecasts.length; i++) {
        ////if there is saved data and the city is the same we already searched///
        if (this.forecasts[i][0].city.toLowerCase() === this.city.toLowerCase()) {

          const days = this.forecasts[i];
          // console.log(days);
          this.week = [];
          for (let j = 0; j < this.forecasts[i].length; j += 8) {
            this.week.push(days[j]);
            //console.log(this.week);
          }
          //this.city = this.forecasts[i][0].city;
          //this.graphChart(days);
          console.log('using cahce to get data');
          return;
        }
        //if we have data and city is not the one we searched
      }
    }

      if (localStorage.getItem('forecasts') === null) {
        console.log('i am here');
        this.weatherService.getForecast(this.city).subscribe(data => {
          console.log(data.list);
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
          console.log(this.forecast2);
          this.createApiCall();
          //this.forecasts = JSON.parse(localStorage.getItem('forecasts'));
          this.forecasts.push(this.forecast2);
          localStorage.setItem('forecasts', JSON.stringify(this.forecasts));
          this.week = [];
          for (let i = 0; i < this.forecast2.length; i += 8) {
            this.week.push(this.forecast2[i]);
          }
          console.log(this.week);
          this.graphChart(data);
        });
      } else {

        // const city = JSON.parse(localStorage.getItem('city'));
        console.log('trying to add new city');
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
          this.createApiCall();
          const fore = JSON.parse(localStorage.getItem('forecasts'));
          console.log(fore);
          if (fore.length === 5) {
            fore.shift();
            fore.push(this.forecast2);
            localStorage.setItem('forecasts', JSON.stringify(fore));
            console.log('added and took one out');
          } else {
            fore.push(this.forecast2);
            localStorage.setItem('forecasts', JSON.stringify(fore));
            console.log('added one');
          }
          this.week = [];
          for (let k = 0; k < this.forecast2.length; k += 8) {
            this.week.push(this.forecast2[k]);
          }
          console.log(this.week);
          this.graphChart(data);
        });
      }

    
  }
  //END OF FORECAST






  graphChart(data) {
    //for graph data
    const alldates = data['list'].map(resp => resp.dt);
    const temp = data['list'].map(resp => resp.main.temp);
    const weatherDates = [];
    alldates.forEach(element => {
      const jsdate = new Date(element * 1000);
      weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
    });
    // console.log('all dates' + alldates);
    // console.log('all weather dates' + weatherDates);
    // console.log('temperature ' + temp);
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
  }

  createApiCall() {
    const apiKey = localStorage.getItem('apiKey');
    const apiCall = {
      apiId: apiKey,
      date: new Date(),
      city: this.city,
      type: 'forecast'
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
