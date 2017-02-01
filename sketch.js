var rows,cols;
var w=30;
var grid=[];
var current,chase;
var xball=0,yball=0;
var xenem,yenem,dx,dy,length;
var start_angle , end_angle;


var stack=[];

var img,img1,mySound;
function preload()
{
	mySound=loadSound('Sketchup animation PACMAN 3D.mp3');
	  
}

function keyPressed() {
	
	if(keyCode=== RIGHT_ARROW)
	{
	   start_angle =  QUARTER_PI;
	   end_angle =  TWO_PI-QUARTER_PI;
		if(!current.walls[1])
		xball=xball+1;
		if(xball>width-30)
			xball=width-30;
	}

	if(keyCode=== LEFT_ARROW)
	{
	   // fill(0,255,255);
	   start_angle =  PI-QUARTER_PI;
	   end_angle =  PI+QUARTER_PI;
	   // arc(xball*w+15,yball*w+15,30,30,PI-QUARTER_PI,PI+QUARTER_PI);
		if(!current.walls[3])
		xball=xball-1;
		if(xball<0)
			xball=0;
	}

	if(keyCode=== UP_ARROW)
	{
		// fill(0,255,255);
	   start_angle =  PI+QUARTER_PI;
	   end_angle =  PI-QUARTER_PI;
	   // arc(xball*w+15,yball*w+15,30,30,PI+QUARTER_PI,TWO_PI-QUARTER_PI);
		if(!current.walls[0])
		yball=yball-1;
		if(yball<0)
			yball=0;
		
	}

	if(keyCode=== DOWN_ARROW)
	{
		// fill(0,255,255);
		start_angle =  PI-QUARTER_PI;
	   end_angle =  QUARTER_PI;
	   // arc(xball*w+15,yball*w+15,30,30,PI-QUARTER_PI,QUARTER_PI);
		if(!current.walls[2])
		yball=yball+1;
		if(yball>height-30)
			yball=height-30;
		
	}



}

function setup() {
	var cnv=createCanvas(450,450);
	var x=(windowWidth-width)/2;
	var y=(windowHeight-height)/2;
	cnv.position(x,y);
	cols=floor(width/w);
	rows=floor(height/w);
	start_angle = QUARTER_PI;
	end_angle = TWO_PI-QUARTER_PI;
	//frameRate(5);
	//console.log(x,y,cols,rows);
	mySound.setVolume(0.1);
	  mySound.play();
	for(var j=0;j<rows;j++)
		for(var i=0;i<cols;i++)
		{
			var cell=new Cell(i,j);
			grid.push(cell);
		}


	   
	current=grid[0];
	xenem=floor(random(0,cols));
	yenem=floor(random(0,rows));
	
	
	
}

function draw() {

	background(51);

	mySound.setVolume(0.1);
	  mySound.play();


	for(var i=0;i<grid.length;i++)
	{
		grid[i].show();
	}
  
   current.visited=true;
 // current.highlight();
   //Step 1
   var next=current.checkNeighbours();
   if(next)
   {
   		next.visited=true;

   		//Step 3
   		stack.push(current);
   		//Step 3
   		removeWalls(current,next);

   		//Step 4
   		current=next;
   }
   else if(stack.length>0)
   {
   		current=stack.pop();
   }
   else if(stack.length==0){

   		// image(img1,xenem,yenem);
   		fill(255,0,0);
   		ellipse(xenem+15,yenem+15,30,30);
   		current=grid[index(xball,yball)];
   		chase=grid[index(xenem,yenem)];

	   // image(img,xball*w,yball*w);
	   fill(0,255,255);	
	   arc(xball*w+15,yball*w+15,30,30,start_angle,end_angle);

	   dx=xball*w-xenem;
	   dy=yball*w-yenem;
	   // console.log(dx);
	   // console.log(dy);

	   length=sqrt(dx*dx+dy*dy);
	   // console.log(length);
	   if(length)
	   {
	   	dx/=length;
	   	dy/=length;
	   }

	   xenem+=(dx*0.5*0.5);
	   yenem+=(dy*1*1);

	   if(xenem>width-30)
	   	xenem=width-30;

	   if(xenem<0)
	   	xenem=0;

	   if(yenem>height-30)
	   		yenem=height-30;

	   	if(yenem<0)
	   		yenem=0;

   }




}

function index(i,j)
{
	if(i<0 || j<0 || i>cols-1 || j>rows-1){
		return -1;
	}

	return i+j*cols;
}
function Cell(i,j) {
	this.i=i;
	this.j=j;
	
	this.walls=[true,true,true,true];
	this.visited=false;

	this.highlight=function()
	{
		var x=this.i*w;
		var y=this.j*w;

		noStroke();
		fill(0,355,0,100);
		rect(x,y,w,w);
	}

	this.checkNeighbours=function()
	{
		var neighbour=[];

		var top=grid[index(i,j-1)];
		var right=grid[index(i+1,j)];
		var bottom=grid[index(i,j+1)];
		var left=grid[index(i-1,j)];

		if(top && !top.visited){
			neighbour.push(top);
		}
		if(right && !right.visited){
			neighbour.push(right);
		}
		if(bottom && !bottom.visited){
			neighbour.push(bottom);
		}
		if(left && !left.visited){
			neighbour.push(left);
		}

		if(neighbour.length>0)
		{
			var r=floor(random(0,neighbour.length));
			return neighbour[r];
		}
		else{
			return undefined;
		}

	}

	this.show=function()
	{
		var x=this.i*w;
		var y=this.j*w;
		stroke(0,160,355);

		if(this.walls[0]){
		line(x,y,x+w,y);
		}

		if(this.walls[1]){
		line(x+w,y,x+w,y+w);
		}

		if(this.walls[2]){
		line(x+w,y+w,x,y+w);
		}

		if(this.walls[3]){
		line(x,y+w,x,y);
		}

	
		if(this.visited){
			noStroke();
		fill(0,0,0,150);

		rect(x,y,w,w);
		

		
		}
	}
}


function removeWalls(a,b)
{
	var x=a.i-b.i;

	if(x===1)
	{
		a.walls[3]=false;
		b.walls[1]=false;
	}
	else if(x===-1)
	{
		a.walls[1]=false;
		b.walls[3]=false;
	}

	var y=a.j-b.j;
	if(y===1)
	{
		a.walls[0]=false;
		b.walls[2]=false;
	}
	else if(y===-1)
	{
		a.walls[2]=false;
		b.walls[0]=false;
	}

	

}