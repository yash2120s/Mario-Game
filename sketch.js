var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario , marioImage;

var Background,BackgroundImage;

var enemy1,enemy1Image,enemy,enemyImage,enemy2,enemy2Image,enemyGroup,enemy1Group,enemy2Group;

var enemySound;

var laugh,laughImage,laughSound;

var score ;

function preload(){
   marioImage = loadAnimation("mario.png","mario1.png","mario2.png")

 BackgroundImage = loadImage("ground mario.jpg")
  
  enemyImage = loadImage("enemy.png")
  enemy1Image = loadImage("enemy1.png")
  enemy2Image = loadImage("enemy2.png")

  enemySound = loadSound("sounds/enemyspotted.mp3")
  
  laughImage = loadImage('laugh.png')
  laughSound = loadSound("sounds/enemy1.mp3")
  
  coffinImage  = loadImage("coffindance.png")
  coffinSound = loadSound("sounds/enemy.mp3")
  
  sadImage = loadImage("sad.png")
  sadSound = loadSound("sounds/sad.mp3")
  
  restartImage = loadImage("restart.png")
  
  achive1 = loadSound("sounds/Five.mp3");
achive2 = loadSound("sounds/Ten.mp3");
achive3 = loadSound("sounds/fifty.mp3");
}


 

function setup(){
  
  createCanvas(windowWidth,windowHeight)
  
   Background = createSprite(width - 300,height - 300,400,400)
  Background.addImage(BackgroundImage)
  Background.scale = 2.5
  Background.velocityX = -2;
  
  ground = createSprite(width - 350,height - 50,900,10)
  ground.visible = false;
  
  mario  = createSprite(width  - 600,height - 110,20,20)
  mario.addAnimation("mario_running",marioImage)
  mario.scale = 0.5
  
  
  laugh = createSprite(width-350,height - 450,10,10)
  laugh.addImage(laughImage)
  laugh.scale = 0.4
 
  
  coffin = createSprite(width -350 ,height - 450 , 10 ,10)
  coffin.addImage(coffinImage)
  coffin.scale = 0.8
  
  
  sad = createSprite(width - 350 ,height - 450,10,10)
  sad.addImage(sadImage)
  sad.scale = 0.4
  
  restart = createSprite(width - 350,height - 300)
  restart.addImage(restartImage)
  restart.scale = 0.2
  
  score = 0;
  
  enemyGroup = createGroup();
  enemy1Group = createGroup();
  enemy2Group = createGroup();


}


function draw(){
  
  background('white')
  if(gameState === PLAY){
    
  if(Background.x<400){
    Background.x = 500
  }
    sad.visible = false;
    restart.visible = false;
    coffin.visible = false;
     laugh.visible = false;
    
    if(touches.length> 0 || keyDown("space")&& mario.y >= 350){
      mario.velocityY  = -20
      touches = []
    }
    
      mario.velocityY = mario.velocityY + 1
    
   var rand = Math.round(random(1,3));
   
    
   switch(rand){
     case 1 : 
       
       spawnEnemy();
       
       break;
       
     case 2 :
       
       spawnEnemy1();
       
       break;
       
     case 3 :
       
       spawnEnemy2();
       
       break;
   }
  
      if(score ===1000){
     achive1.play();
   }

   if(score===10000){
  achive2.play();
  }

  if(score === 50000){
    achive3.play();
  }

     score = score + Math.round(getFrameRate()/10);
    
  enemyDeads();
  }
  
  if(gameState === "end"){
    mario.visible = false;
    Background.velocityX = 0;
    enemyGroup.destroyEach();
    enemy1Group.destroyEach();
    enemy2Group.destroyEach();
    restart.visible = true;
    
    reset();

  }
  mario.collide(ground)
  drawSprites();
  
  
  textSize(20);
  fill(255);
  text("Score: " + score, width - 250, height - 550);

  
}

function spawnEnemy(){
  if(frameCount%160===0){
  enemy = createSprite(width - 0,height - 170,10,10)
  enemy.addImage(enemyImage)
  enemy.scale = 0.7
    enemy.velocityX = -7.5
    enemy.lifetime = 150;
    enemySound.play()
    enemyGroup.add(enemy)
    
}}

function spawnEnemy1(){
if(frameCount%160===0){ 
  enemy1 = createSprite(width - 0,height - 110,10,10)
  enemy1.addImage(enemy1Image)
  enemy1.scale = 0.3
  enemy1.velocityX = -7.5
  enemy1.lifetime = 150
    enemySound.play()
      enemy1Group.add(enemy1)
}}

function spawnEnemy2(){
  if(frameCount%160===0){
    enemy2 = createSprite(width - 0 , height - 100 ,10,10)
    enemy2.addImage(enemy2Image)
    enemy2.scale = 0.2;
    enemy2.velocityX = -7.5
    enemy2.lifetime = 150
    enemySound.play()
        enemy2Group.add(enemy2)
  }
}

 function enemyDeads(){
      if(enemyGroup.isTouching(mario) || enemy1Group.isTouching(mario) || enemy2Group.isTouching(mario)){
        gameState = "end";
        var rand = Math.round(random(1,3));
        
        if(rand === 1){
          coffinSound.play();
          coffin.visible = true;
        }

        if(rand === 2){
          laughSound.play();
          laugh.visible = true;
        }
        
        if(rand === 3 ){
          sadSound.play();
          sad.visible = true;
        }
      }
 }

 function reset(){
   if(mousePressedOver(restart)){
      gameState = PLAY;
      mario.visible = true;
      Background.velocityX = -7;
      restart.visible = false
      coffin.visible = false;
      laugh.visible = false;
      coffinSound.stop();
      laughSound.stop();
      sadSound.stop();
      score = 0;
   }
 }

