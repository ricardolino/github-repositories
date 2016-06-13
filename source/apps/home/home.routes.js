(function () {
    'use strict';

    angular
        .module('app.home')
        .config(configBlock);

    /* @ngInject */
    function configBlock ($stateProvider) {
        $stateProvider
            .state('home', {
                url: "/home"
                , templateUrl: "apps/home/home.html"
                , controller: 'HomeController as vm'
            });
    }
}());
