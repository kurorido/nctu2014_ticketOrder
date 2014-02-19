var myapp = angular.module("myapp", ["firebase"]);

function ticketorderController($scope, $firebase) {
	var ref = new Firebase("https://ticketorder.firebaseio.com/");
	$scope.messages = $firebase(ref);
}