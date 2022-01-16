# Donate

This project was mirrored from
[cams-donatinator](https://github.com/cambell-prince/cams-donatinator) and
generated with [Angular CLI](https://github.com/angular/angular-cli) version
1.4.7.

## Installation

Install [nodejs](https://nodejs.org/en/download/)

Install Angular CLI globally and locally (This takes a while)
```
npm install -g @angular/cli
npm install --save-dev @angular/cli@latest
npm install
ng build
```

## Environment

Set the `sk_test` environment variable to the Stripe secret key:

  ```sh
  export sk_test=####
  ```

Use the legacy provider for openssl:

  ```sh
  export NODE_OPTIONS=--openssl-legacy-provider
  ```

## Development server

Run the server:

  ```sh
    ng serve --host=donate.keyman-local.com
  ```

Navigate to `http://donate.keyman-local.com:4200`.

The app will The app will automatically reload if you change any of the source
files.

Alternatively, you can also run the server:

  ```
  ng build --prod
  npm run start
  ```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
