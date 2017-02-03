function pacman(x,y) {
	this.x=x;
	this.y=y;
	this.frame=0;
	this.direction=2;

	this.show=function()
	{
		image(pacmanImg,this.x,this.y,50,70,50*this.frame++,70*this.direction,50,70);
		this.frame=(this.frame===4)?0:this.frame;
	}

	this.move=function(d,width,w,height)
	{
		this.direction=d;
		if(this.direction==0)
			this.y+=56;
		if(this.direction==1)
			this.x-=56;
		if(this.direction==2)
			this.x+=56;
		if(this.direction==3)
			this.y-=56;

		if(this.x>width-w)
	   	this.x=width-w;

	   	if(this.x<0)
	   	this.x=0;

	   if(this.y>height-w)
	   		this.y=height-w;


	   	if(this.y<0)
	   		this.y=0;
		
	}
}