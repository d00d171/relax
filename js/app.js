var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angularFileUpload']);

app.constant('eventGroupImgFolders', {
		0 : "rekreacja",
		1 : "turystyka",
		2 : "imprezy",
		3 : "dzieci"
}).constant('eventsGroups',{
		rekreacja : 0,
		turystyka : 1,
		imprezy : 2,
		dzieci : 3
});

