(function(){
    'use strict';

    angular.module('Pastec.engine', ['ngFileUpload'])
        .config(['$stateProvider', function ($stateProvider) {

            $stateProvider
                .state('searchEngine', {
                    url: '/search',
                    templateUrl: 'scripts/app/engine/search.tmpl.html',
                    controller: 'SearchController',
                    controllerAs: 'srchCtrl'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'scripts/app/engine/admin.tmpl.html',
                    controller: 'AdminController',
                    controllerAs: 'admCtrl'
                });
        }]);

})();
