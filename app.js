/* 
Game Narrative:
Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.

Battle the aliens as you try to destroy them with your lasers.

There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.
*/
let round = 0;
let gameStartedFlag = false;
let loadAlien;
let gameRetreatFlag = false;

function activityLogger(message) {
  /* activityType = start, fire*/

  const logContainer = document.querySelector(".logActivity");
  const newActivity = document.createElement("div");
  newActivity.classList.add("${activityType}");
  newActivity.textContent = message;
  logContainer.appendChild(newActivity); // Missing this line

  /*auto-scroll as new entries gets inserted*/
  logContainer.scrollTop = logContainer.scrollHeight;
}

function removeActivity() {}

// ----------[]
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

class GameCharacter {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    /*toggle */
    this.turn = false;

    // this.attack = this.attack.bind(this); // Binding 'constructor' to the this
  }
}

// create an alien
class Alien extends GameCharacter {
  constructor(name, hull, firepower, accuracy) {
    super(name, hull, firepower, accuracy); // super passes the arguments to the constructor of the parent class
    console.log(name);
  }
}

// create a Earth defender Player
class EarthDefender extends GameCharacter {
  constructor(name, hull, firepower, accuracy) {
    super(name, hull, firepower, accuracy);
  }
}

/*create characters with attributes: name, hull,firepower,accuracy*/

alienOne = new Alien(
  "Alien 1",
  generateRandomNumber(3, 6),
  generateRandomNumber(2, 4),
  generateRandomNumber(0.6, 0.8)
);
alienTwo = new Alien(
  "Alien 2",
  generateRandomNumber(3, 6),
  generateRandomNumber(2, 4),
  generateRandomNumber(0.6, 0.8)
);
alienThree = new Alien(
  "Alien 3",
  generateRandomNumber(3, 6),
  generateRandomNumber(2, 4),
  generateRandomNumber(0.6, 0.8)
);
alienFour = new Alien(
  "Alien 4",
  generateRandomNumber(3, 6),
  generateRandomNumber(2, 4),
  generateRandomNumber(0.6, 0.8)
);
alienFive = new Alien(
  "Alien 5",
  generateRandomNumber(3, 6),
  generateRandomNumber(2, 4),
  generateRandomNumber(0.6, 0.8)
);
alienSix = new Alien(
  "Alien 6",
  generateRandomNumber(3, 6),
  generateRandomNumber(2, 4),
  generateRandomNumber(0.6, 0.8)
);

let aliens = {
  alienOne,
  alienTwo,
  alienThree,
  alienFour,
  alienFive,
  alienSix,
};
let currentAlienIndex = 0;

/*create the EarthDefender Player */
ussAssembly = new EarthDefender("USSAssembly", 20, 5, 0.7);

/*-----------------------------------*/
/* ----- Game Start function --------*/
/* Uss Assembly ussAssemblyTurn=true  */
/* ALIEN       alienTurn=false       */
/*-----------------------------------*/
document.querySelector("#start").addEventListener("click", function () {
  console.log("start");

  /* clear logActivity */
  const logContainer = document.querySelector(".logActivity");
  logContainer.innerHTML = "";

  const fightRound = document.querySelector(".fightRound");
  if (gameRetreatFlag) {
    round = 0;
    gameRetreatFlag = false;
  }
  round += 1;
  /* ussAssembly's turn */
  ussAssembly.turn = true;
  alienOne.turn = false;

  /*load first alien */
  const firstAlien = Object.values(aliens)[0];
  loadAlien = firstAlien;

  fightRound.innerHTML = round;
  /*---- load player's name -----*/
  document.querySelector("#alienName").innerHTML = `${loadAlien.name}`;
  document.querySelector("#ussAssembly").innerHTML = `${ussAssembly.name}`;
  /*---- load player's statistics -----*/
  /* generate new random accuracy for loadAlien to give it a fighting chance*/
  loadAlien.hull = generateRandomNumber(3, 6);
  ussAssembly.hull = 0.7;

  document.querySelector("#alienHull").innerHTML = `${loadAlien.hull}`;
  document.querySelector("#alienFire").innerHTML = `${loadAlien.firepower}`;
  document.querySelector("#alienAccuracy").innerHTML = `${loadAlien.accuracy}`;
  document.querySelector("#playerHull").innerHTML = `${ussAssembly.hull}`;
  document.querySelector("#playerFire").innerHTML = `${ussAssembly.firepower}`;
  document.querySelector(
    "#playerAccuracy"
  ).innerHTML = `${ussAssembly.accuracy}`;

  /* Call activity logger when Game is Not yet started*/
  if (!gameStartedFlag) {
    activityLogger("Game Started!");
    gameStartedFlag = true;
  }
});

/*--------------------------------*/
/* ----- Game Fire function -----*/
/*--------------------------------*/
document.querySelector("#fire").addEventListener("click", () => {
  /* Fire here */
  fireButton();
  /* 
The for...in loop iterates over the property names (keys) of the object, and they are strings, not numbers. 
So, the alienKey variable will be a string, not a number.
To start the iteration from the second property (which would be alienTwo), 
use a counter variable to skip the first iteration:
*/
  if (loadAlien.hull <= 0) {
    let count = 0;
    for (const alienKey in aliens) {
      if (count === 0) {
        count++;
        continue;
      }
      const alien = aliens[alienKey];
      loadAlien = alien;
      /* update Statistics  */
      document.querySelector("#alienName").innerHTML = `${loadAlien.name}`;
      /* generate new random accuracy for loadAlien to give it a fighting chance*/
      loadAlien.hull = generateRandomNumber(3, 6);
      ussAssembly.hull = 0.7;

      document.querySelector("#alienHull").innerHTML = `${loadAlien.hull}`;
      document.querySelector("#alienFire").innerHTML = `${loadAlien.firepower}`;
      document.querySelector(
        "#alienAccuracy"
      ).innerHTML = `${loadAlien.accuracy}`;
      fireButton();
    }
    activityLogger("All Aliens Defeated!");
  }
});

/*----------return name and toggle turn ------------------- */
toggleTurn = (turnToToggle) => {
  switch (turnToToggle) {
    case "ussAssembly.turn":
      ussAssembly.turn = false;
      loadAlien.turn = true;
      break;
    case "loadAlien.turn":
      ussAssembly.turn = true;
      loadAlien.turn = false;
      break;
    default:
      console.error("Invalid turn:", TurnToToggle);
  }
};

function fireButton() {
  console.log(`${ussAssembly.name} turn is ${ussAssembly.turn}`);
  console.log("fire initiated");
  activityLogger(`Fire Initiated! from ${ussAssembly.name}`);

  /* Uss Assembly's accuracy = 0.7 */
  /* loadAlien's accuracy is generated randomly  */
  do {
    if (ussAssembly.turn) {
      if (ussAssembly.accuracy < loadAlien.accuracy) {
        console.log(`ussAssembly miss!`);
        activityLogger(`{${ussAssembly.name} miss the shot!`);
      } else if (ussAssembly.accuracy > loadAlien.accuracy) {
        console.log(`${loadAlien.name} is hit!`); /* loadAlien HIT! */
        loadAlien.hull -= 1;
        document.querySelector("#alienHull").innerHTML = `${loadAlien.hull}`;
        activityLogger(`${loadAlien.name} is hit! Hull: ${loadAlien.hull}`);
      }
      toggleTurn("ussAssembly.turn"); /* set ussAssembly's turn = false  */
    }
    if (loadAlien.turn) {
      if (loadAlien.accuracy < ussAssembly.accuracy) {
        console.log(`{${loadAlien.name} miss!`);
        activityLogger(`${loadAlien.name} return fire and miss the shot!`);
      } else if (loadAlien.accuracy > ussAssembly.accuracy) {
        console.log(`${ussAssembly.name} is hit!`); /* ussAssembly HIT! */
        ussAssembly.hull -= 1;
        document.querySelector("#playerHull").innerHTML = `${ussAssembly.hull}`;
        activityLogger(`${ussAssembly.name} is hit! Hull: ${ussAssembly.hull}`);
      }
      toggleTurn("loadAlien.turn"); /* set loadAlien's turn = false  */
    }
    /* generate new random accuracy for loadAlien to give it a fighting chance*/
    loadAlien.accuracy = generateRandomNumber(0.6, 0.8);
    console.log(`${loadAlien.name} updated accuracy is ${loadAlien.accuracy}`);
    document.querySelector(
      "#alienAccuracy"
    ).innerHTML = `${loadAlien.accuracy}`;
  } while (ussAssembly.hull > 0 && loadAlien.hull > 0);
  if (loadAlien.hull === 0) {
    activityLogger(`${loadAlien.name} HAS BEEN DESTROYED!`);
  }
}

/*--------------------------------*/
/* ----- Game Retreat function ----*/
/*--------------------------------*/
document.querySelector("#retreat").addEventListener("click", () => {
  gameRetreatFlag = true;
  activityLogger(`********   GAME OVER   **************`);
  activityLogger(`${ussAssembly.name} chose to RETREAT!`);
  activityLogger(`*************************************`);
});

/* check child object properties/prototype*/
// console.log(Object.getOwnPropertyNames(loadAlien));
// console.log(Object.getPrototypeOf(loadAlien));

// console.log(
//   `${loadAlien.name} ${loadAlien.hull} ${loadAlien.firepower} ${loadAlien.accuracy}`
// );

/* set statistics */

// const bird = document.querySelector(".bird");
// let positionX = 0;
// let positionY = 0;
// let directionX = 1;
// let directionY = 1;
// const displacement = 40; // 1/2 inch in pixels (assuming 96 DPI)

// function moveBird() {
//   positionX += (Math.random() - 0.05) * directionX * displacement;
//   positionY += (Math.random() - 0.05) * directionY * displacement;

//   if (positionX <= 0 || positionX >= window.innerWidth - bird.offsetWidth) {
//     directionX *= -1;
//   }
//   if (positionY <= 0 || positionY >= window.innerHeight - bird.offsetHeight) {
//     directionY *= -1;
//   }

//   bird.style.transform = `translate(${positionX}px, ${positionY}px)`;
// }

// setInterval(moveBird, 200); // Move the bird every second

// function detectPosition() {
//   const rect = bird.getBoundingClientRect();
//   console.log(`Bird's position: X=${rect.left}, Y=${rect.top}`);
//   requestAnimationFrame(detectPosition); // Recursively calls the function for real-time updates
// }

// detectPosition(); // Start detecting the position
