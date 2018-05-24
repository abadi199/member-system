# MemberSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Running in Docker
Generate the image describing the build environment. `docker build --file=Dockerfile.env -t member_search_env .`

### Development Image
Rebuild your dev image: `docker build --file=Dockerfile.dev -t member_search_dev .`
Run your dev image, access on port 80: `docker run -p 80:4200 member_search_dev`

### Production Image
Rebuild your prod image: `docker build --file=Dockerfile.prod -t member_search_prod .`
Run the prod image: `docker run -p 80:80 member_search_prod`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
