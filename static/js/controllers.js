'use strict';

/* Controllers */

function BookShelfController($scope, $http, Author, Book, UserBooks, User) {
    $scope.books = {};
    $scope.users = User.query();
    $scope.authors = Author.query();
    $scope.showBookShelf = false;
    $scope.orderBooks = 'title';
    $scope.alertClass = '';
    $scope.alertMessage = '';


    // Common operations
    $scope.getBooks = function(user) {
        if (typeof user === 'undefined'){
            $scope.books = null;
            $scope.showBookShelf = false;
        } else {
            $scope.books = UserBooks.query({}, user, function(){
                $scope.showBookShelf = true;
            });
        }
    };

    $scope.selectBook = function(book) {
        $scope.selectedBook = book;
    }


    // User
    $scope.saveUser = function(user) {
        user.username = user.first_name.toLowerCase() + user.last_name.toLowerCase().slice(0,2);
        console.log(user);
        User.save({}, user,
            function(resource, status) {
                $scope.clearUserData();
                var headers = status();
                $http.get(headers.location).success(function(user) {
                    $scope.users.objects.push(user);
                });
            },
            function() {
                alert("Could not add new user!");
            }
        );
    };
    $scope.refreshUsername = function(first_name) {
        $scope.newUser.username = first_name.toLowerCase();
    }

    // Author
    $scope.saveAuthor = function(author) {
        Author.save({}, author,
            function(resource, status) {
                // Clear form
                $scope.clearAuthorData();
                // Get new book from API
                var headers = status();
                $http.get(headers.location).success(function(author) {
                    $scope.authors.objects.push(author);
                    $scope.showAlert(true, "The Author was added successfuly");
                });
            },
            function() {
                $scope.showAlert(false, "There was an error adding the author");
            }
        );
    };


    // Book
    $scope.saveBook = function(book) {
        book.user = $scope.user.resource_uri;
        Book.save({}, book,
            function(resource, status) {
                // Clear form
                $scope.clearBookData();
                // Get new book from API and add it to list
                var headers = status();
                $http.get(headers.location).success(function(book) {
                    $scope.books.objects.push(book);
                    $scope.showAlert(true, "The book was added successfuly!");
                });
            },
            function(){
                $scope.showAlert(false, "There was an error adding the book!");
            }
        );
    };

    $scope.removeBook = function(book) {
        var index = $scope.books.objects.indexOf(book);
        Book.remove({}, book,
            function() {
                $scope.books.objects.splice(index, 1);
                $scope.showAlert(true, "The book was removed from your BookShelf!");
            },
            function(){
                $scope.showAlert(false, "The book couldn't be removed!");
            }
        );
    };

    $scope.updateBook = function(book) {
        Book.update({}, book);
    };


    // Specific form operations
    $scope.setOrder = function(order) {
        $scope.orderBooks = order;
    };

    $scope.setBookTitle = function(book) {
        this.book.title = this.newTitle;
        $scope.updateBook(book);
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

    // Reset forms
    $scope.clearBookData = function() {
        $scope.newBook = null;
    };
    $scope.clearAuthorData = function() {
        $scope.newAuthor = null;
    }
    $scope.clearUserData = function() {
        $scope.newUser = null;
    }

    // Set alert
    $scope.showAlert = function(success, msg) {
        if (success){
            $scope.alertClass = 'alert-success';
        } else {
            $scope.alertClass = 'alert-error';
        }
        $scope.alertMessage = msg;
        $('.alert .close').bind('click', function(event) {
            $(this).parent().fadeOut();
        });
        $('.alert').fadeIn();
    }
}
