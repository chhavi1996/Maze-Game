var y = 650;
var temp = screen.height/2;
var hack = -550;

	function moveCsec(){
		var x = document.getElementById('movingGang').offsetTop;
		x++;
		if(temp<20)
			return;
		document.getElementById('movingGang').style.display = "block";
		document.getElementById('movingGang').style.top = x+'px';
		if(temp<-30){
			return;
		}
			setTimeout(function () {
	        moveGang(--temp);
	    }, 1);
	}	

	function movePac(){
		var x = document.getElementById('movingPac').offsetTop;
		var y = document.getElementById('movingGang').offsetTop;
		var z = document.getElementById('playQuit').offsetTop;
		x++;
		console.log("z  "+z);
		if(temp<350){
			document.getElementById('playQuit').style.zIndex = "50";
			z--;
		}
		if(temp-100>0)
			y++;
		if(temp<0)
			x-=2;
		document.getElementById('movingPac').style.top = x+'px';
		document.getElementById('movingGang').style.top = y+'px';
		document.getElementById('playQuit').style.top = z+'px';
		console.log(temp);
		if(temp<30){
			// temp = screen.height/2;
			// moveGang();
			return;
		}
		// document.getElementById('movingPac').innerHTML = "<img src='images/pacman.png' width='700px' height='500px'>";
			setTimeout(function () {
	        movePac(--temp);
	    }, 1);

}

	
	function move(i) {
		var x = document.getElementById('movingDiv').offsetLeft;
		var csec = document.getElementById('csec').offsetLeft;
		if(csec <=1050)
		csec++;
		hack++;
		x++;
		document.getElementById('movingDiv').style.left = x+'px';
		document.getElementById('csec').style.left = csec+'px';
		document.getElementById('hackathon').style.right = hack+'px';
		console.log("i "+i);
		if(Math.floor(i)==250){
			document.getElementById('pacDown').innerHTML = "<img src='images/pacmanDown.png'>";
		}
	    if (i < 0){
	    	document.getElementById('hackathon').style.zIndex = "25";
	    	movePac();
	    	return;
	    }

	    setTimeout(function () {
	        move(--i);
	    }, 1);

	}