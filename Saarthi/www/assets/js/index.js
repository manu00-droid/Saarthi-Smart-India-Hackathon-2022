// let app = {
//     init: function () {
//         console.log("in init function");

//         document.getElementById('cameraButton').addEventListener('click', app.takephoto);
//         // document.getElementById('zipButton').addEventListener('click', app.zipHandler);
//     },

//     zipHandler: function () {
//         const url = "http://127.0.0.1:8000/classify/zip/";
//         const form = document.querySelector("form");

//         form.addEventListener("submit", (e) => {
//             e.preventDefault();

//             const files = document.querySelector("[type=file]").files;
//             const formData = new FormData();

//             for (let i = 0; i < files.length; i++) {
//                 let file = files[i];

//                 formData.append("file", file);
//             }

//             fetch(url, {
//                 method: "POST",
//                 body: formData,
//             }).then((response) => {
//                 console.log(response);
//             });
//         });
//     },

//     takephoto: function () {
//         console.log("in takephoto function");

//         let opts = {
//             quality: 80,
//             destinationType: Camera.DestinationType.FILE_URI,
//             sourceType: Camera.PictureSourceType.CAMERA,
//             mediaType: Camera.MediaType.PICTURE,
//             encodingType: Camera.EncodingType.JPEG,
//             cameraDirection: Camera.Direction.BACK,
//             saveToPhotoAlbum: true,
//             targetWidth: 300,
//             targetHeight: 400
//         };

//         navigator.camera.getPicture(app.ftw, app.wtf, opts);
//     },
//     ftw: function (imgURL) {
//         document.getElementById('msg').textContent = "Thank you for contributing to the cause!";
//         var image = document.getElementById('photo')
//         image.src = imgURL;
//         // var image = document.getElementById('msg');
//         // image.src = "hello" + imgURL;


//         // const url = "http://127.0.0.1:8000/classify/";
//         // // const form = document.querySelector("form");

//         // // form.addEventListener("submit", (e) => {
//         // // e.preventDefault();
//         // const files = imgURL
//         // // const files = document.querySelector("[type=file]").files;
//         // const formData = new FormData();

//         // // for (let i = 0; i < files.length; i++) {
//         // //     let file = files[i];

//         // //     formData.append("files[]", file);
//         // // }
//         // formData.append("file", files);
//         // fetch(url, {
//         //     method: "POST",
//         //     body: formData,
//         // }).then((response) => {
//         //     console.log(response);
//         // });
//         // });
//     },
//     wtf: function (msg) {
//         document.getElementById('msg').textContent = msg;
//     }
// };

// // document.addEventListener('deviceready', app.init);


console.log("in index.js");

document.getElementById('zipButton').addEventListener('click', zipHandler);
document.getElementById('cameraButton').addEventListener('click', opencamera);


function zipHandler() {
    console.log("in zip handler!");

    const uploadForm = document.querySelector('.upload')
    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let file = e.target.uploadFile.files[0];
        let formData = new FormData();
        document.getElementById("load").style.display = 'initial';
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
                    console.log(data);
                    document.getElementById("load").style.display = "none";
                }
            }).then(resp => window.plugins.toast.showLongCenter("Thank you for contributing to the cause!!"));
    });

}


function opencamera() {
    console.log("in opencamera function");

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
function ftw(imgURL) {
    console.log("getting geolocation");
    positionObj = getGeoLocation();
    if (positionObj == null) {
        console.log("positionObj is null");
    }
    else {
        const url = "https://saarthi.last-codebender.tech/classify/";
        const img = imgURL
        const lat = positionObj.lat;
        const lng = positionObj.lng;
        const formData = new FormData();
        formData.append("file", img);
        formData.append("lat", lat);
        formData.append("lng", lng);
        console.log("formData--> " + formData);
        fetch(url, {
            method: "POST",
            body: formData,
        }).then((response) => {
            console.log(response);
        }).then(response => {
            window.plugins.toast.showLongCenter("Thank you for contributing to the cause!!");
        });
    }
}
function wtf(msg) {
    document.getElementById('msg').textContent = msg;
}




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