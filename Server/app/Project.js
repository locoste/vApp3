var app = angular.module("Project", ["ngTreant"]);

app.constant('config', {  
  	api_url: 'localhost',
    api_port: '8002',
    alf_url: 'localhost',
    alf_port: '8080',
    scan_url: '159.84.143.246',
    scan_port: '8243'
});

angular.module('ngTreant', [])
.directive('treantGraph', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=data'
        },
        template: '<div class="chart" id="example-graph"></div>',
        link: linkFn
    };

    function linkFn(scope, element, attrs, ctrlFn) {
        var tree = new Treant(scope.data);
    }
});
