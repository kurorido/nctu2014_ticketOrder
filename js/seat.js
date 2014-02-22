$(document).ready(function () {
  var stage = new Kinetic.Stage({
    container: 'container',
    width: 320,
    height: 320
  });

  var layer = new Kinetic.Layer();

  var widthIndex = 32;
  var heightIndex = 32;

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

  for(var i=0;i<2;i++){
    var rect1 = new Kinetic.Rect({
      x: 0+widthIndex*i,
      y: 0+heightIndex*i,
      width: 32,
      height: 32,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      name: 'rect1'
    });

      // add the shape to the layer
      layer.add(rect1);
    }
    var group = new Kinetic.Group({
      draggable: true
    });
    group.add(rect0);
    layer.add(group);

    group.on('dragend',function(){
      console.log("x"+group.getPosition().x+" y"+group.getPosition().y);
    });
      // add the layer to the stage
      stage.add(layer);
    });


