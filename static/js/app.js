'use strict';

/* App Module */
var Library = {};

var LibraryApp = angular.module('Library', ['ui', 'ngResource']);

LibraryApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
});
