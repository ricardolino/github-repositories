(function () {
    'use strict';

    angular
        .module('app.example')
        .controller('ExampleController', ExampleController);

    /* @ngInject */
    function ExampleController (Example) {
        var
            vm = this
        ;

        activate();

        function activate () {

        }
    }
}());
