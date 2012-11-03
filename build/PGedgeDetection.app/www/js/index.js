var image;
var app = {
    initialize: function() {
        this.bind();
        //document.addEventListener('DOMContentLoaded', this.deviceready, false);
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        var cameraCheck = confirm("Do you want to connect to the camera?");

        if (cameraCheck) {
            console.log("camera")
            navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
        } else {
            image = document.createElement("img");
            image.src = "media/robot.png";
            image.setAttribute('style','width:300px;');
            document.getElementById("displayCell").appendChild(image);
            
            setTimeout(startFilter,150);
        }
    }
};

var cameraOptions = {   quality : 100,
    destinationType : Camera.DestinationType.FILE_URI,
    sourceType : Camera.PictureSourceType.CAMERA,
    allowEdit : false,
encodingType: Camera.EncodingType.PNG,
targetWidth: 300,
targetHeight: 300,
popoverOptions: CameraPopoverOptions,
saveToPhotoAlbum: false
};

function onSuccess(imageData) {
    image = document.createElement("img");
    
        //image.src = "data:image/jpeg;base64," + imageData;
    image.src = imageData;
    
    document.getElementById("displayCell").appendChild(image);
    
    setTimeout(startFilter,10);
}

function onFail(message) {
    alert('Failed because: ' + message);
}