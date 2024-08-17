/* 
Game Narrative:
Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.

Battle the aliens as you try to destroy them with your lasers.

There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.
*/
let round = 0;

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
    this.ussAssemblyTurn = true;
    this.alienTurn = false;

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

/*create characters: name, hull,firepower,accuracy*/

alienOne = new Alien(
  "miniAlien",
  generateRandomNumber(3, 6),
  generateRandomNumber(2, 4),
  generateRandomNumber(0.6, 0.8)
);

/*create the EarthDefender Player */
ussAssembly = new EarthDefender("ussAssembly", 20, 5, 0.7);

/*-----------------------------------*/
/* ----- Game Start function --------*/
/* USSASSEMBLY ussAssemblyTurn=true  */
/* ALIEN       alienTurn=false       */
/*-----------------------------------*/
document.querySelector("#start").addEventListener("click", function () {
  console.log("start");

  const fightRound = document.querySelector(".fightRound");
  round = 1;
  fightRound.innerHTML = round;
  /* Load statistics*/
  document.querySelector("#alienHull").innerHTML = `${alienOne.hull}`;
  document.querySelector("#alienFire").innerHTML = `${alienOne.firepower}`;
  document.querySelector("#alienAccuracy").innerHTML = `${alienOne.accuracy}`;
  document.querySelector("#playerHull").innerHTML = `${USSpaceForce.hull}`;
  document.querySelector("#playerFire").innerHTML = `${USSpaceForce.firepower}`;
  document.querySelector(
    "#playerAccuracy"
  ).innerHTML = `${USSpaceForce.accuracy}`;
});

/*--------------------------------*/
/* ----- Game Fire function -----*/
/*--------------------------------*/
document.querySelector("#fire").addEventListener("click", () => {
  console.log("fire initiated");
  console.log(`${ussAssembly.name} toggle is ${ussAssembly.ussAssemblyTurn}`);

  ussAssembly.ussAssemblyTurn
    ? calculateStatistics(ussAssembly.name)
    : calculateStatistics(alienOne.name); // ternary operator ( ===)
});

/*--------- calculate statistics        ------------------- */

calculateStatistics = (name) => {
  const randomMath = Math.floor(Math.random() * 10) / 10;
  console.log(randomMath);
  switch (name) {
    case ussAssembly.name:
      if (randomMath < `${name}`.accuracy) {
        console.log(`${name} is hit`);
        /*reduce the alien's hull*/
        alienOne.hull -= 1;
        document.querySelector("#alienHull").innerHTML = `${alienOne.hull}`;
        console.log("hit");
      } else {
        console.log("missed");
      }
      break;
    case alienOne.name:
      if (randomMath < ussAssembly.accuracy) {
        console.log("${name} is hit");
        /*reduce the player's hull*/
        alienOne.hull -= 1;
        document.querySelector("#playerHull").innerHTML = `${alienOne.hull}`;
      } else {
        console.log("missed");
      }
      break;
  }
};
/*----------return name and toggle turn ------------------- */
toggleTurn = () => {
  switch (true) {
    case "alienTurn":
      console.log("alien turn");

      break;
  }
  if (ussAssembly.ussAssemblyTurn) {
    ussAssembly.ussAssemblyTurn = false; // object properties
    alienOne.alienTurn = true;
    return ussAssembly.name;
  } else if (!ussAssemblyTurn) {
    ussAssemblyTurn = true;
    alienTurn = false;
    return alienOne.name;
  }
};
/* check child object properties/prototype*/
console.log(Object.getOwnPropertyNames(alienOne));
console.log(Object.getPrototypeOf(alienOne));

console.log(
  `${alienOne.name} ${alienOne.hull} ${alienOne.firepower} ${alienOne.accuracy}`
);

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
