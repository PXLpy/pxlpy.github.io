////////////////////////////////////////
var nb_balls = 5;
var player_speed = 10;
var ball_speed = 20;
////////////////////////////////////////

window.addEventListener("load", Init);
window.addEventListener("resize", updateSize);

var global_speed: number, mainHeight: number, mainWidth: number;
var canvas;
var players = [];
var score1 = 0, score2 = 0;

function Init() {
  canvas = document.getElementsByTagName("canvas")[0];
  updateSize();
  Player.Init();
  for (var i = 0; i < nb_balls; i++) {
    new Ball();
  }
  Tick();
}

function updateSize() {
  mainHeight = window.innerHeight;
  mainWidth = window.innerWidth;
  canvas.width = mainWidth;
  canvas.height = mainHeight;
  global_speed = (mainHeight * mainWidth) / (1.2 * 1e6);
  Ball.speed = ball_speed * global_speed;
  Player.speed = player_speed * global_speed;
}

function Tick() {
  Ball.TickAll();
  Player.TickAll();
  Draw();
  window.requestAnimationFrame(Tick);
}

function Draw() {
  Ball.DrawAll();
  Player.DrawAll();
}

function AddPoint(player: PTYPE) {
  if (player === PTYPE.LEFT) {
    score1++;
    document.getElementById("score1").innerHTML = score1;
  } else {
    score2++;
    document.getElementById("score2").innerHTML = score2;
  }
}

enum PTYPE {
  LEFT,
  RIGHT
}
class Player {
  private static instances: Array<Player> = new Array();
  static padding: number = 20;
  static width: number = 20;
  static height: number = 100;
  static speed: number = 5;
  static color: string = "#FFF";

  private x: number = 0;
  private y: number = 0;
  private type: PTYPE;
  private has_moved: boolean = true;

  constructor(type: PTYPE) {
    this.y = Player.padding;
    this.type = type;
    if (type === PTYPE.LEFT) {
      this.x = Player.padding;
    } else {
      this.x = mainWidth - (Player.padding + Player.width);
    }
    Player.instances.push(this);
  }

  public Tick() {
    var closest = null;
    var minDist;
    var tY;
    for (var i = 0; i < Ball.instances.length; i++) {
      var ball = Ball.instances[i];
      // resend if touch
      var xDiff = Math.abs(ball.x - this.x);
      if (xDiff < Player.height) {
        var bX = ball.x + Ball.size / 2;
        var bY = ball.y + Ball.size / 2;
        var gap = Ball.size/2;
        if (bY >= this.y - gap && bY <= this.y + Player.height + gap
            && bX >= this.x - gap && bX <= this.x + Player.width + gap
            && ((this.type === PTYPE.LEFT && ball.vx < 0)
                || (this.type === PTYPE.RIGHT && ball.vx > 0))) {
          ball.vx *= -1;
        }
      }
      if (closest == null || xDiff < minDist) {
        minDist = xDiff;
        closest = ball;
        if (xDiff < mainWidth/2 && ((ball.vx < 0 && ball.x > this.x && this.type === PTYPE.LEFT)
           || (ball.vx > 0 && ball.x < this.x && this.type === PTYPE.RIGHT))) {
          // future ball coords
          tY = ball.y + (xDiff * ball.vy / Math.abs(ball.vx));
        }
      }
    }
    if (closest !== null) {
      while (tY < 0 || tY > mainHeight) {
        if (tY < 0) {
          tY *= -1;
        } else if (tY > mainHeight) {
          tY = 2 * mainHeight - tY;
        }
      }
      if (tY < Player.height / 2) {
        tY = Player.height / 2;
      } else if (tY > mainHeight - Player.height / 2) {
        tY = mainHeight - Player.height / 2;
      }
      var ballDiff = (this.y + Player.height / 2) - tY;
      var step = Math.min(Player.speed, Math.abs(ballDiff));
      if (ballDiff < 0) {
        this.y += step;
        this.has_moved = true;
      } else if (ballDiff > 0) {
        this.y -= step;
        this.has_moved = true;
      }
    } else {
        this.has_moved = false;
    }
  }

  static TickAll() {
    for (var i = 0; i < Player.instances.length; i++) {
      Player.instances[i].Tick();
    }
  }

  static Init() {
    new Player(PTYPE.LEFT);
    new Player(PTYPE.RIGHT);
  }

  static DrawAll() {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = Player.color;
    for (var i = 0; i < Player.instances.length; i++) {
      var player = Player.instances[i];
      if (player.has_moved) {
        ctx.clearRect(player.x,player.y - (Player.speed + 1) , Player.width, Player.height + 2 * Player.speed + 2);
        ctx.fillRect(player.x,player.y, Player.width, Player.height);
      }
    }
  }
}

class Ball {
  static instances: Array<Ball> = new Array();
  static color: string = "#F00";
  static speed: number = 20;
  static size: number = 20;
  static minHspeedfactor = .8;
  static hueGap: number = 360 / nb_balls;
  public x : number;
  public y : number;
  public vx : number;
  public vy : number;
  private lastX: number;
  private lastY: number;
  private is_ready: boolean = true;
  private color: string;

  constructor() {
    Ball.instances.push(this);
    var randomDir = function() {
      var dir = Math.random() - 0.5;
      return dir / Math.abs(dir);
    }
    this.x = Math.random() * mainWidth;
    this.y = Math.random() * mainHeight;
    var min = Ball.minHspeedfactor * Ball.speed;
    this.vx = Math.random() * (Ball.speed - min) + min;
    var left = Ball.speed - this.vx;
    this.vx *= randomDir();
    this.vy = randomDir() * Ball.speed * Math.sin(Math.acos(this.vx / Ball.speed));
    this.lastX = this.x;
    this.lastY = this.y;
    this.color = "hsl(" + (Math.floor(Ball.hueGap * Ball.instances.length)) + ",70%,60%)";
    console.log(this.color);
  }

  public Tick() {
    if (this.vx > 0) {
      if (this.x > mainWidth - Ball.size) {
        this.vx *= -1;
        AddPoint(PTYPE.LEFT);
      }
    } else {
      if (this.x < 0) {
        this.vx *= -1;
        AddPoint(PTYPE.RIGHT);
      }
    }
    if (this.vy > 0) {
      if (this.y > mainHeight - Ball.size) {
        this.vy *= -1;
      }
    } else {
      if (this.y < 0) {
        this.vy *= -1;
      }
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  public Score() {
    this.is_ready = false;
    this.setTimeout(function() {
      this.is_ready = true;
    }, 500);
  }

  public Draw(ctx) {
    ctx.clearRect(this.lastX-1,this.lastY-1,Ball.size+2,Ball.size+2);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.x + Ball.size / 2, 
      this.y + Ball.size / 2,
      Ball.size / 2, 0, 2 * Math.PI, false);
    ctx.fill();
    this.lastX = this.x;
    this.lastY = this.y;
  }

  static TickAll() {
    for (var i = 0; i < Ball.instances.length; i++) {
      Ball.instances[i].Tick();
    }
  }

  static DrawAll() {
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < Ball.instances.length; i++) {
      Ball.instances[i].Draw(ctx);
    }
  }
}
