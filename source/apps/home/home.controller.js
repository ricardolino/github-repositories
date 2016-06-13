(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController (UserAgent) {
        var
            vm = this
        ;

        activate();

        function activate () {
            getUserAgent();
        }

        function getUserAgent () {
            vm.userAgent = UserAgent.get();
        }
    }
}());
