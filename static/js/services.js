'use strict';

/* Services */

BookShelfApp.factory('Book', ['$resource', function($resource){
    return $resource('/api/v1/book/:bookId', {
        "bookId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
        update:  { method:'PUT' },
    })
}]);

BookShelfApp.factory('Author', ['$resource', function($resource){
    return $resource('/api/v1/author/:authorId', {
        "authorId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
        update:  { method:'PUT' },
    })
}]);

BookShelfApp.factory('UserBooks', ['$resource', function($resource){
    return $resource('/api/v1/book/?user__username=:username', {
        "username": "@username"
    }, {
        query:   { method:'GET', isArray: false },
    })
}]);

BookShelfApp.factory('User', ['$resource', function($resource){
    return $resource('/api/v1/user/:userId/', {
        "userId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
        update:  { method:'PUT' },
    })
}]);
