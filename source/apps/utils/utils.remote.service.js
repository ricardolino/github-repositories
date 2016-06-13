
(function () {
    'use strict';

    angular
        .module('app.utils')
        .factory('Remote', Remote);

    /* @ngInject */
    function Remote () {
        var
            protocol = 'http:'
            , URI = '//52.90.175.129'
            , port = ''
            , version = 'v1'
            , baseURL
            , baseMediaURL
            , baseSiteURL
        ;

        buildURLs();

        function buildURLs () {
            baseURL = protocol + URI + (port ? (':' + port) : '') + '/' + version;
            baseMediaURL = protocol + URI + (port ? (':' + port) : '');
            baseSiteURL = protocol + URI + (port ? (':' + port) : '');
        }

        function getBaseUrl () {
            return baseURL;
        }

        function getBaseMediaUrl () {
            return baseMediaURL;
        }

        function getBaseSiteUrl () {
            return baseSiteURL;
        }

        function getApiEndpoint (resource) {
            return baseURL + '/' + resource;
        }

        return {
            getBaseUrl: getBaseUrl
            , getApiEndpoint: getApiEndpoint
            , getBaseMediaUrl: getBaseMediaUrl
            , getBaseSiteUrl: getBaseSiteUrl
        };
    }
}());
