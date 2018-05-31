angular.module('AppChat').controller('MessageController', ['$http', '$log', '$scope', '$routeParams', '$location', '$route',
    function($http, $log, $scope, $routeParams, $location, $route) {
        var thisCtrl = this;

        $scope.memCtrl = {};
        console.log("Got to chat!")
        
        $scope.loadLikes = function(mid){
            console.log("Got to load!" + mid)
            var url = "http://quacker-pr.herokuapp.com/users/message/liked/" + mid;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    $scope.memCtrl.likeList = response.data.Users;

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

        $scope.loadDislikes = function(mid){
            console.log("Got to load!" + mid)
            var url = "http://quacker-pr.herokuapp.com/users/message/disliked/" + mid;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    $scope.memCtrl.dislikeList = response.data.Users;

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

        $scope.goBack = function(){
            $location.path("/chat/" + $routeParams.cid + "/" + $routeParams.uid);
        };

        $scope.loadLikes($routeParams.mid);
        $scope.loadDislikes($routeParams.mid);



}]);
