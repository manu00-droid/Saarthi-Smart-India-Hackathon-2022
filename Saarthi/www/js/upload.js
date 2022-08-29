

console.log("in index.js");

document.getElementById('zipButton').addEventListener('click', zipHandler);
document.getElementById('cameraButton').addEventListener('click', opencamera);



function getGeoLocation() {
    if (navigator.geolocation) {
        let options = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000 * 60 * 60
        };
        navigator.geolocation.getCurrentPosition(
            successGeoLocation,
            errorGeoLocation,
            options
        );
    } else {
        console.log("geolocation not supported");
        window.plugins.toast.showLongCenter("Sorry your phone does not support location services!");
        return null;
    }
}

function successGeoLocation(position) {
    console.log("in success geoLocation");
    return position;
}
function errorGeoLocation(e) {
    console.log("In errorGeoLocation Function---->error code:" + e.code + 'message: ' + e.message);
    return null;
}


window.positionObject = getGeoLocation();


function zipHandler() {
    console.log("in zip handler!");

    const uploadForm = document.querySelector('.upload')
    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let file = e.target.uploadFile.files[0];
        let formData = new FormData();
        formData.append('file', file);
        const url = 'https://saarthi.last-codebender.tech/classify/zip/';
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                }
                else {
                    console.log(data)
                }
            }).then(resp => window.plugins.toast.showLongCenter("Thank you for contributing to the cause!!"));
    });

}


function opencamera() {
    window.setTimeout(toastToUser, 15000);
    window.plugins.toast.showLongCenter("Thank you for contributing to the cause!!!");
    console.log("in opencamera function");
    document.getElementById("#imageUploaded").style.display = "initial";
    let opts = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK,
        saveToPhotoAlbum: true,
        targetWidth: 300,
        targetHeight: 400
    };

    navigator.camera.getPicture(ftw, wtf, opts);
}


function toastToUser() {
    window.plugins.toast.showLongCenter("Thank you for contributing to the cause!!!");

}
function ftw(imgURL) {
    window.plugins.toast.showLongCenter("Thank you for contributing to the cause!!!");

    console.log("getting geolocation");
    var currentTime = new Date().getTime();

    while (currentTime + 5000 >= new Date().getTime()) { }
    if (window.positionObj == null) {
        console.log("positionObj is null");
    }
    else {
        const url = "https://saarthi.last-codebender.tech/classify/";
        const img = imgURL
        const lat = window.positionObject.lat;
        const lng = window.positionObject.lng;
        const formData = new FormData();
        formData.append("file", img);
        formData.append("lat", lat);
        formData.append("lng", lng);
        console.log("formData--> " + formData);
        window.plugins.toast.showLongCenter("Thank you for contributing to the cause!!!");
        fetch(url, {
            method: "POST",
            body: formData,
        }).then((response) => {
            console.log(response)
            return response;
        }).then(response => {
            if (response == "Pothole") {
                navigator.notification.alert("Pothole Detected!!!", alertCallback);
            }
            else if (response == "not_pothole") {
                window.plugins.toast.showLongCenter("No pothole detected. Thank you for contributing to the cause!!!");
            }
            else {
                windows.plugins.toast("{Please try again!!!")
            }
        });
    }
}
function waste() {
    console.log("returning from response");
}
function wtf(msg) {
    document.getElementById('msg').textContent = msg;
}

