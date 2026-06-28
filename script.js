const appTemplates = {
  about: `
    <div class="about-grid">
      <div class="card">
        <h3>Welcome to AbdulatifOS</h3>
        <p>I’m Abdulatif, a builder who loves creating playful web experiences, shipping tiny tools, and mixing design with code.</p>
      </div>
      <div class="card">
        <h4>Core Skills</h4>
        <div class="tag-row">
          <span class="tag">Python</span>
          <span class="tag">C++</span>
          <span class="tag">JavaScript</span>
          <span class="tag">UI Design</span>
          <span class="tag">Hack Club</span>
          <span class="tag">HTML</span>
          <span class="tag">CSS</span>
        </div>
      </div>
      <div class="card">
        <h4>Today’s Mood</h4>
        <p>Curious, calm, and building something bright.</p>
      </div>
    </div>
  `,
  projects: `
    <div class="project-list">
      <div class="project-item">
        <strong>WebOS Jam</strong>
        <div>Built a polished personal operating system with apps, windows, and a desktop vibe.</div>
        <div class="tag-row">
          <span class="tag">Single page</span>
          <span class="tag">Interactive</span>
        </div>
      </div>
      <div class="project-item">
        <strong>Slack bot</strong>
        <div>Created a Slack bot that helps manage and organize team communications.</div>
        <div class="tag-row">
          <span class="tag">Python</span>
          <span class="tag">API Integration</span>
        </div>
      </div>
      <div class="project-item">
        <strong>Telegram bots</strong>
        <div>Created Telegram bots for various automation tasks and user interactions.</div>
        <div class="tag-row">
          <span class="tag">Python</span>
          <span class="tag">aiogram</span>
        </div>
      </div>
    </div>
  `,
  notes: `
    <div class="notes-list">
      <div class="note-item">
        <strong>Idea vault</strong>
        <div>Need more ambient soundscapes for deep work sessions.</div>
      </div>
      <div class="note-item">
        <strong>Next upgrade</strong>
        <div>Add a weather widget and a tiny calendar app.</div>
      </div>
      <div class="note-item">
        <strong>Personal mantra</strong>
        <div>Pixel-perfect details, calm energy, endless curiosity.</div>
      </div>
    </div>
  `,
  terminal: `
    <div class="terminal">
      <pre>Last login: ${new Date().toLocaleString()}
visitor@abdulatif:~$ whoami
Abdulatif
visitor@abdulatif:~$ ls
about  projects  notes  music  gallery
visitor@abdulatif:~$</pre>
      <div class="terminal-input">
        <input type="text" placeholder="Run a command..." aria-label="Terminal input" />
      </div>
    </div>
  `,
  gallery: `
    <div class="gallery-grid">
      <div class="gallery-card">Neon Night</div>
      <div class="gallery-card">Pixel Sunset</div>
      <div class="gallery-card">Ocean Code</div>
      <div class="gallery-card">Studio Flow</div>
    </div>
  `,
  music: `
    <div class="music-card">
      <div class="card">
        <h3>Focus Session</h3>
        <p>Energetic beats for deep work sessions.</p>
      </div>
      <label>Volume</label>
      <input class="slider" type="range" min="0" max="100" value="48" />
      <div class="card">Now playing: <strong>Midnight Drift</strong></div>
    </div>
  `,
  devlogs: `
    <div class="notes-list">
      <div class="note-item">
        <strong>2026-06-24</strong>
        <div>Started the web OS layout and built the desktop top bar.</div>
      </div>
      <div class="note-item">
        <strong>2026-06-25</strong>
        <div>Added draggable windows, app icons, and an interactive terminal.</div>
      </div>
      <div class="note-item">
        <strong>2026-06-26</strong>
        <div>Implemented a custom theme switcher and refined the UI details.</div>
      </div>
    </div>
  `,
  settings: `
    <div class="settings-grid">
      <div class="card">
        <h3>Appearance</h3>
        <p>Customize AbdulatifOS with a fresh theme and wallpaper mood.</p>
        <div class="settings-row">
          <button data-theme="default">Aurora</button>
          <button data-theme="midnight">Midnight</button>
          <button data-theme="sunset">Sunset</button>
        </div>
      </div>
      <div class="card">
        <h4>Feature highlight</h4>
        <p>This theme switcher is a new feature beyond the guide.</p>
      </div>
    </div>
  `,
};

const windowLayer = document.getElementById("windowLayer");
const bootScreen = document.getElementById("bootScreen");
const bootBtn = document.getElementById("bootBtn");
const clockLabel = document.getElementById("clockLabel");
const dateLabel = document.getElementById("dateLabel");
const desktopIcons = document.querySelectorAll(".app-icon");

bootBtn.addEventListener("click", () => {
  bootScreen.classList.add("hidden");
});

function updateClock() {
  const now = new Date();
  clockLabel.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  dateLabel.textContent = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
updateClock();
setInterval(updateClock, 1000);

function createWindow(appKey) {
  const win = document.createElement("div");
  win.className = "window";
  win.dataset.app = appKey;

  const title = appKey[0].toUpperCase() + appKey.slice(1);
  win.innerHTML = `
    <div class="titlebar">
      <div class="left">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <strong>${title}</strong>
      </div>
      <button class="close-btn" aria-label="Close window">✕</button>
    </div>
    <div class="window-body">${appTemplates[appKey]}</div>
  `;

  const rect = windowLayer.getBoundingClientRect();
  const left = 70 + Math.random() * 140;
  const top = 80 + Math.random() * 80;
  win.style.left = `${left}px`;
  win.style.top = `${top}px`;

  const closeBtn = win.querySelector(".close-btn");
  closeBtn.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });
  closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    win.remove();
  });

  windowLayer.appendChild(win);
  bringToFront(win);

  makeDraggable(win, win.querySelector(".titlebar"));

  const input = win.querySelector("input");
  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const value = input.value.trim().toLowerCase();
        const pre = win.querySelector("pre");
        if (pre) {
          pre.textContent += `\nvisitor@abdulatif:~$ ${value}\n${handleCommand(value)}`;
        }
        input.value = "";
      }
    });
  }

  const body = win.querySelector(".window-body");
  if (body) {
    body.addEventListener(
      "wheel",
      (event) => {
        if (body.scrollHeight > body.clientHeight) {
          event.preventDefault();
          body.scrollTop += event.deltaY;
        }
      },
      { passive: false },
    );
  }

  const themeButtons = win.querySelectorAll("[data-theme]");
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.theme);
    });
  });
}

function handleCommand(command) {
  const map = {
    help: "Commands: help, clear, echo, date, projects",
    clear: "clear",
    echo: "Hello from AbdulatifOS",
    date: new Date().toString(),
    projects: "Projects loaded successfully.",
  };

  if (command === "clear") {
    return "";
  }
  if (map[command]) {
    return map[command];
  }
  return `bash: ${command}: command not found`;
}

function applyTheme(theme) {
  const values = {
    default: {
      accent: "#8b5cf6",
      accent2: "#22d3ee",
      panel: "rgba(7, 17, 31, 0.82)",
      background:
        "radial-gradient(circle at top left, #18314f 0%, #07111f 45%, #02060d 100%)",
    },
    midnight: {
      accent: "#38bdf8",
      accent2: "#818cf8",
      panel: "rgba(2, 8, 20, 0.88)",
      background:
        "radial-gradient(circle at top left, #050816 0%, #08112b 40%, #090c1a 100%)",
    },
    sunset: {
      accent: "#fb7185",
      accent2: "#fbbf24",
      panel: "rgba(40, 16, 29, 0.88)",
      background:
        "radial-gradient(circle at top left, #5b2a6d 0%, #111827 45%, #0a0b14 100%)",
    },
  };
  const themeValues = values[theme] || values.default;
  const root = document.documentElement;
  root.style.setProperty("--accent", themeValues.accent);
  root.style.setProperty("--accent-2", themeValues.accent2);
  root.style.setProperty("--panel", themeValues.panel);
  root.style.setProperty("--background", themeValues.background);
}

function bringToFront(win) {
  document
    .querySelectorAll(".window")
    .forEach((w) => w.classList.remove("active"));
  win.classList.add("active");
}

function makeDraggable(win, handle) {
  let posX = 0;
  let posY = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;

  handle.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".close-btn")) return;
    bringToFront(win);
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    const rect = win.getBoundingClientRect();
    posX = rect.left;
    posY = rect.top;
    event.preventDefault();
    win.setPointerCapture(event.pointerId);
  });

  win.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    win.style.left = `${Math.max(0, posX + dx)}px`;
    win.style.top = `${Math.max(0, posY + dy)}px`;
  });

  win.addEventListener("pointerup", () => {
    dragging = false;
  });

  win.addEventListener("pointercancel", () => {
    dragging = false;
  });
}

desktopIcons.forEach((icon) => {
  icon.addEventListener("click", () => createWindow(icon.dataset.app));
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".window")) {
    const win = event.target.closest(".window");
    bringToFront(win);
  }
});
