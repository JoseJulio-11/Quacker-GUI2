angular.module('AppChat').controller('ChatListController', ['$http', '$log', '$scope', '$routeParams', '$location',
    function($http, $log, $scope, $routeParams, $location) {
        var thisCtrl = this;

        $scope.mainCtrl = {};
        
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

        $scope.goToChat = function(cid){
            console.log(cid);
            $location.path("/chat/" + cid + "/" + $routeParams.uid);
        };

        console.log("Got inside the second js")

        $scope.loadChats($routeParams.uid);


}]);
