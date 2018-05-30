angular.module('AppChat').controller('ChatListController', ['$http', '$log', '$scope', '$routeParams', '$location', '$route',
    function($http, $log, $scope, $routeParams, $location, $route) {
        var thisCtrl = this;

        $scope.mainCtrl = {};
        $scope.chatForm = {};
        $scope.isGroupChat = 'f';
        $scope.groupLabel = "YES";

        $scope.loadChats = function(uid){

            console.log(uid);
            var url = "http://quacker-pr.herokuapp.com/chats/user/" + uid;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));
                    $scope.mainCtrl.chatList = response.data.Chats;
                    console.log($scope.mainCtrl.chatList)

            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });
        };

        $scope.goToContacts = function(){
            $location.path("/contacts/" + $routeParams.uid);
        };

        $scope.goToChat = function(cid){
            console.log(cid);
            $location.path("/chat/" + cid + "/" + $routeParams.uid);
        };

        $scope.group = function(text) {
            if(text == 'YES') {
                $scope.isGroupChat = 't';
                $scope.groupLabel = text;
            }
            else {
                $scope.isGroupChat = 'f'; 
                $scope.groupLabel = text;
            }
        }

        $scope.create = function(){
            var form = $scope.chatForm;
            form.uid = $routeParams.uid;
            form.isGroupChat = $scope.isGroupChat;
            var url = "http://quacker-pr.herokuapp.com/chats";
            console.log("Got inside the function")

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.
                console.log("response: " + JSON.stringify(response));
                if (response.data.hasOwnProperty('Error')) {
                    alert("Something went wrong");
                    $route.reload();
                }
                else {
                    $route.reload();
                }
            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                console.log(status)
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else if(status == 500){
                    alert("Something wrong in api")
                }
                else {
                    alert("Error interno del sistema.");
                }
            });
        };

        console.log("Got inside the second js")

        $scope.loadChats($routeParams.uid);


}]);
