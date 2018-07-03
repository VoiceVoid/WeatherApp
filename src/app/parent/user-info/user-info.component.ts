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
  constructor() { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.apiKey = localStorage.getItem('apiKey');
  }

  saveEmployee(){
    localStorage.setItem('username', this.username);
    localStorage.setItem('apiKey', this.apiKey);
    
  }

  cancelEdit(){
    this.username = localStorage.getItem('username');
    this.apiKey = localStorage.getItem('apiKey');
  }


}
