// Initialize map
var map = L.map('location-map').setView([57.316765, -4.439588],11);

// Open Street Map Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.geoJSON(geojsonCountries).addTo(map);

const search = new GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
});
map.addControl(search);
