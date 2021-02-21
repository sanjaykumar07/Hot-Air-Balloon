var balloon,database,balloonPosition;

function preload() {
  balloonAni = loadAnimation(
    "Hot Air Ballon-02.png",
    "Hot Air Ballon-03.png",
    "Hot Air Ballon-04.png"
  );

  balloonImg = loadAnimation("Hot Air Ballon-02.png")
  bg = loadImage("Hot Air Ballon-01.png");
}

function setup() {
  createCanvas(800, 650);

  database = firebase.database();

  balloon = createSprite(350, 520, 150, 150);
  balloon.addAnimation("balloonImg",balloonImg)
  balloon.addAnimation("balloon", balloonAni);
  balloon.scale = 0.5;
  
  var balloonPosition = database.ref("Balloon/height");
  balloonPosition.on("value", readHeight, showError);

}

function draw() {
  rectMode(CENTER);
  background(bg);
  //console.log(balloon.scale)
  if (keyDown(LEFT_ARROW)) {
    balloon.x += -10;
    balloon.changeAnimation("balloon", balloonAni);
  
  } else if (keyDown(RIGHT_ARROW)) {
    balloon.x += 10;
    balloon.changeAnimation("balloon", balloonAni);
  
  } else if (keyDown(UP_ARROW)) {
    balloon.y += -10;
    if (balloon.scale > 0.26) balloon.scale += -0.005;
    balloon.changeAnimation("balloon", balloonAni);;
  
  } else if (keyDown(DOWN_ARROW)) {
    balloon.y += 10;
    balloon.scale += 0.005;
    balloon.changeAnimation("balloon", balloonAni);
  }

  if(keyWentUp(LEFT_ARROW)){
    balloon.changeAnimation("balloonImg", balloonImg);
  }

  if(keyWentUp(RIGHT_ARROW)){
    balloon.changeAnimation("balloonImg", balloonImg);
  }

  if(keyWentUp(UP_ARROW)){
    balloon.changeAnimation("balloonImg", balloonImg);
  }

  if(keyWentUp(DOWN_ARROW)){
    balloon.changeAnimation("balloonImg", balloonImg);
  }

  drawSprites();
  
  textSize(25)
  fill("lime")
  text("*Use arrow keys to move Hot Air Balloon!",10,30)
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
 balloon.y = height.y;
}

function updateHeight(x,y){
  datebase.ref('balloon/height').set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}



function showError(){
  console.log("Error in writing ti the database");
}