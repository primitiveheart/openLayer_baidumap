function calcArea(shapeType, geometry){
	var tArea;
	if(shapeType == "LineString"){
		var coord = geometry.getCoordinates();
		var startX = coord[0][0][0];
		var startY = coord[0][0][0];
		var endX = coord[0][3][0];
		var endY = coord[0][3][1];
		
		var dx = Math.abs(endX - startX)/1000;
		var dy = Math.abs(endY - startY)/1000;
		
		tArea = Math.round(dx * dy);
	}else if(shapeType == "Circle"){
		var radius = geometry.getRadius();
		tArea = Math.round(Math.PI * Math.pow(radius/1000,2));
	}else{
		var coord = geometry.getCoordinates();
		var len = coord[0].length;
		tArea = ploygon_area(len, coord);
	}
	return tArea;
}

function det(x0, y0, x1, y1, x2, y2){
	return (x1-x0)*(y2-y0) - (x2 - x0)*(y1 - y0);
}

function ploygon_area(n ,coord){
	var sum = 0.0;
	for(var i = 1;i < n- 1; i++){
		var temp = det(coord[0][0][0]/1000, coord[0][0][1]/1000, coord[0][i][0]/1000, 
			coord[0][i][1]/1000, coord[0][i+1][0]/1000, coord[0][i+1][1]/1000);
		sum += temp;
	}
	return Math.round(Math.abs(sum/2));
}
