function initiatlizemap() {
    console.log("in initializemap function");
    var myLatlng = new google.maps.LatLng(20.5937, 78.9629);
    var mapOptions = {
        zoom: 6,
        center: myLatlng
    }
    window.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    setUserLocation(map);
    showAllPotholes(map);
    // Create the search box and link it to the UI element.
    var input = document.getElementById('source');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var inputDes = document.getElementById('destination');
    var searchDesBox = new google.maps.places.SearchBox(inputDes);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputDes);

    // var searchIcon = document.getElementById('icon');
    // var searchIconBox = new google.maps.places.SearchBox(searchIcon);

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();


    var control = document.getElementById('searchDirectionButton');
    control.addEventListener('click', function () {
        console.log(window.allmarkersArray)
        if (window.allmarkersArray.length > 0) {
            for (let i = 0; i < window.allmarkersArray.length; i++) {
                console.log(window.allmarkersArray[i].position.lat.value);
                allmarkersArray[i].setMap(null)
            }
        }


        calculateAndDisplayRoute(directionsService, directionsRenderer, map);
        console.log("End of event Listener")
    });
    // control.addEventListener('keyup', function (e) {
    //     if (e.keyCode == 13) {
    //         calculateAndDisplayRoute(directionsService, directionsRenderer, map);
    //     }
    // });
}


function setUserLocation(map) {
    console.log("in setUserLocation")
    if (navigator.geolocation) {
        // timeout at 60000 milliseconds (60 seconds)
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        window.geoLoc = navigator.geolocation;
        geoLoc.watchPosition(changeCurrentUserLocation);
    }
}

function changeCurrentUserLocation(position) {
    console.log("in changeCurrentUserLocation function");
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log("lat" + lat + "  lng" + lng);

    var myLocation = new google.maps.LatLng(lat, lng);

    if (window.blueDot) {
        console.log("changing postion of bluedot");
        window.blueDot.setPosition(myLocation);
    }
    else {
        console.log("setting bluedot marker");
        window.blueDot = new google.maps.Marker({
            position: myLocation,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillOpacity: 1,
                strokeWeight: 2,
                fillColor: '#5384ED',
                strokeColor: '#ffffff',
            },
        });
        window.blueDot.setMap(map);
    }
}

function errorHandler(position) {
    console.log("error");
}



function showAllPotholes(map) {
    console.log("in showAllPotholes function");

    fetch("https://saarthi.last-codebender.tech/getpoints").then((points) => {
        return points.json()
    }).then((points) => {
        window.potpoint = points;
        for (let i = 0; i < window.potpoint.length; i++) {
            window.potpoint[i] = new google.maps.LatLng(window.potpoint[i][0], window.potpoint[i][1]);
        }
        window.allmarkersArray = [];
        for (let i = 0; i < window.potpoint.length; i++) {
            var cur_point = window.potpoint[i];
            var markerPOT = new google.maps.Marker({
                position: cur_point,
                map: map,
                opacity: 1,

            });
            window.allmarkersArray.push(markerPOT);
        }
    }).then(res => {
        console.log("showPothole api completed");
    });
};


function calculateAndDisplayRoute(directionsService, directionsRenderer, map) {

    console.log("NOoooooooooooooooooo")

    directionsService
        .route({
            origin: {
                query: document.getElementById('source').value,//"30.351514, 76.373979"
            },
            destination: {
                query: document.getElementById('destination').value,//"30.351579, 76.365332"
            },
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            const direction = response;
            var polyline = new google.maps.Polyline({
                path: [],
                strokeColor: '#FF0000',
                strokeWeight: 2
            });
            // var bounds = new google.maps.LatLngBounds();
            var legs = direction.routes[0].legs;
            for (let i = 0; i < legs.length; i++) {
                var steps = legs[i].steps;
                for (let j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;
                    for (let k = 0; k < nextSegment.length; k++) {
                        polyline.getPath().push(nextSegment[k]);
                        // bounds.extend(nextSegment[k]);
                    }
                }
            }

            // polyline.setMap(map);
            directionsRenderer.setMap(map);
            potpoint.push(new google.maps.LatLng("10", "10"))
            const array = []
            for (let i = 0; i < window.potpoint.length; i++) {
                var cur_point = window.potpoint[i];
                if (google.maps.geometry.poly.containsLocation(cur_point, polyline, 10e-1)) {
                    array.push(cur_point);
                    var markerL = new google.maps.Marker({
                        position: cur_point,
                        map: map,
                    });
                    console.log(cur_point.value)

                    markerL.setMap(map);

                }

            }
            // map.fitBounds(bounds);


            directionsRenderer.setDirections(direction);

        })
        .catch((e) => window.alert(e));
    console.log("End of calulateAndDisplay")
}
