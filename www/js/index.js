var image;
var video;

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
            var options = {
                quality : 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.PNG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            navigator.camera.getPicture(onCameraSuccess, onCameraFail, options);
        } else {
            image = document.createElement("img");
            image.src = "media/robot.png";
            image.setAttribute('style','width:300px;');
            document.getElementById("displayCell").appendChild(image);

            //can't do video because I can't extract the data - cross-origin issues...
            /*video = document.createElement("video");
            video.controls = true;
            video.autoplay = true;
            var movSource = document.createElement("source");
            movSource.src = "media/paddy.mov";
            var oggSource = document.createElement("source");
            oggSource.src = "media/paddy.ogg";
            video.appendChild(movSource);
            video.appendChild(oggSource);
            video.loop = true;
            try { video.load(); } catch(e) {console.log(e) }
            document.getElementById("displayCell").appendChild(video);*/

            startFilter();
        }
    }
};

function onCameraSuccess(imageData) {
    image = document.createElement("img");
    //image.src = "data:image/jpeg;base64," + imageData;
    image.src = imageData;
    
    document.getElementById("displayCell").appendChild(image);

    startFilter();
}

function onCameraFail(message) {
    alert('Failed because: ' + message);
}
