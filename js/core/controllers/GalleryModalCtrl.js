app.controller('GalleryModalCtrl', function ($scope, $modalInstance, photos, name) {

    $scope.photos = photos;
    $scope.name = name;

    $scope.INTERVAL = 50000000;

    $scope.close = function () {
      $modalInstance.close();
    };

});