var backgroundimg, bg
var bulletimg, groupofBulletsImg
var bullet, flippedBullet
var playerimg, player, playermoving, playerCrouch
var monstersGroup
var fireball
var bulletGroup
var playerdead
var groupBullet
var heart1, heart1Img
var heart2, heart2Img
var heart3, heart3Img
var monster1, monster2

var leftKeyActive
var rightKeyActive


var score = 0
var life = 3
var bullets = 5

var gameState = "start"


function preload(){
  backgroundimg = loadImage("./gameimages/bkhImage2.jpg");
  bulletimg = loadAnimation("./gameimages/bullet.png");
  flippedBullet = loadAnimation("./gameimages/bulletFlip.png");
  groupofBulletsImg = loadImage("./gameimages/collectbullet.png");
  playerimg = loadAnimation("playerImage1.png");
  playermoving = loadAnimation("./gameimages/playermoving1.png", "./gameimages/playermoving2.png", "./gameimages/playermoving3.png", "./gameimages/playermoving4.png", "./gameimages/playermoving5.png", "./gameimages/playermoving6.png");
  shoot = loadAnimation("playerImage2.png", "playerImage3.png", "playerImage4.png");
  playerCrouch = loadAnimation("./gameimages/playerCrouching1.png", "./gameimages/playerCrouching2.png", "./gameimages/playerCrouching3.png");
  playerdead = loadAnimation("./gameimages/playerdead1.png", "./gameimages/playerdead2.png", "./gameimages/playerdead3.png");
  monster1img = loadImage("./gameimages/monsterImg.png");
  monster2img = loadAnimation("monsterImage1.png", "monsterImage2.png", "monsterImage3.png", "monsterImage4.png");
  fireballimg = loadImage("./gameimages/fireballImg.png");
  heart1Img = loadImage("./gameimages/heart1Img.png");
  heart2Img = loadImage("./gameimages/heart2Img.png");
  heart3Img = loadImage("./gameimages/heart3Img.png");

  playerdead.looping = false
  playerCrouch.looping = false
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  
  //creating player
  player = createSprite(windowWidth/2,windowHeight/2 + 130);
  player.scale = 0.7;
  player.visible = false
  player.setCollider("rectangle",-8,-4,70,168,0);



  //creating background
  //bg = createSprite(650,windowHeight/2,20,20);
  //bg = createSprite(685,windowHeight/2,windowWidth,windowHeight);
  bg = createSprite(displayWidth/2,displayHeight/2-100,500,500);
  bg.addImage(backgroundimg);
  bg.scale = 0.4;
  bg.width = 1600;
  
  


  //adding hearts to show lives
  heart1 = createSprite(1350, 50);
  heart1.visible = false
  heart1.addImage(heart1Img);
  heart1.scale = 0.8;

  heart2 = createSprite(1350, 50);
  heart2.visible = false
  heart2.addImage(heart2Img);
  heart2.scale = 0.8;

  heart3 = createSprite(1350, 50);
  heart3.addImage(heart3Img);
  heart3.scale = 0.8;




  player.addAnimation("still", playerimg);
  player.addAnimation("moving", playermoving);
  player.addAnimation("shooting", shoot);
  player.addAnimation("dead", playerdead);
  player.addAnimation("crouching", playerCrouch);




  bulletGroup = new Group()
  groupBullet = new Group()
  monstersGroup = new Group()
  fireballGroup = new Group()

}

function draw() {
  background("black");
  


  player.depth = bg.depth
  player.depth = player.depth+1

  

if(keyIsDown(UP_ARROW) && gameState == "start"){
  gameState = "play"
}

if (gameState === "play"){

  player.visible = true

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }


  if(life==0){
    gameState = "lost"
    
    heart1.visible = false
    heart2.visible = false
    heart3.visible = false
    player.changeAnimation("dead", playerdead);
    player.frameDelay = 4;
    
  }

  if(score==20){
    gameState = "won"

  }

  if(bullets==0){
    gameState = "empty"
    
  }

  //moving the player
  if (keyWentDown("space")) {
    
    bullets = bullets-1
    
    if(leftKeyActive = true && rightKeyActive == false) {
      player.changeAnimation("shooting", shoot)
      bullet = createSprite(player.x + 10,player.y - 30,20,20)
      bullet.addAnimation("rightBullet", bulletimg)
      bullet.scale = 0.1
      bullet.mirrorX(-1)
      bullet.velocityX = -20
      bulletGroup.add(bullet)
      player.depth = bullet.depth
      player.depth = player.depth+2
    }
    
    if(rightKeyActive = true && leftKeyActive == false) {
      player.changeAnimation("shooting", shoot)
      bullet = createSprite(player.x + 10,player.y - 30,20,20)
      bullet.addAnimation("rightBullet", bulletimg)
      bullet.scale = 0.1
      bullet.velocityX = 20
      bulletGroup.add(bullet)
      player.depth = bullet.depth
      player.depth = player.depth+2
    }


  }
  
  if (keyIsDown(LEFT_ARROW)) {
    player.changeAnimation("moving", playermoving)
    player.x = player.x - 10
    leftKeyActive = true
    rightKeyActive = false
    player.mirrorX(-1);
    bg.mirrorX(-1);
    //bullet.changeAnimation("rightBullet", flippedBullet)
    //bullet.scale = 0.1;
    //bullet.velocityX = -20

  }
  else if(keyWentUp(LEFT_ARROW)) {
    //player.changeAnimation("still", playerimg);
    rightKeyActive = false

  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.changeAnimation("moving", playermoving)
    player.x = player.x + 10
    rightKeyActive = true
    player.mirrorX(1);
    bg.mirrorX(1);
  }
  else if(keyWentUp(RIGHT_ARROW)) {
    //player.changeAnimation("still", playerimg);
    leftKeyActive = false
  }
  
  else if(keyWentUp("space"))  {
    //player.changeAnimation("still", playerimg);
    player.frameDelay = 3;
    player.scale = 0.7
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    player.changeAnimation("crouching", playerCrouch)
    player.frameDelay = 6
    player.scale = 0.5
    player.position.y = windowHeight/2 + 140
  }
  else if(keyWentUp(DOWN_ARROW)) {
    //player.changeAnimation("still", playerimg)
    player.changeAnimation("moving", playermoving)
    player.frameDelay = 3;
    player.scale = 0.7
    player.position.y = windowHeight/2 + 130
  }

 
  if(player.x < displayWidth-1500 || player.x > displayWidth){
    player.position.x = displayWidth-1200
  }

  if (monstersGroup.isTouching(player)) {
    for(var i=0;i<monstersGroup.length;i++){     
      
      if(monstersGroup[i].isTouching(player)){
           monstersGroup[i].destroy()
          
          life=life-1
           } 
     
     }

  }


  if(monstersGroup.isTouching(bulletGroup)){
    for(var i=0;i<monstersGroup.length;i++){     
        
     if(monstersGroup[i].isTouching(bulletGroup)){
          monstersGroup[i].destroy()
          bulletGroup.destroyEach()

          score = score+2

          } 
    
    }
  }

  if (groupBullet.isTouching(player)){
    for(var i=0;i<groupBullet.length;i++){     
        
      if(groupBullet[i].isTouching(player)){
           groupBullet[i].destroy()

           bullets = bullets+5
 
           } 
     
     }
  }

  if(fireballGroup.isTouching(player) && player.position.y == windowHeight/2 + 140) {
    for(var i=0;i<fireballGroup.length;i++){     
        
      if(fireballGroup[i].isTouching(player) && player.position.y == windowHeight/2 + 140){
           fireballGroup[i].destroy()
 
           } 
     
     }
  }

  if (fireballGroup.isTouching(player)){
    for(var i=0;i<fireballGroup.length;i++){     
        
      if(fireballGroup[i].isTouching(player)){
           fireballGroup[i].destroy()

           life = life-1
 
           } 
     
     }
  }




  spawnMonsters();
  spawnBullets();
}

  bg.velocityX = -3;

  if (bg.x < 660) {
    bg.x = bg.width/2+50
  }

  drawSprites();

  if(gameState === "start"){
  fill("white")
  textSize(50)
  text("Monster Shooter", displayWidth/2-150,70);

  fill("white")
  textSize(30)
  text("Press up arrow to start", displayWidth/2-160,displayHeight/2)

  }

  textSize(20)
  fill("white")
  text("Lives = " + life,1380,120);
  text("Score = " + score,1380,145);
  text("Bullets = " + bullets,1380,168);

  if(gameState == "lost"){
  
    textSize(50)
    fill("white")
    text("You lost, better luck next time!",displayWidth/2-330, displayHeight/2-100);
    monstersGroup.destroyEach();
    groupBullet.destroyEach();
    fireballGroup.destroyEach();
    player.changeAnimation("dead", playerdead);
    player.velocityX = 0;
    bg.velocityX = 0
  
  }

  else if(gameState == "won"){
 
    textSize(100)
    fill("white")
    text("You Won!",displayWidth/2-200,displayHeight/2-50);
    monstersGroup.destroyEach();
    groupBullet.destroyEach();
    fireballGroup.destroyEach();
    player.destroy();
    bg.velocityX = 0
  
  }

  else if(gameState == "empty"){
    
    textSize(50)
    fill("white")
    text("Oh no! You ran out of bullets!",displayWidth/2-330,displayHeight/2-100);
    monstersGroup.destroyEach();
    player.destroy();
    groupBullet.destroyEach();
    bulletGroup.destroyEach();
    fireballGroup.destroyEach();
    bg.velocityX = 0
  
  }
  
  


}

function spawnMonsters(){
  if(frameCount%90===0){

    monster1 = createSprite(random(1000,1536),windowHeight/2+120)
    monster1.addImage(monster1img)
    monster1.scale = 0.5
    monster1.velocityX = -2
    monster1.setCollider("rectangle",0,0,185,241,0);

    if (monster1.position.x > 1400) {
      fireball = createSprite(monster1.x+20,monster1.y+10,20,20)
      fireball.addImage(fireballimg)
      fireball.scale = 0.2
      fireball.velocityX = -15

      fireballGroup.add(fireball)
    }

    //monster2 = createSprite(random(1200,1406),windowHeight/2+88)
    monster2 = createSprite(random(0,600),windowHeight/2+110)
    monster2.addAnimation("walking", monster2img);
    monster2.scale = 1.2;
    monster2.velocityX = 2;

    if (monster2.position.x < 150) {
      fireball = createSprite(monster2.x+20,monster2.y+10,20,20)
      fireball.addImage(fireballimg)
      fireball.scale = 0.2
      fireball.velocityX = 15

      fireballGroup.add(fireball)
    }

    monster1.lifetime = 600
    monster2.lifetime = 600

    monstersGroup.add(monster1)
    monstersGroup.add(monster2)


  }

}

function spawnBullets(){
  if(frameCount%150===0){
    
    groupofBullets = createSprite(random(10,1500),100)
    groupofBullets.addImage(groupofBulletsImg)
    groupofBullets.scale = 0.1
    groupofBullets.velocityY = 2

    groupofBullets.lifetime = 210
    
    groupBullet.add(groupofBullets)

  }

}
