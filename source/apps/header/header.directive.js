(function () {
    'use strict';

    angular
        .module('app.header')
        .directive('appHeader', appHeader);

    function appHeader () {
        return {
            restrict: 'E'
            , templateUrl: 'apps/header/header.html'
        };
    }
}());
