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

// ==========================================
// SLOW SNAKE SCRIBBLES
// ==========================================

const scribbleLayer = document.getElementById("scribble-layer");

const snakeEdges = [
  "left",
  "right",
  "top",
  "bottom"
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createSnake() {
  if (!scribbleLayer) return;

  const snake = document.createElement("div");
  snake.className = "snake-scribble";

  const edge = snakeEdges[
    Math.floor(Math.random() * snakeEdges.length)
  ];

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let startX;
  let startY;
  let endX;
  let endY;

  // Start and finish on DIFFERENT edges.
  switch (edge) {

    case "left":
      startX = -500;
      startY = randomBetween(100, vh - 100);

      endX = vw + 500;
      endY = randomBetween(100, vh - 100);
      break;

    case "right":
      startX = vw + 500;
      startY = randomBetween(100, vh - 100);

      endX = -500;
      endY = randomBetween(100, vh - 100);
      break;

    case "top":
      startX = randomBetween(100, vw - 100);
      startY = -350;

      endX = randomBetween(100, vw - 100);
      endY = vh + 350;
      break;

    case "bottom":
      startX = randomBetween(100, vw - 100);
      startY = vh + 350;

      endX = randomBetween(100, vw - 100);
      endY = -350;
      break;
  }

  // Random organic curve
  const curveX = randomBetween(-250, 250);
  const curveY = randomBetween(-180, 180);

  const rotation = randomBetween(-35, 35);

  snake.style.transform =
    `translate(${startX}px, ${startY}px) rotate(${rotation}deg)`;

  scribbleLayer.appendChild(snake);

  const duration = randomBetween(12000, 20000);

  const animation = snake.animate(
    [
      {
        transform:
          `translate(${startX}px, ${startY}px) rotate(${rotation}deg)`
      },

      {
        transform:
          `translate(
            ${((startX + endX) / 2) + curveX}px,
            ${((startY + endY) / 2) + curveY}px
          )
          rotate(${rotation + randomBetween(-15, 15)}deg)`
      },

      {
        transform:
          `translate(${endX}px, ${endY}px)
          rotate(${rotation + randomBetween(-25, 25)}deg)`
      }
    ],
    {
      duration,
      easing: "ease-in-out",
      fill: "forwards"
    }
  );

  animation.finished.then(() => {
    snake.remove();

    // Wait before another snake appears
    setTimeout(() => {
      createSnake();
    }, randomBetween(1500, 5000));
  });
}

// Start with only ONE snake
setTimeout(createSnake, 2500);
