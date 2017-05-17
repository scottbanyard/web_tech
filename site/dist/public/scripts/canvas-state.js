function toCSSColour(col) {
    return ['rgb(', ')'].join([col.red, col.green, col.blue].join(','));
}
function intersects(point, shape) {
    if (shape.kind == 'Circle') {
        var dx = point.x - shape.centre.x;
        var dy = point.y - shape.centre.y;
        return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(shape.radius, 2);
    }
    else if (shape.kind == 'Rectangle') {
        return point.x >= shape.centre.x - shape.width &&
            point.x <= shape.centre.x + shape.width &&
            point.y >= shape.centre.y - shape.height &&
            point.y <= shape.centre.y + shape.height;
    }
    else if (shape.kind == 'Text') {
        console.error('Text doesn\'t have intersect code yet');
    }
}
class CanvasState {
    constructor() {
        this.shapes = [];
        this.shapeSelected = false;
    }
    addShape(shape) {
        this.shapes.push(shape);
    }
    replaceShape(index, shape) {
        if (index >= 0 && index < this.shapes.length) {
            this.shapes[index] = shape;
        }
    }
    setSelectedShape(click) {
        var index = this.shapes.findIndex(intersects.bind(null, click));
        if (index == -1)
            this.shapeSelected = false;
        else {
            this.shapeSelected = true;
            this.selected = [index, this.shapes[index]];
        }
    }
    deselectShape() {
        this.shapeSelected = false;
        this.selected = null;
    }
    moveShape(coord) {
        if (this.shapeSelected) {
            this.selected[1].centre = coord;
            this.replaceShape(this.selected[0], this.selected[1]);
        }
    }
    getShapes() {
        return this.shapes;
    }
}
