angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$routeParams', '$location', '$route',
    function($http, $log, $scope, $routeParams, $location, $route) {
        var thisCtrl = this;

        $scope.chatCtrl = {};
        $scope.rid = null;
        $scope.replyLabel = 'NO';
        console.log("Got to chat!")
        $scope.loadMessages = function(cid){
            console.log("Got to load!" + cid)
            var url = "http://quacker-pr.herokuapp.com/messages/chat/" + cid;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    $scope.chatCtrl.messageList = response.data.Messages;

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

        $scope.postMsg = function(){
            var form = {"uid": $routeParams.uid, "text" : $scope.chatCtrl.newText, "cid" : $routeParams.cid, "rid" : $scope.rid};
            console.log(form);
            var url = "http://quacker-pr.herokuapp.com/messages/chat/" + $routeParams.cid;
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.
                console.log("response: " + JSON.stringify(response));
                if (response.data.hasOwnProperty('Error')) {
                    alert("Unable to insert");
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
                else {
                    alert("Error interno del sistema.");
                }
            });
        };

        $scope.loadMessages($routeParams.cid);

        $scope.likeMessage = function(mid){
            var form = {"uid": $routeParams.uid, "mid" : mid, "vote" : 1};
            console.log(form);
            var url = "http://quacker-pr.herokuapp.com/reactions/like";
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.
                console.log("response: " + JSON.stringify(response));
                if (response.data.hasOwnProperty('Error')) {
                    alert("Unable to insert");
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
                else {
                    alert("Error interno del sistema.");
                }
            });
        };

        $scope.dislikeMessage = function(mid){
            var form = {"uid": $routeParams.uid, "mid" : mid, "vote" : -1};
            console.log(form);
            var url = "http://quacker-pr.herokuapp.com/reactions/like";
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.
                console.log("response: " + JSON.stringify(response));
                if (response.data.hasOwnProperty('Error')) {
                    alert("Unable to insert");
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
                else {
                    alert("Error interno del sistema.");
                }
            });
        };

        $scope.refresh = function() {
            $route.reload();
        };


        $scope.goBack = function(){
                $location.path("/chatlist/" + $routeParams.uid);
        };

        $scope.goToParticipants = function(){
            $location.path("/participants/" + $routeParams.cid + "/" + $routeParams.uid);
        };

        $scope.searchMsg = function(){
            var form = {"search" : $scope.chatCtrl.newText};
            console.log(form);
            var url = "http://quacker-pr.herokuapp.com/messages/chat/" + $routeParams.cid + "/search";
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.
                console.log("response: " + JSON.stringify(response));
                if (response.data.hasOwnProperty('Error')) {
                    alert("Unable to search");
                    $route.reload();
                }
                else {
                    $scope.chatCtrl.messageList = response.data.Messages;
                }
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

        $scope.reply = function(mid) {
            console.log(mid);
            if(mid == null) {
                $scope.rid = null;
                $scope.replyLabel = 'NO';
            }
            else {
                $scope.rid = mid;
                $scope.replyLabel = 'YES';
            }
        };

        $scope.memInfo = function(mid){
            console.log(mid);
            $location.path("/messageinfo/" + $routeParams.cid + "/" + $routeParams.uid + "/" + mid);
        };
}]);
