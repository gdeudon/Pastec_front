(function() {
    'use strict';

    angular.module('Pastec.engine')
        .controller('SearchController', [
            '$scope', 'EngineFactory', '$log', '$mdToast', '$state',
            SearchController
        ]);

    /**
     * SearchController
     * @param $scope
     * @param EngineFactory
     * @param $log
     * @param $mdToast
     * @constructor
     */
    function SearchController($scope, EngineFactory, $log, $mdToast, $state){

        var self = this;
        self.search = search;
        self.imgLoad = false;
        self.progressPercentage = 0;
        self.goAdminPage = goAdminPage;
        self.goSearchPage = goSearchPage;
        self.resultatRequest = {};
        self.try = 0;
        self.consigne = "Touchez l'écran pour prendre une photo";
        self.retry = retry;

        $scope.$watch('srchCtrl.file', function (file) {
            if (file != null) {
                self.progressPercentage = 0;
                self.imgLoad = true;
                self.search(file);
            }
        });

        function retry(){
            console.log("retry");
            self.resultatRequest = {};
            self.file = null;
            self.imgLoad = false;
        }

        function goAdminPage(){
            $state.go('admin');
        }

        function goSearchPage(){
            $state.go('searchEngine');
        }

        function search(file){

            EngineFactory.searchRequest(file)
                .then(function (response) {
                    self.consigne = "Recommencer ?";
                    self.try = 1;
                    $log.info('Success ' + response.config.data.file.name + 'uploaded. Response: ');
                    console.log(response);
                    angular.forEach(response.data, function(value, key) {
                        var decodeResponse = angular.fromJson(value);
                        if(decodeResponse.type == "IMAGE_NOT_DECODED"){
                            $mdToast.showSimple("format non reconnu");
                        }else if(decodeResponse.type == "IMAGE_SIZE_TOO_BIG"){
                            $mdToast.showSimple("image trop grande");
                        }else if(decodeResponse.type == "IMAGE_SIZE_TOO_SMALL"){
                            $mdToast.showSimple("image trop petite");
                        }else{
                            self.resultatRequest = response.data[0];
                            if(decodeResponse.image_ids.length == 0){
                                $mdToast.showSimple('Aucune correspondance trouvée');
                            }else if(decodeResponse.image_ids.length == 1){
                                $mdToast.showSimple('1 correspondance trouvée');
                                $log.info(decodeResponse);
                            }else{
                                $mdToast.showSimple(decodeResponse.image_ids.length+' correspondances trouvées');
                                $log.info(decodeResponse);
                            }
                        }
                    });
                }, function (response) {
                    self.consigne = "Recommencer ?";
                    self.try = 1;
                    $log.error('Error status: ' + response.status);
                }, function (evt) {
                    self.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $log.info('progress: ' + self.progressPercentage + '% ' + evt.config.data.file.name);
                });
        }


    }

})();