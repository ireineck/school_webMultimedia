// 1) get reference to canvas element 
 var canvas = document.querySelector('#myCanvas');

// 2) get reference to this canvas element's 2d context (object)
var ctx = canvas.getContext('2d');

// above same as 
//var ctx = document.querySelector('#myCanvas').getContext('2d');

ctx.fillStyle = 'red';
ctx.strokeStyle = '#fff';
ctx.lineWidth = 10;
ctx.strokeRect(50,50, 100, 100);
ctx.fillRect(50,50, 100, 100);

ctx.fillStyle = 'rgba(0, 240, 120, 0.8)';
ctx.fillRect(120, 80, 200, 140);
ctx.lineWidth = 1;
ctx.strokeRect(120, 80, 200, 140);

ctx.clearRect(250, 100, 100 , 60);

//Create a circle 
ctx.fillStyle = 'rbga(200,150,180,0.6)';
ctx.strokeStyle = 'rgba(200,200,200,0.8)';
ctx.lineWidth = 8;
ctx.beginPath();

// draw the circle 
ctx.arc(200,200,100,0,2 * Math.PI, false); // false = clockwise

ctx.closePath();
ctx.fill();
ctx.stroke();

// straight line from point a to point b
ctx.beginPath();
ctx.lineWidth = 2;
ctx.moveTo(200,350);
ctx.lineTo(250, 480);
ctx.closePath();
ctx.stroke(); //draw the line

//draw curve 
ctx.beginPath();
ctx.strokeStyle = 'rgba(0,255,0,0.9)';
ctx.moveTo (300,400);
ctx.quadraticCurveTo(400,350,480,580);
ctx.closePath();
ctx.stroke(); // draw the line 


// draw a cubic bezieer curve 
ctx.beginPath();
ctx.strokeStyle = 'rgba(0,0,255,0.9)';
ctx.moveTo (300,400);
ctx.bezierCurveTo(350,100,380,500,450,450);
ctx.closePath();
//ctx.closePath();
ctx.stroke();

// Moving cloesPath() after stroke() gets rid of connecting line 

