let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
let Start = document.getElementById('start');

const quiz = [
{"quesion" : "甘やかして育てるよりも、世の中でつらくて苦しい体験をさせたほうが、愛する子どものためになるということ。", "kotae": "かわいい子には旅をさせよ"},
{"quesion" : "人から話に聞いたものを実際に見てみると、聞いていたことと大きく違っていること。", "kotae": "聞いて極楽見て地獄"},
{"quesion" : "知らないことを聞くことは、その時に恥をかくだけだが、知らないままだと一生恥ずかしい思いをすることになる。", "kotae": "聞くは一時の恥聞かぬは一生の恥"},
{"quesion" : "鳴いたがために撃たれた雉のように、必要のないことをした結果、災難を招いてしまうこと。", "kotae": "雉も鳴かずば撃たれまい"},
{"quesion" : "まず助からないだろうという危険な状態から何とか助かること。", "kotae": "九死に一生を得る"}
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
				if(score == ((brickColumnCount * brickRowCount) + 20)){
					alert("Clear!"+"점수는"+ score + "점 입니다");
					document.location.reload();
		}
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

	if(upPressed == true){
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
document.addEventListener("keydown",keyDownHandler2, false);
document.addEventListener("keyup",keyUpHandler2, false);

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
}
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

//draw(); //자동 실행

Start.addEventListener("click", draw);