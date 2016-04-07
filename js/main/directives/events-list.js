app.directive('eventsList', [ '$modal', '$http', function($modal, $http) {
	return {
		restrict: 'E',
		scope: {
			list: '=',
			group: '=',
			removeFunc: '&'
		},
		templateUrl: 'js/main/templates/events-list-template.html',
		link: function ($scope, element) {
			
			$scope.itemsPerPage = 5;
			$scope.currentPage = 1;

			$scope.startIndex;
			$scope.endIndex;

			$scope.showPagination = function(){
				return $scope.list ? $scope.list.length > $scope.itemsPerPage : false;
			}

			function updateIndexes(){
				$scope.startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
				$scope.endIndex = ($scope.currentPage - 1) * $scope.itemsPerPage + $scope.itemsPerPage;
			}

			$scope.remove = function(dir, index){
				$scope.removeFunc({group: $scope.group, index: index, dir: dir});
			}

			updateIndexes();

			$scope.$watch('currentPage', function(){
				updateIndexes();
			});

		}
	};
}]);