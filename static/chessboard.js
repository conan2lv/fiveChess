var canvas = document.getElementById("chessboard"); //获取节点
var board = canvas.getContext("2d"); //棋盘画布
var text = canvas.getContext("2d"); //文字画布
var chess = canvas.getContext("2d"); //棋子画布
let width = canvas.getAttribute("width"); //画布宽度
let height = canvas.getAttribute("height"); //画布高度
//棋盘格子间距
let space = 10; //每边预留空间
let spacew = (width - space * 2) / 18;
let spaceh = (height - space * 2) / 18;

/*var black = board.createRadialGradient(0,0,5,10,10,10);
black.addColorStop(0,"rgb(0,0,0,0.5)");
black.addColorStop(1,"black");

var white = board.createRadialGradient(0,0,5,10,10,10);
white.addColorStop(0,"rgb(255,255,255,0.5)");
white.addColorStop(1,"white");*/

/*绘制棋盘*/
function DrawChessBoard(){
  board.fillStyle = 'rgb(255, 197, 122)'
  board.strokeStyle = 'rgb(0,0,0)'
  board.fillRect(0,0,width,height);

  //绘制网格
  board.strokeWidth = 0.2;
  board.beginPath()
  for(var i = 0; i < 19; i++){
    board.moveTo(10, i * spaceh + 10);
    board.lineTo(width - 10, i * spaceh + 10);

    board.moveTo(10 + i * spacew, 10);
    board.lineTo(10 + i * spacew, height - 10);
  }
  board.stroke();
  board.closePath()
}

//等待中
function wait(){
  text.fillStyle = 'rgba(151, 92, 14, 0.3)'
  text.fillRect(0,0,width,height);
  text.fillStyle = 'rgb(255, 255, 255)'
  text.font="20px Arial";
  text.textAlign = 'center'
  text.textBaseline="middle";
  text.fillText("等待玩家加入中...",width / 2, height / 2);
}

//落子
//参数为横坐标和纵坐标，指网格的19*19的坐标,后面参数指player1还是player2
function onChess(x,y,player){
  chess.beginPath();
  chess.arc(x * spacew + space, y * spaceh + space, spacew / 2, 0, 2*Math.PI);
  player === 0 ? chess.fillStyle = 'black': chess.fillStyle = 'white'
  chess.fill();
  chess.closePath()
}