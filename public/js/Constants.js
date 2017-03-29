var METER = 100;
var PI = Math.PI;
function ShapeType(){}
ShapeType.Invalid = -1;
ShapeType.Circle = 0;
ShapeType.Rect = 1;
ShapeType.Tri = 2;
ShapeType.Poly = 3;
ShapeType.Line = 4;
ShapeType.Vertices = 5;

function BoxObjectType(){}
BoxObjectType.Invalid = -1;
BoxObjectType.Car = 0;
BoxObjectType.TrackTrigger = 1;
BoxObjectType.Obstacle = 2;
BoxObjectType.Wall = 3;
BoxObjectType.Field = 4;