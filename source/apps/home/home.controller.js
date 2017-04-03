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
        vm.propertyNames = [
            {
                name: 'Name'
                , slug: 'name'
            }
            , {
                name: 'Created at'
                , slug: 'created_at'
            }
            , {
                name: 'Updated at'
                , slug: 'updated_at'
            }
            , {
                name: 'Language'
                , slug: 'language'
            }
            , {
                name: 'Stars'
                , slug: '-stargazers_count'
            }
            , {
                name: 'Wachers'
                , slug: '-watchers_count'
            }
            , {
                name: 'Forks'
                , slug: '-forks_count'
            }
        ]

        _activate();

        function _activate () {
            GithubAPI.getRepositories()
                .then(function (repositories) {
                    vm.repositories = repositories;
                })
                .catch(function (error) {
                    console.error('Got a error ' + error.status + ' trying to get remote occurrences.', error);
                })
            ;
        }

        function querySearch (query) {
            var results = query ? vm.repositories.filter( _createFilterFor(query) ) : vm.repositories;
            return results;
        }

        function _createFilterFor (query) {
            return function (repository) {
                var regex = new RegExp(query, 'i');

                return (regex.test(repository.name) || regex.test(repository.language) || regex.test(repository.description));
            };
        }
    }
}());
