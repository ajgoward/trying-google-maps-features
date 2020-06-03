
    //<![CDATA[

    if (GBrowserIsCompatible()) {
      // ==== first part of the select box ===
      var select_html = '<select onChange="handleSelected(this)">' +
                        '<option selected> - Select a location - <\/option>';
      // =====================================
      var gmarkers = [];
      var htmls = [];
      var i = 0;


      // A function to create the marker and set up the event window
      function createMarker(point,name,html) {
        var marker = new GMarker(point);
        GEvent.addListener(marker, "click", function() {
          marker.openInfoWindowHtml(html);
        });
        gmarkers[i] = marker;
        htmls[i] = html;
        
        // ======= Add the entry to the select box =====
        select_html += '<option> ' + name + '<\/option>';
        // ==========================================================
        
        i++;
        return marker;
      }


      // ======= This function handles selections from the select box ====
      // === If the dummy entry is selected, the info window is closed ==
      function handleSelected(opt) {
        var i = opt.selectedIndex - 1; 
        if (i > -1) {
          GEvent.trigger(gmarkers[i],"click");
        }
        else {
          map.closeInfoWindow();
        }
      }



      // create the map
      var map = new GMap2(document.getElementById("map"));
      map.addControl(new GLargeMapControl());
      map.addControl(new GMapTypeControl());
      map.setCenter(new GLatLng( 43.907787,-79.359741), 9);



      // Read the data from 100.xml
      
      GDownloadUrl("100.xml", function (doc) {
        var xmlDoc = GXml.parse(doc);
        var markers = xmlDoc.documentElement.getElementsByTagName("marker");
          
        for (var i = 0; i < markers.length; i++) {
          // obtain the attribues of each marker
          var lat = parseFloat(markers[i].getAttribute("lat"));
          var lng = parseFloat(markers[i].getAttribute("lng"));
          var point = new GLatLng(lat,lng);
          var html = markers[i].getAttribute("html");
          var label = markers[i].getAttribute("label");
          // create the marker
          var marker = createMarker(point,label,html);
          map.addOverlay(marker);
        }
        // ===== final part of the select box =====
        select_html += '<\/select>';
        document.getElementById("selection").innerHTML = select_html;
      });
    }

    else {
      alert("Sorry, the Google Maps API is not compatible with this browser");
    }

    // This Javascript is based on code provided by the
    // Community Church Javascript Team
    // http://www.bisphamchurch.org.uk/   
    // http://econym.org.uk/gmap/

    //]]>
    