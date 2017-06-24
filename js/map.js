var largeInfowindow;
var bounds;
var defaultIcon;
var highlightedIcon;

var Marker = function(data) {
  this.title = data.title;
  this.location = data.location;
  this.markerGoogle = data.markerGoogle;
}


var model = {
  neighborhood: {
    lat:  -3.739844,
    lng: -38.540374
  },
  mapConfig: {
    zoom: 15,
    mapTypeControl: false,
    styles: [
          {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
          }
        ]
  },
  locations: [
    {title: 'Shopping Benfica', location: {lat: -3.738977, lng: -38.539653}},
    {title: 'Mandir Restaurante Vegano', location: {lat: -3.744030,  lng: -38.539632 }},
    {title: 'Estadio Presidente Vagas', location: {lat: -3.745876,  lng: -38.536753 }},
    {title: 'Complexo Ktorze Estudio', location: {lat: -3.738676,  lng: -38.541996 }},
    {title: 'Pracinha da Gentilandia', location: {lat: -3.743473,  lng: -38.537072 }}
  ]


};

var octupus = {
  init: function(){
    view.init();
  },
  getNeighborhood: function(){
    return model.neighborhood;
  },
  getMapConfig: function(){
    return model.mapConfig;
  },
  getDomElements: function(){
    return view.domElements;
  },
  getDefaltsLocations: function(){
    var defaultLocations = [];
    model.locations.forEach(function(marker){
      defaultLocations.push(new Marker(marker) );
    });

    return defaultLocations;
  }
};

var view = {
  domElements: {
      mapElemt: $('#map')[0],
      searchElemt: $('#search-input')[0],
      btnGoElemt: $('#go-btn')[0]

    },
    init: function() {

    }
};

octupus.init();

//initiaze Map
var map;
var markers = [];
var elements = octupus.getDomElements();

function initMap() {
  var neighborhood = octupus.getNeighborhood();
  var mapConfig = octupus.getMapConfig();

  // console.log(document.getElementById('map'), $('#map')[0], elements.mapElemt);
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(elements.mapElemt, {
      center: neighborhood,
      zoom: mapConfig.zoom,
      styles: mapConfig.styles,
      mapTypeControl: mapConfig.mapTypeControl
    });
    bounds = new google.maps.LatLngBounds();
    largeInfowindow = new google.maps.InfoWindow();
  // Style the markers a bit. This will be our listing marker icon.
   defaultIcon = makeMarkerIcon('0091ff');
   highlightedIcon = makeMarkerIcon('FFFF24');

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < viewModel.locations.length; i++) {
      // Get the position from the location array.
      var selfLocation = viewModel.locations[i];
      var position = selfLocation.location;
      var title = selfLocation.title;

      // Create a marker per location, and put into markers array.
      selfLocation.markerGoogle = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      });

      // Create an onclick event to open the large infowindow at each marker.
      selfLocation.markerGoogle.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      selfLocation.markerGoogle.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
        populateInfoWindow(this, largeInfowindow);
      });
      selfLocation.markerGoogle.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });

      selfLocation.markerGoogle.setMap(map);
      bounds.extend(selfLocation.markerGoogle.position);
      map.fitBounds(bounds);

  }


}

//functions


//create Icons function
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

//Population with informations the Marker
function populateInfoWindow(marker, infowindow) {

  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    // Clear the infowindow content to give the streetview time to load.
    infowindow.setContent(marker.title);
    infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });

    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);
    map.fitBounds(bounds);
  }
}

// This function will loop through the listings and hide them all.
function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}
