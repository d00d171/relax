// Sub-application/main Level State
app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('app.home', {
      url: '/home?key',
      templateUrl: 'js/main/templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('app.about', {
      url: '/about',
      templateUrl: 'js/main/templates/about.html',
      controller: 'AboutCtrl'
    })
    .state('app.contact', {
      url: '/contact',
      templateUrl: 'js/main/templates/contact.html',
      controller: 'ContactCtrl'
    })
    .state('app.events', {
      url: '/events?group',
      templateUrl: 'js/main/templates/events.html',
      controller: 'EventsCtrl'
    })
    .state('app.eventsAdmin', {
      url: '/eventsAdmin?key',
      templateUrl: 'js/main/templates/events.html',
      controller: 'EventsCtrl'
    });;

}]);