const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// Random moving scribbles
const scribbles = document.querySelectorAll(".scribble");

const scribblePositions = [
  { side: "left",  x: -240, y: 15 },
  { side: "left",  x: -170, y: 45 },
  { side: "left",  x: -300, y: 75 },

  { side: "right", x: -250, y: 10 },
  { side: "right", x: -180, y: 38 },
  { side: "right", x: -320, y: 70 },

  { side: "top",   x: 15, y: -220 },
  { side: "top",   x: 55, y: -180 },

  { side: "bottom", x: 20, y: -180 },
  { side: "bottom", x: 65, y: -220 }
];

function moveScribble(scribble) {
  const position =
    scribblePositions[
      Math.floor(Math.random() * scribblePositions.length)
    ];

  const rotation = Math.floor(Math.random() * 61) - 30;

  // Reset positioning
  scribble.style.left = "";
  scribble.style.right = "";
  scribble.style.top = "";
  scribble.style.bottom = "";

  if (position.side === "left") {
    scribble.style.left = `${position.x}px`;
    scribble.style.top = `${position.y}vh`;
  }

  if (position.side === "right") {
    scribble.style.right = `${position.x}px`;
    scribble.style.top = `${position.y}vh`;
  }

  if (position.side === "top") {
    scribble.style.left = `${position.x}vw`;
    scribble.style.top = `${position.y}px`;
  }

  if (position.side === "bottom") {
    scribble.style.left = `${position.x}vw`;
    scribble.style.bottom = `${position.y}px`;
  }

  scribble.style.transform = `rotate(${rotation}deg)`;
}

let lastScrollY = window.scrollY;
let scrollTimeout;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Only move when the user actually scrolls
  if (Math.abs(currentScrollY - lastScrollY) > 30) {
    scribbles.forEach((scribble) => {
      moveScribble(scribble);
    });

    lastScrollY = currentScrollY;
  }

  // Don't move again until scrolling pauses
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    scribbles.forEach((scribble) => {
      moveScribble(scribble);
    });
  }, 250);
});

// Give each scribble a random starting position
scribbles.forEach((scribble) => {
  moveScribble(scribble);
});


const discordButton = document.getElementById("discord-copy");
const copyLabel = document.getElementById("copy-label");

if (discordButton && copyLabel) {
  discordButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("macsuk");
      copyLabel.textContent = "copied!";
      setTimeout(() => copyLabel.textContent = "copy", 1400);
    } catch {
      copyLabel.textContent = "macsuk";
    }
  });
}
