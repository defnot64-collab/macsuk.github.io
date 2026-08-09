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
// RANDOM SCROLLING SCRIBBLES
// ==========================================

const scribbles = document.querySelectorAll(".scribble");

const scribbleLocations = [
  // Left edge
  { left: "-260px", top: "15vh" },
  { left: "-190px", top: "38vh" },
  { left: "-280px", top: "68vh" },

  // Right edge
  { left: "calc(100% - 140px)", top: "12vh" },
  { left: "calc(100% - 220px)", top: "42vh" },
  { left: "calc(100% - 100px)", top: "72vh" },

  // Top
  { left: "15vw", top: "-230px" },
  { left: "55vw", top: "-180px" },
  { left: "75vw", top: "-250px" },

  // Bottom
  { left: "10vw", top: "calc(100vh - 80px)" },
  { left: "45vw", top: "calc(100vh - 120px)" },
  { left: "75vw", top: "calc(100vh - 70px)" },

  // Random-looking middle positions
  { left: "8vw", top: "25vh" },
  { left: "72vw", top: "30vh" },
  { left: "20vw", top: "65vh" },
  { left: "82vw", top: "60vh" }
];

function moveScribbles() {
  scribbles.forEach((scribble, index) => {

    // Make sure the two scribbles don't always
    // choose the same position.
    let location =
      scribbleLocations[
        Math.floor(Math.random() * scribbleLocations.length)
      ];

    // Apply position
    scribble.style.left = location.left;
    scribble.style.top = location.top;

    // Random rotation
    const rotation = Math.floor(Math.random() * 70) - 35;

    // Slightly different scale
    const scale = 0.85 + Math.random() * 0.3;

    scribble.style.transform =
      `rotate(${rotation}deg) scale(${scale})`;
  });
}

// Initial positions
moveScribbles();

let lastScrollPosition = window.scrollY;
let scrollCooldown = false;

window.addEventListener("scroll", () => {

  const currentScrollPosition = window.scrollY;

  // Only trigger after moving at least 80px
  if (
    Math.abs(currentScrollPosition - lastScrollPosition) < 80 ||
    scrollCooldown
  ) {
    return;
  }

  lastScrollPosition = currentScrollPosition;
  scrollCooldown = true;

  moveScribbles();

  // Prevent the scribbles from changing constantly
  setTimeout(() => {
    scrollCooldown = false;
  }, 700);
});
