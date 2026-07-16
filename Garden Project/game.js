const stages = [
  {
    id: "seed",
    dayClass: "day-morning",
    label: { ja: "朝 - 種の段階", en: "Morning - Seed Stage" },
    objective: { ja: "トマトを観察する。", en: "Inspect the tomato." },
    thought: {
      ja: "はじめてのトマト... まずよく見てみよう。",
      en: "My first tomato... I should look closely before I do anything.",
    },
    inspect: {
      ja: "よく見てみよう。土、葉、色を見ると、植物に必要なことがわかります。",
      en: "Look closely. Soil, leaves, and color can show what a plant needs.",
    },
    reminder: {
      ja: "種床は落ち着いています。まず観察するのは良い習慣です。",
      en: "The seed bed looks steady. Observing first is a good habit.",
    },
    correct: {
      ja: "よし。このトマトの畑に必要なことがわかりました。",
      en: "Good. I understand what this tomato bed needs.",
    },
    info: {
      ja: "植物は問題が大きくなる前に、小さなサインを見せることがあります。",
      en: "Plants often show needs before they become problems. Start with a close look.",
    },
    condition: { ja: "観察できます。", en: "Ready to observe." },
    noteId: "observe",
  },
  {
    id: "sprout",
    dayClass: "day-noon",
    label: { ja: "昼 - 芽の段階", en: "Noon - Sprout Stage" },
    objective: { ja: "じょうろに水を入れる。", en: "Refill the watering can." },
    thought: {
      ja: "土の色が薄いみたい。水をあげる前に確認しよう。",
      en: "The soil looks pale. I should check it before watering.",
    },
    inspect: {
      ja: "土が乾いています。トマトには安定した水やりが必要です。",
      en: "The soil is dry. Tomatoes need steady water.",
    },
    reminder: {
      ja: "土はまだ乾いています。水の入ったじょうろが役に立ちます。",
      en: "The soil is still dry. A filled watering can will help.",
    },
    correct: {
      ja: "土がちょうどよく湿りました。",
      en: "The soil is nicely moist now.",
    },
    info: {
      ja: "トマトの根には空気も必要です。土はびしょびしょではなく、しっとりが理想です。",
      en: "Tomato roots need oxygen too, so soil should be moist, not soaked.",
    },
    condition: { ja: "土が乾いています。", en: "Soil is dry." },
    noteId: "water",
  },
  {
    id: "green",
    dayClass: "day-afternoon",
    label: { ja: "午後 - 青いトマトの段階", en: "Afternoon - Green Tomato Stage" },
    objective: { ja: "虫を観察する。", en: "Inspect the bugs." },
    thought: {
      ja: "葉の近くで何か動いている。まず観察しよう。",
      en: "Something is moving near the leaves. I should inspect first.",
    },
    inspect: {
      ja: "小さな虫が葉にいます。虫の除去を使いましょう。",
      en: "Small bugs are on the leaves. Use Bug Removal.",
    },
    reminder: {
      ja: "虫はまだいます。やさしく払いましょう。",
      en: "The bugs are still here. Brush them away gently.",
    },
    correct: {
      ja: "トマトは少し安心できる状態になりました。",
      en: "The tomato looks safer now.",
    },
    info: {
      ja: "早く見つけてやさしく取り除けば、若い葉は元気を取り戻せます。",
      en: "Young leaves can recover when pests are found early and removed gently.",
    },
    condition: { ja: "虫が現れました。", en: "Bugs appeared." },
    noteId: "bugs",
  },
  {
    id: "red",
    dayClass: "day-evening",
    label: { ja: "夕方 - 赤いトマトの段階", en: "Evening - Red Tomato Stage" },
    objective: { ja: "赤いトマトを収穫する。", en: "Harvest the red tomato." },
    thought: {
      ja: "赤くなった。収穫するちょうど良いタイミングみたい。",
      en: "It turned red. This looks like the right time to harvest.",
    },
    inspect: {
      ja: "トマトは赤くふっくらしています。かごに入れる準備ができています。",
      en: "The tomato is red and full. It is ready for the basket.",
    },
    reminder: {
      ja: "赤いトマトは収穫できます。収穫かごを使いましょう。",
      en: "The red tomato is ready. Use the harvest basket.",
    },
    correct: {
      ja: "やったね。少しずつ世話をしたから、トマトが育ちました。",
      en: "We did it. The tomato grew because we cared for it step by step.",
    },
    info: {
      ja: "赤いトマトは収穫できます。青いトマトにはもう少し時間が必要です。",
      en: "A red tomato is ready to harvest. Green tomatoes need more time.",
    },
    condition: { ja: "収穫できます。", en: "Ready to harvest." },
    noteId: "harvest",
  },
];

const journalNotes = [
  {
    id: "observe",
    title: { ja: "まず観察", en: "Observe First" },
    text: {
      ja: "行動する前に、土、葉、色、虫を見てみましょう。",
      en: "Look at soil, leaves, color, and pests before acting.",
    },
  },
  {
    id: "water",
    title: { ja: "水はていねいに", en: "Water Carefully" },
    text: {
      ja: "乾いた土には水が必要ですが、水のやりすぎは根にストレスをかけます。",
      en: "Dry soil needs water, but soaked soil can stress tomato roots.",
    },
  },
  {
    id: "bugs",
    title: { ja: "虫から守る", en: "Protect From Bugs" },
    text: {
      ja: "葉を観察してから、小さな虫をやさしく払いましょう。",
      en: "Inspect leaves, then brush small bugs away gently.",
    },
  },
  {
    id: "harvest",
    title: { ja: "赤くなったら収穫", en: "Harvest When Red" },
    text: {
      ja: "青いトマトには時間が必要です。赤いトマトは収穫できます。",
      en: "Green tomatoes need more time. Red tomatoes are ready.",
    },
  },
  {
    id: "roots",
    title: { ja: "根にも空気が必要", en: "Roots Need Air" },
    text: {
      ja: "しっとりした土は助けになります。水たまりはよくありません。",
      en: "Moist soil is helpful. Standing water is not.",
    },
  },
  {
    id: "recovery",
    title: { ja: "回復できます", en: "Recovery Is Possible" },
    text: {
      ja: "しおれたトマトも、観察と正しい世話で回復できます。",
      en: "A wilted tomato can recover with inspection and correct care.",
    },
  },
];

const ui = {
  ja: {
    lang: "ja",
    languageAria: "言語",
    languageLabel: "言語",
    titleEyebrow: "静かなトマトのレッスン",
    titleDescription:
      "観察して、道具を選び、少しずつ世話をしながらトマトを育てます。",
    start: "はじめる",
    howTo: "遊び方",
    lobby: "Gamer's Grindへ戻る",
    topHint: "移動: WASD または 矢印 | 使う: Space または E",
    gameAria: "庭",
    gardenAria: "裏庭のプレイエリア",
    barrelAria: "水樽",
    tomatoAria: "トマトの畑",
    stressAria: "トマトのストレス",
    gardenSign: "トマト",
    barrelLabel: "水樽",
    shelfLabel: "道具棚",
    seedMarker: "トマト",
    progress: "ゆっくり成長中...",
    journalButton: "庭ノート",
    moreInfoButton: "もっと知る",
    objectivePrefix: "目標",
    toolsAria: "道具",
    toolNames: {
      inspect: "観察",
      water: "じょうろ",
      bugs: "虫の除去",
      harvest: "収穫かご",
    },
    useTool: "道具を使う",
    distances: {
      refillHere: "ここでじょうろに水を入れます。",
      nearTomato: (tool) => `トマトに${tool}を使えます。`,
      standNear: "トマトか水樽の近くに立ちましょう。",
    },
    howToTitle: "遊び方",
    howToGoal: "目標: 元気なトマトを1つ育てて収穫しましょう。",
    howToControls:
      "操作: 庭を移動し、道具を選び、トマトや水樽の近くで使います。",
    howToLoop:
      "世話の流れ: 観察し、合った道具を選び、世話をして、少し待ち、成長を見守ります。",
    close: "閉じる",
    journalTitle: "庭ノート",
    journal: {
      unlocked: "見つけたメモ",
      locked: "まだ見つけていないメモ",
      noNotesTitle: "まだメモはありません",
      noNotesText: "トマトを観察して始めましょう。",
      lockedTitle: "???",
      lockedText: "世話を続けると開きます。",
      allFoundTitle: "すべてのメモを見つけました",
      allFoundText: "トマトのレッスンは完了です。",
    },
    stress: {
      low: {
        label: "低い",
        face: "おだやか",
        text: "トマトは落ち着いています。",
      },
      medium: {
        label: "中くらい",
        face: "注意",
        text: "次はやさしい手順を選ぶと助けになります。",
      },
      high: {
        label: "高い",
        face: "心配",
        text: "トマトは少しストレスを感じています。",
      },
      wilted: {
        label: "しおれ",
        face: "しおれ",
        text: "よく観察して、回復を手伝いましょう。",
      },
    },
    objective: {
      waiting: "トマトの成長を見守る。",
      inspectWilted: "しおれたトマトを観察する。",
      helpRecover: "トマトの回復を手伝う。",
      refill: "じょうろに水を入れる。",
      water: "乾いた土に水をあげる。",
      inspectBugs: "虫を観察する。",
      removeBugs: "虫を取り除く。",
    },
    condition: {
      wilted: "トマトがしおれています。",
      moist: "土がちょうどよく湿りました。",
      fullCan: "じょうろに水が入っています。",
      bugsNeedRemoving: "虫を取り除く必要があります。",
    },
    messages: {
      shelf: "棚はきれいです。トマトの近くで作業しよう。",
      closer: "使う前にもう少し近づこう。",
      canAlreadyFull: "じょうろにはもう十分な水が入っています。",
      canFull: "じょうろに水が入りました。乾いた土に水をあげられます。",
      emptyCan: "じょうろは空です。水樽で水を入れましょう。",
      overwater: "土はもう大丈夫です。水のやりすぎはトマトのストレスになります。",
      noBugs: "今は取り除く虫がいません。",
      inspectBeforeBugs: "葉を払う前に、まず観察したほうがよさそうです。",
      tooEarlyHarvest: "トマトはまだ熟していません。赤くなるまで待ちましょう。",
      wiltedInspect:
        "トマトはしおれています。正しい世話をすればまだ回復できます。",
      recovered: "トマトは少し元気になりました。",
      wiltedTryGentle:
        "トマトはまだしおれています。観察して、やさしい手順を試しましょう。",
      becameWilted:
        "トマトがしおれています。よく観察して、回復を手伝いましょう。",
      retryStage:
        "トマトはこの段階で回復できませんでした。この手順をもう一度やってみましょう。",
    },
    result: {
      title: "はじめてのトマトを収穫しました！",
      conditionHealthy: "トマトの状態: 元気",
      conditionRecovered: "トマトの状態: 回復しました",
      conditionHealthyAfter: "トマトの状態: やさしい世話で元気になりました",
      learned:
        "学んだこと: まず観察、水はていねいに、虫から守る、赤くなったら収穫。",
      prefix: "結果",
      labels: {
        gentle: "やさしい世話",
        careful: "慎重なガーデナー",
        learning: "学び中のガーデナー",
      },
      next: "次の庭、準備中: いちご",
      replay: "もう一度",
      titleButton: "タイトル",
    },
  },
  en: {
    lang: "en",
    languageAria: "Language",
    languageLabel: "Language",
    titleEyebrow: "A quiet tomato lesson",
    titleDescription:
      "Grow one tomato by observing, choosing a tool, and caring step by step.",
    start: "Start",
    howTo: "How to Play",
    lobby: "Back to Gamer's Grind",
    topHint: "Move: WASD or arrows | Use: Space or E",
    gameAria: "Garden",
    gardenAria: "Backyard garden play area",
    barrelAria: "Water barrel",
    tomatoAria: "Tomato bed",
    stressAria: "Tomato stress",
    gardenSign: "Tomato",
    barrelLabel: "Water Barrel",
    shelfLabel: "Tool Shelf",
    seedMarker: "Tomato",
    progress: "Growing gently...",
    journalButton: "Garden Journal",
    moreInfoButton: "More Info",
    objectivePrefix: "Objective",
    toolsAria: "Tools",
    toolNames: {
      inspect: "Inspect",
      water: "Watering Can",
      bugs: "Bug Removal",
      harvest: "Harvest Basket",
    },
    useTool: "Use Tool",
    distances: {
      refillHere: "Use the watering can here to refill it.",
      nearTomato: (tool) => `Use ${tool} on the tomato.`,
      standNear: "Stand near the tomato or water barrel.",
    },
    howToTitle: "How to Play",
    howToGoal: "Goal: Grow and harvest one healthy tomato.",
    howToControls:
      "Controls: Move around the garden, select a tool, and use it near the tomato or water barrel.",
    howToLoop:
      "Care Loop: Inspect, choose the right tool, care, wait, and watch the tomato grow.",
    close: "Close",
    journalTitle: "Garden Journal",
    journal: {
      unlocked: "Unlocked",
      locked: "Locked",
      noNotesTitle: "No notes yet",
      noNotesText: "Inspect the tomato to begin.",
      lockedTitle: "???",
      lockedText: "Keep caring to unlock.",
      allFoundTitle: "All notes found",
      allFoundText: "Your tomato lesson is complete.",
    },
    stress: {
      low: {
        label: "Low",
        face: "Calm",
        text: "The tomato is steady.",
      },
      medium: {
        label: "Medium",
        face: "Alert",
        text: "A gentler next step will help.",
      },
      high: {
        label: "High",
        face: "Worried",
        text: "The tomato looks a little stressed.",
      },
      wilted: {
        label: "Wilted",
        face: "Wilted",
        text: "Inspect it carefully and help it recover.",
      },
    },
    objective: {
      waiting: "Wait and watch the tomato grow.",
      inspectWilted: "Inspect the wilted tomato.",
      helpRecover: "Help the tomato recover.",
      refill: "Refill the watering can.",
      water: "Water the dry soil.",
      inspectBugs: "Inspect the bugs.",
      removeBugs: "Remove the bugs.",
    },
    condition: {
      wilted: "The tomato is wilted.",
      moist: "The soil is nicely moist now.",
      fullCan: "Water can is full.",
      bugsNeedRemoving: "Bugs need removing.",
    },
    messages: {
      shelf: "The shelf is tidy. I should work near the tomato.",
      closer: "I need to stand closer before using that.",
      canAlreadyFull: "The watering can already has enough water.",
      canFull: "The watering can is full. Now I can water the dry soil.",
      emptyCan: "The watering can is empty. Refill it at the water barrel.",
      overwater: "The soil is already okay. Too much water can stress tomatoes.",
      noBugs: "There are no bugs to remove right now.",
      inspectBeforeBugs: "I should inspect the leaves before brushing anything away.",
      tooEarlyHarvest: "The tomato is not ripe yet. Wait until it turns red.",
      wiltedInspect:
        "The tomato is wilted. It can still recover with the right care.",
      recovered: "The tomato looks better now.",
      wiltedTryGentle:
        "The tomato is still wilted. Inspect it and try the gentler step.",
      becameWilted:
        "The tomato is wilted. Inspect it carefully and help it recover.",
      retryStage:
        "The tomato could not recover this stage. Let's try this step again.",
    },
    result: {
      title: "You harvested your first tomato!",
      conditionHealthy: "Tomato Condition: Healthy",
      conditionRecovered: "Tomato Condition: Recovered",
      conditionHealthyAfter: "Tomato Condition: Healthy after gentle care",
      learned:
        "You learned: observe first, water carefully, protect from bugs, and harvest when red.",
      prefix: "Result",
      labels: {
        gentle: "Gentle Care",
        careful: "Careful Gardener",
        learning: "Learning Gardener",
      },
      next: "Next Garden Coming Soon: Strawberry",
      replay: "Replay",
      titleButton: "Title",
    },
  },
};

const dom = {
  titleScreen: document.querySelector("#titleScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  titleEyebrow: document.querySelector("#titleEyebrow"),
  titleDescription: document.querySelector("#titleDescription"),
  languageSwitch: document.querySelector("#languageSwitch"),
  languageLabel: document.querySelector("#languageLabel"),
  languageButtons: document.querySelectorAll(".language-button"),
  startButton: document.querySelector("#startButton"),
  howToButton: document.querySelector("#howToButton"),
  lobbyLink: document.querySelector("#lobbyLink"),
  howToDialog: document.querySelector("#howToDialog"),
  howToTitle: document.querySelector("#howToTitle"),
  howToGoal: document.querySelector("#howToGoal"),
  howToControls: document.querySelector("#howToControls"),
  howToLoop: document.querySelector("#howToLoop"),
  howToCloseButton: document.querySelector("#howToCloseButton"),
  journalDialog: document.querySelector("#journalDialog"),
  journalTitle: document.querySelector("#journalTitle"),
  journalCloseButton: document.querySelector("#journalCloseButton"),
  resultDialog: document.querySelector("#resultDialog"),
  resultTitle: document.querySelector("#resultTitle"),
  replayButton: document.querySelector("#replayButton"),
  titleButton: document.querySelector("#titleButton"),
  topHint: document.querySelector("#topHint"),
  garden: document.querySelector("#garden"),
  gardenSign: document.querySelector("#gardenSign"),
  barrelLabel: document.querySelector("#barrelLabel"),
  seedMarker: document.querySelector("#seedMarker"),
  shelfLabel: document.querySelector("#shelfLabel"),
  stageLabel: document.querySelector("#stageLabel"),
  objectiveText: document.querySelector("#objectiveText"),
  thoughtText: document.querySelector("#thoughtText"),
  plant: document.querySelector("#plant"),
  soil: document.querySelector("#soil"),
  conditionChip: document.querySelector("#conditionChip"),
  bugLayer: document.querySelector("#bugLayer"),
  player: document.querySelector("#player"),
  heldTool: document.querySelector("#heldTool"),
  sparkles: document.querySelector("#sparkles"),
  progressBubble: document.querySelector("#progressBubble"),
  stressFace: document.querySelector("#stressFace"),
  stressLabel: document.querySelector("#stressLabel"),
  stressFill: document.querySelector("#stressFill"),
  stressText: document.querySelector("#stressText"),
  journalButton: document.querySelector("#journalButton"),
  moreInfoButton: document.querySelector("#moreInfoButton"),
  journalContent: document.querySelector("#journalContent"),
  useButton: document.querySelector("#useButton"),
  distanceHint: document.querySelector("#distanceHint"),
  waterBadge: document.querySelector("#waterBadge"),
  resultCondition: document.querySelector("#resultCondition"),
  resultLearned: document.querySelector("#resultLearned"),
  resultLabel: document.querySelector("#resultLabel"),
  nextGardenText: document.querySelector("#nextGardenText"),
  tomatoZone: document.querySelector("#tomatoZone"),
  barrelZone: document.querySelector("#barrelZone"),
  tools: document.querySelector(".tools"),
  stressPanel: document.querySelector("#stressPanel"),
};

const state = {
  language: "ja",
  stageIndex: 0,
  selectedTool: "inspect",
  canFull: false,
  moistSoil: false,
  inspected: false,
  waiting: false,
  stress: 0,
  wilted: false,
  wiltedErrors: 0,
  hadStress: false,
  didWilt: false,
  player: { x: 43, y: 70 },
  keys: new Set(),
  journal: new Set(),
  audioContext: null,
  lastMoveAt: 0,
};

const zoneCenters = {
  tomato: { x: 50, y: 72 },
  barrel: { x: 17, y: 72 },
  shelf: { x: 84, y: 72 },
};

function currentStage() {
  return stages[state.stageIndex];
}

function languageText() {
  return ui[state.language];
}

function localized(value) {
  if (typeof value === "string") return value;
  return value?.[state.language] ?? value?.en ?? "";
}

function setLanguage(language) {
  state.language = language;
  applyLanguage();
  render();
}

function applyLanguage() {
  const text = languageText();
  document.documentElement.lang = text.lang;
  document.documentElement.dataset.lang = text.lang;
  dom.titleEyebrow.textContent = text.titleEyebrow;
  dom.titleDescription.textContent = text.titleDescription;
  dom.languageSwitch.setAttribute("aria-label", text.languageAria);
  dom.languageLabel.textContent = text.languageLabel;
  dom.languageButtons.forEach((button) => {
    const selected = button.dataset.lang === state.language;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  dom.startButton.textContent = text.start;
  dom.howToButton.textContent = text.howTo;
  dom.lobbyLink.textContent = text.lobby;
  dom.lobbyLink.setAttribute("aria-label", text.lobby);
  dom.gameScreen.setAttribute("aria-label", text.gameAria);
  dom.topHint.textContent = text.topHint;
  dom.garden.setAttribute("aria-label", text.gardenAria);
  dom.barrelZone.setAttribute("aria-label", text.barrelAria);
  dom.tomatoZone.setAttribute("aria-label", text.tomatoAria);
  dom.stressPanel.setAttribute("aria-label", text.stressAria);
  dom.tools.setAttribute("aria-label", text.toolsAria);
  dom.gardenSign.textContent = text.gardenSign;
  dom.barrelLabel.textContent = text.barrelLabel;
  dom.seedMarker.textContent = text.seedMarker;
  dom.shelfLabel.textContent = text.shelfLabel;
  dom.progressBubble.textContent = text.progress;
  dom.journalButton.textContent = text.journalButton;
  dom.moreInfoButton.textContent = text.moreInfoButton;
  dom.useButton.textContent = text.useTool;
  dom.howToTitle.textContent = text.howToTitle;
  dom.howToGoal.textContent = text.howToGoal;
  dom.howToControls.textContent = text.howToControls;
  dom.howToLoop.textContent = text.howToLoop;
  dom.howToCloseButton.textContent = text.close;
  dom.journalTitle.textContent = text.journalTitle;
  dom.journalCloseButton.textContent = text.close;
  dom.resultTitle.textContent = text.result.title;
  dom.nextGardenText.textContent = text.result.next;
  dom.replayButton.textContent = text.result.replay;
  dom.titleButton.textContent = text.result.titleButton;
  document.querySelectorAll(".tool-button").forEach((button) => {
    button.querySelector(".tool-label").textContent =
      text.toolNames[button.dataset.tool];
  });
}

function startGame() {
  resetGame();
  dom.titleScreen.classList.add("hidden");
  dom.gameScreen.classList.remove("hidden");
  dom.garden.focus();
  render();
}

function resetGame() {
  state.stageIndex = 0;
  state.selectedTool = "inspect";
  state.canFull = false;
  state.moistSoil = false;
  state.inspected = false;
  state.waiting = false;
  state.stress = 0;
  state.wilted = false;
  state.wiltedErrors = 0;
  state.hadStress = false;
  state.didWilt = false;
  state.player = { x: 43, y: 70 };
  state.keys.clear();
  state.journal.clear();
  setThought(currentStage().thought);
  closeDialog(dom.resultDialog);
  render();
}

function selectTool(tool) {
  state.selectedTool = tool;
  document.querySelectorAll(".tool-button").forEach((button) => {
    button.classList.toggle("selected", button.dataset.tool === tool);
  });
  dom.heldTool.dataset.tool = tool;
  setDistanceHint();
}

function render() {
  const stage = currentStage();
  const text = languageText();
  applyLanguage();
  dom.stageLabel.textContent = localized(stage.label);
  dom.garden.classList.remove(
    "day-morning",
    "day-noon",
    "day-afternoon",
    "day-evening",
  );
  dom.garden.classList.add(stage.dayClass);

  dom.plant.className = `plant stage-${stage.id}`;
  if (stage.id === "green") {
    dom.plant.classList.add("show-bugs");
  }
  if (state.wilted) {
    dom.plant.classList.add("wilted");
  }

  dom.soil.classList.toggle("dry", stage.id === "sprout" && !state.moistSoil);
  dom.soil.classList.toggle("wet", stage.id === "sprout" && state.moistSoil);
  dom.waterBadge.classList.toggle("hidden", !state.canFull);

  dom.conditionChip.textContent = getConditionText();
  dom.objectiveText.textContent = `${text.objectivePrefix}: ${getObjective()}`;
  renderStress();
  renderJournal();
  updatePlayerPosition();
  setDistanceHint();
  selectTool(state.selectedTool);
}

function getObjective() {
  const text = languageText().objective;
  if (state.waiting) return text.waiting;
  if (state.wilted && !state.inspected) return text.inspectWilted;
  if (state.wilted) return text.helpRecover;
  if (state.stageIndex === 1) {
    return state.canFull ? text.water : text.refill;
  }
  if (state.stageIndex === 2) {
    return state.inspected ? text.removeBugs : text.inspectBugs;
  }
  return localized(currentStage().objective);
}

function getConditionText() {
  const text = languageText().condition;
  const stage = currentStage();
  if (state.wilted) return text.wilted;
  if (stage.id === "sprout" && state.moistSoil) {
    return text.moist;
  }
  if (stage.id === "sprout" && state.canFull) return text.fullCan;
  if (stage.id === "green" && state.inspected) return text.bugsNeedRemoving;
  return localized(stage.condition);
}

function renderStress() {
  const stressText = languageText().stress;
  let stress = stressText.low;
  let width = 16;
  let color = "var(--leaf)";

  if (state.wilted) {
    stress = stressText.wilted;
    width = 100;
    color = "#d5735f";
  } else if (state.stress >= 2) {
    stress = stressText.high;
    width = 74;
    color = "#e39c4f";
  } else if (state.stress === 1) {
    stress = stressText.medium;
    width = 42;
    color = "#d9b348";
  }

  dom.stressLabel.textContent = stress.label;
  dom.stressFace.textContent = stress.face;
  dom.stressText.textContent = stress.text;
  dom.stressFill.style.width = `${width}%`;
  dom.stressFill.style.background = color;
}

function renderJournal() {
  const text = languageText().journal;
  const unlocked = journalNotes.filter((note) => state.journal.has(note.id));
  const locked = journalNotes.filter((note) => !state.journal.has(note.id));

  const unlockedHtml =
    unlocked.length === 0
      ? `<li><strong>${text.noNotesTitle}</strong><span>${text.noNotesText}</span></li>`
      : unlocked
          .map(
            (note) =>
              `<li><strong>${localized(note.title)}</strong><span>${localized(note.text)}</span></li>`,
          )
          .join("");

  const lockedHtml = locked
    .slice(0, Math.max(2, Math.min(4, locked.length)))
    .map(
      () =>
        `<li><strong>${text.lockedTitle}</strong><span>${text.lockedText}</span></li>`,
    )
    .join("");

  dom.journalContent.innerHTML = `
    <section class="journal-section">
      <h3>${text.unlocked}</h3>
      <ul class="journal-list">${unlockedHtml}</ul>
    </section>
    <section class="journal-section">
      <h3>${text.locked}</h3>
      <ul class="journal-list">${lockedHtml || `<li><strong>${text.allFoundTitle}</strong><span>${text.allFoundText}</span></li>`}</ul>
    </section>
  `;
}

function setThought(text) {
  dom.thoughtText.textContent = localized(text);
}

function setDistanceHint() {
  const text = languageText();
  const nearTomato = isNear("tomato");
  const nearBarrel = isNear("barrel");
  const selected = text.toolNames[state.selectedTool];

  if (state.selectedTool === "water" && nearBarrel) {
    dom.distanceHint.textContent = text.distances.refillHere;
    return;
  }

  if (nearTomato) {
    dom.distanceHint.textContent = text.distances.nearTomato(selected);
    return;
  }

  dom.distanceHint.textContent = text.distances.standNear;
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
  const messages = languageText().messages;
  if (state.waiting) return;
  ensureAudio();

  if (state.selectedTool === "water" && isNear("barrel")) {
    fillWateringCan();
    return;
  }

  if (isNear("tomato")) {
    useOnTomato();
    return;
  }

  if (isNear("shelf")) {
    setThought(messages.shelf);
    playTone(390, 0.05, "triangle", 0.04);
    return;
  }

  setThought(messages.closer);
}

function fillWateringCan() {
  const messages = languageText().messages;
  if (state.canFull) {
    setThought(messages.canAlreadyFull);
    return;
  }

  animateUse();
  state.canFull = true;
  setThought(messages.canFull);
  playTone(540, 0.13, "sine", 0.07);
  render();
}

function useOnTomato() {
  const tool = state.selectedTool;
  if (tool === "inspect") {
    inspectTomato();
    return;
  }
  if (tool === "water") {
    waterTomato();
    return;
  }
  if (tool === "bugs") {
    removeBugs();
    return;
  }
  if (tool === "harvest") {
    harvestTomato();
  }
}

function inspectTomato() {
  const stage = currentStage();
  const messages = languageText().messages;
  state.inspected = true;
  unlockNote(stage.noteId);

  if (state.wilted) {
    unlockNote("recovery");
    setThought(messages.wiltedInspect);
    playTone(420, 0.08, "sine", 0.05);
    render();
    return;
  }

  animateUse();
  if (state.stageIndex === 0) {
    setThought(stage.inspect);
    correctCare(stage.correct);
    return;
  }

  setThought(stage.inspect);
  playTone(460, 0.08, "sine", 0.05);
  render();
}

function waterTomato() {
  const messages = languageText().messages;
  if (!state.canFull) {
    setThought(messages.emptyCan);
    playTone(260, 0.08, "triangle", 0.04);
    return;
  }

  if (state.stageIndex === 1) {
    state.canFull = false;
    state.moistSoil = true;
    correctCare(currentStage().correct);
    return;
  }

  state.canFull = false;
  state.moistSoil = false;
  wrongCare(messages.overwater);
}

function removeBugs() {
  const messages = languageText().messages;
  if (state.stageIndex !== 2) {
    wrongCare(messages.noBugs);
    return;
  }

  if (!state.inspected && !state.wilted) {
    setThought(messages.inspectBeforeBugs);
    playTone(300, 0.08, "triangle", 0.04);
    return;
  }

  dom.bugLayer.classList.add("fly-away");
  correctCare(currentStage().correct);
}

function harvestTomato() {
  if (state.stageIndex === 3) {
    correctCare(currentStage().correct, finishGame);
    return;
  }

  wrongCare(languageText().messages.tooEarlyHarvest);
}

function correctCare(message, afterWait = advanceStage) {
  const messages = languageText().messages;
  animateUse();
  sparkle();
  unlockNote(currentStage().noteId);

  if (state.wilted) {
    state.wilted = false;
    state.wiltedErrors = 0;
    state.stress = Math.min(state.stress, 1);
    setThought(messages.recovered);
  } else {
    setThought(message);
  }

  playTone(660, 0.12, "sine", 0.08);
  waitThen(afterWait);
  render();
}

function wrongCare(message) {
  const messages = languageText().messages;
  animateUse("worried");
  state.hadStress = true;

  if (state.wilted) {
    state.wiltedErrors += 1;
    if (state.wiltedErrors >= 2) {
      resetCurrentStage();
      return;
    }
    setThought(messages.wiltedTryGentle);
    playTone(210, 0.12, "triangle", 0.06);
    render();
    return;
  }

  state.stress += 1;
  if (state.stress >= 3) {
    state.wilted = true;
    state.didWilt = true;
    state.inspected = false;
    setThought(messages.becameWilted);
    playTone(180, 0.18, "sine", 0.05);
  } else {
    setThought(message);
    playTone(240, 0.1, "triangle", 0.05);
  }
  render();
}

function resetCurrentStage() {
  const messages = languageText().messages;
  state.wilted = false;
  state.wiltedErrors = 0;
  state.stress = 1;
  state.inspected = false;
  state.canFull = false;
  state.moistSoil = false;
  setThought(messages.retryStage);
  playTone(230, 0.14, "sine", 0.05);
  render();
}

function advanceStage() {
  if (state.stageIndex >= stages.length - 1) {
    finishGame();
    return;
  }

  state.stageIndex += 1;
  state.inspected = false;
  state.canFull = false;
  state.moistSoil = false;
  dom.bugLayer.classList.remove("fly-away");
  setThought(currentStage().thought);
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
  }, 3000);
}

function finishGame() {
  state.waiting = false;
  dom.progressBubble.classList.add("hidden");
  unlockNote("harvest");
  const resultText = languageText().result;

  const label = state.didWilt
    ? resultText.labels.learning
    : state.hadStress
      ? resultText.labels.careful
      : resultText.labels.gentle;
  const condition = state.didWilt
    ? resultText.conditionRecovered
    : state.hadStress
      ? resultText.conditionHealthyAfter
      : resultText.conditionHealthy;

  dom.resultTitle.textContent = resultText.title;
  dom.resultCondition.textContent = condition;
  dom.resultLearned.textContent = resultText.learned;
  dom.resultLabel.textContent = `${resultText.prefix}: ${label}`;
  dom.nextGardenText.textContent = resultText.next;
  playHarvestJingle();
  showDialog(dom.resultDialog);
}

function unlockNote(noteId) {
  if (!noteId || state.journal.has(noteId)) return;
  state.journal.add(noteId);
  sparkle();
  renderJournal();
}

function showMoreInfo() {
  const stage = currentStage();
  setThought(stage.info);
  unlockNote(stage.noteId);
  if (stage.id === "sprout") unlockNote("roots");
  if (state.wilted) unlockNote("recovery");
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

function playHarvestJingle() {
  ensureAudio();
  [523, 659, 784, 1046].forEach((frequency, index) => {
    window.setTimeout(() => playTone(frequency, 0.12, "sine", 0.07), index * 115);
  });
}

function showDialog(dialog) {
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
      const speed = 0.42;
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

document.querySelectorAll(".tool-button").forEach((button) => {
  button.addEventListener("click", () => selectTool(button.dataset.tool));
});

dom.languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

dom.startButton.addEventListener("click", startGame);
dom.howToButton.addEventListener("click", () => showDialog(dom.howToDialog));
dom.journalButton.addEventListener("click", () => {
  renderJournal();
  showDialog(dom.journalDialog);
});
dom.moreInfoButton.addEventListener("click", showMoreInfo);
dom.useButton.addEventListener("click", useSelectedTool);
dom.replayButton.addEventListener("click", resetGame);
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
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(event.key)) {
    event.preventDefault();
  }
  if (["1", "2", "3", "4"].includes(key)) {
    selectTool(["inspect", "water", "bugs", "harvest"][Number(key) - 1]);
    return;
  }
  if (key === " " || key === "e") {
    useSelectedTool();
    return;
  }
  state.keys.add(key);
});

window.addEventListener("keyup", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  state.keys.delete(key);
});

selectTool("inspect");
render();
updateMovement();
