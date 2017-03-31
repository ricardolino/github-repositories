(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController ($scope, GithubAPI) {
        var
            vm = this
        ;

        vm.repositories = [];
        vm.querySearch = querySearch;
        vm.searchText = '';
        vm.selectedItem = null;

        activate();

        function activate () {
            GithubAPI.getRepositories()
                .then(function (repositories) {
                    console.log('getRepositories concluded', repositories);
                    vm.repositories = repositories;
                })
                .catch(function (error) {
                    console.error('Got a error ' + error.status + ' trying to get remote occurrences.', error);
                })
            ;
        }

        function querySearch (query) {
            var results = query ? vm.repositories.filter( createFilterFor(query) ) : vm.repositories;
            return results;
        }

        function createFilterFor (query) {
            return function filterFn (repository) {
                return (repository.name.indexOf(query) === 0);
            };
        }
    }
}());
