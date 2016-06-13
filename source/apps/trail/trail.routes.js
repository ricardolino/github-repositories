(function () {
    'use strict';

    angular
        .module('app.trail')
        .config(configBlock);

    /* @ngInject */
    function configBlock ($stateProvider) {
        $stateProvider
            .state('trail', {
                url: "/trail"
                , templateUrl: "apps/trail/trail.html"
            });
    }
}());
