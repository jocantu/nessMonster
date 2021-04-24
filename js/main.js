var southWest = L.latLng(90, 180),
                northEast = L.latLng(-90, -180),
                mybounds = L.latLngBounds(southWest, northEast);


// Initialize map
var map = L.map('mymap',{maxBounds: mybounds, maxZoom: 19, minZoom: 2}).setView([57.316765, -4.439588],11);
var lyrDistance;
var marker;

// Open Street Map Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// add an info-container to show some statistics about the geodesic line
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    return this._div;
};
info.addTo(map);

// update the statistics with current values
info.update = function (stats) {
    const totalDistance = (stats.totalDistance ? (stats.totalDistance>10000)?(stats.totalDistance/1000).toFixed(0)+' km':(stats.totalDistance).toFixed(0)+' m' : 'invalid')
    this._div.innerHTML = '<h4>Distance:</h4>' + totalDistance;
};


// Loch Ness Monster Icon
var nessIcon = L.icon({
    iconUrl: 'img/ness_monster.svg',

    iconSize:     [40, 60], // size of the icon
    iconAnchor:   [20, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// Loch Ness Monster Marker
L.marker([57.316765, -4.439588],{icon:nessIcon}).addTo(map).bindPopup("Loch Ness Monster's House.").openPopup();

// Add a marker when the user clicks the map
function onMapClick(e) {
  if (marker) {
    map.removeLayer(marker);
  }
  if (lyrDistance) {
    map.removeLayer(lyrDistance);
  }
  marker = new L.marker(e.latlng, {draggable:'true'});
  const NessMonster = {lat: 57.316765, lng: -4.439588};
  var position = marker.getLatLng();
  const UserLocation = {lat: position.lat, lng: position.lng};
  lyrDistance = new L.Geodesic([NessMonster, UserLocation]).addTo(map);
  info.update(lyrDistance.statistics);
  marker.on('dragend', function(event){
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
    map.panTo(new L.LatLng(position.lat, position.lng))

      if (lyrDistance) {
        map.removeLayer(lyrDistance);
      }

    const UserLocation = {lat: position.lat, lng: position.lng};
    lyrDistance = new L.Geodesic([NessMonster, UserLocation]).addTo(map);
    info.update(lyrDistance.statistics);
    // // If lyrDistance exists remove it from map before creating a newone
    // if(lyrDistance){
    //   map.removeLayer(lyrDistance)
    // }
    // lyrDistance = L.polyline([[57.316765, -4.439588],[position.lat, position.lng]], {color: 'red'});
    // map.addLayer(lyrDistance );

  });
  map.addLayer(marker);
};

map.on('click', onMapClick);
