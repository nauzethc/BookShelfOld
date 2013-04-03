'use strict';

/* App Module */
var BookShelf = {};

var BookShelfApp = angular.module('BookShelf', ['ngResource']);

BookShelfApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
});
