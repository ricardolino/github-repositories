(function () {
    'use strict';

    angular
        .module('app.utils')
        .filter('slugify', Slugify);

    /* @ngInject */
    function Slugify () {
        return function (input) {
            var slug;

            if (!input) {
                return;
            }

            slug = input.toLowerCase().trim();

            slug = slug.replace(/[^a-z0-9\s-]/g, ' ');

            slug = slug.replace(/[\s-]+/g, '-');

            if (slug[slug.length - 1] === '-') {
                slug = slug.slice(0, -1);
            }

            return slug;
        };
    }
}());
