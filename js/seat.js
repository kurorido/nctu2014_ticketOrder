$(document).ready(function () {
  var stage_small = new Kinetic.Stage({
    container: 'smallcontainer',
    width: 320,
    height: 400
  });

  var stage_big = new Kinetic.Stage({
    container: 'bigcontainer',
    width: 320,
    height: 400
  });

  var layer_small = new Kinetic.Layer();
  var layer_big = new Kinetic.Layer();

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

  var rect_small = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: 320,
    height: 400,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    // draggable: true,
    opacity: 0.9,
    name: 'rectsmall'
  });

  var rect_big = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: 320,
    height: 400,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    // draggable: true,
    opacity: 0.5,
    name: 'rectbig'
  });

  for(var i=0;i<30;i++){
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
      layer_small.add(rect1);
    }

    for(var i=0;i<30;i++){
      var rect1_big = new Kinetic.Rect({
        x: 0+widthIndex*i,
        y: 0+heightIndex*i,
        width: 32,
        height: 32,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        name: 'rect1_big'
      });
      // add the shape to the layer
      layer_big.add(rect1_big);
    }

    var group = new Kinetic.Group({
      draggable: true
    });
    group.add(rect0);

    layer_small.add(rect_small);
    layer_small.add(group);

    layer_big.add(rect_big);
    var magnifyingposition_x=0
    var magnifyingposition_y=0
    group.on('dragend',function(){
      magnifyingposition_x = group.getPosition().x;
      magnifyingposition_y = group.getPosition().y;
      console.log("x"+magnifyingposition_x+" y"+magnifyingposition_y);
    });
      // add the layer to the stage
      stage_small.add(layer_small);
      stage_big.add(layer_big);
    });


