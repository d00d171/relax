// Application Level State
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('', '/home');

  $stateProvider
    .state('app', {
      url: '',
      controller: 'AppCtrl',
      views: {
        'navbar': {
          templateUrl: 'js/core/templates/navbar.html',
          controller: 'NavbarCtrl'
        },
        'main': {
          templateUrl: 'js/core/templates/main.html'
        },
        'footer': {
          templateUrl: 'js/core/templates/footer.html'
        }
      }
    })
    .state('404', {
      url: '/404',
      templateUrl: 'js/core/templates/404.html',
      controller: 'AppCtrl'
    });

}]);