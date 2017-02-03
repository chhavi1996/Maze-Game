var rows,cols;
var w=56;
var pacman,pacmanImg,redImg,yellowImg,pinkImg,greenImg,blueImg;
var grid=[];
var current,chase,chase1;
var xball=0,yball=0;
var xenem,yenem,xenem1,xenem2;
var start_angle , end_angle;
var devil=[];
var ghostDir = 0;
var direction = 0; 
var stack=[],power=[];
var img,weak;
var mySound;
function preload()
{
	mySound=loadSound('PACMAN.mp3');
	pacmanImg=loadImage('mario.png');
	redImg=loadImage('red.png');
	yellowImg=loadImage('yellow.png');
	pinkImg=loadImage('pink.png');
	blueImg=loadImage('blue.png');
	greenImg=loadImage('green.png');
	weak=loadImage('weak.png');
	
	  
}



function keyPressed() {
		
	if(keyCode=== RIGHT_ARROW)
	{
		direction = 2;

		if(xball>width-w)
			xball=width-w;
	}

	if(keyCode=== LEFT_ARROW)
	{
	   
	   direction = 4;

		if(xball<0)
			xball=0;
	}

	if(keyCode=== UP_ARROW)
	{
		
		direction = 1;
		
		if(yball<0)
			yball=0;
		
	}

	if(keyCode=== DOWN_ARROW)
	{
		
		direction = 3;

		if(yball>height-w)
			yball=height-w;
		
	}



}

function setup() {
	var cnv=createCanvas(672,672);

	var x=(windowWidth-width)/2;
	var y=(windowHeight-height)/2;
	cnv.position(x,y);
	cols=floor(width/w);
	rows=floor(height/w);
	
	
	//console.log(x,y,cols,rows);
	mySound.setVolume(0.1);
	  mySound.play();
	for(var j=0;j<rows;j++)
		for(var i=0;i<cols;i++)
		{
			var cell=new Cell(i,j);
			grid.push(cell);
		}

		for(var i=0;i<4;i++)
		{
			xenem=floor(random(0,cols));
			yenem=floor(random(0,rows));
			var powerup=new makePower(xenem,yenem);
			power.push(powerup);


		}

   		xenem=floor(random(0,cols));
		yenem=floor(random(0,rows));

   		pacman=new pacman(0,0);
   		devil.push(new Ghosts(redImg,cols/2*w+8,rows/2*w+10));
   		devil.push(new Ghosts(yellowImg,(cols-1)*w+8,(rows-1)*w+10));
   		devil.push(new Ghosts(greenImg,8,(rows-1)*w+10));
   		devil.push(new Ghosts(blueImg,(cols-1)*w+8,10));
   		devil.push(new Ghosts(pinkImg,xenem*w+8,yenem*w+10));





	   
	current=grid[0];

}

function draw() {

	background(51);

	for(var i=0;i<grid.length;i++)
	{
		
		grid[i].show();
	}


  
   current.visited=true;
   grid[0].draw=false;
   

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

   		
		frameRate(5);
		pacman.show();
		for(var i=0;i<5;i++){
			devil[i].show();
			devil[i].move();
		}


		for(var i=0;i<4;i++)
			power[i].show();
		
		

   		if(direction == 1 && !current.walls[0]){
   			--yball;
   			pacman.move(3,width,w,height);
   			current.draw=false;

   		}
   		else if(direction == 2 && !current.walls[1]){
   			++xball;
   			pacman.move(2,width,w,height);
   			current.draw=false;
   		}
   		else if(direction == 3 && !current.walls[2]){
   			++yball;
   			pacman.move(0,width,w,height);
   			current.draw=false;
   		}
   		else if(direction == 4 && !current.walls[3]){
   			--xball;
   			pacman.move(1,width,w,height);
   			current.draw=false;
   		}

   		if(xball>width-w)
	   	xball=width-w;

	   	if(xball<0)
	   	xball=0;

	   if(yball>height-w)
	   		yball=height-w;


	   	if(yball<0)
	   		yball=0;

   		
   		 current=grid[index(xball,yball)];

	 }
}

function Ghosts(img,x,y)
{

	this.x=x;
	this.y=y;
	this.img=img;
	this.direction=0;
	this.i=(this.x-8)/w;
	this.j=(this.y-10)/w;
	this.isWeak=false;
	this.lastx=(x-8)/w;;
	this.lasty=(y-10)/w;


	this.show=function()
	{
		if(this.isWeak===false)
			image(img,this.x,this.y,31,32,0,32*this.direction+1,31,32);
		else
		{
			image(weak,this.x,this.y,31,32,0,0,31,32);
		}
	}

	this.move=function()
	{
			if(xball==this.i && yball==this.j && this.isWeak===false){


   			textSize(20);
   			textAlign(CENTER);
			text("Game Over", 100,100,150,100);
			noLoop();
			}
			else if(xball==this.i && yball==this.j && this.isWeak===true)
			{
				
				this.i=this.lastx;
				this.j=this.lasty;
				this.isWeak=false;
			}	

		
		var chase=grid[index(this.i,this.j)];


		var r1=floor(random(0,4));
		this.direction=r1;
	   
	   	 if(this.direction==0 && !chase.walls[0]){
	   	 	this.j-=1;
	   	}
	   	 if(this.direction==1 && !chase.walls[1]){
	   	 	this.i+=1;
	   	}
	   	 if(this.direction==2 && !chase.walls[2]){
	   	 	this.j+=1;
	   	}
	   	 if(this.direction==3 && !chase.walls[3])
	   		this.i-=1;

	   	 this.x=this.i*w+8;
	   	 this.y=this.j*w+10;
    
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

function makePower(x,y)
{
	this.x=x;
	this.y=y;
	this.draw=true;

	this.show=function()
	{
		if(xball==this.x && yball==this.y)
		{
			for(var i=0;i<5;i++)
				devil[i].isWeak=true;

			this.draw=false;
			current.draw=false;

			setTimeout(makeGhostStrong,10000);

		}

		

		if(this.draw){
		fill(255,0,0);
		stroke(255);
		ellipse(this.x*w+w/2,this.y*w+w/2,25,25);
		}
	}
}

function makeGhostStrong()
{
	for(var i=0;i<devil.length;i++)
	{
		devil[i].isWeak=false;
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
	this.draw=true;
	
	this.walls=[true,true,true,true];
	this.visited=false;
	

	this.highlight=function()
	{
		var x=this.i*w;
		var y=this.j*w;

		noStroke();
		fill(0,255,0);
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
		fill(255,255,0);
		if(this.draw){
		ellipse(this.i*w+w/2,this.j*w+w/2,w/4,w/4);

		}
		
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
	else if(x===-1)	{
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
