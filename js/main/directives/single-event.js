app.directive('singleEvent', [ '$modal', '$rootScope', '$sce', function($modal, $rootScope, $sce) {
	return {
		restrict: 'E',
		scope: {
			event: '=',
			index: '=',
			removeFunc: '&'
		},
		templateUrl: 'js/main/templates/single-event-template.html',
		link: function (scope, element) {

			scope.isAdmin = $rootScope.isAdmin;

			scope.description_htmlSafe = $sce.trustAsHtml(scope.event.description);

			scope.showGallery = function(){
				var modalInstance = $modal.open({
					templateUrl: 'js/core/templates/gallerymodal.html',
					controller: 'GalleryModalCtrl',
					backdropClass: 'backdrop',
					resolve: {
						photos: function () {
							return  scope.event.images;
						},
						name: function() {
							return 	scope.event.name;
						}
					}
				});
			};

			scope.removeEvent = function(){
				scope.removeFunc({dir : scope.event.dir, index : scope.index});
			};

		}
	};
}]);