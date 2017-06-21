

  var map;
  function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 13,
      mapTypeControl: false
    });
  }

  var goBtn = $('.btn-go');
  var listBox = $('.list-box');
  var closeListBox = $('.close-list-box');

  goBtn.click(function() {
    listBox.addClass('open');
  });

  closeListBox.click(function(){
    listBox.removeClass('open');
  });
