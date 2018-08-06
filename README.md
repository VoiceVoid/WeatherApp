# Weather prediction App
Features:

- Login Screen
The login screen that accepts the following parameters:
● Name ­ Variable name that needs to be stored
● API ID ­ OpenWeatherApi ID that is used on all the API requests

Dashboard
Contains an input element, where user can type a location (default user geolocation)
Displays current weather information for the selected location

Elements:
● Current location Input (supports geolocation)
● Weather table with following fields
○ Weather icon
○ Temperature
○ Humidity
○ Wind speed
○ Wind direction
● Button to switch from F° to C°

Forecast:
Displays a weather forecast for 5 days for the location selected in the dashboard screen.
Elements:
● Weather conditions table with temperatures, wind direction and weather icons.
● A chart, that displays the 3 hour forecast of temperatures.

User information
Screen where user is able to edit his information and change the API access key
Elements:
● User name (input)
● API ID (input)
● Number of server calls in the past 10min with the specified API ID. (label)
● Clear API cache button
● Set Cache invalidation time
● Confirm and Cancel button

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
