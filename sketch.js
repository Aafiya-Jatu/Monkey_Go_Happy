var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var monkey_collideImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var backImage;
var score;
var survivalTime = 0;

function preload(){
  backImage = loadImage("jungle.jpg");
  
  monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collideImage = loadImage("sprite_8.png");
  
}

function setup() {
  createCanvas(400,400);
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkey_collideImage);
  monkey.scale = 0.1;
  
  backImage = createSprite(200,350,900,20);
  backImage.velocityX = -4;
  backImage.x = backImage.width/2;
  console.log(backImage.x);
  
  foodGroup=new Group();
  obstacleGroup=new Group(); 
  
 
  survivalTime = 0;
  score = 0;
  
  
}


function draw(){
  background(255);
  
  if(gameState === PLAY){
    
    monkey.velocityY = monkey.velocityY + 0.5;
    
  if (backImage.x < 0) {
      backImage.x = backImage.width/2;
  }
    
  if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score = score + 1;
  }
    
  monkey.collide(backImage);
    
  if (keyDown("space") && monkey.y >= 289) {
      monkey.velocityY = -12;
  }
    
  banana();
  obstacles();
  
    
  if (monkey.isTouching(obstacleGroup)) {

      gameState = END;

    }  
    
  } else if (gameState === END) {
    
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation("collided",monkey_collideImage);
    
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    backImage.velocityX = 0;
    
    monkey.collide(ground);
    
  }
  
  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(20);
  text("score: " + score, 50, 420);
  
  
  survivalTime = Math.ceil(frameCount/frameRate());
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time:" + survivalTime, 125, 50);
  
  }


  function reset() {

  gameState = PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  survivalTime = 0;
  score = 0;

  }

  function banana() {
  
  if (frameCount % 140 === 0) {
    var banana = createSprite(600, 320, 20, 20);
    banana.y = Math.round(random(40, 200));
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.addImage(bananaImage);
    banana.lifetime = 120;
    foodGroup.add(banana);
  }

}

  function obstacles() {

  if (frameCount % 160 === 0) {
 
    var obstacle = createSprite(600, 310, 20, 25);
    obstacle.velocityX = -5
    obstacle.scale = 0.2;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0, 310, 410);
    
  }
}


 




