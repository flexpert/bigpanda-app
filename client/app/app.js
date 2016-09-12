'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';


import {
  routeConfig
} from './app.config';

import main from './main/main.component';
import constants from './app.constants';

import './app.scss';

angular.module('bigpandaApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap,
    main, constants
  ])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['bigpandaApp'], {
      strictDi: true
    });
  });
