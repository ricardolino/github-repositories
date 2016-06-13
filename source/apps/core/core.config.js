(function () {
    'use strict';

    angular
        .module('app')
        .config(configBlock);

    /* @ngInject */
    function configBlock ($compileProvider, $urlRouterProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto):|data:image\//);

        $urlRouterProvider.otherwise("/home");
    }
}());
