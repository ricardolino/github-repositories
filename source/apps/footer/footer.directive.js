(function () {
    'use strict';

    angular
        .module('app.footer')
        .directive('appFooter', appFooter);

    function appFooter () {
        return {
            restrict: 'E'
            , templateUrl: 'apps/footer/footer.html'
        };
    }
}());
