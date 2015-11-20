function initMap() {
    geocoder = new google.maps.Geocoder();
    var myLatLng = {
        lat: 56.160249,
        lng: 10.208312
    };

    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow({
        map: map
    });
}


function getLocationFromString(address) {
    geocoder.geocode({
            'address': address
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
            } else {
                //DO nothing
            }
        }
    );
}

function getLocation() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            createAlert("Location found.", null, "alert-success");

            //Start Watcher
            var watchID = navigator.geolocation.watchPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                console.log("Position updated");
            });

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        createAlert("The Geolocation service failed.", "Error!", "alert-danger") :
        createAlert("Your browser doesn\'t support geolocation.", "Error!", "alert-danger"));
}

function fixWindowHeight() {
    var sectionHeight = $(window).height() - ($("header").outerHeight() + $("footer").outerHeight());
    $(".content").height(sectionHeight);
}

function createAlert(message, title, type) {
    $('#alertplaceholder').html('<div class="alert ' + type + '"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><span>' + (title != null ? "<strong>" + title + "</strong>" : "") + message + '</span></div>');
}


(function() {
    var map = null;
    var infoWindow = null;
    initMap();
    getLocation();
    // Fix window height
    fixWindowHeight();
    $(window).resize(function() {
        fixWindowHeight();
    })
    var dialog = $(".close");
    dialog.click(function() {
        dialog.parent().alert("close");
    });
})();
