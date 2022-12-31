const waypts = [];
let loc;
let map;
let stations = [];
let web = ""

function getCuLoaction(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        loc = pos;
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center:loc
  });
  directionsDisplay.setMap(map);
  
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  const Stop = document.getElementById('Stops');
  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(end);
  new google.maps.places.Autocomplete(Stop);



  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  stations = [];
  stations.push({
    location: $("#start")[0].value,
    stopover: true
  });
  for (var i = 0; i < waypts.length; i++) {
    var address = waypts[i].addr;
    if (address !== '') {
      stations.push({
        location: address,
        stopover: true
      });
    }
  }
  console.log(stations)
  const selectedMode = document.getElementById("mode").value;

  directionsService.route({
    origin: loc,
    destination: document.getElementById('end').value,
    waypoints: stations,
    optimizeWaypoints: false,
    travelMode: google.maps.TravelMode[selectedMode],
  },  
function(response, status) {
  $("#gotoGo").hide(100);
  if (status === 'OK') {
    directionsDisplay.setDirections(response);
  $("#gotoGo").show(100);
    makeUrl();
  } else {
    window.alert('Directions request failed due to ' + status);
  }
  }
  );
}
function goToGoogle(){
  window.open(web);

}
function makeUrl(){
  web = `https://www.google.com/maps/dir/`
  web+=`${loc.lat},${loc.lng}/`
  stations.forEach(element => {
      web+=`${element.location}/`
  });
  web+=document.getElementById('end').value
}

$(document).ready(() => {
  getCuLoaction();
  initMap()
})