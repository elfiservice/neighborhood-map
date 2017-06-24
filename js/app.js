
//INIT KO framework
var viewModel = {
  visibleMenu: ko.observable(false),
  openListContainer: function() {
    this.visibleMenu(!this.visibleMenu());
  },
  locations: octupus.getDefaltsLocations()



};

viewModel.placeList = ko.observableArray(viewModel.locations);

viewModel.setPlaceMarker = function(placeClicked){
    populateInfoWindow(placeClicked.markerGoogle, largeInfowindow);
}

ko.applyBindings(viewModel);
