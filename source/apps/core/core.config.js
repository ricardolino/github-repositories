(function () {
    'use strict';

    angular
        .module('app')
        .config(configBlock);

    /* @ngInject */
    function configBlock ($compileProvider, $urlRouterProvider, ChartJsProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto):|data:image\//);

        $urlRouterProvider.otherwise("/home");

        ChartJsProvider.setOptions('Line', {
            datasetFill: false
            , colours: ['#da4436', '#06489d']
            , responsive: true
            , bezierCurve: false
            , pointDot: true
            , animation: false
            , pointHitDetectionRadius : 1
        });
    }
}());
