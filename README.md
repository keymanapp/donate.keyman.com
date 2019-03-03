# Donate

This project was mirrored from [cams-donatinator](https://github.com/cambell-prince/cams-donatinator) and generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.7.

## Installation

Install [nodejs](https://nodejs.org/en/download/)

Install [Composer](https://getcomposer.org/Composer-Setup.exe)

Install [MySql](https://dev.mysql.com/downloads/installer/) and create database `keyman_fa`

Install [FrontAccounting](https://github.com/sillsdev/web-frontaccounting) and deploy locally as `http://bms.keyman.com.local` on IIS. 

Install [FrontAccountingSimpleAPI](https://github.com/sillsdev/web-frontaccounting-simpleapi) as a subfolder *frontaccounting*/modules/api

Install Angular CLI globally and locally (This takes a while)
```
npm install -g @angular/cli
npm install --save-dev @angular/cli@latest
npm install
ng build
```

Install composer dependencies
```
cd htdocs
composer install
```

## Development server

Run `ng serve --public-host=http://donate.keyman.com.local`. Navigate to `http://donate.keyman.com.local:4200` or `localhost:4200`. 
The app will The app will automatically reload if you change any of the source files.

## Debugging with PHPStorm

Install [XDebug](https://xdebug.org/wizard.php) and configure [PhpStorm](https://blog.jetbrains.com/webstorm/2017/01/debugging-angular-apps/).

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
