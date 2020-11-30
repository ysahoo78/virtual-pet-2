//Create variables here
var database;
var dog, happyDog, foodS, foodStock = 0, dogHappy;
var button1, button2;
var fedTime, lastFed, foodObj

function preload()
{
  //load images here
 
  dogIMG = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(200,200,20,20);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  database = firebase.database();

  button1 = createButton('add food')
  button2 = createButton('last fed')

 

  foodObj = new Food();


 
}

function draw() {  
  background(46, 139, 87);

  button1.position(500, 100);
  button1.mousePressed(addFood);
  button2.position(400, 100);
  button2.mousePressed(feedDog);

  text("food stock = " + foodStock, 50, 50)

  foodObj.display();

  fedTime=database.ref('lastFed');
  fedTime.on("value", (data)=>{
    lastFed = data.val();
  })
  console.log(lastFed);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last feed : " + lastFed%12 + "PM", 350, 30);
  }else if(lastFed===0){
    text("Last feed : 12 AM", 350, 30);
  }else{
    text("Last feed : " + lastFed + " AM", 350, 30);
  }

 
  

  drawSprites();
  //add styles here

}

function addFood(){
  foodObj.foodStock += 1;
  
  foodObj.updateFoodStock(foodObj.foodStock);
}
function feedDog(){
  
  dog.addImage(dogHappy);
  foodObj.foodStock -= 1;
  foodObj.updateFoodStock(foodObj.foodStock);
  database.ref('/').update({
    lastFed : hour()
  })
  
}





