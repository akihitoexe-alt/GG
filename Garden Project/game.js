const TOOL_LABELS = {
  inspect: "Inspect",
  water: "Water",
  sun: "Sunlight",
  fertilizer: "Fertilizer",
  bugs: "Bug Net",
  rodents: "Rodent Guard",
  harvest: "Harvest",
};

const PROFILE_KEY = "grellMeGardenProfile";
const defaultSchedule = ["tomato", "lettuce", "strawberry"];

const crops = [
  {
    id: "tomato",
    name: "Tomato",
    type: "Fruit",
    difficulty: "Balanced",
    tolerance: 3,
    needs: ["steady water", "full sun", "bug watch"],
    profile: "A flexible starter crop that rewards steady water and bright light.",
    tip: "Tomatoes are forgiving, but they still prefer a calm sequence: inspect, water, sun, then protect the fruit.",
    plan: ["inspect", "water", "sun", "bugs", "harvest"],
    colors: {
      fruit: "#e55343",
      unripe: "#69b565",
      leaf: "#4f9b60",
      leafDark: "#317847",
    },
  },
  {
    id: "lettuce",
    name: "Lettuce",
    type: "Vegetable",
    difficulty: "Easy",
    tolerance: 4,
    needs: ["light water", "partial sun", "bug watch"],
    profile: "Fast, leafy, and beginner friendly, but small bugs like it too.",
    tip: "Lettuce does best with gentle water and quick pest checks before the leaves get crowded.",
    plan: ["inspect", "water", "bugs", "harvest"],
    colors: {
      fruit: "#9fd66e",
      unripe: "#b6de79",
      leaf: "#83bd5d",
      leafDark: "#4d833e",
    },
  },
  {
    id: "carrot",
    name: "Carrot",
    type: "Vegetable",
    difficulty: "Easy",
    tolerance: 4,
    needs: ["even soil", "mild sun", "rodent guard"],
    profile: "A sturdy root crop that needs patience underground more than fuss above it.",
    tip: "Carrots like even soil. Too much tinkering is not needed, but rodents may notice the bed.",
    plan: ["inspect", "water", "rodents", "harvest"],
    colors: {
      fruit: "#f08c2f",
      unripe: "#df9b45",
      leaf: "#5faa67",
      leafDark: "#2f7749",
    },
  },
  {
    id: "strawberry",
    name: "Strawberry",
    type: "Fruit",
    difficulty: "Medium",
    tolerance: 3,
    needs: ["water", "fertilizer", "bug watch"],
    profile: "Sweet and rewarding, but it asks for richer soil and closer pest attention.",
    tip: "Strawberries give a lovely harvest when the soil is fed before the bugs settle in.",
    plan: ["inspect", "water", "fertilizer", "bugs", "harvest"],
    colors: {
      fruit: "#d94d5f",
      unripe: "#72b76f",
      leaf: "#4f9b60",
      leafDark: "#2f7446",
    },
  },
  {
    id: "pepper",
    name: "Pepper",
    type: "Fruit",
    difficulty: "Medium",
    tolerance: 3,
    needs: ["sunlight", "water", "fertilizer"],
    profile: "A bright crop that wants warmth first, then steady water and a little feeding.",
    tip: "Peppers respond strongly to light. Inspect first so you do not water when sunlight is the real need.",
    plan: ["inspect", "sun", "water", "fertilizer", "harvest"],
    colors: {
      fruit: "#d8443f",
      unripe: "#5fae5c",
      leaf: "#4e9d62",
      leafDark: "#2f7347",
    },
  },
  {
    id: "cucumber",
    name: "Cucumber",
    type: "Vegetable",
    difficulty: "Medium",
    tolerance: 3,
    needs: ["extra water", "sunlight", "bug watch"],
    profile: "A climbing crop that grows quickly when watered well and checked often.",
    tip: "Cucumbers drink more than most crops in this set. Refill the can before the soil gets too dry.",
    plan: ["inspect", "water", "sun", "water", "bugs", "harvest"],
    colors: {
      fruit: "#58a766",
      unripe: "#8ccf78",
      leaf: "#4b985e",
      leafDark: "#2c7144",
    },
  },
  {
    id: "pumpkin",
    name: "Pumpkin",
    type: "Fruit",
    difficulty: "Hard",
    tolerance: 2,
    needs: ["deep water", "fertilizer", "rodent guard", "sunlight"],
    profile: "Large, dramatic, and demanding. It gives a big harvest but has little patience for wrong care.",
    tip: "Pumpkins are the hardest crop here: feed the soil, protect the vines, and keep sunlight steady.",
    plan: ["inspect", "water", "fertilizer", "rodents", "sun", "harvest"],
    colors: {
      fruit: "#e7902c",
      unripe: "#75a956",
      leaf: "#4d9856",
      leafDark: "#2f7040",
    },
  },
];

const cropById = Object.fromEntries(crops.map((crop) => [crop.id, crop]));

const careCopy = {
  inspect: {
    title: "Seed Check",
    visual: "seed",
    condition: (crop) => `${crop.name} bed is ready to observe.`,
    objective: (crop) => `Inspect the ${crop.name.toLowerCase()} bed.`,
    thought: (crop) => `${crop.name} is starting a new growth cycle. A close look should come first.`,
    inspect: (crop) => `The ${crop.name.toLowerCase()} bed shows its first clues: soil texture, light, and small movement around the leaves.`,
    correct: (crop) => `You read the ${crop.name.toLowerCase()} bed before acting.`,
    noteTitle: "Observe before acting",
    noteText: (crop) => `${crop.name} care starts with reading the soil, leaves, color, and nearby pests.`,
  },
  water: {
    title: "Watering",
    visual: "sprout",
    condition: (crop) => `${crop.name} needs water.`,
    objective: (crop) => `Water the ${crop.name.toLowerCase()} with a filled can.`,
    thought: (crop) => `The ${crop.name.toLowerCase()} soil is looking dry. The water barrel is ready nearby.`,
    inspect: (crop) => `The soil around the ${crop.name.toLowerCase()} is dry enough to need water, not soaked enough to wait.`,
    correct: (crop) => `The ${crop.name.toLowerCase()} roots settle into evenly moist soil.`,
    noteTitle: "Water with care",
    noteText: (crop) => `${crop.name} needs water when the soil looks dry, but too much water can stress the roots.`,
  },
  sun: {
    title: "Sunlight",
    visual: "leaf",
    condition: (crop) => `${crop.name} needs better light.`,
    objective: (crop) => `Adjust sunlight for the ${crop.name.toLowerCase()}.`,
    thought: (crop) => `The ${crop.name.toLowerCase()} is reaching for better light.`,
    inspect: (crop) => `The leaves are angled toward the bright side of the garden. This crop wants a sunlight adjustment.`,
    correct: (crop) => `The ${crop.name.toLowerCase()} catches a cleaner stretch of sun.`,
    noteTitle: "Balance sunlight",
    noteText: (crop) => `${crop.name} uses sunlight to build strength, but the right timing matters more than guessing.`,
  },
  fertilizer: {
    title: "Feeding",
    visual: "leaf",
    condition: (crop) => `${crop.name} needs richer soil.`,
    objective: (crop) => `Add fertilizer to the ${crop.name.toLowerCase()} bed.`,
    thought: (crop) => `The ${crop.name.toLowerCase()} could use more nourishment before the next push of growth.`,
    inspect: (crop) => `The leaves look steady, but the soil is running lean. A small feeding would help.`,
    correct: (crop) => `The ${crop.name.toLowerCase()} bed takes in a measured feeding.`,
    noteTitle: "Feed lightly",
    noteText: (crop) => `${crop.name} can benefit from fertilizer, especially before flowers or fruit need more energy.`,
  },
  bugs: {
    title: "Bug Watch",
    visual: "fruit",
    condition: (crop) => `Bugs are gathering on the ${crop.name.toLowerCase()}.`,
    objective: (crop) => `Clear bugs from the ${crop.name.toLowerCase()}.`,
    thought: (crop) => `Something small is moving on the ${crop.name.toLowerCase()} leaves.`,
    inspect: (crop) => `Small bugs are clustered near tender leaves. A gentle bug net is the right tool.`,
    correct: (crop) => `The bugs lift away and the ${crop.name.toLowerCase()} looks safer.`,
    noteTitle: "Handle pests early",
    noteText: (crop) => `${crop.name} recovers more easily when pests are found early and removed gently.`,
  },
  rodents: {
    title: "Rodent Guard",
    visual: "fruit",
    condition: (crop) => `Rodents are sniffing around the ${crop.name.toLowerCase()}.`,
    objective: (crop) => `Set a gentle rodent guard for the ${crop.name.toLowerCase()}.`,
    thought: (crop) => `There are little tracks near the ${crop.name.toLowerCase()} bed.`,
    inspect: (crop) => `Tiny tracks curve toward the crop bed. A gentle guard should steer visitors away.`,
    correct: (crop) => `The guard is set and the ${crop.name.toLowerCase()} bed is protected.`,
    noteTitle: "Protect the harvest",
    noteText: (crop) => `${crop.name} may attract curious visitors as it grows. Protection works best before damage starts.`,
  },
  harvest: {
    title: "Harvest",
    visual: "ripe",
    condition: (crop) => `${crop.name} is ready to harvest.`,
    objective: (crop) => `Harvest the ripe ${crop.name.toLowerCase()}.`,
    thought: (crop) => `The ${crop.name.toLowerCase()} looks ready. This is the satisfying part.`,
    inspect: (crop) => `Color, shape, and firmness all say the ${crop.name.toLowerCase()} is ready for the basket.`,
    correct: (crop) => `You harvest the ${crop.name.toLowerCase()} at the right time.`,
    noteTitle: "Harvest timing",
    noteText: (crop) => `${crop.name} should be harvested when its stage, color, and condition all look ready.`,
  },
};

const phaseTimes = ["Morning", "Late Morning", "Noon", "Afternoon", "Evening", "Golden Hour"];
const dayClasses = ["day-morning", "day-noon", "day-noon", "day-afternoon", "day-evening", "day-evening"];
const visualSequence = ["seed", "sprout", "leaf", "fruit", "fruit", "ripe"];

const dom = {
  titleScreen: document.querySelector("#titleScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  playerName: document.querySelector("#playerName"),
  characterButtons: document.querySelectorAll(".character-card"),
  cycleModeButtons: document.querySelectorAll("#cycleMode button"),
  scheduleBuilder: document.querySelector("#scheduleBuilder"),
  scheduleSelects: document.querySelectorAll(".schedule-select"),
  randomizeCycleButton: document.querySelector("#randomizeCycleButton"),
  startButton: document.querySelector("#startButton"),
  howToButton: document.querySelector("#howToButton"),
  howToDialog: document.querySelector("#howToDialog"),
  journalDialog: document.querySelector("#journalDialog"),
  journalButton: document.querySelector("#journalButton"),
  journalContent: document.querySelector("#journalContent"),
  moreInfoButton: document.querySelector("#moreInfoButton"),
  resultDialog: document.querySelector("#resultDialog"),
  resultTitle: document.querySelector("#resultTitle"),
  resultCondition: document.querySelector("#resultCondition"),
  resultLearned: document.querySelector("#resultLearned"),
  resultLabel: document.querySelector("#resultLabel"),
  nextGardenText: document.querySelector("#nextGardenText"),
  nextCropButton: document.querySelector("#nextCropButton"),
  replayButton: document.querySelector("#replayButton"),
  titleButton: document.querySelector("#titleButton"),
  cycleLabel: document.querySelector("#cycleLabel"),
  stageLabel: document.querySelector("#stageLabel"),
  currentCropPill: document.querySelector("#currentCropPill"),
  topHint: document.querySelector("#topHint"),
  garden: document.querySelector("#garden"),
  gardenSign: document.querySelector("#gardenSign"),
  barrelZone: document.querySelector("#barrelZone"),
  barrelLabel: document.querySelector("#barrelLabel"),
  tomatoZone: document.querySelector("#tomatoZone"),
  seedMarker: document.querySelector("#seedMarker"),
  plant: document.querySelector("#plant"),
  soil: document.querySelector("#soil"),
  bugLayer: document.querySelector("#bugLayer"),
  rodentLayer: document.querySelector("#rodentLayer"),
  conditionChip: document.querySelector("#conditionChip"),
  shelfLabel: document.querySelector("#shelfLabel"),
  player: document.querySelector("#player"),
  heldTool: document.querySelector("#heldTool"),
  gardenerAvatar: document.querySelector("#gardenerAvatar"),
  gardenerNameLabel: document.querySelector("#gardenerNameLabel"),
  currentCropName: document.querySelector("#currentCropName"),
  currentCropTraits: document.querySelector("#currentCropTraits"),
  needBadges: document.querySelector("#needBadges"),
  stressPanel: document.querySelector("#stressPanel"),
  stressFace: document.querySelector("#stressFace"),
  stressLabel: document.querySelector("#stressLabel"),
  stressFill: document.querySelector("#stressFill"),
  stressText: document.querySelector("#stressText"),
  objectiveText: document.querySelector("#objectiveText"),
  thoughtText: document.querySelector("#thoughtText"),
  tools: document.querySelector(".tools"),
  useButton: document.querySelector("#useButton"),
  distanceHint: document.querySelector("#distanceHint"),
  waterBadge: document.querySelector("#waterBadge"),
  sparkles: document.querySelector("#sparkles"),
  progressBubble: document.querySelector("#progressBubble"),
};

const state = {
  playerName: "Gardener",
  character: "male",
  cycleMode: "routine",
  schedule: [...defaultSchedule],
  dayIndex: 0,
  phaseIndex: 0,
  selectedTool: "inspect",
  canFull: false,
  inspected: false,
  waiting: false,
  stress: 0,
  wilted: false,
  wiltedErrors: 0,
  cropMistakes: 0,
  cropWilted: false,
  hadStress: false,
  didWilt: false,
  completedPhaseTool: null,
  player: { x: 43, y: 70 },
  keys: new Set(),
  journal: new Set(),
  completed: [],
  audioContext: null,
  lastMoveAt: 0,
};

const zoneCenters = {
  tomato: { x: 50, y: 72 },
  barrel: { x: 17, y: 72 },
  shelf: { x: 84, y: 72 },
};

function cropPhases(crop = currentCrop()) {
  return crop.plan.map((tool, index) => {
    const copy = careCopy[tool];
    const isHarvest = tool === "harvest";
    return {
      tool,
      title: copy.title,
      label: `${phaseTimes[Math.min(index, phaseTimes.length - 1)]} - ${crop.name} ${copy.title}`,
      visual: isHarvest ? "ripe" : copy.visual || visualSequence[Math.min(index, visualSequence.length - 1)],
      dayClass: dayClasses[Math.min(index, dayClasses.length - 1)],
      condition: copy.condition(crop),
      objective: copy.objective(crop),
      thought: copy.thought(crop),
      inspect: copy.inspect(crop),
      correct: copy.correct(crop),
      noteId: `${crop.id}:${tool}`,
      noteTitle: `${crop.name}: ${copy.noteTitle}`,
      noteText: copy.noteText(crop),
    };
  });
}

function currentCrop() {
  return cropById[state.schedule[state.dayIndex]] || cropById.tomato;
}

function currentPhase() {
  const phases = cropPhases();
  return phases[Math.min(state.phaseIndex, phases.length - 1)];
}

function populateScheduleOptions() {
  dom.scheduleSelects.forEach((select, index) => {
    select.innerHTML = crops
      .map((crop) => `<option value="${crop.id}">${crop.name} - ${crop.difficulty}</option>`)
      .join("");
    select.value = defaultSchedule[index] || crops[index % crops.length].id;
  });
}

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    if (typeof saved.name === "string") {
      dom.playerName.value = saved.name.slice(0, 20);
    }
    if (["male", "female", "neutral"].includes(saved.character)) {
      state.character = saved.character;
    }
    if (["routine", "random"].includes(saved.cycleMode)) {
      state.cycleMode = saved.cycleMode;
    }
    if (Array.isArray(saved.schedule) && saved.schedule.length === 3) {
      saved.schedule.forEach((cropId, index) => {
        if (cropById[cropId] && dom.scheduleSelects[index]) {
          dom.scheduleSelects[index].value = cropId;
        }
      });
    }
  } catch {
    localStorage.removeItem(PROFILE_KEY);
  }

  setCharacter(state.character);
  setCycleMode(state.cycleMode);
  updateSetupScheduleState();
}

function saveProfile() {
  const profile = {
    name: dom.playerName.value.trim().slice(0, 20),
    character: state.character,
    cycleMode: state.cycleMode,
    schedule: getSelectedSchedule(),
  };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function getPlayerName() {
  const name = dom.playerName.value.trim().slice(0, 20);
  return name || "Gardener";
}

function getSelectedSchedule() {
  return Array.from(dom.scheduleSelects).map((select) =>
    cropById[select.value] ? select.value : "tomato",
  );
}

function setCharacter(character) {
  state.character = character;
  dom.characterButtons.forEach((button) => {
    const selected = button.dataset.character === character;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  applyCharacterClass();
  saveProfile();
}

function applyCharacterClass() {
  ["character-male", "character-female", "character-neutral"].forEach((className) => {
    dom.player.classList.remove(className);
    dom.gardenerAvatar.classList.remove(className);
  });
  const className = `character-${state.character}`;
  dom.player.classList.add(className);
  dom.gardenerAvatar.classList.add(className);
}

function setCycleMode(mode) {
  state.cycleMode = mode;
  dom.cycleModeButtons.forEach((button) => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  updateSetupScheduleState();
  saveProfile();
}

function updateSetupScheduleState() {
  const random = state.cycleMode === "random";
  dom.scheduleBuilder.classList.toggle("is-random", random);
  dom.scheduleSelects.forEach((select) => {
    select.disabled = random;
  });
}

function randomizeCycle() {
  const shuffled = [...crops]
    .sort(() => Math.random() - 0.5)
    .slice(0, dom.scheduleSelects.length);
  dom.scheduleSelects.forEach((select, index) => {
    select.value = shuffled[index]?.id || crops[index % crops.length].id;
  });
  saveProfile();
}

function startGame() {
  state.playerName = getPlayerName();
  state.schedule = state.cycleMode === "random" ? randomSchedule() : getSelectedSchedule();
  saveProfile();
  resetGardenRun();
  dom.titleScreen.classList.add("hidden");
  dom.gameScreen.classList.remove("hidden");
  dom.garden.focus();
  render();
}

function randomSchedule() {
  return [...crops]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((crop) => crop.id);
}

function resetGardenRun() {
  state.dayIndex = 0;
  state.phaseIndex = 0;
  state.selectedTool = "inspect";
  state.completed = [];
  state.journal = new Set();
  state.hadStress = false;
  state.didWilt = false;
  state.player = { x: 43, y: 70 };
  resetCropState();
  closeDialog(dom.resultDialog);
  setThought(currentPhase().thought);
}

function resetCropState() {
  state.canFull = false;
  state.inspected = false;
  state.waiting = false;
  state.stress = 0;
  state.wilted = false;
  state.wiltedErrors = 0;
  state.cropMistakes = 0;
  state.cropWilted = false;
  state.completedPhaseTool = null;
  state.keys.clear();
  dom.bugLayer.classList.remove("fly-away");
  dom.rodentLayer.classList.remove("scurry-away");
}

function selectTool(tool) {
  if (!TOOL_LABELS[tool]) return;
  state.selectedTool = tool;
  syncToolButtons();
  setDistanceHint();
}

function syncToolButtons() {
  document.querySelectorAll(".tool-button").forEach((button) => {
    button.classList.toggle("selected", button.dataset.tool === state.selectedTool);
  });
  dom.heldTool.dataset.tool = state.selectedTool;
}

function render() {
  const crop = currentCrop();
  const phase = currentPhase();

  dom.cycleLabel.textContent = `Day ${state.dayIndex + 1} of ${state.schedule.length} - ${capitalize(state.cycleMode)} Cycle`;
  dom.stageLabel.textContent = phase.label;
  dom.currentCropPill.textContent = `${crop.name} (${crop.difficulty})`;
  dom.gardenSign.textContent = crop.name;
  dom.seedMarker.textContent = crop.name;
  dom.barrelLabel.textContent = "Water Barrel";
  dom.shelfLabel.textContent = "Tool Shelf";
  dom.gardenerNameLabel.textContent = state.playerName || getPlayerName();
  dom.currentCropName.textContent = crop.name;
  dom.currentCropTraits.textContent = crop.profile;
  dom.needBadges.innerHTML = crop.needs.map((need) => `<span class="need-badge">${escapeHtml(need)}</span>`).join("");
  dom.tomatoZone.setAttribute("aria-label", `${crop.name} bed`);

  dom.garden.classList.remove("day-morning", "day-noon", "day-afternoon", "day-evening");
  dom.garden.classList.add(phase.dayClass);

  dom.plant.className = `plant stage-${phase.visual}`;
  dom.plant.dataset.crop = crop.id;
  dom.plant.style.setProperty("--crop-fruit", crop.colors.fruit);
  dom.plant.style.setProperty("--crop-unripe", crop.colors.unripe);
  dom.plant.style.setProperty("--crop-leaf", crop.colors.leaf);
  dom.plant.style.setProperty("--crop-leaf-dark", crop.colors.leafDark);

  const threatVisible = state.inspected || state.wilted;
  dom.plant.classList.toggle("show-bugs", phase.tool === "bugs" && threatVisible);
  dom.plant.classList.toggle("show-rodents", phase.tool === "rodents" && threatVisible);
  dom.plant.classList.toggle("wilted", state.wilted);

  dom.soil.classList.toggle("dry", phase.tool === "water" && state.completedPhaseTool !== "water");
  dom.soil.classList.toggle("wet", state.completedPhaseTool === "water");
  dom.soil.classList.toggle("fed", state.completedPhaseTool === "fertilizer");
  dom.waterBadge.classList.toggle("hidden", !state.canFull);
  dom.bugLayer.classList.toggle("fly-away", state.completedPhaseTool === "bugs");
  dom.rodentLayer.classList.toggle("scurry-away", state.completedPhaseTool === "rodents");

  dom.conditionChip.textContent = getConditionText();
  dom.objectiveText.textContent = `Objective: ${getObjective()}`;
  dom.progressBubble.textContent =
    phase.tool === "harvest" ? "Packing the harvest..." : `Growing the ${crop.name.toLowerCase()}...`;

  renderStress();
  renderJournal();
  updatePlayerPosition();
  applyCharacterClass();
  syncToolButtons();
  setDistanceHint();
}

function getObjective() {
  const crop = currentCrop();
  const phase = currentPhase();

  if (state.waiting) return `Wait while the ${crop.name.toLowerCase()} responds.`;
  if (state.wilted && !state.inspected) return `Inspect the wilted ${crop.name.toLowerCase()}.`;
  if (state.wilted) return `Help the ${crop.name.toLowerCase()} recover with ${TOOL_LABELS[phase.tool]}.`;
  if (phase.tool === "inspect") return phase.objective;
  if (!state.inspected) return `Inspect the ${crop.name.toLowerCase()} before choosing care.`;
  if (phase.tool === "water" && !state.canFull) return "Refill the watering can.";
  return phase.objective;
}

function getConditionText() {
  const crop = currentCrop();
  const phase = currentPhase();
  if (state.wilted) return `${crop.name} is wilted.`;
  if (state.completedPhaseTool === "water") return "Soil is nicely moist.";
  if (state.completedPhaseTool === "fertilizer") return "Soil has been fed.";
  if (state.completedPhaseTool === "sun") return "Light is balanced.";
  if (state.completedPhaseTool === "bugs") return "Bugs have cleared.";
  if (state.completedPhaseTool === "rodents") return "Rodent guard is set.";
  if (phase.tool === "water" && state.canFull) return "Watering can is full.";
  return phase.condition;
}

function renderStress() {
  const crop = currentCrop();
  let label = "Low";
  let face = "Calm";
  let text = "The crop is steady.";
  let color = "var(--leaf)";
  let width = Math.max(12, Math.round((state.stress / crop.tolerance) * 86));

  if (state.wilted) {
    label = "Wilted";
    face = "Help";
    text = "Inspect carefully and use the right recovery step.";
    color = "#d5735f";
    width = 100;
  } else if (state.stress >= crop.tolerance - 1) {
    label = "High";
    face = "Worried";
    text = `${crop.name} is close to wilting.`;
    color = "#e39c4f";
    width = 78;
  } else if (state.stress > 0) {
    label = "Medium";
    face = "Alert";
    text = "A gentler next step will help.";
    color = "#d9b348";
    width = 44;
  }

  dom.stressLabel.textContent = label;
  dom.stressFace.textContent = face;
  dom.stressText.textContent = text;
  dom.stressFill.style.width = `${width}%`;
  dom.stressFill.style.background = color;
}

function renderJournal() {
  const scheduleHtml = state.schedule
    .map((cropId, index) => {
      const crop = cropById[cropId] || cropById.tomato;
      const active = index === state.dayIndex && !dom.gameScreen.classList.contains("hidden");
      const complete = state.completed.some((result) => result.day === index);
      const status = complete ? "Harvested" : active ? "In progress" : "Queued";
      return `
        <li>
          <strong>Day ${index + 1}: ${escapeHtml(crop.name)}</strong>
          <span>${escapeHtml(crop.difficulty)} - ${status}</span>
        </li>
      `;
    })
    .join("");

  const notes = getUnlockedNotes();
  const notesHtml =
    notes.length === 0
      ? `<article class="note-card"><h3>No notes unlocked yet</h3><p>Inspect the first crop to begin filling the journal.</p></article>`
      : notes
          .map(
            (note) => `
              <article class="note-card">
                <h3>${escapeHtml(note.title)}</h3>
                <p>${escapeHtml(note.text)}</p>
              </article>
            `,
          )
          .join("");

  const guideHtml = crops
    .map(
      (crop) => `
        <article class="crop-guide-card">
          <h3>${escapeHtml(crop.name)}</h3>
          <p>${escapeHtml(crop.profile)}</p>
          <div class="guide-meta">
            <span>${escapeHtml(crop.type)}</span>
            <span>${escapeHtml(crop.difficulty)}</span>
            <span>${crop.plan.length} steps</span>
          </div>
        </article>
      `,
    )
    .join("");

  dom.journalContent.innerHTML = `
    <aside class="journal-card">
      <h3>${escapeHtml(state.playerName || getPlayerName())}'s Cycle</h3>
      <p>${state.cycleMode === "random" ? "Randomized crop cycle" : "Planned crop routine"}</p>
      <ul class="cycle-list">${scheduleHtml}</ul>
    </aside>
    <section class="journal-main">
      <section>
        <h3>Unlocked Notes</h3>
        <div class="note-grid">${notesHtml}</div>
      </section>
      <section>
        <h3>Crop Guide</h3>
        <div class="crop-guide-grid">${guideHtml}</div>
      </section>
    </section>
  `;
}

function getUnlockedNotes() {
  return Array.from(state.journal)
    .map((noteId) => {
      const [cropId, tool] = noteId.split(":");
      const crop = cropById[cropId];
      const copy = careCopy[tool];
      if (!crop || !copy) return null;
      return {
        title: `${crop.name}: ${copy.noteTitle}`,
        text: copy.noteText(crop),
      };
    })
    .filter(Boolean);
}

function setThought(text) {
  dom.thoughtText.textContent = text;
}

function setDistanceHint() {
  if (!dom.distanceHint) return;
  const crop = currentCrop();
  const nearTomato = isNear("tomato");
  const nearBarrel = isNear("barrel");
  const selected = TOOL_LABELS[state.selectedTool];

  if (state.selectedTool === "water" && nearBarrel) {
    dom.distanceHint.textContent = "Use Water here to refill the can.";
    return;
  }

  if (nearTomato) {
    dom.distanceHint.textContent = `Use ${selected} on the ${crop.name.toLowerCase()}.`;
    return;
  }

  dom.distanceHint.textContent = "Stand near the crop bed or water barrel.";
}

function isNear(zone) {
  const center = zoneCenters[zone];
  const dx = state.player.x - center.x;
  const dy = state.player.y - center.y;
  return Math.hypot(dx, dy) < 18;
}

function moveToZone(zone) {
  const center = zoneCenters[zone];
  state.player.x = center.x;
  state.player.y = center.y + 4;
  updatePlayerPosition();
  setDistanceHint();
}

function updatePlayerPosition() {
  dom.player.style.setProperty("--x", `${state.player.x}%`);
  dom.player.style.setProperty("--y", `${state.player.y}%`);
}

function useSelectedTool() {
  if (state.waiting || dom.gameScreen.classList.contains("hidden")) return;
  ensureAudio();

  if (state.selectedTool === "water" && isNear("barrel")) {
    fillWateringCan();
    return;
  }

  if (isNear("tomato")) {
    useOnCrop();
    return;
  }

  if (isNear("shelf")) {
    setThought("The tool shelf is tidy. Work near the crop bed.");
    playTone(390, 0.05, "triangle", 0.04);
    return;
  }

  setThought("Move closer before using that tool.");
}

function fillWateringCan() {
  if (state.canFull) {
    setThought("The watering can already has enough water.");
    return;
  }

  animateUse();
  state.canFull = true;
  setThought("The watering can is full.");
  playTone(540, 0.13, "sine", 0.07);
  render();
}

function useOnCrop() {
  const crop = currentCrop();
  const phase = currentPhase();
  const tool = state.selectedTool;

  if (tool === "inspect") {
    inspectCrop();
    return;
  }

  if (state.wilted && !state.inspected) {
    setThought(`Inspect the wilted ${crop.name.toLowerCase()} before trying to recover it.`);
    playTone(260, 0.08, "triangle", 0.04);
    return;
  }

  if (!state.inspected && phase.tool !== "inspect") {
    setThought(`Inspect the ${crop.name.toLowerCase()} first so the next step is clear.`);
    playTone(300, 0.08, "triangle", 0.04);
    return;
  }

  if (tool !== phase.tool) {
    wrongCare(wrongToolMessage(tool, phase, crop));
    return;
  }

  if (tool === "water") {
    if (!state.canFull) {
      setThought("The watering can is empty. Refill it at the water barrel.");
      playTone(260, 0.08, "triangle", 0.04);
      return;
    }
    state.canFull = false;
  }

  correctCare(phase.correct, tool === "harvest" ? completeCrop : advancePhase);
}

function inspectCrop() {
  const crop = currentCrop();
  const phase = currentPhase();
  state.inspected = true;
  unlockNote(phase.noteId);
  animateUse();

  if (state.wilted) {
    setThought(`The ${crop.name.toLowerCase()} can recover if the next care step is ${TOOL_LABELS[phase.tool]}.`);
    playTone(420, 0.08, "sine", 0.05);
    render();
    return;
  }

  if (phase.tool === "inspect") {
    correctCare(phase.correct, advancePhase);
    return;
  }

  setThought(phase.inspect);
  playTone(460, 0.08, "sine", 0.05);
  render();
}

function correctCare(message, afterWait = advancePhase) {
  const crop = currentCrop();
  const phase = currentPhase();
  animateUse(phase.tool === "harvest" ? "happy" : "use");
  sparkle();
  unlockNote(phase.noteId);
  state.completedPhaseTool = phase.tool;

  if (state.wilted) {
    state.wilted = false;
    state.wiltedErrors = 0;
    state.stress = Math.max(0, crop.tolerance - 2);
    setThought(`${crop.name} recovers. ${message}`);
  } else {
    state.stress = Math.max(0, state.stress - 1);
    setThought(message);
  }

  playTone(660, 0.12, "sine", 0.08);
  waitThen(afterWait);
  render();
}

function wrongCare(message) {
  const crop = currentCrop();
  animateUse("worried");
  state.hadStress = true;
  state.cropMistakes += 1;

  if (state.wilted) {
    state.wiltedErrors += 1;
    if (state.wiltedErrors >= 2) {
      resetCurrentPhase();
      return;
    }
    setThought(`That was not gentle enough. Inspect again and use ${TOOL_LABELS[currentPhase().tool]}.`);
    playTone(210, 0.12, "triangle", 0.06);
    render();
    return;
  }

  state.stress += 1;
  if (state.stress >= crop.tolerance) {
    state.wilted = true;
    state.cropWilted = true;
    state.didWilt = true;
    state.inspected = false;
    setThought(`${crop.name} has wilted. Inspect it carefully to recover.`);
    playTone(180, 0.18, "sine", 0.05);
  } else {
    setThought(message);
    playTone(240, 0.1, "triangle", 0.05);
  }
  render();
}

function wrongToolMessage(tool, phase, crop) {
  if (phase.tool === "water" && tool !== "water") {
    return `${crop.name} needs water right now, not ${TOOL_LABELS[tool]}.`;
  }
  if (phase.tool === "sun") {
    return `${crop.name} is asking for better light before anything else.`;
  }
  if (phase.tool === "fertilizer") {
    return `${crop.name} needs a measured feeding before the next growth push.`;
  }
  if (phase.tool === "bugs") {
    return `The bugs are still here. Use the bug net gently.`;
  }
  if (phase.tool === "rodents") {
    return `The tracks are still close. Set a rodent guard.`;
  }
  if (phase.tool === "harvest") {
    return `${crop.name} is ready for the basket.`;
  }
  return `That does not match what the ${crop.name.toLowerCase()} needs right now.`;
}

function resetCurrentPhase() {
  state.wilted = false;
  state.wiltedErrors = 0;
  state.stress = 1;
  state.inspected = false;
  state.canFull = false;
  state.completedPhaseTool = null;
  setThought(`${currentCrop().name} needs this care step again from a calmer start.`);
  playTone(230, 0.14, "sine", 0.05);
  render();
}

function advancePhase() {
  const phases = cropPhases();
  if (state.phaseIndex >= phases.length - 1) {
    completeCrop();
    return;
  }

  state.phaseIndex += 1;
  state.inspected = false;
  state.canFull = false;
  state.completedPhaseTool = null;
  dom.bugLayer.classList.remove("fly-away");
  dom.rodentLayer.classList.remove("scurry-away");
  setThought(currentPhase().thought);
  playTone(720, 0.11, "sine", 0.07);
  render();
  dom.plant.classList.add("grow-pulse");
  window.setTimeout(() => dom.plant.classList.remove("grow-pulse"), 920);
}

function waitThen(callback) {
  state.waiting = true;
  dom.progressBubble.classList.remove("hidden");
  render();
  window.setTimeout(() => {
    state.waiting = false;
    dom.progressBubble.classList.add("hidden");
    callback();
  }, 1500);
}

function completeCrop() {
  const crop = currentCrop();
  const day = state.dayIndex;
  const label = getCropResultLabel();
  state.waiting = false;
  dom.progressBubble.classList.add("hidden");
  unlockNote(`${crop.id}:harvest`);
  state.completed.push({
    day,
    cropId: crop.id,
    mistakes: state.cropMistakes,
    wilted: state.cropWilted,
    label,
  });

  const final = state.dayIndex >= state.schedule.length - 1;
  if (final) {
    showFinalResult();
  } else {
    showDayResult(label);
  }
  renderJournal();
  showDialog(dom.resultDialog);
}

function getCropResultLabel() {
  if (state.cropWilted) return "Recovered harvest";
  if (state.cropMistakes > 0) return "Careful harvest";
  return "Clean harvest";
}

function showDayResult(label) {
  const crop = currentCrop();
  const nextCrop = cropById[state.schedule[state.dayIndex + 1]];
  dom.resultTitle.textContent = `${crop.name} harvest complete`;
  dom.resultCondition.textContent = `${crop.name} result: ${label}.`;
  dom.resultLearned.textContent = crop.tip;
  dom.resultLabel.textContent = `${state.playerName}: Day ${state.dayIndex + 1} cleared`;
  dom.nextGardenText.textContent = `Next crop: ${nextCrop.name}.`;
  dom.nextCropButton.classList.remove("hidden");
  dom.nextCropButton.textContent = `Continue to Day ${state.dayIndex + 2}`;
}

function showFinalResult() {
  const clean = state.completed.filter((result) => result.mistakes === 0).length;
  const recovered = state.completed.filter((result) => result.wilted).length;
  const label = recovered
    ? "Resilient Gardener"
    : clean === state.completed.length
      ? "Clean Cycle Gardener"
      : "Adaptive Gardener";
  const harvests = state.completed
    .map((result) => cropById[result.cropId]?.name || "Crop")
    .join(", ");

  dom.resultTitle.textContent = `${state.playerName}'s garden cycle is complete`;
  dom.resultCondition.textContent = `${state.completed.length} harvests finished: ${harvests}.`;
  dom.resultLearned.textContent =
    "You practiced crop diversity, different care needs, and timing across a full routine.";
  dom.resultLabel.textContent = `Cycle result: ${label}`;
  dom.nextGardenText.textContent = "The enlarged journal now keeps your notes and crop guide.";
  dom.nextCropButton.classList.add("hidden");
}

function continueToNextCrop() {
  if (state.dayIndex >= state.schedule.length - 1) return;
  closeDialog(dom.resultDialog);
  state.dayIndex += 1;
  state.phaseIndex = 0;
  resetCropState();
  setThought(currentPhase().thought);
  render();
  dom.garden.focus();
}

function unlockNote(noteId) {
  if (!noteId || state.journal.has(noteId)) return;
  state.journal.add(noteId);
  sparkle();
  renderJournal();
}

function showMoreInfo() {
  const crop = currentCrop();
  const phase = currentPhase();
  setThought(`${crop.tip} Current clue: ${phase.inspect}`);
  unlockNote(phase.noteId);
  playTone(520, 0.08, "sine", 0.05);
  render();
}

function animateUse(extraClass = "use") {
  dom.player.classList.remove("use", "happy", "worried");
  window.requestAnimationFrame(() => {
    dom.player.classList.add(extraClass);
    if (extraClass !== "use") dom.player.classList.add("use");
    window.setTimeout(() => {
      dom.player.classList.remove("use", "happy", "worried");
    }, 680);
  });
}

function sparkle() {
  dom.sparkles.classList.remove("show");
  window.requestAnimationFrame(() => {
    dom.sparkles.classList.add("show");
    window.setTimeout(() => dom.sparkles.classList.remove("show"), 900);
  });
}

function ensureAudio() {
  if (state.audioContext) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  state.audioContext = new AudioContext();
}

function playTone(frequency, seconds, type = "sine", volume = 0.06) {
  if (!state.audioContext) return;
  const now = state.audioContext.currentTime;
  const oscillator = state.audioContext.createOscillator();
  const gain = state.audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  oscillator.connect(gain);
  gain.connect(state.audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + seconds + 0.03);
}

function showDialog(dialog) {
  if (dialog.open) return;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeDialog(dialog) {
  if (dialog.open && typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function updateMovement() {
  if (!dom.gameScreen.classList.contains("hidden") && !state.waiting) {
    let dx = 0;
    let dy = 0;
    if (state.keys.has("ArrowLeft") || state.keys.has("a")) dx -= 1;
    if (state.keys.has("ArrowRight") || state.keys.has("d")) dx += 1;
    if (state.keys.has("ArrowUp") || state.keys.has("w")) dy -= 1;
    if (state.keys.has("ArrowDown") || state.keys.has("s")) dy += 1;

    if (dx || dy) {
      const length = Math.hypot(dx, dy);
      const speed = 0.46;
      state.player.x = clamp(state.player.x + (dx / length) * speed, 7, 93);
      state.player.y = clamp(state.player.y + (dy / length) * speed, 56, 88);
      state.lastMoveAt = performance.now();
      dom.player.classList.add("walk");
      updatePlayerPosition();
      setDistanceHint();
    } else if (performance.now() - state.lastMoveAt > 90) {
      dom.player.classList.remove("walk");
    }
  }
  window.requestAnimationFrame(updateMovement);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isTypingTarget(target) {
  return ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
}

document.querySelectorAll(".tool-button").forEach((button) => {
  button.addEventListener("click", () => selectTool(button.dataset.tool));
});

dom.characterButtons.forEach((button) => {
  button.addEventListener("click", () => setCharacter(button.dataset.character));
});

dom.cycleModeButtons.forEach((button) => {
  button.addEventListener("click", () => setCycleMode(button.dataset.mode));
});

dom.scheduleSelects.forEach((select) => {
  select.addEventListener("change", saveProfile);
});

dom.playerName.addEventListener("input", () => {
  state.playerName = getPlayerName();
  saveProfile();
  renderJournal();
});

dom.randomizeCycleButton.addEventListener("click", randomizeCycle);
dom.startButton.addEventListener("click", startGame);
dom.howToButton.addEventListener("click", () => showDialog(dom.howToDialog));
dom.journalButton.addEventListener("click", () => {
  renderJournal();
  showDialog(dom.journalDialog);
});
dom.moreInfoButton.addEventListener("click", showMoreInfo);
dom.useButton.addEventListener("click", useSelectedTool);
dom.nextCropButton.addEventListener("click", continueToNextCrop);
dom.replayButton.addEventListener("click", () => {
  closeDialog(dom.resultDialog);
  resetGardenRun();
  render();
  dom.garden.focus();
});
dom.titleButton.addEventListener("click", () => {
  closeDialog(dom.resultDialog);
  dom.gameScreen.classList.add("hidden");
  dom.titleScreen.classList.remove("hidden");
});

dom.tomatoZone.addEventListener("click", () => {
  moveToZone("tomato");
  window.setTimeout(useSelectedTool, 160);
});

dom.barrelZone.addEventListener("click", () => {
  moveToZone("barrel");
  window.setTimeout(useSelectedTool, 160);
});

dom.garden.addEventListener("click", (event) => {
  if (event.target.closest(".zone")) return;
  const rect = dom.garden.getBoundingClientRect();
  state.player.x = clamp(((event.clientX - rect.left) / rect.width) * 100, 7, 93);
  state.player.y = clamp(((event.clientY - rect.top) / rect.height) * 100, 56, 88);
  updatePlayerPosition();
  setDistanceHint();
});

window.addEventListener("keydown", (event) => {
  if (isTypingTarget(event.target)) return;
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(event.key)) {
    event.preventDefault();
  }
  if (["1", "2", "3", "4", "5", "6", "7"].includes(key)) {
    selectTool(["inspect", "water", "sun", "fertilizer", "bugs", "rodents", "harvest"][Number(key) - 1]);
    return;
  }
  if (key === " " || key === "e") {
    useSelectedTool();
    return;
  }
  state.keys.add(key);
});

window.addEventListener("keyup", (event) => {
  if (isTypingTarget(event.target)) return;
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  state.keys.delete(key);
});

populateScheduleOptions();
loadProfile();
state.playerName = getPlayerName();
selectTool("inspect");
setThought(currentPhase().thought);
render();
updateMovement();
