// Tokens
const TOKENS = [
  "Structured Thinking",
  "Intuitive UX",
  "Systems-Oriented",
  "Interactions & Flows",
  "Detail-Oriented",
  "Design Systems",
  "Visual Hierarchy",
  "UI Clarity",
];

// Timing (tuned for smoothness)
const TIMING = {
  ENTER: 800,
  HOLD: 1800,
  GLOW_IN: 360,
  EXIT: 1000,
};

let currentIndex = 0;
let timeouts = [];

const tokenEl = document.getElementById("token");

function clearTimeouts() {
  timeouts.forEach(clearTimeout);
  timeouts = [];
}

function setPhase(phase) {
  tokenEl.classList.remove(
    "tag--idle",
    "tag--active",
    "tag--entering",
    "tag--glow-in",
    "tag--glowing",
    "tag--exiting"
  );

  switch (phase) {
    case "idle":
      tokenEl.classList.add("tag--idle");
      break;

    case "enter":
      tokenEl.classList.add("tag--entering");
      break;

    case "glow":
      tokenEl.classList.add("tag--active", "tag--glowing");
      break;

    case "exit":
      tokenEl.classList.add("tag--exiting");
      break;
  }
}

function runCycle() {
  clearTimeouts();

  // Set text
  tokenEl.textContent = TOKENS[currentIndex];

  // Reset to idle (below view)
  setPhase("idle");

  // Let browser register idle state
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {

      // ENTER
      setPhase("enter");

      timeouts.push(setTimeout(() => {
        // GLOW / HOLD (no shadow)
        setPhase("glow");

        timeouts.push(setTimeout(() => {
          // EXIT — ONE continuous animation
          setPhase("exit");

          timeouts.push(setTimeout(() => {
            currentIndex = (currentIndex + 1) % TOKENS.length;
            runCycle();
          }, TIMING.EXIT));

        }, TIMING.HOLD));

      }, TIMING.ENTER + TIMING.GLOW_IN));

    });
  });
}

// Initial delay
timeouts.push(setTimeout(runCycle, 300));

window.addEventListener("beforeunload", clearTimeouts);
