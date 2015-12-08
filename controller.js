app.controller("PageController", function($scope) {
    $scope.activeSection = 0;
    $scope.textHeight = 0;

    $scope.panels = [
	{"name":"Demo", "page":"pages/demo.html"},
	{"name":"Overview", "page":"pages/overview.html"},
	{"name":"Get started", "page":"pages/getting_started.html"},
	{"name":"Documentation", "page":"pages/documentation.html"},
	{"name":"Get involved", "page":"pages/involved.html"},
    ];

    $scope.setSection = function (i) {
	$scope.activeSection = i;
	$scope.textHeight = document.getElementById('panel-'+i).offsetHeight;
    }
});
