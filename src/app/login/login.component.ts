import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  apiKey: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  weatherEmployee() {
    localStorage.setItem('username', this.username);
    localStorage.setItem('apiKey', this.apiKey);
    this.router.navigate(['dashboard']);

  }
}
