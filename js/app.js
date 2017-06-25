
//INIT KO framework
var viewModel = {
    visibleMenu: ko.observable(false),
    openListContainer: function() {
        this.visibleMenu(true);
    },
    closeListContainer: function() {
        this.visibleMenu(false);
    },
    locations: octupus.getDefaltsLocations(),
    searchBox: ko.observable('')
};

viewModel.placeList = ko.computed(function() {
    var self = this;
    var searchResult = this.searchBox().toLowerCase();

    return ko.utils.arrayFilter(self.locations, function(markerLocation) {
        var title = markerLocation.title.toLowerCase();
        var matched = title.indexOf(searchResult) >= 0;
        var marker = markerLocation.markerGoogle;
        if (marker) {
            marker.setVisible(matched);
        } 
        return matched;
    });
}, viewModel);

viewModel.setPlaceMarker = function(placeClicked){
    populateInfoWindow(placeClicked.markerGoogle, largeInfowindow);
};

ko.applyBindings(viewModel);
