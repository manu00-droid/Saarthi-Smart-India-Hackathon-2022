function initiatlizemap() {
    console.log("in initializemap function");
    var myLatlng = new google.maps.LatLng(20.5937, 78.9629);
    var mapOptions = {
        zoom: 4,
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
    // https://saarthi.last-codebender.tech/getpoints
    // http://127.0.0.1:8000/getpoints
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
// window.super_direct = [];
window.pointsNumber = [];
window.arr_super = [];

function calculateAndDisplayRoute(directionsService, directionsRenderer, map) {
    console.log("NOoooooooooooooooooo")
    directionsService
        .route({
            origin: {
                query: document.getElementById('source').value, //"30.352381, 76.365223", //
            },
            destination: {
                query: document.getElementById('destination').value,//"30.351474, 76.362688",/
            },
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            // console.log("HERERERERERERERERERERERERERE")
            const direction = response;
            // super_direct.push(direction)
            var polyline = new google.maps.Polyline({
                path: [],
                strokeColor: '#FF0000',
                strokeWeight: 2
            });
            for (let i = 0; i < direction.routes.length; i++) {
                let dist = 0;
                var legs = direction.routes[0].legs;
                for (let i = 0; i < legs.length; i++) {
                    dist = dist + legs[i].distance.value;
                    console.log(dist);
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
                // directionsRenderer.setMap(map);

                potpoint.push(new google.maps.LatLng("10", "10"))
                let array = []
                for (let i = 0; i < window.potpoint.length; i++) {
                    var cur_point = window.potpoint[i];
                    if (google.maps.geometry.poly.isLocationOnEdge(cur_point, polyline, 10e-4)) {
                        var markerL = new google.maps.Marker({
                            position: cur_point,
                            map: map,
                        });
                        console.log("marker making")
                        array.push(markerL);
                        console.log(cur_point.value)
                        // markerL.setMap(map);
                    }
                }
                console.log(array, "HERERERERERERERERRERER")
                pointsNumber.push(array.length / dist);
                console.log(dist)
                // super_direct.push(direction);
                arr_super.push(array);
                // map.fitBounds(bounds);
                // directionsRenderer.setDirections(direction);
            }
            directionsRenderer.setMap(map);
            console.log(pointsNumber)
            var mini = Math.min(pointsNumber);
            console.log(mini)
            index = pointsNumber.indexOf(mini)
            console.log(index)
            console.log(direction)
            directionsRenderer2 = new google.maps.DirectionsRenderer({
                directions: direction,
                routeIndex: index,
                map: map,
                polylineOptions: {
                    strokeColor: "green"
                }
            });
            directionsRenderer2.setDirections(direction);
            for (let i = 0; i < arr_super[index].length; i++) {
                arr_super[index][i].setMap(map)
            }

            pointsNumber = [];
            arr_super = [];
            // super_direct = [];

        })
        .catch((e) => window.alert(e));
    console.log("End of calulateAndDisplay")
}
