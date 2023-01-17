const waypts = [];
let loc;
let map;
let stations = [];
let web = ""
let shit = 0;
function getCuLoaction() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        loc = pos;
        map.setCenter(pos);
        initMap();

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
    center: loc
  });
  directionsDisplay.setMap(map);
  const end = document.getElementById('end');
  const Stop = document.getElementById('Stops');
  new google.maps.places.Autocomplete(end);
  new google.maps.places.Autocomplete(Stop);



  document.getElementById('submit').addEventListener('click', function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  shit++;
  if (shit % 2 === 1) {
    return;
  }
  stations = [];

  for (var i = 1; i < waypts.length; i++) {
    var address = waypts[i].addr;
    if (address !== '') {
      stations.push({
        location: address,
        stopover: true
      });
    }
  }

  // console.log(stations)
  const selectedMode = document.getElementById("mode").value;
  // getCuLoaction();
  directionsService.route({
    origin: loc,
    destination: document.getElementById('end').value,
    waypoints: stations,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode[selectedMode],
  }, function (response, status) {
    if (status === 'OK') {
      rendeRoute(response);
      directionsDisplay.setDirections(response);
      $("#gotoGo").show(100);
      makeUrl(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  }
  );
}
function goToGoogle() {
  window.open(web);
}
function makeUrl(response) {
  web = `https://www.google.com/maps/dir/`
  let stops = response.routes[0].legs;
  for (let i = 0; i < stops.length; i++) {
    let stop = stops[i];
    web += `${stop.start_address}/`;
  }
  web += document.getElementById('end').value
}

$(document).ready(() => {
  getCuLoaction();
  setInterval(getCuLoaction,1500);
})