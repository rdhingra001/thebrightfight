// Canvas details
var canvasWidth = window.screen.availWidth;
var canvasHeight = window.screen.availHeight;

// Sprite details
var sprWidth = 64;
var sprHeight = 64;

// Player details
var player = 0;
var playerX = getRandomInt(0, canvasWidth);
var playerY = getRandomInt(0, canvasHeight);
var playerDamage = 1
var playerSpeed = 5;
var boostSpeed = 10;
var boostActive = false;
var boostsLeft = 5;
var health = 100;
var playerHealthShow = 100
var score = 0;

// Blob henchman details
var blobs;
var blobDamage = getRandomInt(15, 30)
var speed = 5;
var blobDirection = 90;

var blob1 = 0;
var blob1X = getRandomInt(0, canvasWidth);
var blob1Y = getRandomInt(0, canvasHeight);
var blob1HP = 4;

var blob2 = 0;
var blob2X = getRandomInt(0, canvasWidth);
var blob2Y = getRandomInt(0, canvasHeight);
var blob2HP = 4;

var blob3 = 0;
var blob3X = getRandomInt(0, canvasWidth);
var blob3Y = getRandomInt(0, canvasHeight);
var blob3HP = 4;


// Projectiles
var projectiles;
var blobProjectiles;

var blobProjectile1;
var blobProjectile2;
var blobProjectile3;

// Setup interval timers for each blob
var interval;

// Buffer the player image before hand
function preload() {
  
  // Loading the images from our assets library
  playerImage = loadImage("Assets/Images/player.png");
  blobImage = loadImage("Assets/Images/BlobOfDoom.png");
  projectileImage = loadImage("Assets/Images/projectile.png");
  blobProjectileImage = loadImage("Assets/Images/blobProjectile.png")
  level1 = loadImage("Assets/Backgrounds/level1.png");
  
}

// Setup the canvas with the player and mobs, and initializing the canvas to load
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  // Initialize player
  player = createSprite(playerX, playerY, sprWidth, sprHeight);
  player.addImage(playerImage);
  
  // Save player coordinates so mobs can shoot at given coordinates every 5 seconds
  playerCoordinates = [player.position.x, player.position.y];
  print(playerCoordinates);
  
  // Initialize blob mobs
  blob1 = createSprite(blob1X, blob1Y, sprWidth, sprHeight);
  blob1.addImage(blobImage);
  blob2 = createSprite(blob2X, blob2Y, sprWidth, sprHeight);
  blob2.addImage(blobImage);
  blob3 = createSprite(blob3X, blob3Y, sprWidth, sprHeight);
  blob3.addImage(blobImage);
  
  projectiles = new Group();
  blobProjectiles = new Group();
  blobs = new Group();
  
  blobs.add(blob1);
  blobs.add(blob2);
  blobs.add(blob3);
  
  // Set colliders for the player and the mobs
  player.setCollider("rectangle", 0, 0, 100, 100);
  blob1.setCollider("rectangle", 0, 0, 70, 70);
  blob2.setCollider("rectangle", 0, 0, 70, 70);
  blob3.setCollider("rectangle", 0, 0, 70, 70);
  
  // Call the interval for the mobs to attack the player every 3 seconds
  interval = setInterval(mobAttack, 1500);
}

// Check if any of the projectiles have made a collision with any of the other sprites
function checkCollision() {
  
}

// Manage the player controls to control the players with the W, A, S, D keys
function playerControls() {
  // W or top arrow
  if (keyIsDown(87) || keyIsDown(38)) {
     player.position.y -= playerSpeed;
  }
  // A or left arrow
  if (keyIsDown(83) || keyIsDown(40)) {
    player.position.y += playerSpeed;
  }
  // S or down arrow
  if (keyIsDown(65) || keyIsDown(37)) {
    player.position.x -= playerSpeed;
  }
  // D or right arrow
  if (keyIsDown(68) || keyIsDown(39)) {
    player.position.x += playerSpeed;
  }
  // Space to boost to mouse direction
  if (keyIsDown(32)) {
    player.attractionPoint(0.6, mouseX, mouseY);
  }
}

// Bounds to keep the player and blobs in the screen
function setupBounds() {
  
  // Player bounds
  
  // x bounds
  if (player.position.x < sprWidth / 2) {
    player.position.x = sprWidth / 2;
  }
  else if (player.position.x > canvasWidth - sprWidth / 2) {
    player.position.x = canvasWidth - sprWidth / 2;
  }
  
  // y bounds
  if (player.position.y < sprHeight / 2) {
    player.position.y = sprHeight / 2;
  }
  else if (player.position.y > canvasHeight - sprHeight / 2) {
    player.position.y = canvasHeight - sprHeight / 2;
  }
  
  // Mob bounds
  
  // Blob 1
  // x bounds
  if (blob1.position.x < sprWidth / 2) {
    blob1.position.x = sprWidth / 2;
  }
  else if (blob1.position.x > canvasWidth - sprWidth / 2) {
    blob1.position.x = canvasWidth - sprWidth / 2;
  }
  
  // y bounds
  if (blob1.position.y < sprHeight / 2) {
    blob1.position.y = sprHeight / 2;
  }
  else if (blob1.position.y > canvasHeight - sprHeight / 2) {
    blob1.position.y = canvasHeight - sprHeight / 2;
  }
  
  // Blob 2
   // x bounds
  if (blob2.position.x < sprWidth / 2) {
    blob2.position.x = sprWidth / 2;
  }
  else if (blob2.position.x > canvasWidth - sprWidth / 2) {
    blob2.position.x = canvasWidth - sprWidth / 2;
  }
  
  // y bounds
  if (blob2.position.y < sprHeight / 2) {
    blob2.position.y = sprHeight / 2;
  }
  else if (blob2.position.y > canvasHeight - sprHeight / 2) {
    blob2.position.y = canvasHeight - sprHeight / 2;
  }
  
  // Blob 3
  // x bounds
  if (blob3.position.x < sprWidth / 2) {
    blob3.position.x = sprWidth / 2;
  }
  else if (blob3.position.x > canvasWidth - sprWidth / 2) {
    blob3.position.x = canvasWidth - sprWidth / 2;
  }
  
  // y bounds
  if (blob3.position.y < sprHeight / 2) {
    blob3.position.y = sprHeight / 2;
  }
  else if (blob3.position.y > canvasHeight - sprHeight / 2) {
    blob3.position.y = canvasHeight - sprHeight / 2;
  }
  
}

// Code that would be run when the left or right mouse button is clicked
function mousePressed() {
  
  // Initialize the projectiles
  var projectile = createSprite(player.position.x, player.position.y);
  projectile.addImage(projectileImage);
  projectile.setCollider("rectangle", 0, 0, 50, 50);
  projectile.attractionPoint(10 + playerSpeed, mouseX, mouseY);
  projectiles.add(projectile);
  
  // Check if the projectiles touch the blobs to kill them
}

// Code to make the mobs shoot projectiles to me
function mobAttack() {
  
  // Initialize the mob projectiles
  blobProjectile1 = createSprite(blob1X, blob1Y);
  blobProjectile2 = createSprite(blob2X, blob2Y);
  blobProjectile3 = createSprite(blob3X, blob3Y);
  
  // Set the image to the sprites
  blobProjectile1.addImage(blobProjectileImage);
  blobProjectile2.addImage(blobProjectileImage);
  blobProjectile3.addImage(blobProjectileImage);
  
  
  // Setting the attraction point to the current user
  blobProjectile1.attractionPoint(playerSpeed, player.position.x, player.position.y);
  blobProjectile2.attractionPoint(playerSpeed, player.position.x, player.position.y);
  blobProjectile3.attractionPoint(playerSpeed, player.position.x, player.position.y);
  
   // Adding a collider to the blob projectiles
  blobProjectile1.setCollider("rectangle", 0, 0, 50, 50);
  blobProjectile2.setCollider("rectangle", 0, 0, 50, 50);
  blobProjectile3.setCollider("rectangle", 0, 0, 50, 50);

  // Adding the projectiles to our 'projectiles' group
  blobProjectiles.add(blobProjectile1);
  blobProjectiles.add(blobProjectile2);
  blobProjectiles.add(blobProjectile3);
}

// Make the mobs move around to make the game harder
function enemyMovements() {
  blobDirection += 2;
  blob1.setSpeed(3, blobDirection);
  blob2.setSpeed(3, blobDirection);
  blob3.setSpeed(3, blobDirection);
}

// Manage the overall structure of the collisions
function collisions() {
  // Player collisions
  player.collide(blob1);
  player.collide(blob2);
  player.collide(blob3);
  
  blobProjectiles.collide(player, handleAttacks);
  projectiles.collide(blob1, handleAttacks);
  projectiles.collide(blob2, handleAttacks);
  projectiles.collide(blob3, handleAttacks);
  
}

// Handling the enemy and player collisions using the projectiles
function handleAttacks(destroyed, pt) {

  // Decreasing the health of the mobs and increasing the score of the player
  if (blob1HP > 0 || blob2HP > 0 || blob3HP > 0) {
    if (projectiles.collide(blob1)) {
      blob1HP -= 1
      score += 10
      projectiles.remove(projectile)
    }

    if (projectiles.collide(blob2)) {
      blob2HP -= 1
      score += 10
      projectiles.remove(projectile)
    }

    if (projectiles.collide(blob1)) {
      blob3HP -= 1
      score += 10
      projectiles.remove(projectile)
    }
  }

  // Decreasing the health of the player
  if (playerHealthShow > 0) {
    if (blobProjectiles.collide(player)) {
      playerHealthShow -= blobDamage
      blobProjectiles.remove(pt)
      blobDamage = getRandomInt(15, 30)
    }
  }

  // If blob projectiles touch the player
  if (blob1HP == 0) {
    blob1.remove()
    projectiles.remove(projectile)
  }
  if (blob2HP == 0) {
    blob2.remove()
    projectiles.remove(projectile)
  }
  if (blob3HP == 0) {
    blob3.remove()
    projectiles.remove(projectile)
  }

  if (blob1HP == 0 && blob2HP == 0 && blob3HP == 0) {
    score += 100
    alert("You win! Final health: " + playerHealthShow, ". Final score: " + score + ". Refresh the page to play again.")
  }

  // If player is out of health
  if (playerHealthShow <= 0) {
    alert("Better luck next time! Final score: " + score + ". Refresh the page to play again." )
  }
}

// Generate a random number between the two number passed into the function
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    ran = Math.floor(Math.random() * (max - min + 1)) + min
    return ran;
}

// Check if the random spawn point matches the spawn point of one of the mobs
function checkCoordinates() {
  if (playerX == blob1X && playerY == blob1Y) {
    playerX = getRandomInt(0, canvasWidth)
    playerY = getRandomInt(0, canvasHeight)
  }
  else if (playerX == blob2X && playerY == blob2Y) {
    playerX = getRandomInt(0, canvasWidth)
    playerY = getRandomInt(0, canvasHeight)
  }
  else if (playerX == blob3X && playerY == blob3Y) {
    playerX = getRandomInt(0, canvasWidth)
    playerY = getRandomInt(0, canvasHeight)
  }
}


// Draw the color and sprites
function draw() {
  background(level1);
  setupBounds();
  playerControls();
  drawSprites();
  checkCoordinates();
  enemyMovements();
  collisions();
  text("Player Health: " + playerHealthShow, 60, 60)
  text("Player Score: " + score, 60, 75)
  text("Blob 1 Health: " + blob1HP, 60, 90)
  text("Blob 2 Health: " + blob2HP, 60, 105)
  text("Blob 3 Health: " + blob3HP, 60, 120)
}