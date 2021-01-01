var PLAY=1;
var gameState = PLAY;

var monkey , monkey_running, monkey_collided;

var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;

var score
var surviavalTime

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
bananaImage = loadImage("banana.png");

obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
createCanvas(600, 400);

ground=createSprite(80, 387, 900, 40);
ground.velocityX = 4;
ground.x = ground.width /2;
//consle.log(gound.x);  
  
monkey = createSprite(80, 323, 20, 20);
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.15;  


FoodGroup = createGroup();
obstacleGroup = createGroup();
 
invisibleGround = createSprite(80, 387, 900, 40);
invisibleGround.visible = false;
  
//monkey.debug = true;
monkey.setCollider("circle",0,0,225);
  
score=0 ;
surviavalTime=0;
  
}

function draw() {
background("green");
  

if(gameState===PLAY){
//jump when the space key is pressed
if(keyDown("space")&& monkey.y >= 319) {
monkey.velocityY = -18;  
}
//add gravity
monkey.velocityY =monkey.velocityY + 0.8;  

// reset ground (infinite ground)
if (ground.x > 0){
ground.x = ground.width/2;
}
  
if (monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach();  
score=score+1;
}

if (obstacleGroup.isTouching(monkey)){
ground.velocityX = 0;
monkey.velocityY = 0;
  
FoodGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);
  
FoodGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
} 
  
spawnBanana();
spawnObstacles();

}

monkey.collide(invisibleGround);

//console.log(monkey.y);

drawSprites();

fill("black");
text("Score: "+ score, 500,50);
  
fill("black");
surviavalTime=Math.ceil(frameCount/frameRate());
text("Surviaval Time:"+ surviavalTime, 50,50);

  
}

function spawnBanana() {
  //write code here to spawn the banana
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,323,40,10);
    banana.y = Math.round(random(80,323));
    
       
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
       
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
if (frameCount % 300 === 0){
var obstacle = createSprite(600,340,10,40);
obstacle.velocityX = -6;
obstacle.addImage(obstacleImage);
obstacleGroup.add(obstacle);

obstacle.scale = 0.2;
obstacle.lifetime = 300;  
   
 }
 
   
}



