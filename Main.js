let canvas = document.getElementById('myCanvas'); //캔버스 Id 추출
let ctx = canvas.getContext("2d"); //2d 명시
let Start = document.getElementById('start'); // 시작 버튼 Id 추출

//퀴즈 문제와 정답들
const quiz = [
{"quesion" : "出会いの後には必ず別れがあるので、会うことは分かれることの始まりでもある。人生の虚しさを表した言葉", "kotae": "会うは別れの始め"},
{"quesion" : "秋の茄は美味しくてもったいないから、嫁に食べさせてはいけない。", "kotae": "秋茄子は嫁に食わすな"},
{"quesion" : "悪事や欠点をすべて隠し通したとおもっていても、実際にはその一部しか隠せていないことのたとえ。", "kotae": "頭隠して尻隠さず"},
{"quesion" : "人の心配をするよりも、まずは自分のことをしっかりしなさい、ということ。人の世話を焼きたがる人などに使う。", "kotae": "頭の上の蝿を追え"},
{"quesion" : "占いは当たることも外れることもあるので、結果を気にしすぎてはいけないということ。", "kotae": "当たるも八卦当たらぬも八卦"}
];

let i = 0; //i 변수 정의(주로 순서 세기 역할)

//dx , dy 변수 정의 (주로 공 반사 역할)
let dx = 2;
let dy = -2;

//x,y 변수 정의 (주로 게임 내 좌표 저장 역할)
let x = canvas.width / 2;
let y = canvas.height - 60;

let ballRadius = 10; //공 반지름 정의

let paddleHeight = 20; // 발판 높이 정의
let paddleWidth = 120; // 발판 너비 정의
let paddleX = (canvas.width - paddleWidth) / 2; // 발판 X 좌표 정의

let rightPressed = false; // 오른쪽 키 판정 역할
let leftPressed = false; // 왼쪽 키 판정 역할
//let upPressed = false;

let brickRowCount = 5; //블록 몇줄 생성 할건지의 역할
let brickColumnCount = 10; // 블록 한줄 당 몇 개 지정할건지의 역할
let brickWidth = 80; //블록 너비 정의
let brickHeight = 50; //블록 높이 정의
let brickPadding = 10; //블록 패딩 정의

let bricks = []; // 블록 배열 정의

let score = 0; // 점수 정의

let life = 3; //생명 정의

//블록 생성 초기 설정
for(let i = 0; i<brickColumnCount ; i++){
	bricks[i] = [];
	for(let j = 0 ; j<brickRowCount ; j++){
		bricks[i][j] = {x: 0, y: 0, status: 1};
	}
}
//블록 맞았을 때 하고 클리어 했을 때 판정 함수+랜덤으로 퀴즈 나오게 하는 함수
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
			if(score >=(brickColumnCount * brickRowCount)) {
					alert("게임이 끝났습니다. 이 창을 닫아 주세요!");
					document.location.reload();
			}	
		}
	}
}
}


//점수 표시해주는 함수
function drawScore(){
	ctx.font = "16px solid";
	ctx.fillStyle = "black";
	ctx.fillText("점수:"+ score , 8, 20);
}

//생명 표시해주는 함수
function drawLife(){
	ctx.font = "16px solid";
	ctx.fillStyle = "black";
	ctx.fillText("생명:"+ life , canvas.width-65 , 20);
}

//공 그려주는 함수
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius , 0, Math.PI * 2);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

//발판 그려주는 함수
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth ,paddleHeight);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

//블록 그려주는 함수
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

//그려주는 함수 총집합!(메인함수)
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

	//공 반사 판정 해주기+생명 판정(게임오버 판정)
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


	
	//발판 움직여 주는 역할 
	if(rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 7;
	}else if(leftPressed  && paddleX > 0){
		paddleX -= 7;
	}

	//공 반사 역할
	x += dx;
	y += dy;

requestAnimationFrame(draw);

}

//조작키 이벤트 리스너들
document.addEventListener("keydown", keyDownHandler1, false);
document.addEventListener("keyup", keyUpHandler1, false);
//document.addEventListener("keydown",keyDownHandler2, false);
//document.addEventListener("keyup",keyUpHandler2, false);


//키다운시의 이벤트 헨들러
function keyDownHandler1(e) {
	if(e.keyCode == 39){
		rightPressed = true;
	}else if(e.keyCode == 37){
		leftPressed = true;
	}
}

//키업 시의 이벤트 헨들러
function keyUpHandler1(e) {
	if(e.keyCode == 39){
		rightPressed = false;
	}else if(e.keyCode == 37){
		leftPressed = false;
	}
}
/*
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

//Start 버튼 누르면 게임 시작!
Start.addEventListener("click", draw);