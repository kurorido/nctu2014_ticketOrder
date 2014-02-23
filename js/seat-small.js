var magnifyingposition_x=0
var magnifyingposition_y=0

$(document).ready(function () {
  var mode = 0;
      var seatTypeCount = 0;
  // var modeColor = ["#000","#f00","#0f0","#00f","#88f","#f8d","#f88","#f05","#f80","#0f8","#cf0","#08f","#408","#ff8","#8ff"];
  var modeName = ["Stage", "Normal", "VIP"];
      var modePrice = [0, 300, 600];
  var moving = false;

  var layer = new Kinetic.Layer();
  var idLayer = new Kinetic.Layer();

  var layer_small = new Kinetic.Layer();

  var rect0 = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: 160,
    height: 160,
    fill: '#ffffff',
    stroke: 'black',
    strokeWidth: 4,
    // draggable: true,
    opacity: 0.3,
    name: 'rect0'
  });

  var group = new Kinetic.Group({
    draggable: true
  });
  group.add(rect0);  

  layer_small.add(group);

    // layer_big.add(rect_big);
    // layer_big.add(groupbig);

    group.on('dragend',function(){
      magnifyingposition_x = group.getPosition().x;
      magnifyingposition_y = group.getPosition().y;
      console.log("x"+magnifyingposition_x+" y"+magnifyingposition_y);
    });
      // add the layer to the stage
      
  var json = "";
  var eventRef = new Firebase("https://ticketorder.firebaseio.com/event/1");
  eventRef.once('value', function(dataSnapshot) {
    var eventData = dataSnapshot.val();
    json = eventData.seatMap;
    stage_small = Kinetic.Node.create(json, 'smallcontainer');

    idLayer = stage_small.find("#idLayer")[0];
    layer = stage_small.find("#seatLayer")[0];

    stage_small.add(idLayer);
    stage_small.add(layer);
    stage_small.add(layer_small);

    modeName = eventData.typeList;
    modeColor = eventData.colorList;

    $("#color-mapping-list").empty();

    seatTypeCount = 0;

    for(var i = 0; i < modeName.length; i++) {
      addSeatType(true);
    }

    layer.getChildren().forEach(function (rect) {
      bindRectEvent(rect);
    });          

    layer.on("mouseup", function(e) {
      moving = false;
    });        

  });

  function addSeatType(addFromTemplate) {

    addFromTemplate = addFromTemplate || false;

    if(!addFromTemplate) {
      $( "#color-mapping-list" ).append( "<li><div style=\"display: inline-block\" onclick=\"changeType("+ (seatTypeCount) + ")\"><div style=\"height:15px; width: 15px; background-color:" + modeColor[seatTypeCount] +"; display: inline-block\"></div><span value="+ seatTypeCount +" style=\"padding-left: 10px;\"><span onclick=\"changeText(this)\">New Ticket Type</span></span><span style=\"padding-left:10px\"><span onclick=\"changePrice(this)\">300</span></span></div></li>" );
      modeName.push('New Ticket Type');
    } else {
      if(seatTypeCount != 0) {
       $( "#color-mapping-list" ).append( "<li><div style=\"display: inline-block\" onclick=\"changeType("+ (seatTypeCount) + ")\"><div style=\"height:15px; width: 15px; background-color:" + modeColor[seatTypeCount] +"; display: inline-block\"></div><span value="+ seatTypeCount +" style=\"padding-left: 10px;\"><span onclick=\"changeText(this)\">"+ modeName[seatTypeCount] + "</span></span><span style=\"padding-left:10px\"><span onclick=\"changePrice(this)\">" + modePrice[seatTypeCount] +"</span></div></li>" );
     } else {
      $( "#color-mapping-list" ).append( "<li><div style=\"display: inline-block\" onclick=\"changeType("+ (seatTypeCount) + ")\"><div style=\"height:15px; width: 15px; background-color:" + modeColor[seatTypeCount] +"; display: inline-block\"></div><span value="+ seatTypeCount +" style=\"padding-left: 10px;\"><span onclick=\"changeText(this)\">"+ modeName[seatTypeCount] + "</span></div></li>" );         
    }
  }
  seatTypeCount++;
}

function bindRectEvent(rect) {
  rect.on('mousedown', function(e) {
    moving = true;
    if(this.getFill() != modeColor[mode]) {
      this.fill(modeColor[mode]);
      layer.draw();
    } else if(this.getFill() == modeColor[mode]) {
      this.fill('#fff');
      layer.draw();
    }
  });

  rect.on('mousemove', function(e) {
    if(!moving) return;

    if(this.getFill() != modeColor[mode]) {
      this.fill(modeColor[mode]);
      layer.draw();
    }           
  });
}

      $("#btn_gotobig").click(function(){
        document.getElementById("smallcontainer").style.display="none";
        document.getElementById("btn_gotosmall").style.display="block";
        document.getElementById("bigcontainer").style.display="block";
        document.getElementById("btn_gotobig").style.display="none";
      });

      $("#btn_gotosmall").click(function(){
        document.getElementById("smallcontainer").style.display="block";
        document.getElementById("btn_gotosmall").style.display="none";
        document.getElementById("bigcontainer").style.display="none";
        document.getElementById("btn_gotobig").style.display="block";
        console.log("this is x"+magnifyingposition_x+" y"+magnifyingposition_y);
      });


    });


