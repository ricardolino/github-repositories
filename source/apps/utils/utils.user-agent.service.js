
(function () {
    'use strict';

    angular
        .module('app.utils')
        .factory('UserAgent', UserAgent);

    /* @ngInject */
    function UserAgent () {
        var
            vm = this
        ;

        function get () {
            return navigator.userAgent;
        }

        return {
            get: get
        };
    }
}());
