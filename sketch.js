var PLAY = 1;
var END = 0;
var GameState = PLAY;

var Score = 0;

var Bmwimage, Bmw;

var hornsound;

var rockimage, rock;

var carwheelimage, carwheel;

var roadimage,road;

var Scoreimage,Scoreimagesprite;

var InvisibleGround;

var Gameoverimage,Gameover;

var Startbuttonimage,Startbutton;

var carhornimage,carhorn;

var collect;

function preload(){
Bmwimage = loadImage("bmw (1).png");
  
carwheelimage = loadImage("wheel.png");
  
hornsound = loadSound("Car Horn - Sound Effect (128 kbps).mp3");
  
rockimage = loadImage("rocky (1).png");
  
roadimage = loadImage("road.PNG")
  
Scoreimage = loadImage("score.png");
  
Gameoverimage = loadImage("318d4ba516e5e71ccbd10def63610811.png");
  
Startbuttonimage = loadImage("start button.PNG");

carhornimage = loadImage("horn.png");
  
collect = loadSound("sm64_1-up (1).wav");
}


function setup(){
createCanvas(displayWidth - 20, displayHeight-120);
  
Bmw = createSprite(90,412,40,50);
Bmw.addImage(Bmwimage);
Bmw.scale = 0.2;
Bmw.setCollider("Rectangle", 0 , 0,Bmw.width,Bmw.height);

 
road = createSprite(320,520,0,0);
road.addImage(roadimage);
road.scale = 1.2;
road.velocityX = -10;
  
rockGroup = createGroup();
carhornGroup = createGroup();
  
InvisibleGround = createSprite(300,473.5,600,20);
InvisibleGround.visible = false;
  
Scoreimagesprite = createSprite(430,50,0,0);
Scoreimagesprite.addImage(Scoreimage);
Scoreimagesprite.scale = 0.5;
  
Gameover = createSprite(300,200,0,0);
Gameover.addImage(Gameoverimage);
Gameover.visible = false;
  
Startbutton = createSprite(300,300,0,0);
Startbutton.addImage(Startbuttonimage);
Startbutton.visible = false;
  

}

function draw(){
  background("white");
  stroke("black");
  fill("red");
  textSize(20);
  text(":" + Score , 500,56);
  
  camera.x = Bmw.x;
  camera.y = Bmw.y;
  
  if(GameState === PLAY){
  if (road.x < 230){
      road.x = 320;
    }
  
  Gameover.visible = false;
  Startbutton.visible = false;
   
    //jump when the space key is pressed
    if(keyDown("space")&& Bmw.y >= 200) {
        Bmw.velocityY = -15;
    }
    
    //add gravity
    Bmw.velocityY = Bmw.velocityY + 2;
  
    if(rockGroup.isTouching(Bmw)){
        hornsound.play();
        GameState = END;
    }
    //rocks
  Spawnrocks();
  carhorns();
  
    
  Score = Score + Math.round(getFrameRate()/60);
    
  Bmw.collide(InvisibleGround);
    
   if(carhornGroup.isTouching(Bmw)){
     carhornGroup.destroyEach();
     collect.play();
   }
  
    
  
  }
  else if(GameState === END){
   Gameover.visible = true;
   Startbutton.visible = true;
    
   rockGroup.setLifetimeEach(-1);
   
   rockGroup.setVelocityXEach(0);
    
   carhornGroup.setLifetimeEach(-1);
    
   carhornGroup.setVelocityXEach(0);
    
   
    
  
    
   road.velocityX = 0;
   Bmw.velocityX = 0;
   Bmw.velocityY = 0;
   
    
  if(mousePressedOver(Startbutton)) {
      reset();
    }
    
  }
  drawSprites();
}

function Spawnrocks() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    rock = createSprite(600,403,0,0);
    rock.addImage(rockimage);
    rock.scale = 0.03;
    rock.velocityX = -11;
    rock.setCollider("rectangle", 0, 0,rock.width,rock.height);
   
    
    
     //assign lifetime to the variable
    rock.lifetime = 600;
    
    
    //add each cloud to the group
    rockGroup.add(rock);
  }
}

 function reset(){
  GameState = PLAY;
  
  rockGroup.destroyEach();
  carhornGroup.destroyEach();
  
  Score = 0;
   
 
  road.velocityX = -10;
}

function carhorns(){
  if (frameCount % 200 === 0) {
    carhorn = createSprite(600,200,40,10);
    
    carhorn.velocityX = -11;
    
    carhorn.addImage(carhornimage);
    carhorn.scale = 0.1;
  
    
    carhorn.lifetime = 600;
  
    carhornGroup.add(carhorn);
    
}
}