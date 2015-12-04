(function(){
    'use strict';

    angular.module('Pastec', ['ngMaterial', 'ui.router', 'Pastec.engine'])

        .constant("config", {
            //"serverUrl": "http://10.4.40.251/pastec_backv2"
            "serverUrl": "http://192.168.0.45/pastec_backv2"
            //"serverUrl": "http://﻿192.168.1.16/pastec_backv2"
        })

        .config(['$urlRouterProvider', '$mdThemingProvider',
            function ($urlRouterProvider, $mdThemingProvider) {

            $mdThemingProvider.theme('default')
                .primaryPalette('blue', {
                    'default': '700'
                })
                .accentPalette('deep-purple');

            $urlRouterProvider.otherwise('/search');
        }]);

})();
