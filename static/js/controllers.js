'use strict';

/* Controllers */

function BookController($scope, Book, User){
    $scope.users = User.query();

    $scope.refreshBooks = function(){
        $scope.books = Book.query();
    }

    $scope.clearData = function(){
        $scope.newBook = null;
    }

    $scope.save = function(book){
        book.read = false;
        Book.save({}, book, function(resource){
            $scope.clearData();
            $scope.refreshBooks();
        });
    }

    $scope.remove = function(index){
        var book = $scope.books.objects[index];
        Book.remove({}, book, function(){
            $scope.books.objects.splice(index, 1);
        });
    }
}
