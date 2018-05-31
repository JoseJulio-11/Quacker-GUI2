angular.module('AppChat').controller('participantsController', ['$http', '$log', '$scope', '$routeParams', '$location', '$route',
    function($http, $log, $scope, $routeParams, $location, $route) {
        var thisCtrl = this;

        $scope.contCtrl = {};
        console.log("Got to contacts!");

        $scope.loadContacts = function(){
            console.log("Got to load!")
            var form = $scope.contCtrl;
            if(form.fname == null) {form.fname = "";}
            if(form.lname == null) {form.lname = "";}
            if(form.search == null) {form.search = "";}
            console.log(form);
            var url = "http://quacker-pr.herokuapp.com/participants/user/" + $routeParams.uid +"/search";

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    $scope.contCtrl.userList = response.data.Users;

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

        $scope.addParticipant = function(contact){
            var form = {"uid": $routeParams.uid, "contact" :contact, "cid": $routeParams.cid};
            console.log(form);
            var url = "http://quacker-pr.herokuapp.com/participants";
            $http.post(url, form).then(// success call back
                function (response){
                // The is the sucess function!
                // Copy the list of parts in the data variable
                // into the list of parts in the controller.
                console.log("response: " + JSON.stringify(response));
                if (response.data.hasOwnProperty('Error')) {
                    alert("Unable to insert(Already on chat)");
                }
                else {
                    alert("Insert successfull");
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

        $scope.goBack = function(){
                $location.path("/chat/" + $routeParams.cid + "/" + $routeParams.uid);
        };
}]);

