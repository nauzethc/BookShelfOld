'use strict';

/* Controllers */

function BookController($scope, $http, Book, UserBooks, User) {
    $scope.users = User.query();
    $scope.showLibrary = false;
    $scope.orderBooks = 'title';
    $scope.operationStatus = 'This is status';

    // Common operations
    $scope.getBooks = function(user) {
        if (typeof user === 'undefined'){
            $scope.books = null;
            $scope.showLibrary = false;
        } else {
            $scope.books = UserBooks.query({}, user, function(){
                $scope.showLibrary = true;
            });
        }
    };
    $scope.save = function(book) {
        book.user = $scope.user.resource_uri;
        Book.save({}, book, function(resource, status) {
            // Clear form
            $scope.clearData();
            // Get new book from API and add it to list
            var headers = status();
            $http.get(headers.location).success(function(book) {
                $scope.books.objects.push(book);
            });
        });
    };
    $scope.remove = function(book) {
        var index = $scope.books.objects.indexOf(book);
        Book.remove({}, book, function() {
            $scope.books.objects.splice(index, 1);
        });
    };
    $scope.update = function(book) {
        Book.update({}, book);
    };

    // Specific form operations
    $scope.setOrder = function(order) {
        $scope.orderBooks = order;
    };
    $scope.setTitle = function(book) {
        this.book.title = this.newTitle;
        $scope.update(book);
        this.disableEditor();
    };

    // Edit-in-place Title
    $scope.enableEditor = function() {
        this.newTitle = this.book.title;
        this.showEditor = true;
    };
    $scope.disableEditor = function() {
        this.showEditor = false;
    }

    // Reset form
    $scope.clearData = function() {
        $scope.newBook = null;
    };
}
