
var monkey , monkey_running,mokeyStop;
var banana ,bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,groundImage;
var invisibleGround;  
var score = 0;
var gameState = "play";
var obstaclesGroup;
var gameOver,gameOverImage;
var retry,retryImage;
var points=0;
var bananaImage;
var bananaGroup;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyStop = ("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
 
  gameOverImage = loadImage("images.jpg");
  
  retryImage = loadImage("retry.png");
  
  bananaImage = loadImage("banana.png");
}



function setup() {
  createCanvas(600,400);
  ground = createSprite(200,740,400,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;

  monkey = createSprite(44,200,20,200);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("monkeyStop",monkeyStop);
  
  invisibleGround = createSprite(200,345,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  
  gameOver = createSprite(300,200,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  monkey.setCollider("circle",0,0,150);
  
  
  retry = createSprite(300,330,10,10);
  retry.addImage(retryImage);
  retry.scale = 0.2;
  retry.visible = false;

  bananaGroup = createGroup();
 
}

function draw() {
  background("cyan");
  if(gameState==="play"){
       score = score + Math.round(getFrameRate()/61);
     ground.velocityX = -10;
  if(ground.x<230){
   ground.x = ground.width/2;
  }
    
      monkey.velocityY = monkey.velocityY+0.5;
  if(keyDown("space")&&monkey.y>=315){
    monkey.velocityY = -13 ;
  }
      monkey.collide(invisibleGround);
  obstacles();
    bananas();
    
    if(monkey.isTouching(bananaGroup)){
    
    points= points+1;
    bananaGroup.destroyEach();
    }
    
    
 if(monkey.isTouching(obstaclesGroup)){
   monkey.scale=0.2;
   gameState = "end";
 }
  
  }

 
  
  drawSprites();
  
  fill("darkblue");
  textSize(20);
  text("SCORE: "+score,450,20);
  text("bananas collected: "+points,10,20);
  
   if(gameState === "end"){
   
   gameOver.visible = true;
     retry.visible = true;
   
   monkey.velocityY=0;
   ground.velocityX = 0;
        
   
   fill("white");
   text("SCORE: "+score,320,275);
   text("Press Reload Button to \nrestart!!",200,120);
     text("BANANAS: "+points,170,275);
   
   obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);   monkey.changeAnimation("monkeyStop",monkeyStop);
   
   obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
 }
  
  if(mousePressedOver(retry)){
    restart();
  }
}
function obstacles(){

   if(frameCount % 80 === 0){

             var obstacle = createSprite(400,326,10,10);
             obstacle.addImage("obstacle",obstacleImage);
             obstacle.scale = 0.001;
             obstacle.velocityX = -(10+score/100);
             obstacle.lifetime = 100;
     
     var rand = Math.round(random(1,4));
     
     switch(rand){
      
             case 1: obstacle.scale = 0.1;
                     break;
             case 2:obstacle.scale = 0.20;
                    break;
             case 3: obstacle.scale = 0.25;
                     break;
             case 4: obstacle.scale = 0.15;
                     break;
             default:break;
     
     }
     
     obstaclesGroup.add(obstacle);
      
   }
   
  
}

function restart(){
        gameState = "play";
        retry.visible = false;
        gameOver.visible = false;
        obstaclesGroup.destroyEach();
        bananaGroup.destroyEach();
        monkey.changeAnimation("monkey",monkey_running);
        monkey.scale=0.1;
        score = 0;
        points = 0;

}
function bananas(){
  if(frameCount % 60 === 0){
        var banana = createSprite(400,230,10,10);
        banana.addImage(bananaImage);
        banana.velocityX= -(10+score/100);
        banana.scale=0.09;
        bananaGroup.add(banana);
  }


}
