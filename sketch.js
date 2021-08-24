const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var world,engine;
var BulletG;
var bullet;
var targetG; 
var gameState="wait";
var score=0;

function preload(){
gunIMG = loadImage("images/M416.jpeg");
targetIMG = loadImage("images/target.png");
bulletIMG = loadImage("images/bullet.png");
m416SOUND = loadSound("sounds/m416sound.mp3");
targetHit = loadSound("sound/targethit.mp3");
}

function setup() {
  createCanvas(800,400); 
  engine=Engine.create();
  world=engine.world; 
  gun= createSprite(160,320,20,20);
  gun.addImage(gunIMG);
  gun.scale=0.8
  gun.visible=false;
  gun.setCollider("Rectangle",0,0,gun.width,gun.height);
  //gun.debug=true;
  targetG=new Group();
  bulletG=new Group();
}


function draw() {
background("black");
textSize(20);
text("score="+score,700,50);
if(gameState=== "wait"){
fill("WHITE") 
textSize(20)
text("WICK'S TRAINING",300,50);
text("HOW TO PLAY",20,150);
text("1) press Righ Arrow to shoot",20,180);
text("2)every target gives you 50 points",20,200)
text("3)goal=1000 points",20,220)
text("have fun *-*",20,240)
text("Press SPACE key to start the game",300,350);
 
}
else if(gameState==="play"){
  gun.visible=true;
  gun.y=mouseY;
  fill("white");
  text(mouseX+" , "+mouseY,200,30);
  spawnTarget();
  if(keyDown("RIGHT_ARROW")){
  summonBullet();
  }
  if(targetG.isTouching(bulletG)){
  bulletG.destroyEach();
  //targetG.destroy();
  score=score+50;
  //bullet.visible=false
  }
  drawSprites();
  
}
if(keyDown("SPACE")){
gameState="play"
}
}
function spawnTarget(){
if(frameCount%150===0){
var target= createSprite(600,100,20,20);
target.velocityY=2
target.addImage(targetIMG);
target.lifetime=200;
target.scale=0.08
targetG.add(target); 
if(score=500){
targetG.velocityY=4}
}
}


function summonBullet(){
    bullet= createSprite(160,320,20,20);
    m416SOUND.play();
    bullet.y=gun.y-6;
    bullet.x=gun.x+150;
    bullet.velocityX=6;
    bullet.addImage(bulletIMG);
    bullet.lifetime=200;
    bullet.scale= 0.05;
    //bullet.depth = gun.depth;
    //gun.depth = gun.depth + 1;
    bulletG.add(bullet);

  }
