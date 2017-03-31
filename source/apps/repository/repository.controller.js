(function () {
    'use strict';

    angular
        .module('app.repository')
        .controller('RepositoryController', RepositoryController);

    /* @ngInject */
    function RepositoryController ($scope, $stateParams, GithubAPI) {
        var
            vm = this
        ;

        vm.repository = {};
        vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
        vm.series = ['Series A', 'Series B'];
        vm.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

        vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        vm.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };

        activate();

        function activate () {
            GithubAPI.getRepositoryCommitsByName($stateParams.repositoryName)
                .then(function (repository) {
                    console.log('getrepository concluded', repository);
                    vm.repository = repository;
                })
                .catch(function (error) {
                    console.error('Got a error ' + error.status + ' trying to get remote occurrences.', error);
                })
            ;
        }
    }
}());
