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

function createSnake() {
  if (!scribbleLayer) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Pick two random edge points
  const edges = ["left", "right", "top", "bottom"];
  const edgeA = edges[Math.floor(Math.random() * edges.length)];
  let edgeB = edges[Math.floor(Math.random() * edges.length)];
  // Make sure they're different edges
  while (edgeB === edgeA) {
    edgeB = edges[Math.floor(Math.random() * edges.length)];
  }

  function pointOnEdge(edge) {
    switch (edge) {
      case "left":   return { x: -10,      y: randomBetween(0, vh) };
      case "right":  return { x: vw + 10,  y: randomBetween(0, vh) };
      case "top":    return { x: randomBetween(0, vw), y: -10 };
      case "bottom": return { x: randomBetween(0, vw), y: vh + 10 };
    }
  }

  const start = pointOnEdge(edgeA);
  const end   = pointOnEdge(edgeB);

  // 1–3 control points between start and end for a wobbly path
  const cpCount = Math.floor(randomBetween(1, 4));
  const controls = [];
  for (let i = 0; i < cpCount; i++) {
    controls.push({
      x: randomBetween(vw * 0.05, vw * 0.95),
      y: randomBetween(vh * 0.05, vh * 0.95),
    });
  }

  // Build SVG path string: M start, C/Q through controls, end
  let d = `M ${start.x} ${start.y}`;

  if (controls.length === 1) {
    d += ` Q ${controls[0].x} ${controls[0].y}, ${end.x} ${end.y}`;
  } else if (controls.length === 2) {
    d += ` C ${controls[0].x} ${controls[0].y}, ${controls[1].x} ${controls[1].y}, ${end.x} ${end.y}`;
  } else {
    // For 3 control points: move through two quadratics
    const mid = {
      x: (controls[0].x + controls[1].x) / 2,
      y: (controls[0].y + controls[1].y) / 2,
    };
    d += ` Q ${controls[0].x} ${controls[0].y}, ${mid.x} ${mid.y}`;
    d += ` Q ${controls[1].x} ${controls[1].y}, ${controls[2].x} ${controls[2].y}`;
    d += ` Q ${controls[2].x} ${controls[2].y}, ${end.x} ${end.y}`;
  }

  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("snake-scribble");
  svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  svg.appendChild(path);
  scribbleLayer.appendChild(svg);

  // Animate with stroke-dasharray draw-on effect
  const length = path.getTotalLength();
  path.style.strokeDasharray  = length;
  path.style.strokeDashoffset = length;

  const drawDuration  = randomBetween(2500, 5000);
  const holdDuration  = randomBetween(1500, 4000);
  const fadeDuration  = randomBetween(1000, 2000);

  // Draw on
  path.animate(
    [
      { strokeDashoffset: length },
      { strokeDashoffset: 0 },
    ],
    { duration: drawDuration, easing: "ease-in-out", fill: "forwards" }
  ).finished.then(() => {
    // Hold, then fade out
    setTimeout(() => {
      path.animate(
        [{ opacity: 0.18 }, { opacity: 0 }],
        { duration: fadeDuration, easing: "ease-in", fill: "forwards" }
      ).finished.then(() => {
        svg.remove();
        setTimeout(createSnake, randomBetween(800, 3000));
      });
    }, holdDuration);
  });
}

setTimeout(createSnake, 1200);
