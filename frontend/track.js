document.addEventListener("DOMContentLoaded", () => {

var map = L.map('map').setView([40.7128,-74.0060],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
}).addTo(map);

/* Customer location */

var customer = L.marker([40.7128,-74.0060]).addTo(map)
.bindPopup("Delivery Destination")
.openPopup();

/* Driver */

var driverLat = 40.7028;
var driverLng = -74.0160;

var driverMarker = L.marker([driverLat,driverLng]).addTo(map)
.bindPopup("Delivery Driver");

/* Move driver */

setInterval(() => {

driverLat += 0.0004;
driverLng += 0.0004;

driverMarker.setLatLng([driverLat,driverLng]);

},3000);

});