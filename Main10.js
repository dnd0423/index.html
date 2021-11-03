let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
let Start = document.getElementById('start');

const quiz = [
{"quesion" : "親の子どもへの愛情を知らないで、子どもは好き勝手にふるまうものだということ。", "kotae": "親の心子知らず"},
{"quesion" : "どんな目にあっても、何も感じていないかのように平気でいる様子。", "kotae": "蛙の面に水"},
{"quesion" : "風邪を引くと体が弱り、他の病気にかかりやすくなるので、軽く見てはいけないということ。", "kotae": "風邪は万病の因"},
{"quesion" : "平凡な親からは平凡な子どもしか生まれないということ。子どもの才能などは、結局は親に似るものだということ。", "kotae": "蛙の子は蛙"},
{"quesion" : "ある出来事が巡り巡って思わぬ結果を生じること。また、当てにならないことに期待をすること。", "kotae": "風が吹けば桶屋が儲かる"}
];

let i = 0;

let dx = 2;
let dy = -2;

let x = canvas.width / 2;
let y = canvas.height - 60;

let ballRadius = 10;

let paddleHeight = 20;
let paddleWidth = 120;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;

let brickRowCount = 5;
let brickColumnCount = 10;
let brickWidth = 80;
let brickHeight = 50;
let brickPadding = 10;

let bricks = [];

let score = 0;

let life = 3;

for(let i = 0; i<brickColumnCount ; i++){
	bricks[i] = [];
	for(let j = 0 ; j<brickRowCount ; j++){
		bricks[i][j] = {x: 0, y: 0, status: 1};
	}
}
function collisionDetection() {
	for(let i = 0; i<brickColumnCount ; i++){
	for(let j = 0 ; j<brickRowCount ; j++){
		let b = bricks[i][j];
		
		if(b.status == 1){
			if(x>b.x && x< b.x + brickWidth && y> b.y && y< b.y+brickHeight){
			dy = -dy;
			b.status = 0;
			score++;
				const flag = Math.floor(Math.random() * 300);
			if(flag <= 20){
			let kotae2 = prompt(quiz[0].quesion);
			
			if(kotae2 == quiz[0].kotae){
			score += 5;
			life  += 1;  
			}
			}else if(flag <=40 && flag >20){
			let kotae2 = prompt(quiz[1].quesion);
	
			if(kotae2 == quiz[1].kotae){
				score += 5;
				life  += 1;  
			}
			}else if(flag <=60 && flag >40){
			let kotae2 = prompt(quiz[2].quesion);
	
			if(kotae2 == quiz[2].kotae){
					score += 5;
					life  += 1;  
			}
			}else if(flag <=80 && flag >60){
			let kotae2 = prompt(quiz[3].quesion);
	
				if(kotae2 == quiz[3].kotae){
						score += 5;
						life  += 1;  
			}
			}else if(flag <=100 && flag >80){
			let kotae2 = prompt(quiz[4].quesion);
	
				if(kotae2 == quiz[4].kotae){
					score += 5;
					life  += 1;  
			}
			}else if(flag >100){
						
			}
			}
				if(score ==(brickColumnCount * brickRowCount)) {
					alert("게임이 끝났습니다. 이 창을 닫아 주세요!");
					document.location.reload();
			}	
		}
	}
}
}

function drawScore(){
	ctx.font = "16px solid";
	ctx.fillStyle = "black";
	ctx.fillText("점수:"+ score , 8, 20);
}
function drawLife(){
	ctx.font = "16px solid";
	ctx.fillStyle = "black";
	ctx.fillText("생명:"+ life , canvas.width-65 , 20);
}
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius , 0, Math.PI * 2);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth ,paddleHeight);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}
function drawBricks() {
	for(let i = 0; i < brickColumnCount ; i++){
		for(let j = 0; j < brickRowCount ; j++){
		if(bricks[i][j].status == 1){
			let bricksX = i* (brickWidth+ brickPadding);
			let bricksY = j* (brickHeight + brickPadding);
			bricks[i][j].x = bricksX;
			bricks[i][j].y = bricksY; 

			ctx.beginPath();
			ctx.rect(bricksX,bricksY,brickWidth,brickHeight);
			ctx.fillStyle = "blue";
			ctx.fill();
			ctx.closePath();
		}

			
		}
	}
}

function draw() {
	ctx.clearRect(0,0 ,canvas.width,canvas.height);
	drawBall();
	drawBricks();
	drawPaddle();
	drawScore();
	drawLife();
	collisionDetection();

	/*if(upPressed == true){
	let kotae2 = prompt(quiz[i].quesion);
	upPressed = false;
	if(kotae2 == quiz[i].kotae){
		score += 5;
		life  += 1;  
	}
	i++;
	if(i>4){
		i = 0;
	}
}
*/
	if(x + dx < ballRadius || x+ dx > canvas.width - ballRadius){
		dx = -dx;
	}

	if(y + dy < ballRadius){
		dy = -dy;
	}else if(y+ dy > canvas.height - ballRadius){
		
		if(x> paddleX && x < paddleX + paddleWidth){
			dy = -dy;
		}
		else{
			life--;
			
			if(!life){
				alert("GAME OVER");
				document.location.reload();
			}else{
				x = canvas.width / 2;
				y = canvas.height -30;
				dx = 3;
				dy = -3;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
			
		}
	}


	

	if(rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 7;
	}else if(leftPressed  && paddleX > 0){
		paddleX -= 7;
	}

	x += dx;
	y += dy;

requestAnimationFrame(draw);

}
document.addEventListener("keydown", keyDownHandler1, false);
document.addEventListener("keyup", keyUpHandler1, false);
//document.addEventListener("keydown",keyDownHandler2, false);
//document.addEventListener("keyup",keyUpHandler2, false);

function keyDownHandler1(e) {
	if(e.keyCode == 39){
		rightPressed = true;
	}else if(e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler1(e) {
	if(e.keyCode == 39){
		rightPressed = false;
	}else if(e.keyCode == 37){
		leftPressed = false;
	}
}/*
function keyDownHandler2(e) {
	if(e.keyCode == 38){
		upPressed = true;
	}
}

function keyUpHandler2(e) {
	if(e.keyCode == 38){
		upPressed = false;
	}
}
*/
//draw(); //자동 실행

Start.addEventListener("click", draw);