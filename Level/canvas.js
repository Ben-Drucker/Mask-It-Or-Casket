var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');
console.log(canvas);

//streets 500x500
c.beginPath();
c.lineWidth = 5;
c.moveTo(0,5);
c.lineTo(500,5)
c.stroke();

//h
c.beginPath();
c.moveTo(50,5);
c.lineTo(50,50)
c.stroke();

c.beginPath();
c.moveTo(125,5);
c.lineTo(125,50)
c.stroke();

c.beginPath();
c.moveTo(250,5);
c.lineTo(250,50)
c.stroke();

//v
c.beginPath();
c.moveTo(0,50);
c.lineTo(500,50)
c.stroke();

//river
c.lineWidth = 10;
c.strokeStyle = "blue";
c.beginPath();
c.moveTo(0,63);
c.lineTo(500,63)
c.stroke();

//b
c.strokeStyle = "black";
c.beginPath();
c.moveTo(187,50);
c.lineTo(187,75)
c.stroke();

c.beginPath();
c.moveTo(87,50);
c.lineTo(87,75)
c.stroke();

c.lineWidth = 5;
c.beginPath();
c.moveTo(0,75);
c.lineTo(500,75)
c.stroke();

c.beginPath();
c.moveTo(0,120);
c.lineTo(500,120)
c.stroke();