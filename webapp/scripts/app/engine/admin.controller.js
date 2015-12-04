(function() {
    'use strict';

    angular.module('Pastec.engine')
        .controller('AdminController', [
            '$scope', 'EngineFactory', '$log', '$mdToast', '$state',
            AdminController
        ]);

    /**
     * AdminController
     * @param $scope
     * @param EngineFactory
     * @param $log
     * @param $mdToast
     * @constructor
     */
    function AdminController($scope, EngineFactory, $log, $mdToast, $state){

        var self = this;
        self.addImg = addImg;
        self.imgLoad = false;
        self.progressPercentage = 0;
        self.goAdminPage = goAdminPage;
        self.goSearchPage = goSearchPage;
        self.goUpload = goUpload;
        self.info = {};
        self.try = 0;
        self.consigne = "Touchez l'écran pour prendre une photo";
        self.retry = retry;
        self.lockBtn = false;

        function goAdminPage(){
            $state.go('admin');
        }

        function goSearchPage(){
            $state.go('searchEngine');
        }

        function goUpload(){
            self.addImg(self.file, self.info);
        }

        $scope.$watch('admCtrl.file', function (file) {
            if (file != null) {
                self.progressPercentage = 0;
                self.imgLoad = true;
            }
        });

        function retry(){
            console.log("retry");
            self.resultatRequest = {};
            self.file = null;
            self.imgLoad = false;
            self.lockBtn = false;
            self.info = {};
        }

        function addImg(file, info){

            EngineFactory.addImage(file, info)
                .then(function (response) {
                    self.consigne = "Recommencer ?";
                    self.try = 1;
                    self.lockBtn = true;
                    $log.info('Success ' + response.config.data.file.name + 'uploaded. Response: ');
                    //console.log(response);
                    angular.forEach(response.data, function(value, key) {
                        var decodeResponse = angular.fromJson(value);

                        if(decodeResponse.type == "IMAGE_ADDED"){
                            $mdToast.showSimple("Photo ajoutée");
                        }else{
                            $mdToast.showSimple("Erreur");
                        }
                    });
                }, function (response) {
                    self.consigne = "Recommencer ?";
                    self.try = 1;
                    self.lockBtn = true;
                    $log.error('Error status: ' + response.status);
                }, function (evt) {
                    self.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $log.info('progress: ' + self.progressPercentage + '% ' + evt.config.data.file.name);
                });
        }


    }

})();