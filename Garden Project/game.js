const TOOL_ORDER = ["inspect", "water", "sun", "fertilizer", "bugs", "rodents", "harvest"];

const TOOL_LABELS = {
  en: {
    inspect: "Inspect",
    water: "Water",
    sun: "Sunlight",
    fertilizer: "Fertilizer",
    bugs: "Bug Net",
    rodents: "Rodent Guard",
    harvest: "Harvest",
  },
  ja: {
    inspect: "観察",
    water: "水やり",
    sun: "日光",
    fertilizer: "肥料",
    bugs: "虫よけ",
    rodents: "動物ガード",
    harvest: "収穫",
  },
};

const UI_TEXT = {
  en: {
    titleEyebrow: "A living garden routine",
    titleDescription:
      "Choose your gardener, plan a crop cycle, and tend a small garden where every fruit and vegetable asks for different care.",
    languageLabel: "Language",
    nameLabel: "Gardener name",
    namePlaceholder: "Enter a name",
    characterLabel: "Gardener style",
    characterMale: "Male",
    characterMaleDesc: "Garden jacket",
    characterFemale: "Female",
    characterFemaleDesc: "Berry apron",
    characterNeutral: "Non-gendered",
    characterNeutralDesc: "Field smock",
    cycleLabel: "Crop cycle",
    modeRoutine: "Routine",
    modeRandom: "Random",
    randomizeCycle: "Randomize cycle",
    startGarden: "Start Garden",
    howTo: "How to Play",
    backLobby: "Back to Gamer's Grind",
    topHint: "Move: WASD or arrows | Use: Space or E",
    gardenerCardLabel: "Gardener",
    currentCropLabel: "Current crop",
    journalButton: "Garden Journal",
    moreInfoButton: "Crop Tip",
    tools: "Tools",
    objectivePrefix: "Objective",
    useTool: "Use Tool",
    howToTitle: "How to Play",
    howToBodyOne:
      "Pick a gardener, choose a three-day crop routine, then care for each crop through observation, water, sunlight, fertilizer, pest control, and harvest.",
    howToBodyTwo:
      "Easier crops tolerate more mistakes. Hard crops have more needs and become stressed faster, so inspecting before acting matters.",
    howToBodyThree:
      "Move with WASD or arrow keys. Select tools with the buttons or number keys 1-7. Use the selected tool with Space, E, or the Use Tool button.",
    close: "Close",
    journalEyebrow: "Readable field notes",
    journalTitle: "Garden Journal",
    restartGarden: "Restart Garden",
    titleButton: "Title",
    defaultName: "Gardener",
    day: "Day",
    of: "of",
    cycle: "Cycle",
    waterBarrel: "Water Barrel",
    toolShelf: "Tool Shelf",
    cropBed: "Crop bed",
    cropNeeds: "Crop needs",
    readyToObserve: "Ready to observe.",
    low: "Low",
    calm: "Calm",
    medium: "Medium",
    alert: "Alert",
    high: "High",
    worried: "Worried",
    wilted: "Wilted",
    help: "Help",
    steadyCrop: "The crop is steady.",
    recoveryStep: "Inspect carefully and use the right recovery step.",
    gentlerStep: "A gentler next step will help.",
    noNotesTitle: "No notes unlocked yet",
    noNotesText: "Inspect the first crop to begin filling the journal.",
    unlockedNotes: "Unlocked Notes",
    cropGuide: "Crop Guide",
    randomizedCycle: "Randomized crop cycle",
    plannedCycle: "Planned crop routine",
    harvested: "Harvested",
    inProgress: "In progress",
    queued: "Queued",
    steps: "steps",
    continueCycle: "Continue Cycle",
    continueToDay: "Continue to Day",
  },
  ja: {
    titleEyebrow: "生きている庭のサイクル",
    titleDescription:
      "庭師を選び、作物の予定を決めて、果物や野菜ごとに違う世話をしながら小さな庭を育てます。",
    languageLabel: "言語",
    nameLabel: "庭師の名前",
    namePlaceholder: "名前を入力",
    characterLabel: "庭師スタイル",
    characterMale: "男性",
    characterMaleDesc: "庭仕事の上着",
    characterFemale: "女性",
    characterFemaleDesc: "ベリーのエプロン",
    characterNeutral: "ノンジェンダー",
    characterNeutralDesc: "畑のスモック",
    cycleLabel: "作物サイクル",
    modeRoutine: "予定",
    modeRandom: "ランダム",
    randomizeCycle: "サイクルをランダムにする",
    startGarden: "庭を始める",
    howTo: "遊び方",
    backLobby: "Gamer's Grindへ戻る",
    topHint: "移動: WASD/矢印 | 使う: Space/E",
    gardenerCardLabel: "庭師",
    currentCropLabel: "今の作物",
    journalButton: "庭ノート",
    moreInfoButton: "作物のヒント",
    tools: "道具",
    objectivePrefix: "目標",
    useTool: "道具を使う",
    howToTitle: "遊び方",
    howToBodyOne:
      "庭師を選び、3日分の作物サイクルを決めます。観察、水やり、日光、肥料、害虫対策、収穫で作物を世話します。",
    howToBodyTwo:
      "やさしい作物は失敗に強く、難しい作物は必要な世話が多く、早くストレスを感じます。まず観察することが大切です。",
    howToBodyThree:
      "WASDまたは矢印キーで移動します。ボタンまたは1-7キーで道具を選び、Space、E、または「道具を使う」で使います。",
    close: "閉じる",
    journalEyebrow: "読みやすい畑のメモ",
    journalTitle: "庭ノート",
    restartGarden: "庭をやり直す",
    titleButton: "タイトル",
    defaultName: "庭師",
    day: "日目",
    of: "/",
    cycle: "サイクル",
    waterBarrel: "水たる",
    toolShelf: "道具棚",
    cropBed: "作物の畝",
    cropNeeds: "作物に必要な世話",
    readyToObserve: "観察できます。",
    low: "低い",
    calm: "落ち着き",
    medium: "中くらい",
    alert: "注意",
    high: "高い",
    worried: "心配",
    wilted: "しおれ",
    help: "手当て",
    steadyCrop: "作物は落ち着いています。",
    recoveryStep: "よく観察して、正しい回復の世話をしましょう。",
    gentlerStep: "次はやさしい手順が助けになります。",
    noNotesTitle: "まだメモはありません",
    noNotesText: "最初の作物を観察すると、庭ノートが増えます。",
    unlockedNotes: "見つけたメモ",
    cropGuide: "作物ガイド",
    randomizedCycle: "ランダム作物サイクル",
    plannedCycle: "計画した作物サイクル",
    harvested: "収穫済み",
    inProgress: "進行中",
    queued: "待機中",
    steps: "手順",
    continueCycle: "サイクルを続ける",
    continueToDay: "次の日へ:",
  },
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

const CROP_TEXT = {
  ja: {
    tomato: {
      name: "トマト",
      type: "果物",
      difficulty: "標準",
      needs: ["安定した水", "よく当たる日光", "虫の確認"],
      profile: "水と明るい日光でよく育つ、扱いやすい最初の作物です。",
      tip: "トマトは比較的育てやすいですが、観察、水やり、日光、虫よけの順番が大切です。",
    },
    lettuce: {
      name: "レタス",
      type: "野菜",
      difficulty: "やさしい",
      needs: ["軽い水やり", "半日陰", "虫の確認"],
      profile: "早く育つ葉物です。初心者向きですが、小さな虫が寄りやすいです。",
      tip: "レタスはやさしい水やりと早めの虫チェックで葉が元気に育ちます。",
    },
    carrot: {
      name: "ニンジン",
      type: "野菜",
      difficulty: "やさしい",
      needs: ["均一な土", "おだやかな日光", "動物ガード"],
      profile: "地面の下でじっくり育つ根菜です。いじりすぎないことも大切です。",
      tip: "ニンジンは均一な土を好みます。動物の足あとにも注意しましょう。",
    },
    strawberry: {
      name: "イチゴ",
      type: "果物",
      difficulty: "ふつう",
      needs: ["水", "肥料", "虫の確認"],
      profile: "甘い収穫が楽しめますが、豊かな土とこまめな虫対策が必要です。",
      tip: "イチゴは虫が増える前に土を整えると、よい実になりやすいです。",
    },
    pepper: {
      name: "ピーマン",
      type: "果物",
      difficulty: "ふつう",
      needs: ["日光", "水", "肥料"],
      profile: "あたたかさを好む作物です。日光、水、少しの肥料が助けになります。",
      tip: "ピーマンは光に強く反応します。水の前に本当に必要な世話を観察しましょう。",
    },
    cucumber: {
      name: "キュウリ",
      type: "野菜",
      difficulty: "ふつう",
      needs: ["多めの水", "日光", "虫の確認"],
      profile: "水をよく飲み、こまめな確認でぐんぐん育つ作物です。",
      tip: "キュウリはこの庭の中でも水を多く必要とします。水たるで早めに補充しましょう。",
    },
    pumpkin: {
      name: "カボチャ",
      type: "果物",
      difficulty: "難しい",
      needs: ["深い水やり", "肥料", "動物ガード", "日光"],
      profile: "大きく育つぶん、必要な世話も多い難しい作物です。",
      tip: "カボチャは一番難しい作物です。土を肥やし、つるを守り、日光を保ちましょう。",
    },
  },
};

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

const careCopyJa = {
  inspect: {
    title: "種の確認",
    visual: "seed",
    condition: (crop) => `${cropName(crop)}の畝を観察できます。`,
    objective: (crop) => `${cropName(crop)}の畝を観察する。`,
    thought: (crop) => `${cropName(crop)}の新しいサイクルが始まりました。まずよく見てみましょう。`,
    inspect: (crop) => `${cropName(crop)}の畝に、土の様子、光、小さな動きなどの手がかりがあります。`,
    correct: (crop) => `${cropName(crop)}に何が必要か、行動の前に読み取れました。`,
    noteTitle: "まず観察",
    noteText: (crop) => `${cropName(crop)}の世話は、土、葉、色、近くの虫を読むところから始まります。`,
  },
  water: {
    title: "水やり",
    visual: "sprout",
    condition: (crop) => `${cropName(crop)}は水を必要としています。`,
    objective: (crop) => `水を入れたじょうろで${cropName(crop)}に水をあげる。`,
    thought: (crop) => `${cropName(crop)}の土が乾いています。近くに水たるがあります。`,
    inspect: (crop) => `${cropName(crop)}の周りの土は、水が必要なくらい乾いています。びしょびしょではありません。`,
    correct: (crop) => `${cropName(crop)}の根にちょうどよく水が届きました。`,
    noteTitle: "水はていねいに",
    noteText: (crop) => `${cropName(crop)}は土が乾いたら水が必要です。ただし水のあげすぎは根にストレスをかけます。`,
  },
  sun: {
    title: "日光",
    visual: "leaf",
    condition: (crop) => `${cropName(crop)}は光を必要としています。`,
    objective: (crop) => `${cropName(crop)}の日当たりを整える。`,
    thought: (crop) => `${cropName(crop)}がよりよい光の方へ伸びています。`,
    inspect: () => "葉が明るい方へ向いています。今は日光を整えるのがよさそうです。",
    correct: (crop) => `${cropName(crop)}にきれいな日差しが届きました。`,
    noteTitle: "日光を整える",
    noteText: (crop) => `${cropName(crop)}は日光で力を作ります。あてずっぽうではなく、必要なタイミングを見ることが大切です。`,
  },
  fertilizer: {
    title: "肥料",
    visual: "leaf",
    condition: (crop) => `${cropName(crop)}は土の栄養を必要としています。`,
    objective: (crop) => `${cropName(crop)}の畝に肥料を入れる。`,
    thought: (crop) => `${cropName(crop)}が次に伸びる前に、少し栄養が必要そうです。`,
    inspect: () => "葉は落ち着いていますが、土の力が少し足りません。少量の肥料が助けになります。",
    correct: (crop) => `${cropName(crop)}の畝に、ちょうどよい量の肥料を入れました。`,
    noteTitle: "肥料は少しずつ",
    noteText: (crop) => `${cropName(crop)}は花や実に力が必要な時、肥料が助けになります。`,
  },
  bugs: {
    title: "虫の確認",
    visual: "fruit",
    condition: (crop) => `${cropName(crop)}に虫が集まっています。`,
    objective: (crop) => `${cropName(crop)}から虫をよける。`,
    thought: (crop) => `${cropName(crop)}の葉の近くで小さなものが動いています。`,
    inspect: () => "やわらかい葉の近くに小さな虫がいます。虫よけをやさしく使いましょう。",
    correct: (crop) => `虫が離れて、${cropName(crop)}は安全そうです。`,
    noteTitle: "害虫は早めに",
    noteText: (crop) => `${cropName(crop)}は早く虫を見つけてやさしく取り除くと回復しやすいです。`,
  },
  rodents: {
    title: "動物ガード",
    visual: "fruit",
    condition: (crop) => `${cropName(crop)}の近くに小さな動物が来ています。`,
    objective: (crop) => `${cropName(crop)}にやさしい動物ガードを置く。`,
    thought: (crop) => `${cropName(crop)}の畝の近くに小さな足あとがあります。`,
    inspect: () => "足あとが畝へ向かっています。やさしいガードで近づきすぎないようにしましょう。",
    correct: (crop) => `ガードを置き、${cropName(crop)}の畝を守りました。`,
    noteTitle: "収穫を守る",
    noteText: (crop) => `${cropName(crop)}は育つほど動物を引き寄せることがあります。早めの対策が大切です。`,
  },
  harvest: {
    title: "収穫",
    visual: "ripe",
    condition: (crop) => `${cropName(crop)}は収穫できます。`,
    objective: (crop) => `熟した${cropName(crop)}を収穫する。`,
    thought: (crop) => `${cropName(crop)}は収穫によさそうです。ここが楽しみな瞬間です。`,
    inspect: (crop) => `色、形、手ごたえを見ると、${cropName(crop)}はかごに入れる準備ができています。`,
    correct: (crop) => `${cropName(crop)}をよいタイミングで収穫しました。`,
    noteTitle: "収穫のタイミング",
    noteText: (crop) => `${cropName(crop)}は段階、色、状態がそろった時に収穫します。`,
  },
};

const phaseTimes = {
  en: ["Morning", "Late Morning", "Noon", "Afternoon", "Evening", "Golden Hour"],
  ja: ["朝", "午前", "昼", "午後", "夕方", "黄金の時間"],
};
const dayClasses = ["day-morning", "day-noon", "day-noon", "day-afternoon", "day-evening", "day-evening"];
const visualSequence = ["seed", "sprout", "leaf", "fruit", "fruit", "ripe"];

const dom = {
  titleScreen: document.querySelector("#titleScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  playerName: document.querySelector("#playerName"),
  languageButtons: document.querySelectorAll(".language-button"),
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
  language: "en",
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

function currentLanguage() {
  return state?.language === "ja" ? "ja" : "en";
}

function ui() {
  return UI_TEXT[currentLanguage()];
}

function careSet() {
  return currentLanguage() === "ja" ? careCopyJa : careCopy;
}

function toolLabel(tool) {
  return TOOL_LABELS[currentLanguage()][tool] || TOOL_LABELS.en[tool] || tool;
}

function cropText(crop) {
  return CROP_TEXT[currentLanguage()]?.[crop.id] || crop;
}

function cropName(crop) {
  return cropText(crop).name || crop.name;
}

function cropLowerName(crop) {
  return currentLanguage() === "ja" ? cropName(crop) : cropName(crop).toLowerCase();
}

function cropType(crop) {
  return cropText(crop).type || crop.type;
}

function cropDifficulty(crop) {
  return cropText(crop).difficulty || crop.difficulty;
}

function cropNeeds(crop) {
  return cropText(crop).needs || crop.needs;
}

function cropProfile(crop) {
  return cropText(crop).profile || crop.profile;
}

function cropTip(crop) {
  return cropText(crop).tip || crop.tip;
}

function modeLabel(mode) {
  return mode === "random" ? ui().modeRandom : ui().modeRoutine;
}

function dayLabel(dayNumber) {
  return currentLanguage() === "ja" ? `${dayNumber}${ui().day}` : `${ui().day} ${dayNumber}`;
}

function cropPhases(crop = currentCrop()) {
  return crop.plan.map((tool, index) => {
    const copy = careSet()[tool];
    const isHarvest = tool === "harvest";
    return {
      tool,
      title: copy.title,
      label: `${phaseTimes[currentLanguage()][Math.min(index, phaseTimes[currentLanguage()].length - 1)]} - ${cropName(crop)} ${copy.title}`,
      visual: isHarvest ? "ripe" : copy.visual || visualSequence[Math.min(index, visualSequence.length - 1)],
      dayClass: dayClasses[Math.min(index, dayClasses.length - 1)],
      condition: copy.condition(crop),
      objective: copy.objective(crop),
      thought: copy.thought(crop),
      inspect: copy.inspect(crop),
      correct: copy.correct(crop),
      noteId: `${crop.id}:${tool}`,
      noteTitle: `${cropName(crop)}: ${copy.noteTitle}`,
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
    const selected = select.value || defaultSchedule[index] || crops[index % crops.length].id;
    select.innerHTML = crops
      .map((crop) => `<option value="${crop.id}">${cropName(crop)} - ${cropDifficulty(crop)}</option>`)
      .join("");
    select.value = cropById[selected] ? selected : defaultSchedule[index] || crops[index % crops.length].id;
  });
}

function setLanguage(language) {
  if (!["en", "ja"].includes(language)) return;
  state.language = language;
  applyLanguage();
  populateScheduleOptions();
  setDistanceHint();
  renderJournal();
  saveProfile();
  if (!dom.gameScreen.classList.contains("hidden")) {
    setThought(currentPhase().thought);
    render();
  }
}

function applyLanguage() {
  const text = ui();
  document.documentElement.lang = currentLanguage();
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (text[key]) element.textContent = text[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (text[key]) element.setAttribute("placeholder", text[key]);
  });
  document.querySelectorAll("[data-day-label]").forEach((element) => {
    element.textContent = dayLabel(Number(element.dataset.dayLabel) + 1);
  });
  dom.languageButtons.forEach((button) => {
    const selected = button.dataset.language === currentLanguage();
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  dom.topHint.textContent = text.topHint;
  dom.journalButton.textContent = text.journalButton;
  dom.moreInfoButton.textContent = text.moreInfoButton;
  dom.useButton.textContent = text.useTool;
  dom.tools.setAttribute("aria-label", text.tools || "Tools");
  document.querySelectorAll(".tool-button").forEach((button) => {
    button.querySelector(".tool-label").textContent = toolLabel(button.dataset.tool);
  });
}

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    if (["en", "ja"].includes(saved.language)) {
      state.language = saved.language;
    }
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

  applyLanguage();
  populateScheduleOptions();
  setCharacter(state.character);
  setCycleMode(state.cycleMode);
  updateSetupScheduleState();
}

function saveProfile() {
  const profile = {
    language: state.language,
    name: dom.playerName.value.trim().slice(0, 20),
    character: state.character,
    cycleMode: state.cycleMode,
    schedule: getSelectedSchedule(),
  };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function getPlayerName() {
  const name = dom.playerName.value.trim().slice(0, 20);
  return name || ui().defaultName;
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
  if (!TOOL_ORDER.includes(tool)) return;
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
  const text = ui();

  applyLanguage();
  dom.cycleLabel.textContent =
    currentLanguage() === "ja"
      ? `${dayLabel(state.dayIndex + 1)}${text.of}${state.schedule.length} - ${modeLabel(state.cycleMode)}${text.cycle}`
      : `${dayLabel(state.dayIndex + 1)} ${text.of} ${state.schedule.length} - ${modeLabel(state.cycleMode)} ${text.cycle}`;
  dom.stageLabel.textContent = phase.label;
  dom.currentCropPill.textContent = `${cropName(crop)} (${cropDifficulty(crop)})`;
  dom.gardenSign.textContent = cropName(crop);
  dom.seedMarker.textContent = cropName(crop);
  dom.barrelLabel.textContent = text.waterBarrel;
  dom.shelfLabel.textContent = text.toolShelf;
  dom.gardenerNameLabel.textContent = state.playerName || getPlayerName();
  dom.currentCropName.textContent = cropName(crop);
  dom.currentCropTraits.textContent = cropProfile(crop);
  dom.needBadges.innerHTML = cropNeeds(crop).map((need) => `<span class="need-badge">${escapeHtml(need)}</span>`).join("");
  dom.needBadges.setAttribute("aria-label", text.cropNeeds);
  dom.tomatoZone.setAttribute("aria-label", `${cropName(crop)} ${text.cropBed}`);

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
  dom.objectiveText.textContent = `${text.objectivePrefix}: ${getObjective()}`;
  dom.progressBubble.textContent =
    phase.tool === "harvest"
      ? currentLanguage() === "ja"
        ? "収穫をまとめています..."
        : "Packing the harvest..."
      : currentLanguage() === "ja"
        ? `${cropName(crop)}が育っています...`
        : `Growing the ${cropLowerName(crop)}...`;

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

  if (state.waiting) {
    return currentLanguage() === "ja"
      ? `${cropName(crop)}の反応を待つ。`
      : `Wait while the ${cropLowerName(crop)} responds.`;
  }
  if (state.wilted && !state.inspected) {
    return currentLanguage() === "ja"
      ? `しおれた${cropName(crop)}を観察する。`
      : `Inspect the wilted ${cropLowerName(crop)}.`;
  }
  if (state.wilted) {
    return currentLanguage() === "ja"
      ? `${toolLabel(phase.tool)}で${cropName(crop)}の回復を助ける。`
      : `Help the ${cropLowerName(crop)} recover with ${toolLabel(phase.tool)}.`;
  }
  if (phase.tool === "inspect") return phase.objective;
  if (!state.inspected) {
    return currentLanguage() === "ja"
      ? `世話を選ぶ前に${cropName(crop)}を観察する。`
      : `Inspect the ${cropLowerName(crop)} before choosing care.`;
  }
  if (phase.tool === "water" && !state.canFull) {
    return currentLanguage() === "ja" ? "じょうろに水を入れる。" : "Refill the watering can.";
  }
  return phase.objective;
}

function getConditionText() {
  const crop = currentCrop();
  const phase = currentPhase();
  if (state.wilted) return currentLanguage() === "ja" ? `${cropName(crop)}がしおれています。` : `${cropName(crop)} is wilted.`;
  if (state.completedPhaseTool === "water") return currentLanguage() === "ja" ? "土がちょうどよく湿っています。" : "Soil is nicely moist.";
  if (state.completedPhaseTool === "fertilizer") return currentLanguage() === "ja" ? "土に栄養が入りました。" : "Soil has been fed.";
  if (state.completedPhaseTool === "sun") return currentLanguage() === "ja" ? "日当たりが整いました。" : "Light is balanced.";
  if (state.completedPhaseTool === "bugs") return currentLanguage() === "ja" ? "虫はいなくなりました。" : "Bugs have cleared.";
  if (state.completedPhaseTool === "rodents") return currentLanguage() === "ja" ? "動物ガードを置きました。" : "Rodent guard is set.";
  if (phase.tool === "water" && state.canFull) return currentLanguage() === "ja" ? "じょうろは満タンです。" : "Watering can is full.";
  return phase.condition;
}

function renderStress() {
  const crop = currentCrop();
  const textSet = ui();
  let label = textSet.low;
  let face = textSet.calm;
  let text = textSet.steadyCrop;
  let color = "var(--leaf)";
  let width = Math.max(12, Math.round((state.stress / crop.tolerance) * 86));

  if (state.wilted) {
    label = textSet.wilted;
    face = textSet.help;
    text = textSet.recoveryStep;
    color = "#d5735f";
    width = 100;
  } else if (state.stress >= crop.tolerance - 1) {
    label = textSet.high;
    face = textSet.worried;
    text = currentLanguage() === "ja" ? `${cropName(crop)}はしおれそうです。` : `${cropName(crop)} is close to wilting.`;
    color = "#e39c4f";
    width = 78;
  } else if (state.stress > 0) {
    label = textSet.medium;
    face = textSet.alert;
    text = textSet.gentlerStep;
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
  const text = ui();
  const scheduleHtml = state.schedule
    .map((cropId, index) => {
      const crop = cropById[cropId] || cropById.tomato;
      const active = index === state.dayIndex && !dom.gameScreen.classList.contains("hidden");
      const complete = state.completed.some((result) => result.day === index);
      const status = complete ? text.harvested : active ? text.inProgress : text.queued;
      return `
        <li>
          <strong>${escapeHtml(dayLabel(index + 1))}: ${escapeHtml(cropName(crop))}</strong>
          <span>${escapeHtml(cropDifficulty(crop))} - ${status}</span>
        </li>
      `;
    })
    .join("");

  const notes = getUnlockedNotes();
  const notesHtml =
    notes.length === 0
      ? `<article class="note-card"><h3>${text.noNotesTitle}</h3><p>${text.noNotesText}</p></article>`
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
          <h3>${escapeHtml(cropName(crop))}</h3>
          <p>${escapeHtml(cropProfile(crop))}</p>
          <div class="guide-meta">
            <span>${escapeHtml(cropType(crop))}</span>
            <span>${escapeHtml(cropDifficulty(crop))}</span>
            <span>${crop.plan.length} ${text.steps}</span>
          </div>
        </article>
      `,
    )
    .join("");

  dom.journalContent.innerHTML = `
    <aside class="journal-card">
      <h3>${escapeHtml(state.playerName || getPlayerName())}${currentLanguage() === "ja" ? "のサイクル" : "'s Cycle"}</h3>
      <p>${state.cycleMode === "random" ? text.randomizedCycle : text.plannedCycle}</p>
      <ul class="cycle-list">${scheduleHtml}</ul>
    </aside>
    <section class="journal-main">
      <section>
        <h3>${text.unlockedNotes}</h3>
        <div class="note-grid">${notesHtml}</div>
      </section>
      <section>
        <h3>${text.cropGuide}</h3>
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
      const copy = careSet()[tool];
      if (!crop || !copy) return null;
      return {
        title: `${cropName(crop)}: ${copy.noteTitle}`,
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
  const selected = toolLabel(state.selectedTool);

  if (state.selectedTool === "water" && nearBarrel) {
    dom.distanceHint.textContent =
      currentLanguage() === "ja" ? "ここで水やりを使うと、じょうろに水を入れます。" : "Use Water here to refill the can.";
    return;
  }

  if (nearTomato) {
    dom.distanceHint.textContent =
      currentLanguage() === "ja"
        ? `${cropName(crop)}に${selected}を使えます。`
        : `Use ${selected} on the ${cropLowerName(crop)}.`;
    return;
  }

  dom.distanceHint.textContent =
    currentLanguage() === "ja" ? "作物の畝か水たるの近くに立ちましょう。" : "Stand near the crop bed or water barrel.";
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
    setThought(currentLanguage() === "ja" ? "道具棚は整っています。作物の畝の近くで作業しましょう。" : "The tool shelf is tidy. Work near the crop bed.");
    playTone(390, 0.05, "triangle", 0.04);
    return;
  }

  setThought(currentLanguage() === "ja" ? "道具を使う前に、もう少し近づきましょう。" : "Move closer before using that tool.");
}

function fillWateringCan() {
  if (state.canFull) {
    setThought(currentLanguage() === "ja" ? "じょうろにはもう十分な水があります。" : "The watering can already has enough water.");
    return;
  }

  animateUse();
  state.canFull = true;
  setThought(currentLanguage() === "ja" ? "じょうろに水が入りました。" : "The watering can is full.");
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
    setThought(
      currentLanguage() === "ja"
        ? `回復させる前に、しおれた${cropName(crop)}を観察しましょう。`
        : `Inspect the wilted ${cropLowerName(crop)} before trying to recover it.`,
    );
    playTone(260, 0.08, "triangle", 0.04);
    return;
  }

  if (!state.inspected && phase.tool !== "inspect") {
    setThought(
      currentLanguage() === "ja"
        ? `次の世話を決めるために、まず${cropName(crop)}を観察しましょう。`
        : `Inspect the ${cropLowerName(crop)} first so the next step is clear.`,
    );
    playTone(300, 0.08, "triangle", 0.04);
    return;
  }

  if (tool !== phase.tool) {
    wrongCare(wrongToolMessage(tool, phase, crop));
    return;
  }

  if (tool === "water") {
    if (!state.canFull) {
      setThought(currentLanguage() === "ja" ? "じょうろは空です。水たるで水を入れましょう。" : "The watering can is empty. Refill it at the water barrel.");
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
    setThought(
      currentLanguage() === "ja"
        ? `${cropName(crop)}は、次に${toolLabel(phase.tool)}を使えば回復できます。`
        : `The ${cropLowerName(crop)} can recover if the next care step is ${toolLabel(phase.tool)}.`,
    );
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
    setThought(currentLanguage() === "ja" ? `${cropName(crop)}は回復しました。${message}` : `${cropName(crop)} recovers. ${message}`);
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
    setThought(
      currentLanguage() === "ja"
        ? `今の世話は合いませんでした。もう一度観察して、${toolLabel(currentPhase().tool)}を使いましょう。`
        : `That was not gentle enough. Inspect again and use ${toolLabel(currentPhase().tool)}.`,
    );
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
    setThought(currentLanguage() === "ja" ? `${cropName(crop)}がしおれました。回復のためによく観察しましょう。` : `${cropName(crop)} has wilted. Inspect it carefully to recover.`);
    playTone(180, 0.18, "sine", 0.05);
  } else {
    setThought(message);
    playTone(240, 0.1, "triangle", 0.05);
  }
  render();
}

function wrongToolMessage(tool, phase, crop) {
  if (phase.tool === "water" && tool !== "water") {
    return currentLanguage() === "ja"
      ? `${cropName(crop)}には今、水が必要です。${toolLabel(tool)}ではありません。`
      : `${cropName(crop)} needs water right now, not ${toolLabel(tool)}.`;
  }
  if (phase.tool === "sun") {
    return currentLanguage() === "ja"
      ? `${cropName(crop)}にはまず光が必要です。`
      : `${cropName(crop)} is asking for better light before anything else.`;
  }
  if (phase.tool === "fertilizer") {
    return currentLanguage() === "ja"
      ? `${cropName(crop)}には次の成長の前に少し肥料が必要です。`
      : `${cropName(crop)} needs a measured feeding before the next growth push.`;
  }
  if (phase.tool === "bugs") {
    return currentLanguage() === "ja" ? "虫がまだいます。虫よけをやさしく使いましょう。" : "The bugs are still here. Use the bug net gently.";
  }
  if (phase.tool === "rodents") {
    return currentLanguage() === "ja" ? "足あとがまだ近くにあります。動物ガードを置きましょう。" : "The tracks are still close. Set a rodent guard.";
  }
  if (phase.tool === "harvest") {
    return currentLanguage() === "ja" ? `${cropName(crop)}はかごに入れる準備ができています。` : `${cropName(crop)} is ready for the basket.`;
  }
  return currentLanguage() === "ja"
    ? `今の${cropName(crop)}に必要な世話ではありません。`
    : `That does not match what the ${cropLowerName(crop)} needs right now.`;
}

function resetCurrentPhase() {
  state.wilted = false;
  state.wiltedErrors = 0;
  state.stress = 1;
  state.inspected = false;
  state.canFull = false;
  state.completedPhaseTool = null;
  setThought(
    currentLanguage() === "ja"
      ? `${cropName(currentCrop())}は、この世話をもう一度落ち着いてやり直す必要があります。`
      : `${cropName(currentCrop())} needs this care step again from a calmer start.`,
  );
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
  if (state.cropWilted) return currentLanguage() === "ja" ? "回復して収穫" : "Recovered harvest";
  if (state.cropMistakes > 0) return currentLanguage() === "ja" ? "慎重な収穫" : "Careful harvest";
  return currentLanguage() === "ja" ? "きれいな収穫" : "Clean harvest";
}

function showDayResult(label) {
  const crop = currentCrop();
  const nextCrop = cropById[state.schedule[state.dayIndex + 1]];
  dom.resultTitle.textContent = currentLanguage() === "ja" ? `${cropName(crop)}の収穫完了` : `${cropName(crop)} harvest complete`;
  dom.resultCondition.textContent = currentLanguage() === "ja" ? `${cropName(crop)}の結果: ${label}。` : `${cropName(crop)} result: ${label}.`;
  dom.resultLearned.textContent = cropTip(crop);
  dom.resultLabel.textContent =
    currentLanguage() === "ja" ? `${state.playerName}: ${dayLabel(state.dayIndex + 1)}クリア` : `${state.playerName}: Day ${state.dayIndex + 1} cleared`;
  dom.nextGardenText.textContent = currentLanguage() === "ja" ? `次の作物: ${cropName(nextCrop)}。` : `Next crop: ${cropName(nextCrop)}.`;
  dom.nextCropButton.classList.remove("hidden");
  dom.nextCropButton.textContent = currentLanguage() === "ja" ? `${ui().continueToDay} ${dayLabel(state.dayIndex + 2)}` : `Continue to Day ${state.dayIndex + 2}`;
}

function showFinalResult() {
  const clean = state.completed.filter((result) => result.mistakes === 0).length;
  const recovered = state.completed.filter((result) => result.wilted).length;
  const label = recovered
    ? currentLanguage() === "ja" ? "回復上手な庭師" : "Resilient Gardener"
    : clean === state.completed.length
      ? currentLanguage() === "ja" ? "きれいなサイクルの庭師" : "Clean Cycle Gardener"
      : currentLanguage() === "ja" ? "対応上手な庭師" : "Adaptive Gardener";
  const harvests = state.completed
    .map((result) => cropById[result.cropId] ? cropName(cropById[result.cropId]) : currentLanguage() === "ja" ? "作物" : "Crop")
    .join(", ");

  dom.resultTitle.textContent =
    currentLanguage() === "ja" ? `${state.playerName}の庭サイクルが完了しました` : `${state.playerName}'s garden cycle is complete`;
  dom.resultCondition.textContent =
    currentLanguage() === "ja" ? `${state.completed.length}回の収穫が完了: ${harvests}。` : `${state.completed.length} harvests finished: ${harvests}.`;
  dom.resultLearned.textContent =
    currentLanguage() === "ja"
      ? "作物の多様性、違う世話、タイミングをひとつのサイクルで練習しました。"
      : "You practiced crop diversity, different care needs, and timing across a full routine.";
  dom.resultLabel.textContent = currentLanguage() === "ja" ? `サイクル結果: ${label}` : `Cycle result: ${label}`;
  dom.nextGardenText.textContent =
    currentLanguage() === "ja" ? "大きくなった庭ノートに、メモと作物ガイドが残ります。" : "The enlarged journal now keeps your notes and crop guide.";
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
  setThought(currentLanguage() === "ja" ? `${cropTip(crop)} 今の手がかり: ${phase.inspect}` : `${cropTip(crop)} Current clue: ${phase.inspect}`);
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

dom.languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
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
