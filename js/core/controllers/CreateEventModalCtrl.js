app.controller('CreateEventModalCtrl',['$rootScope', '$scope', '$modalInstance', '$http', '$upload', 'eventGroupImgFolders', 'events', function ($rootScope, $scope, $modalInstance, $http, $upload, eventGroupImgFolders, events) {

	var files = [];
	$scope.additionalFilesCount = 0;

	$scope.progress=0;

	$scope.errors = [];

	$scope.getProgressInfo = function(){
		getType();
		switch($scope.progress){
			case 1 : 	
				return "Dodawanie wydarzenia";
			case $scope.maxProgress() :
				return $scope.errors.length == 0 ? "Dodawanie zakończone powodzeniem" : "Błąd podczas dodawania";
			default : 
				return "Dodawanie pliku " + files[$scope.progress-2][0].name;
		}
	};

	$scope.type = 'info';

	function getType(){
		if($scope.progress == $scope.maxProgress()){
			$scope.type = $scope.errors.length == 0 ? 'success' : 'danger';
			return;
		}
	
		$scope.type = 'info';	
	}

	$scope.maxProgress = function(){
		return 2 + files.length;
	};

	$scope.range = function(n) {
        return new Array(n);
    };

    $scope.addFile = function(){
    	$scope.additionalFilesCount += 1;
    }

    $scope.removeFile = function(){
    	$scope.additionalFilesCount -= 1;
    	files.pop();
    }

    $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.opened = true;
	 };

	$scope.confirm = function(input) {

		$scope.progress += 1;

		var lastEvent = events[input.group][0];
		input.eventNum = lastEvent ? parseInt(lastEvent.dir, 10) + 1 : 0;

		input.fullPath = "../img/events/" + eventGroupImgFolders[parseInt(input.group)] + "/" + input.eventNum;

		if(!input.date){
			input.date = "";
		}

		$http({
			method: 'POST',
			url: 'php/createEvent.php',
			data: input
		})
		.then( function(response) {
			if(response.data.success) {

				$scope.uploadedFiles = 0;

				if(files.length > 0){
					uploadFiles(input.fullPath);
				} else {
					$scope.progress = $scope.maxProgress();
				}

			} else {

				criticalErrorOccured(response.data.errors);

			}

		} );

	};

	function uploadFiles(dir){

	    for (var i = 0; i < files.length; i++) {

	        var file = files[i];

	        $scope.upload = $upload.upload({
	            url: 'php/uploadFile.php',
	            method: 'POST',               
	            file: file,
	            data: {
	            	dir : dir
	            }
	        }).then( function(response) {

				if(response.data.success) {

				} else {
					$scope.errors = $scope.errors.concat(response.data.errors);
				}

				$scope.uploadedFiles += 1;
				$scope.progress = $scope.uploadedFiles == files.length ? $scope.maxProgress() : $scope.progress;
			});
	    }
	}

	function criticalErrorOccured(errors){
		$scope.errors = $scope.errors.concat(errors);
		$scope.progress = $scope.maxProgress();
	}

	$scope.onFileSelect = function($files) {
		files.push($files);
	};

    $scope.close = function () {
      	$modalInstance.close();
    };

}]);