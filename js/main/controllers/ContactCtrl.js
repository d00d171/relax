app.controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.success = false;
	$scope.error = false;
	$scope.sending = false;

	$scope.sendMessage = function( input ) {
		$scope.sending = true;
		$http({
			method: 'POST',
			url: 'php/sendMessage.php',
			data: input,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.then( function(response) {
			if ( response.data.success ) {
				$scope.success = true;
			} else {
				$scope.error = true;
			}
			$scope.sending = false;
		} );
	}

}]);