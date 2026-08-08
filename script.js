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
