var magnifyingposition_x=0;
var magnifyingposition_y=0;

var orderSerialNumber = "";
var imgRnd = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for( var i=0; i < 10; i++ )
  orderSerialNumber += possible.charAt(Math.floor(Math.random() * possible.length));

var _eventId = getCookie("eventId");
var _ticketNum = getCookie('ticketNum');
var _ticketType = getCookie('ticketType');


var seatListRef = new Firebase("https://ticketorder.firebaseio.com/event/" + _eventId + "/seatList/");


$('#rest_ticket').html(_ticketNum);


var _currentUserId = getCookie('userId');
if(_currentUserId != "") {
  $("#login_status").empty();
  $("#login_status").append("<img src='https://graph.facebook.com/"+ _currentUserId + "/picture' />");      
}

var stage_big = null;
var stage_small = new Kinetic.Stage({
  container: 'smallcontainer',
  width: 400,
  height: 400
});

var mode = 0;
var seatTypeCount = 0;
	// var modeColor = ["#000","#f00","#0f0","#00f","#88f","#f8d","#f88","#f05","#f80","#0f8","#cf0","#08f","#408","#ff8","#8ff"];
  var modeName = ["Stage", "Normal", "VIP"];
  var modePrice = [0, 300, 600];
  var modeColor = [];
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

  group.on('dragend',function(){
    magnifyingposition_x = group.getPosition().x;
    magnifyingposition_y = group.getPosition().y;
    console.log("x"+magnifyingposition_x+" y"+magnifyingposition_y);
  });

  var json = "";
  var eventRef = new Firebase("https://ticketorder.firebaseio.com/event/1");
  eventRef.once('value', function(dataSnapshot) {
    var eventData = dataSnapshot.val();
    json = eventData.seatMap;
    stage_big = Kinetic.Node.create(json, 'bigcontainer');
    stage_small = Kinetic.Node.create(json, 'smallcontainer');
    console.log(stage_small.toJSON());
    stage_small.setScaleX(300/stage_small.getAttr('width'));
    stage_small.setScaleY(300/stage_small.getAttr('height'));
    stage_small.setWidth(300);
    stage_small.setHeight(300);
    // console.log(stage_small.getAttr(Width)+"?"+stage_small.getAttr(Height));
    stage_small.draw();


    idLayer = stage_big.find("#idLayer")[0];
    layer = stage_big.find("#seatLayer")[0];

    idLayer = stage_small.find("#idLayer")[0];
    layer = stage_small.find("#seatLayer")[0];

    stage_big.add(idLayer);
    stage_big.add(layer);

    stage_small.add(idLayer);
    stage_small.add(layer);
    stage_small.add(layer_small);

    modeName = eventData.typeList;
    modeColor = eventData.colorList;

    stage_big.draw();
    stage_small.draw();

    $("#color-mapping-list").empty();

    seatTypeCount = 0;

    for(var i = 0; i < modeName.length; i++) {
      addSeatType(true);
    }

    layer.getChildren().forEach(function (rect) {
      bindRectUserEvent(rect);
    });  


    $('#ticket_type').html(modeName[_ticketType]);  

});

      seatListRef.on('child_added', function(dataSnapshot) {
        var seatInfo = dataSnapshot.val();
        var imageObj = new Image();
        imageObj.src = "https://graph.facebook.com/"+ seatInfo.userId + "/picture";   
        imageObj.onload = function() {
          var val = dataSnapshot.name().split(",");
          var img = new Kinetic.Image({
            id: seatInfo.imgRnd,
            x: parseInt(val[1]) * 30,
            y: parseInt(val[0]) * 30,
            image: imageObj,
            width: 30,
            height: 30
          });
           console.log("add " + seatInfo.imgRnd);
          layer.add(img);

          if(seatInfo.userId == _currentUserId && seatInfo.orderSerialNumber == orderSerialNumber) {
            img.on("mousedown", function(e) {
              // img.destroy();
              _ticketNum++;
              $('#rest_ticket').html(_ticketNum);
              // layer.draw();
              seatListRef.child(dataSnapshot.name()).remove();
            });
          }

          layer.draw();

        }
        
      });

      seatListRef.on('child_removed', function(dataSnapshot) {
        var seatInfo = dataSnapshot.val();
        console.log("destroy " + seatInfo.imgRnd);
        layer.find("#"+seatInfo.imgRnd)[0].destroy();
        layer.draw();
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

function bindRectUserEvent(rect) {
  rect.on('mousedown', function(e) {
    if(_ticketNum > 0) {
            if(this.getFill() != '#fff' && this.getFill() != '#000') { // don't click on white and black'
              var x = rect.getAttr('x');
            var y = rect.getAttr('y');

            // var imageObj = new Image();
            // imageObj.src = "https://graph.facebook.com/"+ _currentUserId + "/picture";
            // imageObj.onload = function() {
            //   var img = new Kinetic.Image({
            //     x: x,
            //     y: y,
            //     image: imageObj,
            //     width: 30,
            //     height: 30
            //   });
            //   layer.add(img);

              // img.on("mousedown", function(e) {
              //   img.destroy();
              //   _ticketNum++;
              //   $('#rest_ticket').html(_ticketNum);
              //   layer.draw();
              //   seatListRef.child(rect.getAttr('id')).remove();
              // });

                // update UI
                // layer.draw();
                _ticketNum--;
                $('#rest_ticket').html(_ticketNum);

                imgRnd = "";
                for( var i=0; i < 10; i++ )
                  imgRnd += possible.charAt(Math.floor(Math.random() * possible.length));                

                seatListRef.child(rect.getAttr('id')).set({
                  userId: _currentUserId,
                  orderSerialNumber: orderSerialNumber,
                  imgRnd: imgRnd
                });
              // }

            } 
          } else {
            alert("you don't have enough ticket");
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

function checkss() {
  var layer_s = stage_big.getChildren()[0];
      // console.log(stage_big.toJSON());
      
      layer_s.scale({x:2,y:2});
      // console.log(layer_s.getPosition());
      layer_s.position({x:-magnifyingposition_x,y:-magnifyingposition_y})
      // console.log(layer_s.x);
      layer_s.draggable(false);
      layer_s.draw();
      stage_big.draw();
      
    }