'use strict';

var imgSrcData;

function encodeImageFileAsURL(){
    //alert("Changed");
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            imgSrcData = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.src = imgSrcData;
            //document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};

angular.module('patientory')
  .controller('ProfileCtrl', function ($rootScope, $scope, $stateParams, FeedModel, UserModel, ProfileModel, ENDPOINT_URI) {
    var profile = this;
    
    profile.imageSource = UserModel.userData.image;
    
    
    profile.submit = function(){
        return UserModel.saveImage(imgSrcData);  
    };
    
    profile.getUserData = function(){
        return UserModel.userData001;
    };
    
    profile.userData = profile.getUserData();
    
  });
