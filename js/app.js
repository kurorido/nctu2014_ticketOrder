var myapp = angular.module("myapp", ["firebase"]);

function ticketorderController($scope, $firebase) {
	$scope.hoods = [{
		value: 'A0',
		id: 'A0',
		price: 0,
		taken: 0,
	},{
		value: 'A1',
		id: 'A1',
		price: 0,
		taken: 0,
	},{
		value: 'A2',
		id: 'A2',
		price: 0,
		taken: 0,
	}];

	$scope.init = function(seat) {

		var ref = $firebase(new Firebase("https://ticketorder.firebaseio.com/seat/"+seat));

		ref.$on('loaded', function(values) {
			$scope.price = values['price'];
			$scope.taken = values['taken'];
		});

		$scope.updateCount = function(forecast) {

			//Increment counters
			if (forecast == "sun") {
				$scope.price += 1;
				ref.$child("price").$set($scope.price);
			} else {
				$scope.taken += 1;
				ref.$child("taken").$set($scope.taken);
			}

			//Check values and update weather image
			if ($scope.price >= $scope.taken) {
				$scope.weather = "price";
			} else {
				$scope.weather = "taken";
			}
		}
	}

	function writeMessage(message) {
		text.setText(message);
		layer.draw();
	}

	var stage = new Kinetic.Stage({
		container: 'container',
		width: 578,
		height: 200
	});

	var layer = new Kinetic.Layer();

	var text = new Kinetic.Text({
		x: 10,
		y: 10,
		fontFamily: 'Calibri',
		fontSize: 24,
		text: '',
		fill: 'black'
	});

	var numEvents = 0;

	var rect0 = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: 50,
		height: 50,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 4,
		id: 'a0'
	});

	var rect1 = new Kinetic.Rect({
		x: 100,
		y: 0,
		width: 50,
		height: 50,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 4,
		id: 'a1'
	});

	var rect2 = new Kinetic.Rect({
		x: 200,
		y: 0,
		width: 50,
		height: 50,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 4,
		id: 'a2'
	});

	rect0.on('mouseup touchend', function() {
		writeMessage('A0');
	});

	rect1.on('mouseup touchend', function() {
		var ref = $firebase(new Firebase("https://ticketorder.firebaseio.com/seat/A1"));
		$scope.hoods[1].price += 1;
		ref.$child("price").$set($scope.hoods[1].price);
		writeMessage('A1');
	});

	rect2.on('mousedown touchstart', function() {
		writeMessage('123');
	});

	layer.add(rect0);
	layer.add(rect1);
	layer.add(rect2);
	layer.add(text);
	stage.add(layer);

	var json = rect0.toJSON();
	var shapes = stage.find('#a1')[0];
	console.log(shapes.attrs.id);

	var messagesRef = new Firebase('https://ticketorder.firebaseio.com/');

	$('#messageInput').keypress(function (e) {
		if (e.keyCode == 13) {
			var name = $('#nameInput').val();
			var text = $('#messageInput').val();
			messagesRef.push({name:name, text:text, josn:json});
			$('#messageInput').val('');
		}
	});
}

