app.controller('HomeCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$http', function($scope, $state, $stateParams, $rootScope, $http) {

function checkIfAdmin(){
	var key = $stateParams.key;
	if(key){
		$http({
			method: 'POST',
			url: 'php/checkParam.php',
			data: { key : key }
		})
		.then( function(response) {
			if(response.data === "true"){
				$rootScope.isAdmin = true;
			}else {
				$rootScope.isAdmin = false;
			}
		});
	}
}

  $scope.openEvents = function(group){
  	$state.go('app.events', {group : group});
  }

  checkIfAdmin();

}]);