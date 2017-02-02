var rows,cols;
var w=40;
var grid=[];
var current,chase,chase1;
var xball=0,yball=0;
var xenem,yenem,xenem1,xenem2;
var start_angle , end_angle;
var devil=[];

var direction = 0; 
var stack=[];

var mySound;
function preload()
{
	mySound=loadSound('Sketchup animation PACMAN 3D.mp3');
	  
}

function keyPressed() {
		
	if(keyCode=== RIGHT_ARROW)
	{
		direction = 2;
	   start_angle =  QUARTER_PI;
	   end_angle =  TWO_PI-QUARTER_PI;
		// if(!current.walls[1])
		// xball=xball+1;
		if(xball>width-30)
			xball=width-30;
	}

	if(keyCode=== LEFT_ARROW)
	{
	   // fill(0,255,255);
	   direction = 4;
	   start_angle =  PI+QUARTER_PI;
	   end_angle =  PI-QUARTER_PI;
	   // arc(xball*w+15,yball*w+15,30,30,PI-QUARTER_PI,PI+QUARTER_PI);
		// if(!current.walls[3])
		// xball=xball-1;
		if(xball<0)
			xball=0;
	}

	if(keyCode=== UP_ARROW)
	{
		// fill(0,255,255);
		direction = 1;
	   end_angle =  PI+QUARTER_PI;
	   start_angle =  TWO_PI-QUARTER_PI;
	   // arc(xball*w+15,yball*w+15,30,30,PI+QUARTER_PI,TWO_PI-QUARTER_PI);
		// if(!current.walls[0])
		// yball=yball-1;
		if(yball<0)
			yball=0;
		
	}

	if(keyCode=== DOWN_ARROW)
	{
		// fill(0,255,255);
		direction = 3;
		start_angle =  PI-QUARTER_PI;
	    end_angle =  QUARTER_PI;
	   // arc(xball*w+15,yball*w+15,30,30,PI-QUARTER_PI,QUARTER_PI);
		// if(!current.walls[2])
		// yball=yball+1;
		if(yball>height-30)
			yball=height-30;
		
	}



}

function setup() {
	var cnv=createCanvas(640,640);
	var x=(windowWidth-width)/2;
	var y=(windowHeight-height)/2;
	cnv.position(x,y);
	cols=floor(width/w);
	rows=floor(height/w);
	start_angle = QUARTER_PI;
	end_angle = TWO_PI-QUARTER_PI;
	
	//console.log(x,y,cols,rows);
	mySound.setVolume(0.1);
	  mySound.play();
	for(var j=0;j<rows;j++)
		for(var i=0;i<cols;i++)
		{
			var cell=new Cell(i,j);
			grid.push(cell);
		}

		for(var k=0;k<8;k++)
   		{
   			xenem=floor(random(0,cols));
			yenem=floor(random(0,rows));
   			var mon=new Monster(xenem,yenem);
   			devil.push(mon);
   		}
	   
	current=grid[0];
}

function draw() {

	background(51);

	
	for(var i=0;i<grid.length;i++)
	{
		grid[i].show();
	}

  
   current.visited=true;
  // chase.highlight();

   //Step 1
   var next=current.checkNeighbours();
   if(next)
   {

   		next.visited=true;
   		stroke(255);
   		
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

   		
		frameRate(2);
   		if(direction == 1 && !current.walls[0]){
   			--yball;
   		}
   		else if(direction == 2 && !current.walls[1]){
   			++xball;
   		}
   		else if(direction == 3 && !current.walls[2]){
   			++yball;
   		}
   		else if(direction == 4 && !current.walls[3]){
   			--xball;
   		}

   		
   		
   		 current=grid[index(xball,yball)];

		   fill(0,255,255);	
		   arc(xball*w+w/2,yball*w+w/2,w/2,w/2,start_angle,end_angle);

		   for(var i=0;i<8;i++)
		   	devil[i].show();
	  	

   }
}

function Monster(i,j)
{
	this.i=i;
	this.j=j;
	

	this.show=function(){

		if(xball==this.i && yball==this.j){
   			textSize(20);
   			textAlign(CENTER);
   			start_angle=TWO_PI;
   			end_angle=TWO_PI;
			text("Game Over", 100,100,150,100);
			noLoop();
	}	

		var chase=grid[index(this.i,this.j)];

		fill(0,255,0);
		ellipse(this.i*w+w/2,this.j*w+w/2,w/2,w/2);

		var r1=floor(random(0,4));
	   
	   	 if(r1==0 && !chase.walls[0])
	   		this.j-=1;
	   	 if(r1==1 && !chase.walls[1])
	   		this.i+=1;
	   	 if(r1==2 && !chase.walls[2])
	   		this.j+=1;
	   	 if(r1==3 && !chase.walls[3])
	   		this.i-=1;

	   	if(this.i>width-w)
	   	this.i=width-w;

	   if(this.i<0)
	   	this.i=0;

	   if(this.j>height-w)
	   		this.j=height-w;

	   	if(this.j<0)
	   		this.j=0;



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
		stroke(0);
		fill(0,0,255);

		if(this.walls[0]){
		
		rect(x,y,w,5);
		}

		if(this.walls[1]){
		
		rect(x+w,y,5,w);
		}

		if(this.walls[2]){
		
		rect(x,y+w,w,5);
		}

		if(this.walls[3]){
		
		rect(x,y,5,w);
		}
		
	
		if(this.visited){
			noStroke();
		fill(0,0,0,145);

		rect(x,y,w,w);
		stroke(255);
		ellipse(this.i*w+w/2,this.j*w+w/2,2,2);
		
		}
	}
}


function removeWalls(a,b)
{
	var x=a.i-b.i;
	var top=grid[index(a.i,a.j-1)];
	var left=grid[index(a.i-1,a.j)];

	if(x===1)
	{
		a.walls[3]=false;
		b.walls[1]=false;
		
	}
	else if(x===-1)
	{
		a.walls[1]=false;
		b.walls[3]=false;
		a.walls[0]=false;
		if(top)
		top.walls[2]=false;
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
		a.walls[3]=false;
		if(left)
		left.walls[1]=false;
	}

	

}