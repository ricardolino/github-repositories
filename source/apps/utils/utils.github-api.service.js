(function () {
    'use strict';

    angular
        .module('app.utils')
        .factory('GithubAPI', GithubAPI);

    /* @ngInject */
    function GithubAPI ($http, $q) {
        var
            protocol = 'https:'
            , URI = '//api.github.com/'
            , baseURL = protocol + URI
        ;

        return {
            getRepositories: getRepositories,
            getRepositoryCommitsByName: getRepositoryCommitsByName
        }

        function getRepositories () {
            var deferred = $q.defer();

            $http.get(baseURL + 'users/mundipagg/repos')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }

        function getRepositoryCommitsByName (name) {
            var deferred = $q.defer();

            $http.get(baseURL + 'repos/mundipagg/' + name + '/commits?per_page=1000')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }
    }
}());
