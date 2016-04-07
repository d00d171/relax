app.controller('EventsCtrl', ['$scope', '$stateParams', '$http', '$modal', 'eventGroupImgFolders', 'eventsGroups', function($scope, $stateParams, $http, $modal, eventGroupImgFolders, eventsGroups) {

	$scope.open = [];
	$scope.open[parseInt($stateParams.group, 10)] = true;

	$scope.groups = eventsGroups;
	$scope.imgFolders = eventGroupImgFolders;

	$scope.removeEvent = function(group, index, dir){
		var input = {
			fullPath : "../img/events/" + eventGroupImgFolders[parseInt(group)] + "/" + dir,
			group : group,
			index : index
		}

		$http({
			method: 'POST',
			url: 'php/removeEvent.php',
			data: input
		})
		.then( function(response) {

			getEvents();

		} );

	};

	$scope.createEvent = function(){
		var modalInstance = $modal.open({
			templateUrl: 'js/core/templates/create-event-modal.html',
			controller: 'CreateEventModalCtrl',
			backdropClass: 'backdrop',
			resolve: {
						events: function () {
							return  $scope.eventsList;
						}
					}
		});

		modalInstance.result.then(function(){
			getEvents();
		});
	};

	function getEvent(group, index){
		return $scope.eventsList[group][index];
	}

	function getPath(group, index, query) {
		var commonPart = "img/events/" + $scope.imgFolders[group] + "/" + getEvent(group, index).dir + "/";

		if(query){
			return "../" + commonPart;
		} else {
			return commonPart;
		}
	}


	function fetchImages(group, index){

		var imgPath = getPath(group, index, false);
		var path = getPath(group, index, true);

		$http({
			method: 'POST',
			url: 'php/getFiles.php',
			data: path,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then( function(response) {

			var result = [];
			for(var i = 0, len = response.data.length; i<len; i++){
				result.push(imgPath + response.data[i]);
			}
			$scope.eventsList[group][index].images = result;

		});

	}

	function fetchImagesForGroup(group){
		for(var i = 0, len = $scope.eventsList[group].length; i<len; i++){
			fetchImages(group, i);
		}
	}

	function addNewLines(){
		for(var i = 0; i<3; i++){
			for(var j = 0; j<$scope.eventsList[i].length; j++){
				var event = $scope.eventsList[i][j];
				event.description = event.description.replace(/(?:\r\n|\r|\n)/g, '<br />');
			}
		}
	}

	function getEvents(){
		$http({
			method: 'GET',
			url: 'php/getEvents.php'
		}).then( function(response) {
			$scope.eventsList = response.data;
			addNewLines();
			fetchImagesForGroup($scope.groups.rekreacja);
			fetchImagesForGroup($scope.groups.turystyka);
			fetchImagesForGroup($scope.groups.imprezy);
			fetchImagesForGroup($scope.groups.dzieci);
		});
	}

	getEvents();

}]);