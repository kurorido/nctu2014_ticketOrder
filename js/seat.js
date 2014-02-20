$(document).ready(function () {
      var stage = new Kinetic.Stage({
        container: 'container',
        width: 320,
        height: 480
      });

      var layer = new Kinetic.Layer();

      var widthIndex = 32;
      var heightIndex = 32;

      var rect0 = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 32,
        height: 32,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4
        name: 'rect0'
      });

      var rect1 = new Kinetic.Rect({
        x: 0+widthIndex,
        y: 0+heightIndex,
        width: 32,
        height: 32,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4
        name: 'rect1'
      });

      // add the shape to the layer
      layer.add(rect0);
      layer.add(rect1);

      // add the layer to the stage
      stage.add(layer);
});