/* 
Game Narrative:
Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.

Battle the aliens as you try to destroy them with your lasers.

There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.
*/

/* create a game character*/

class GameCharacter {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;

    this.attack = this.attack.bind(this); // Binding 'constructor' to the this
  }
  /* attack ability */
  attack = () => {
    console.log(this.randomNumber());
  };
  /* Random number generator */
  randomNumber = () => {
    return Math.random() * 10;
  };
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
/*create characters  the 2 Aliens*/
AlienMini = new Alien("AlienMini", 3, 5, 0.5);
AlienMotherShip = new Alien("AlienMotherShip", 6, 4, 0.7);

/*create the EarthDefender Player */
USSpaceForce = new EarthDefender("USSpaceForce", 20, 5, 0.7);

/* create a attack button*/

/* check child object properties/prototype*/
console.log(Object.getOwnPropertyNames(AlienMini));
console.log(Object.getPrototypeOf(AlienMotherShip));

console.log(
  `${AlienMotherShip.name} ${AlienMotherShip.hull} ${AlienMotherShip.firepower} ${AlienMotherShip.accuracy}`
);

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
