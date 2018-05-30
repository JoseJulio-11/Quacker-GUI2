(function() {

    var app = angular.module('AppChat',['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $location) {
        $routeProvider.when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs : 'loginForm'
        }).when('/chat/:cid/:uid', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatController',
            controllerAs : 'chatCtrl'
        }).when('/chatlist/:uid', {
            templateUrl: 'pages/chatlist.html',
            controller: 'ChatListController',
            controllerAs : 'chatListCtrl'
        }).when('/chatedit', {
            templateUrl: 'pages/chatedit.html',
            controller: 'ChatEditController',
            controllerAs : 'chatEditCtrl'
        }).when('/useredit', {
            templateUrl: 'pages/useredit.html',
            controller: 'UserEditController',
            controllerAs : 'userCtrl'
        }).when('/messageinfo/:mid', {
            templateUrl: 'pages/messageinfo.html',
            controller: 'MessageController',
            controllerAs : 'messageCtrl'
        }).when('/participants/:uid', {
            templateUrl: 'pages/participantsAdd.html',
            controller: 'participantsController',
            controllerAs : 'partCtrl'
        }).when('/contacts/:uid', {
            templateUrl: 'pages/contactsAdd.html',
            controller: 'contactsController',
            controllerAs : 'contCtrl'
        }).otherwise({
            redirectTo: '/login'
        });
    }]);

})();
