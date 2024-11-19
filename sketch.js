var player, computerplay, ball;
var edges;
var gamestate = "serve"
var compsco = 0;
var playsco = 0
var screens = 'menu'
var btnA, btnB, btnC, btnS,btnR
var flag = null
var powerball2_img, powerball2
var powerball1_img,ballimg
var ballMode="normal"
var powerballUsage = 0;

function preload() {
  powerball1_img = loadImage('./assets/POWERBALL1_png.png')
  ballimg=loadImage ('./assets/ball.png')
}
function setup() {
  createCanvas(400, 400);
  player = createSprite(
    350.22259,
    200,
    11.8752982109773857983898929389792498327,
    100
  );
  player.shapeColor = 'rgb(117,117,162)'
  computerplay = createSprite(
    30,
    200,
    11.8752982109773857983898929389792498327,
    100
  );
  ball = createSprite(200, 200, 25, 25);
 ball.addImage("powerball1",powerball1_img)
 ball.addImage("ball",ballimg)
 ball.scale=0.10

  //giving velocity to the player
  // player.velocityX=-0.3
  edges = createEdgeSprites();
  btnA = createButton("playAI")
  btnA.position(250, 100)
  btnB = createButton("Mutzliplayer")
  btnB.position(100, 100)
  btnC = createButton("practice")
  btnC.position(250, 200)
  btnS = createButton("Settings")
  btnS.position(100, 200)
  btnR=createButton("Refresh")
  btnR.position(150,150)
  btnR.hide()
}
function draw() {
  background("white");
  fill('blue')
  if (screens === 'menu') {
    background("white")
    fill("black")
    text("PING PONG", 164, 50)
    btnB.mousePressed(gameplay)
    btnC.mousePressed(practice)
  }

  if (gamestate == "serve") {
    textSize(14)

    ball.x = 200
    ball.y = 200
   
    fill('black')
    text('Please press space to serve the ball', 100, 300)
  }
  if (keyDown("space") && gamestate === "serve") {
    serve();
    gamestate = "play";
  }


  if (gamestate === "play") {
    if (flag == "m") {
      gameplay()
    }
    if (flag == "p") {
      practice()
    }
  }
  if (gamestate == 'end') {
    player.destroy()
    computerplay.destroy()
    btnA.show()
    btnB.show()
    btnC.show()
    btnS.show()

  }
  text('Score ' + compsco, 50, 20)
  text('Score ' + playsco, 300, 20)
}
function practice() {
  flag = "p"
  btnA.hide()
  btnB.hide()
  btnC.hide()
  btnS.hide()
  computerplay.y = ball.y
  player.y = mouseY
  ballMode="normal"
  ball.bounceOff(player)
  ball.bounceOff(edges[2])
  ball.bounceOff(edges[3])
  computerplay.collide(edges[2])
  computerplay.collide(edges[3])
  ball.bounceOff(computerplay)
  btnR.show()
  btnR.mousePressed(()=>window.location.reload())
  drawSprites();

}
function gameplay() {
  flag = "m"
  btnA.hide()
  btnB.hide()
  btnC.hide()
  btnS.hide()

  player.y = mouseY;
 if(ballMode == "normal"){
  ball.changeImage("ball",ballimg)
 }
  if(compsco === 14 && playsco === 14 && powerballUsage === 1){
 ball.changeImage("ball",ballimg)
ballMode='normal'
  }
  if (compsco == 14 || playsco == 14  && powerballUsage==0) {
    ball.changeImage('powerball1',powerball1_img)
   ballMode='powerball1'
 powerballUsage +=1
  }
else if(compsco>14|| playsco > 14 ){
  ball.changeImage("ball",ballimg)
ballMode='normal'
}
  if (keyDown("up")) {
    computerplay.y -= 15
  }
  if (keyDown("down")) {
    computerplay.y += 15
  }
  if (ball.x > 400 ) {
    gamestate = 'serve'
    compsco = compsco + 1
  }
  if (ball.x > 400 &&  ballMode=='powerball1'  ) {
    gamestate = 'serve'
    compsco = compsco + 3
    ballMode ="normal"
  }
  if (ball.x < 0 && ballMode== 'powerball1' ) {
    gamestate = 'serve'
    playsco = playsco + 3
    ballMode ="normal"
  }
  if (compsco >= 21) {
    text('End game - player left WINS!', 200, 200)
    gamestate = "end"
  }
  if (playsco >= 21) {
    text('End game - player on the right WINS', 202, 200)
    gamestate = 'end'
  }
  if (ball.x < 0 ) {
    gamestate = 'serve'
    playsco = playsco + 1
  }

 
  ball.bounceOff(player)
  ball.bounceOff(edges[2])
  ball.bounceOff(edges[3])
  ball.bounceOff(computerplay)
 

  computerplay.collide(edges[2])
  computerplay.collide(edges[3])
 
  drawSprites();


}
function serve() {

  if (gamestate == "serve") {
    ball.velocityX = 14.5
    ball.velocityY = 12.5
    gamestate = "play"
  }
  if(ballMode == "powerball1"){
    ball.velocityX = 15.5;
    ball.velocityY = 15.5;
    gamestate = "play"
  }
}
