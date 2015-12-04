(function(){
    'use strict';

    angular.module('Pastec.engine')
        .factory('EngineFactory', [
            'Upload', '$log', 'config',
            EngineFactory
        ]);

    /**
     * Engine factory
     * @param Upload
     * @param $log
     * @param config
     * @constructor
     */
    function EngineFactory(Upload, $log, config){

        var instance = {
            searchRequest: searchRequest,
            addImage: addImage
        };
        return instance;


        /**
         * Search request
         * @param file
         */
        function searchRequest(file) {
            return Upload.upload({
                    url: config.serverUrl+'/searcher',
                    data: {file: file}
                })
                .then(function(response) {
                    return response;
                })
                .catch(function(error) {
                    $log.error('XHR Failed for searchRequest:: ' + error.data);
                });
        }

        /**
         * Add image
         * @param file
         * @param info
         */
        function addImage(file, info) {
            return Upload.upload({
                    url: config.serverUrl+'/images',
                    data: {file: file, info: info}
                })
                .then(function(response) {
                    return response;
                })
                .catch(function(error) {
                    $log.error('XHR Failed for addImage:: ' + error.data);
                });
        }


    }

})();
