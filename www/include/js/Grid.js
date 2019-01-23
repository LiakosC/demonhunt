var Grid = function(gridWidth, gridHeight, nodeWidth, nodeHeight, map) {
	this.gridWidth 	= gridWidth;	// int
	this.gridHeight 	= gridHeight;	// int
	this.nodeWidth 	= nodeWidth;	// double
	this.nodeHeight	= nodeHeight;	// double
	this.map				= map;
	
	this.getNode = function(x, y) { // 0 to width-1 | int
		var node;
		if (this.map[y][x] !== undefined) {
			node = {gridX: x, gridY: y};
			
			return node;
		} else {return null;}
	}
	
	this.scan = function(callback) {
		for (var gridHeight=0; gridHeight<this.map.length; gridHeight++) {
			for (var gridWidth=0; gridWidth<this.map[gridHeight].length; gridWidth++) {
				
				// gridWidth, gridHeight, value
				callback(gridWidth, gridHeight, this.map[gridHeight][gridWidth]);
			}
		}
	}
}