var y = 650;
var temp = screen.height/2;

	function moveGang(){
		var x = document.getElementById('movingGang').offsetTop;
		x++;
		if(temp<0)
			x-=2;
		document.getElementById('movingGang').style.display = "block";
		document.getElementById('movingGang').style.top = x+'px';
		if(temp<-30){
			return;
		}
		// document.getElementById('movingPac').innerHTML = "<img src='images/pacman.png' width='700px' height='500px'>";
			setTimeout(function () {
	        moveGang(--temp);
	    }, 0.3);
	}	

	function movePac(){
		var x = document.getElementById('movingPac').offsetTop;
		x++;
		if(temp<0)
			x-=2;
		document.getElementById('movingPac').style.top = x+'px';
		console.log(temp);
		if(temp<-30){
			temp = screen.height/2;
			moveGang();
			return;
		}
		// document.getElementById('movingPac').innerHTML = "<img src='images/pacman.png' width='700px' height='500px'>";
			setTimeout(function () {
	        movePac(--temp);
	    }, 0.3);

}

	
	function move(i) {
		var x = document.getElementById('movingDiv').offsetLeft;
		x++;
		document.getElementById('movingDiv').style.left = x+'px';
		console.log("i "+i);
		if(Math.floor(i)==250){
			document.getElementById('pacDown').innerHTML = "<img src='images/pacmanDown.png'>";
		}
	    if (i < 0){
	    	movePac();
	    	return;
	    }

	    setTimeout(function () {
	        move(--i);
	    }, 5);

	}