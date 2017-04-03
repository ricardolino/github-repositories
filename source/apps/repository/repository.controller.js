(function () {
    'use strict';

    angular
        .module('app.repository')
        .controller('RepositoryController', RepositoryController);

    /* @ngInject */
    function RepositoryController ($scope, $stateParams, moment, GithubAPI) {
        var
            vm = this
        ;

        vm.repository = [];
        vm.data = [
            {
                'key' : 'Commits' ,
                'bar': true,
                'values' : []
            }];
        vm.options = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 50
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: '',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Commits per day',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function(d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                zoom: {
                    enabled: false,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        _activate();

        function _activate () {
            GithubAPI.getRepositoryCommitsByName($stateParams.repositoryName)
                .then(function (data) {
                    _populateChart(vm.data[0].values, _normalizeData(data));
                })
                .catch(function (error) {
                    console.error('Got a error ' + error.status + ' trying to get remote occurrences.', error);
                })
            ;
        }

        function _populateChart (chart, dates) {
            Object.keys(dates).map(function (value) {
                chart.push([new Date(value).getTime(), dates[value]]);
            })
        }

        function _normalizeData (data) {
            var aux = {};

            data.map(function (value) {
                if (aux[moment(value.commit.committer.date).format('YYYY/MM/DD')]) {
                    aux[moment(value.commit.committer.date).format('YYYY/MM/DD')] += 1;
                } else {
                    aux[moment(value.commit.committer.date).format('YYYY/MM/DD')] = 1;
                }
            })

            return aux;
        }
    }
}());
