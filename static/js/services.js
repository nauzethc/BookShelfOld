'use strict';

/* Services */

LibraryApp.factory('Book', ['$resource', function($resource){
    return $resource('/api/v1/book/:bookId/', {
        "bookId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
        update:  { method:'PUT' },
    })
}]);

LibraryApp.factory('User', ['$resource', function($resource){
    return $resource('/api/v1/user/:userId/', {
        "userId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
    })
}]);
