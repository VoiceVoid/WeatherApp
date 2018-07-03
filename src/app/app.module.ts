import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './parent/dashboard/dashboard.component';
import { ForecastComponent } from './parent/forecast/forecast.component';
import { UserInfoComponent } from './parent/user-info/user-info.component';
import { WeatherService } from './shared/services/weather.service';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { ParentComponent } from './parent/parent.component';
import { AuthGuard } from './auth/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ForecastComponent,
    UserInfoComponent,
    ParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [WeatherService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
