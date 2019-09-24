var express = require('express')
var app = express();
var path = require('path')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});

var players = []; //存放正在游戏的玩家的socket.id

//连接成功
io.on('connection', function(socket){
  //开始游戏
  socket.on('start', function(id){
    players.push(id);
    if (players.length > 2){
      socket.emit('full','游戏正在进行中，请稍后');
    }else if(players.length === 1){
      socket.emit('wait',new Date); 
    }else if(players.length === 2){
      io.sockets.connected[players[0]].emit('startGame',0); //0表示黑子
      io.sockets.connected[players[1]].emit('startGame',1); //1表示白子
    }
  });

  //一方落子完毕
  socket.on('turnEnd',function(data){
    let player = data.player;
    let x = data.x;
    let y = data.y;
    socket.to(players[+!player]).emit('myTurn',{x:x,y:y});
  })

  //游戏结束
  socket.on('endGame',function(player){
    io.sockets.connected[players[player]].emit('win');
    io.sockets.connected[players[+!player]].emit('lose');
    players.length = 0;
  })

  //有玩家退出游戏
  socket.on('quit',function(id){
    let index = players.indexOf(id)
    if(index != - 1) players.splice(index,1);
    if(players.length === 1){
      io.sockets.connected[players[0]].emit('message', '其他玩家退出游戏');
    }
    players.length = 0
  })

  //断开连接
  socket.on('disconnect',function(){
    let index = players.indexOf(socket.id)
    if(index != - 1) players.splice(index,1);
    if(players.length === 1){
      io.sockets.connected[players[0]].emit('message', '其他玩家断开连接');
    }
    players.length = 0;
  })

  //发生错误
  io.on('error',function(){
    players.length = 0
    console.log('连接错误')
  })
});

http.listen(3001, function(){
  console.log('listening on :3001');
});
