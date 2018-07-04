import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  username;
  apiKey;
  cacheTime;
  apiCalls;
  clearCache;
  
  constructor() { }

  ngOnInit() {
    this.getApiCalls();
    // console.log(this.apiCalls.date);
    // const date = new Date("11/21/1987 16:00:00"); // some mock date
    // const milliseconds = date.getTime(); 
    //console.log(milliseconds);
    this.username = localStorage.getItem('username');
    this.apiKey = localStorage.getItem('apiKey');
  }

  saveEmployee(){
    localStorage.setItem('username', this.username);
    localStorage.setItem('apiKey', this.apiKey);
    if (this.clearCache) {
      localStorage.removeItem('apiCalls');
      localStorage.removeItem('cities');
      localStorage.removeItem('forecasts');
      this.getApiCalls();
      localStorage.setItem('cacheTime', JSON.stringify(this.cacheTime));
    }
  }

  cancelEdit(){
    this.username = localStorage.getItem('username');
    this.apiKey = localStorage.getItem('apiKey');
  }

  getApiCalls() {
    this.apiCalls = JSON.parse(localStorage.getItem('apiCalls'));
    const now = new Date().getTime();
    this.apiCalls = this.apiCalls.filter( e => now - new Date(e.date).getTime() < 600000)
    // const time = new Date(this.apiCalls[4].date);
    // console.log("this is api call: " + time.getTime());
    // console.log("this is now: " + now);
    // console.log(now - time.getTime());
    // console.log(this.apiCalls[0].date);
  }
}
