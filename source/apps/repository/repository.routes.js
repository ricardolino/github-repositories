(function () {
    'use strict';

    angular
        .module('app.repository')
        .config(configBlock);

    /* @ngInject */
    function configBlock ($stateProvider) {
        $stateProvider
            .state('repository', {
                url: '/repository/:repositoryName'
                , templateUrl: 'apps/repository/repository.html'
                , controller: 'RepositoryController as vm'
            });
    }
}());
