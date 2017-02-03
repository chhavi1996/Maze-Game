function Ghosts(img,x,y) {
	this.x=x;
	this.y=y;
	this.img=img;
	this.direction=0;

	this.show=function()
	{
		image(img,this.x,this.y,31,32,0,0,31,32);
	}
}