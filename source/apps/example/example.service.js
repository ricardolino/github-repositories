(function () {
    'use strict';

    angular
        .module('app.example')
        .factory('Example', Example);

    /* @ngInject */
    function Example ($http, $q, Remote) {
        return {
            getAllFromRemote: getAllFromRemote
        };

        function getAllFromRemote () {
            var deferred = $q.defer();
            $http.get(Remote.getApiEndpoint())
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }
    }
}());
