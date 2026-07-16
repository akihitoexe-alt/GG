document.addEventListener('DOMContentLoaded', () => {
    // --- JACK IN SEQUENCE ---
    const jackInBtn = document.getElementById('jack-in-btn');
    const jackInScreen = document.getElementById('jack-in-screen');
    const cyberWorld = document.getElementById('cyber-world');
    const jackInFlash = document.querySelector('.jack-in-flash');
    const jackInTunnel = document.querySelector('.jack-in-tunnel');

    // --- LANGUAGE / UI TEXT ---
    const languageControl = document.querySelector('.language-control');
    const languageBtns = document.querySelectorAll('.language-btn');
    const metaDescription = document.querySelector('meta[name="description"]');
    const supportedLanguages = ['en', 'ja'];
    const languageStorageKey = 'gameLobbyLanguage';
    const jackInSessionKey = 'gameLobbyJackInComplete';

    const translations = {
        en: {
            meta: {
                title: "Gamers' Grind - Cyberworld",
                description: "Centralized Game Lobby and Project Hub for Gamers' Grind."
            },
            language: {
                label: 'LANGUAGE',
                selector: 'Language selector',
                english: 'English',
                japanese: 'Japanese'
            },
            intro: {
                title: 'PET TERMINAL_',
                status: 'SYSTEM STANDBY...',
                button: 'JACK IN!! EXECUTE',
                executing: 'EXECUTING...'
            },
            header: {
                subtitle: 'NET AREA // CENTRAL HUB'
            },
            hub: {
                areaLabel: 'AREA',
                areaValue: 'CENTRAL SQUARE',
                syncLabel: 'SYNC',
                syncValue: '99.8%',
                partyLabel: 'PARTY ARENA',
                partyValue: 'ONLINE',
                gateLabel: 'GRID GATES',
                gateValue: 'READY'
            },
            filters: {
                all: 'ALL PLAYABLE',
                cardGames: 'BATTLE CARDS',
                boardGames: 'BOARD SIM',
                mobileGames: 'MOBILE NET',
                consoleGames: 'CONSOLE LINK',
                misc: 'ARCADE/MISC'
            },
            subFilters: {
                dataType: 'DATA TYPE:',
                makerId: 'MAKER ID:'
            },
            options: {
                all: 'All',
                rpg: 'RPG',
                puzzle: 'Puzzle',
                racing: 'Racing',
                action: 'Action',
                platformer: 'Platformer',
                shooter: 'Shooter',
                'square-enix': 'Square-Enix',
                king: 'King',
                nintendo: 'Nintendo',
                apple: 'Apple',
                playstation: 'PlayStation',
                xbox: 'Xbox'
            },
            categories: {
                phantomKnights: 'Phantom Knights',
                miscellaneous: 'Miscellaneous',
                boardGame: 'Board Game',
                mobileRpg: 'Mobile RPG',
                mobilePuzzle: 'Mobile Puzzle',
                mobileRacing: 'Mobile Racing',
                consoleRpg: 'Console RPG',
                consolePlatformer: 'Console Platformer',
                consoleShooter: 'Console Shooter'
            }
        },
        ja: {
            meta: {
                title: "Gamers' Grind - サイバーワールド",
                description: "Gamers' Grind のゲームロビーとプロジェクトハブです。"
            },
            language: {
                label: 'LANG',
                selector: '言語選択',
                english: 'English',
                japanese: '日本語'
            },
            intro: {
                title: 'PET ターミナル_',
                status: 'システム待機中...',
                button: 'ジャックイン!! 実行',
                executing: '実行中...'
            },
            header: {
                subtitle: 'ネットエリア // 中央ハブ'
            },
            hub: {
                areaLabel: 'エリア',
                areaValue: '中央スクエア',
                syncLabel: '同期',
                syncValue: '99.8%',
                partyLabel: 'パーティリンク',
                partyValue: 'オンライン',
                gateLabel: 'クエストゲート',
                gateValue: '準備完了'
            },
            filters: {
                all: '全データ',
                cardGames: 'バトルカード',
                boardGames: 'ボードシム',
                mobileGames: 'モバイルネット',
                consoleGames: 'コンソールリンク',
                misc: 'その他データ'
            },
            subFilters: {
                dataType: 'データ種別:',
                makerId: 'メーカーID:'
            },
            options: {
                all: 'すべて',
                rpg: 'RPG',
                puzzle: 'パズル',
                racing: 'レース',
                action: 'アクション',
                platformer: 'プラットフォーム',
                shooter: 'シューティング',
                'square-enix': 'スクウェア・エニックス',
                king: 'King',
                nintendo: '任天堂',
                apple: 'Apple',
                playstation: 'PlayStation',
                xbox: 'Xbox'
            },
            categories: {
                phantomKnights: 'ファントム・ナイツ',
                miscellaneous: 'その他',
                boardGame: 'ボードゲーム',
                mobileRpg: 'モバイルRPG',
                mobilePuzzle: 'モバイルパズル',
                mobileRacing: 'モバイルレース',
                consoleRpg: 'コンソールRPG',
                consolePlatformer: 'コンソールプラットフォーム',
                consoleShooter: 'コンソールシューティング'
            }
        }
    };

    // --- DATA / PROJECTS ---
    const projects = [
        // Card Games (Phantom Knights)
        { name: "Dark Renaissance Xyz Dragon", category: "card-games", path: "../Dark Renaissance Xyz Dragon/card.html", icon: "🐉", categoryLabelKey: "phantomKnights" },
        { name: "Dark Revolution Xyz Dragon", category: "card-games", path: "../Dark Revolution Xyz Dragon/card.html", icon: "🐉", categoryLabelKey: "phantomKnights" },
        { name: "Broken Helm", category: "card-games", path: "../The Phantom Knights of Broken Helm/card.html", icon: "🪖", categoryLabelKey: "phantomKnights" },
        { name: "Dark Star", category: "card-games", path: "../The Phantom Knights of Dark Star/card.html", icon: "⭐", categoryLabelKey: "phantomKnights" },
        { name: "Dreadful Hammer", category: "card-games", path: "../The Phantom Knights of Dreadful Hammer/card.html", icon: "🔨", categoryLabelKey: "phantomKnights" },
        { name: "Feeble Armor", category: "card-games", path: "../The Phantom Knights of Feeble Armor/card.html", icon: "🛡️", categoryLabelKey: "phantomKnights" },
        { name: "Jagged Gloves", category: "card-games", path: "../The Phantom Knights of Jagged Gloves/card.html", icon: "🧤", categoryLabelKey: "phantomKnights" },
        { name: "Rebellious Soul", category: "card-games", path: "../The Phantom Knights' Rebellious Soul/card.html", icon: "👻", categoryLabelKey: "phantomKnights" },
        { name: "Phantom Knights' Burial", category: "card-games", path: "../Phantom Knights' Burial/card.html", icon: "🪦", categoryLabelKey: "phantomKnights" },
        { name: "Ghostly Wail", category: "card-games", path: "../Phantom Knights' Ghostly Wail/card.html", icon: "😱", categoryLabelKey: "phantomKnights" },
        { name: "Phantom Knights' Revival", category: "card-games", path: "../Phantom Knights' Revival/card.html", icon: "🔥", categoryLabelKey: "phantomKnights" },
        { name: "Phantom Knights' Tombstone", category: "card-games", path: "../Phantom Knights' Tombstone/card.html", icon: "🪦", categoryLabelKey: "phantomKnights" },
        { name: "Raiders' Resistance", category: "card-games", path: "../Raiders' Resistance/card.html", icon: "🛡️", categoryLabelKey: "phantomKnights" },
        { name: "The Phantom Knights' Coffin", category: "card-games", path: "../The Phantom Knights' Coffin/card.html", icon: "⚰️", categoryLabelKey: "phantomKnights" },
        { name: "RUM Rebellion", category: "card-games", path: "../The Phantom Knights' Rank-Up Magic Rebellion/card.html", icon: "✨", categoryLabelKey: "phantomKnights" },
        { name: "RUM Revolution", category: "card-games", path: "../The Phantom Knights' Rank-Up Magic Revolution/card.html", icon: "✨", categoryLabelKey: "phantomKnights" },
        { name: "Regretful Shield", category: "card-games", path: "../The Phantom Knights' Regretful Shield/card.html", icon: "🛡️", categoryLabelKey: "phantomKnights" },
        { name: "Shattered Spear", category: "card-games", path: "../The Phantom Knights' Shattered Spear/card.html", icon: "🔱", categoryLabelKey: "phantomKnights" },

        // Miscellaneous
        { name: "Block Breaker", category: "misc", path: "../Block Breaker/index.html", icon: "🧱", categoryLabelKey: "miscellaneous" },
        { name: "Grell-me Garden", category: "misc", path: "../Garden Project/index.html", icon: "🌱", categoryLabelKey: "miscellaneous" },
        { name: "Smoothie Slicer", category: "misc", path: "../Smoothie Slicer - Remake of Fruit Ninja/index.html", icon: "🍉", categoryLabelKey: "miscellaneous" },
        { name: "Tetris", category: "misc", path: "../Tetris/index.html", icon: "🧩", categoryLabelKey: "miscellaneous" },

    ];

    const availableProjects = projects;
    const gateAreas = {
        quest: {
            hash: 'quest-board',
            kicker: 'PLAYABLE ACCESS',
            title: 'Quest Board',
            copy: 'Playable games and published projects are ready to launch from this gate.',
            mode: 'projects'
        },
        loadout: {
            hash: 'loadout-bay',
            kicker: 'DEV LOADOUT',
            title: 'Loadout Bay',
            copy: 'Games, concepts, prototypes, and ideas still in development gather here before they are ready for the Quest Board.',
            prompt: 'Development Queue',
            points: ['Game concepts', 'Prototype builds', 'Design ideas', 'Work-in-progress updates']
        },
        guild: {
            hash: 'guild-gathering',
            kicker: 'COMMUNITY GATE',
            title: 'Guild Gathering',
            copy: "Members, moments, and events related to Gamers' Grind live inside this community gate.",
            prompt: 'Guild Records',
            points: ['Member showcases', 'Community moments', 'Event recaps', 'Upcoming gatherings']
        },
        party: {
            hash: 'party-arena',
            kicker: 'SQUAD ACCESS',
            title: 'Party Arena',
            copy: 'A fused gate for party links, group play, challenges, tournaments, and community competition.',
            prompt: 'Arena Signals',
            points: ['Play sessions', 'Tournament paths', 'Squad links', 'Challenge boards']
        },
        signal: {
            hash: 'signal-feed',
            kicker: 'BROADCAST CHANNEL',
            title: 'Signal Feed',
            copy: "Updates, announcements, and Cyber World broadcasts from Gamers' Grind.",
            prompt: 'Incoming Signals',
            points: ['News drops', 'Patch notes', 'Event alerts', 'Community updates']
        },
        review: {
            hash: 'review-log',
            kicker: 'REFERENCE ARCHIVE',
            title: 'Review Log',
            copy: 'Reviews and reference points for board games, card games, tabletop RPGs, video games, shops, stores, and other gaming places.',
            prompt: 'Scout Entries',
            points: ['Game reviews', 'Store notes', 'Tabletop references', 'Video game coverage']
        },
        shop: {
            hash: 'shop',
            kicker: 'MARKET GATE',
            title: 'Shop',
            copy: "Drops, gear, merch, and future store links for Gamers' Grind.",
            prompt: 'Shop Routing',
            points: ['Featured drops', 'Merch links', 'Gear picks', 'Future storefront']
        }
    };

    const gateHashMap = Object.entries(gateAreas).reduce((map, [gateKey, gate]) => {
        map[gate.hash] = gateKey;
        return map;
    }, {});

    const grid = document.getElementById('project-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gateLinks = document.querySelectorAll('.gate-link');
    const cyberNav = document.querySelector('.cyber-nav');
    const activeGateKicker = document.getElementById('active-gate-kicker');
    const activeGateTitle = document.getElementById('active-gate-title');
    const activeGateCopy = document.getElementById('active-gate-copy');
    const gateDetail = document.getElementById('gate-detail');

    let currentCategory = 'all';
    let currentGate = 'quest';
    let jackInExecuting = false;
    let currentLanguage = getInitialLanguage();

    function initializeCyberWorldCanvas() {
        const canvas = document.getElementById('world-canvas');

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let width = 0;
        let height = 0;
        let dpr = 1;
        let animationFrameId;

        const hubAnchor = { x: 0.4, y: 1.3, z: 0.8 };

        const towers = [
            { x: -8, y: 2, w: 1.4, d: 1.1, h: 4.8, color: '3, 231, 255', accent: '104, 255, 146', pulse: 0.2 },
            { x: -5, y: -1, w: 1.8, d: 1.3, h: 6.2, color: '104, 255, 146', accent: '255, 209, 102', pulse: 1.1 },
            { x: -1.4, y: 1.8, w: 1.5, d: 1.4, h: 5.4, color: '255, 209, 102', accent: '3, 231, 255', pulse: 2.4 },
            { x: 3.3, y: -1.6, w: 1.7, d: 1.2, h: 6.8, color: '255, 79, 216', accent: '255, 209, 102', pulse: 0.8 },
            { x: 6.8, y: 1.6, w: 1.5, d: 1.1, h: 5.7, color: '74, 163, 255', accent: '104, 255, 146', pulse: 1.9 },
            { x: 1.6, y: 4.4, w: 2.2, d: 1.3, h: 3.8, color: '3, 231, 255', accent: '255, 209, 102', pulse: 2.8 },
            { x: -10, y: -2.6, w: 1.2, d: 1.6, h: 3.6, color: '143, 125, 255', accent: '3, 231, 255', pulse: 1.6 },
            { x: -7.2, y: 5.2, w: 2.1, d: 1.1, h: 3.2, color: '255, 159, 28', accent: '188, 255, 72', pulse: 2.1 },
            { x: 4.8, y: 5.6, w: 1.7, d: 1.5, h: 4.4, color: '188, 255, 72', accent: '255, 79, 216', pulse: 3.4 },
            { x: 8.2, y: -3.4, w: 1.4, d: 1.6, h: 4.9, color: '255, 79, 216', accent: '3, 231, 255', pulse: 0.4 },
            { x: 0.2, y: -5.2, w: 2, d: 1.4, h: 3.7, color: '74, 163, 255', accent: '255, 209, 102', pulse: 2.7 }
        ];

        const platforms = [
            { x: -3.6, y: 3.1, w: 2.8, d: 1.6, z: 0.18, color: '3, 231, 255', accent: '255, 209, 102', pulse: 0.2 },
            { x: 1.6, y: 1.7, w: 3.2, d: 1.7, z: 0.28, color: '143, 125, 255', accent: '255, 79, 216', pulse: 1.2 },
            { x: -6.5, y: -0.3, w: 2.6, d: 1.4, z: 0.2, color: '188, 255, 72', accent: '3, 231, 255', pulse: 2.2 },
            { x: 5.4, y: -0.3, w: 2.8, d: 1.4, z: 0.22, color: '255, 159, 28', accent: '3, 231, 255', pulse: 3.1 }
        ];

        const districtBeacons = [
            { x: -6.2, y: -0.1, z: 1.2, color: '3, 231, 255', pulse: 0.4 },
            { x: -3.1, y: 3.4, z: 1.1, color: '104, 255, 146', pulse: 1.1 },
            { x: 2.8, y: 2.1, z: 1.3, color: '143, 125, 255', pulse: 1.9 },
            { x: 5.9, y: -0.1, z: 1.15, color: '255, 209, 102', pulse: 2.7 },
            { x: 4.6, y: 5.5, z: 1.05, color: '255, 159, 28', pulse: 3.3 }
        ];

        const routes = [
            { color: '3, 231, 255', points: [{ x: -9, y: 5 }, { x: -5, y: 2 }, { x: -1, y: 3.4 }, { x: 3.8, y: -1 }, { x: 8, y: 2.4 }], speed: 0.00022, offset: 0 },
            { color: '104, 255, 146', points: [{ x: -7, y: -2 }, { x: -3, y: 0.8 }, { x: 1, y: -1.8 }, { x: 6, y: 1.2 }], speed: 0.00018, offset: 0.33 },
            { color: '255, 209, 102', points: [{ x: -4, y: 6 }, { x: 0, y: 4.4 }, { x: 2.6, y: 2.2 }, { x: 7.5, y: 4.5 }], speed: 0.00016, offset: 0.66 },
            { color: '255, 79, 216', points: [{ x: -10, y: -1.8 }, { x: -5.6, y: -0.4 }, { x: -1.2, y: 0.9 }, { x: 3.2, y: 0.4 }, { x: 8.8, y: -2.8 }], speed: 0.0002, offset: 0.16 },
            { color: '143, 125, 255', points: [{ x: -8.2, y: 4.5 }, { x: -3.6, y: 2.6 }, { x: 0.1, y: 1.6 }, { x: 4.2, y: 3.2 }, { x: 9.2, y: 1.4 }], speed: 0.00014, offset: 0.52 },
            { color: '188, 255, 72', points: [{ x: -2.2, y: -5.4 }, { x: -0.7, y: -2.1 }, { x: 0.4, y: 0.1 }, { x: 1.2, y: 2.6 }, { x: 2.8, y: 6.1 }], speed: 0.00017, offset: 0.75 }
        ];

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function iso(x, y, z = 0) {
            const tileWidth = Math.max(42, Math.min(70, width / 18));
            const tileHeight = tileWidth * 0.48;
            const horizon = height * 0.54;

            return {
                x: width / 2 + (x - y) * tileWidth * 0.5,
                y: horizon + (x + y) * tileHeight * 0.5 - z * tileHeight
            };
        }

        function drawPath(points, closePath = false) {
            points.forEach((point, index) => {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });

            if (closePath) {
                ctx.closePath();
            }
        }

        function drawBackgroundGlow() {
            const gradient = ctx.createRadialGradient(width * 0.5, height * 0.46, 20, width * 0.5, height * 0.55, Math.max(width, height) * 0.55);
            gradient.addColorStop(0, 'rgba(247, 253, 255, 0.12)');
            gradient.addColorStop(0.18, 'rgba(3, 231, 255, 0.14)');
            gradient.addColorStop(0.42, 'rgba(143, 125, 255, 0.08)');
            gradient.addColorStop(0.68, 'rgba(255, 79, 216, 0.05)');
            gradient.addColorStop(1, 'rgba(3, 4, 7, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        function drawGrid(time) {
            const limit = 12;
            ctx.lineWidth = 1;

            for (let i = -limit; i <= limit; i += 1) {
                const alpha = i % 4 === 0 ? 0.2 : 0.09;
                const startA = iso(i, -limit);
                const endA = iso(i, limit);
                const startB = iso(-limit, i);
                const endB = iso(limit, i);

                ctx.strokeStyle = `rgba(3, 231, 255, ${alpha * 1.08})`;
                ctx.beginPath();
                ctx.moveTo(startA.x, startA.y + Math.sin(time / 900 + i) * 1.5);
                ctx.lineTo(endA.x, endA.y);
                ctx.stroke();

                ctx.strokeStyle = `rgba(143, 125, 255, ${alpha * 0.88})`;
                ctx.beginPath();
                ctx.moveTo(startB.x, startB.y);
                ctx.lineTo(endB.x, endB.y + Math.cos(time / 880 + i) * 1.5);
                ctx.stroke();
            }
        }

        function drawTower(tower, time) {
            const baseA = iso(tower.x, tower.y);
            const baseB = iso(tower.x + tower.w, tower.y);
            const baseC = iso(tower.x + tower.w, tower.y + tower.d);
            const baseD = iso(tower.x, tower.y + tower.d);
            const topA = iso(tower.x, tower.y, tower.h);
            const topB = iso(tower.x + tower.w, tower.y, tower.h);
            const topC = iso(tower.x + tower.w, tower.y + tower.d, tower.h);
            const topD = iso(tower.x, tower.y + tower.d, tower.h);
            const flicker = 0.75 + Math.sin(time / 420 + tower.pulse) * 0.18;

            ctx.beginPath();
            drawPath([topA, topB, topC, topD], true);
            ctx.fillStyle = `rgba(${tower.accent}, ${0.22 * flicker})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(${tower.accent}, 0.5)`;
            ctx.stroke();

            ctx.beginPath();
            drawPath([topB, baseB, baseC, topC], true);
            ctx.fillStyle = `rgba(${tower.color}, ${0.13 * flicker})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(${tower.color}, 0.34)`;
            ctx.stroke();

            ctx.beginPath();
            drawPath([topA, baseA, baseD, topD], true);
            ctx.fillStyle = `rgba(${tower.color}, ${0.08 * flicker})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(${tower.color}, 0.25)`;
            ctx.stroke();

            const windowCount = Math.max(3, Math.floor(tower.h));
            for (let i = 1; i < windowCount; i += 1) {
                const left = iso(tower.x + 0.08, tower.y, (tower.h / windowCount) * i);
                const right = iso(tower.x + tower.w - 0.08, tower.y, (tower.h / windowCount) * i);
                ctx.strokeStyle = `rgba(${tower.accent}, ${0.13 + ((i + Math.floor(time / 500)) % 3 === 0 ? 0.24 : 0)})`;
                ctx.beginPath();
                ctx.moveTo(left.x, left.y);
                ctx.lineTo(right.x, right.y);
                ctx.stroke();
            }
        }

        function drawPlatform(platform, time) {
            const baseA = iso(platform.x, platform.y, platform.z);
            const baseB = iso(platform.x + platform.w, platform.y, platform.z);
            const baseC = iso(platform.x + platform.w, platform.y + platform.d, platform.z);
            const baseD = iso(platform.x, platform.y + platform.d, platform.z);
            const flicker = 0.76 + Math.sin(time / 520 + platform.pulse) * 0.18;

            ctx.beginPath();
            drawPath([baseA, baseB, baseC, baseD], true);
            ctx.fillStyle = `rgba(${platform.color}, ${0.12 * flicker})`;
            ctx.fill();
            ctx.lineWidth = 1.4;
            ctx.strokeStyle = `rgba(${platform.accent}, ${0.54 * flicker})`;
            ctx.shadowColor = `rgba(${platform.accent}, 0.24)`;
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.shadowBlur = 0;

            const midA = iso(platform.x + platform.w * 0.18, platform.y + platform.d * 0.5, platform.z + 0.03);
            const midB = iso(platform.x + platform.w * 0.82, platform.y + platform.d * 0.5, platform.z + 0.03);
            ctx.strokeStyle = `rgba(247, 253, 255, ${0.14 * flicker})`;
            ctx.beginPath();
            ctx.moveTo(midA.x, midA.y);
            ctx.lineTo(midB.x, midB.y);
            ctx.stroke();
        }

        function drawHub(time) {
            const hub = iso(hubAnchor.x, hubAnchor.y, hubAnchor.z);
            const pulse = 0.84 + Math.sin(time / 430) * 0.16;

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = `rgba(3, 231, 255, ${0.34 * pulse})`;
            ctx.lineWidth = 2;
            ctx.shadowColor = 'rgba(3, 231, 255, 0.5)';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.ellipse(hub.x, hub.y, 84 * pulse, 31 * pulse, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = `rgba(255, 79, 216, ${0.24 * pulse})`;
            ctx.beginPath();
            ctx.ellipse(hub.x, hub.y, 124 * pulse, 47 * pulse, 0, 0, Math.PI * 2);
            ctx.stroke();

            const core = ctx.createRadialGradient(hub.x, hub.y, 2, hub.x, hub.y, 70);
            core.addColorStop(0, `rgba(247, 253, 255, ${0.48 * pulse})`);
            core.addColorStop(0.32, `rgba(3, 231, 255, ${0.2 * pulse})`);
            core.addColorStop(0.72, `rgba(143, 125, 255, ${0.12 * pulse})`);
            core.addColorStop(1, 'rgba(255, 79, 216, 0)');
            ctx.fillStyle = core;
            ctx.beginPath();
            ctx.arc(hub.x, hub.y, 70, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        function drawHubConnectors(time) {
            const hub = iso(hubAnchor.x, hubAnchor.y, hubAnchor.z);

            districtBeacons.forEach((beacon, index) => {
                const target = iso(beacon.x, beacon.y, beacon.z);
                const pulse = 0.62 + Math.sin(time / 680 + beacon.pulse) * 0.16;

                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.setLineDash([12, 10]);
                ctx.lineDashOffset = -time / (34 + index * 4);
                ctx.lineWidth = 1.3;
                ctx.strokeStyle = `rgba(${beacon.color}, ${0.12 * pulse})`;
                ctx.shadowColor = `rgba(${beacon.color}, 0.22)`;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.moveTo(hub.x, hub.y);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();
                ctx.restore();
            });
        }

        function drawDistrictBeacon(beacon, time) {
            const point = iso(beacon.x, beacon.y, beacon.z);
            const pulse = 0.78 + Math.sin(time / 520 + beacon.pulse) * 0.18;
            const ringWidth = 22 * pulse;
            const ringHeight = 8 * pulse;

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = `rgba(${beacon.color}, ${0.38 * pulse})`;
            ctx.lineWidth = 1.2;
            ctx.shadowColor = `rgba(${beacon.color}, 0.34)`;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.ellipse(point.x, point.y + 8, ringWidth, ringHeight, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.translate(point.x, point.y);
            ctx.rotate(Math.PI / 4);
            ctx.fillStyle = `rgba(${beacon.color}, ${0.52 * pulse})`;
            ctx.fillRect(-4.5, -4.5, 9, 9);
            ctx.strokeStyle = 'rgba(247, 253, 255, 0.5)';
            ctx.strokeRect(-4.5, -4.5, 9, 9);
            ctx.restore();
        }

        function interpolateRoute(points, progress) {
            const screenPoints = points.map(point => iso(point.x, point.y));
            const segmentLengths = [];
            let totalLength = 0;

            for (let i = 0; i < screenPoints.length - 1; i += 1) {
                const dx = screenPoints[i + 1].x - screenPoints[i].x;
                const dy = screenPoints[i + 1].y - screenPoints[i].y;
                const length = Math.hypot(dx, dy);
                segmentLengths.push(length);
                totalLength += length;
            }

            let distance = progress * totalLength;

            for (let i = 0; i < segmentLengths.length; i += 1) {
                if (distance <= segmentLengths[i]) {
                    const localProgress = distance / segmentLengths[i];
                    return {
                        x: screenPoints[i].x + (screenPoints[i + 1].x - screenPoints[i].x) * localProgress,
                        y: screenPoints[i].y + (screenPoints[i + 1].y - screenPoints[i].y) * localProgress
                    };
                }

                distance -= segmentLengths[i];
            }

            return screenPoints[screenPoints.length - 1];
        }

        function drawRoutes(time) {
            routes.forEach(route => {
                const points = route.points.map(point => iso(point.x, point.y));
                ctx.lineWidth = 2.4;
                ctx.strokeStyle = `rgba(${route.color}, 0.18)`;
                ctx.shadowColor = `rgba(${route.color}, 0.22)`;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                drawPath(points);
                ctx.stroke();
                ctx.shadowBlur = 0;

                for (let i = 0; i < 3; i += 1) {
                    const progress = (route.offset + i * 0.32 + time * route.speed) % 1;
                    const packet = interpolateRoute(route.points, progress);
                    const size = 4 + i;

                    ctx.save();
                    ctx.translate(packet.x, packet.y);
                    ctx.rotate(Math.PI / 4);
                    ctx.fillStyle = `rgba(${route.color}, 0.78)`;
                    ctx.shadowColor = `rgba(${route.color}, 0.54)`;
                    ctx.shadowBlur = 10;
                    ctx.fillRect(-size / 2, -size / 2, size, size);
                    ctx.restore();
                }
            });
        }

        function drawFrame(time = 0) {
            ctx.clearRect(0, 0, width, height);
            drawBackgroundGlow();
            drawGrid(time);
            platforms
                .slice()
                .sort((a, b) => (a.x + a.y) - (b.x + b.y))
                .forEach(platform => drawPlatform(platform, time));
            drawHubConnectors(time);
            drawRoutes(time);
            drawHub(time);
            districtBeacons.forEach(beacon => drawDistrictBeacon(beacon, time));
            towers
                .slice()
                .sort((a, b) => (a.x + a.y) - (b.x + b.y))
                .forEach(tower => drawTower(tower, time));

            if (!reducedMotion) {
                animationFrameId = requestAnimationFrame(drawFrame);
            }
        }

        resizeCanvas();
        window.addEventListener('resize', () => {
            resizeCanvas();
            if (reducedMotion) {
                drawFrame(0);
            }
        });
        drawFrame(0);

        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationFrameId);
        });
    }

    function readSavedLanguage() {
        try {
            return localStorage.getItem(languageStorageKey);
        } catch (error) {
            return null;
        }
    }

    function saveLanguage(language) {
        try {
            localStorage.setItem(languageStorageKey, language);
        } catch (error) {
            // Language switching still works when storage is unavailable.
        }
    }

    function hasCompletedJackIn() {
        try {
            return sessionStorage.getItem(jackInSessionKey) === 'true';
        } catch (error) {
            return false;
        }
    }

    function saveJackInComplete() {
        try {
            sessionStorage.setItem(jackInSessionKey, 'true');
        } catch (error) {
            // Returning to the catalog still works even when storage is unavailable.
        }
    }

    function normalizeRouteToken(value) {
        return (value || '').replace('#', '').toLowerCase();
    }

    function getGateKeyFromToken(value) {
        const token = normalizeRouteToken(value);

        if (gateAreas[token]) {
            return token;
        }

        return gateHashMap[token] || null;
    }

    function hasCatalogDeepLink() {
        const hash = window.location.hash.replace('#', '').toLowerCase();
        const catalogHashes = ['hub', 'main-hub', 'catalog', 'archive'];

        if (catalogHashes.includes(hash) || getGateKeyFromToken(hash)) {
            return true;
        }

        const params = new URLSearchParams(window.location.search);
        const view = (params.get('view') || '').toLowerCase();
        const gate = (params.get('gate') || '').toLowerCase();

        return catalogHashes.includes(view) || getGateKeyFromToken(view) || getGateKeyFromToken(gate) || params.has('hub') || params.has('catalog');
    }

    function shouldOpenCatalog() {
        return hasCompletedJackIn() || hasCatalogDeepLink();
    }

    function showCatalog(options = {}) {
        if (options.remember) {
            saveJackInComplete();
        }

        document.documentElement.classList.add('catalog-return');
        jackInExecuting = false;
        jackInScreen.style.display = 'none';
        cyberWorld.classList.remove('hidden');

        jackInFlash.classList.add('hidden');
        jackInFlash.classList.remove('anim-flash');
        jackInTunnel.classList.add('hidden');
        jackInTunnel.classList.remove('anim-tunnel');

        jackInBtn.style.pointerEvents = '';
        jackInBtn.textContent = t('intro.button');
    }

    function getInitialLanguage() {
        const savedLanguage = readSavedLanguage();

        if (supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }

        const browserLanguage = navigator.language || navigator.userLanguage || '';
        return browserLanguage.toLowerCase().startsWith('ja') ? 'ja' : 'en';
    }

    function getInitialGate() {
        const params = new URLSearchParams(window.location.search);
        return getGateKeyFromToken(window.location.hash) || getGateKeyFromToken(params.get('gate')) || getGateKeyFromToken(params.get('view')) || 'quest';
    }

    function t(key) {
        const parts = key.split('.');
        let value = translations[currentLanguage];

        for (const part of parts) {
            value = value?.[part];
        }

        if (typeof value === 'string') {
            return value;
        }

        let fallback = translations.en;
        for (const part of parts) {
            fallback = fallback?.[part];
        }

        return typeof fallback === 'string' ? fallback : key;
    }

    function categoryLabel(key) {
        return translations[currentLanguage].categories[key] || translations.en.categories[key] || key;
    }

    function getProjectName(project) {
        return project.names?.[currentLanguage] || project.name;
    }

    function updateStaticText() {
        document.documentElement.lang = currentLanguage;
        document.title = t('meta.title');

        if (metaDescription) {
            metaDescription.setAttribute('content', t('meta.description'));
        }

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const translatedText = t(element.getAttribute('data-i18n'));
            element.textContent = translatedText;

            if (element.classList.contains('glitch-text')) {
                element.setAttribute('data-text', translatedText);
            }
        });

        if (jackInBtn) {
            jackInBtn.textContent = jackInExecuting ? t('intro.executing') : t('intro.button');
        }

        if (languageControl) {
            languageControl.setAttribute('aria-label', t('language.selector'));
        }

        languageBtns.forEach(button => {
            const isActive = button.getAttribute('data-language') === currentLanguage;
            const languageName = button.getAttribute('data-language') === 'ja' ? t('language.japanese') : t('language.english');

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
            button.setAttribute('aria-label', languageName);
        });
    }

    function renderGateDetail(gate) {
        gateDetail.replaceChildren();

        const title = document.createElement('h3');
        const copy = document.createElement('p');
        const list = document.createElement('ul');

        title.textContent = gate.prompt;
        copy.textContent = gate.copy;

        gate.points.forEach(point => {
            const item = document.createElement('li');
            item.textContent = point;
            list.appendChild(item);
        });

        gateDetail.append(title, copy, list);
    }

    function setActiveGate(gateKey, options = {}) {
        const nextGate = gateAreas[gateKey] ? gateKey : 'quest';
        const gate = gateAreas[nextGate];

        currentGate = nextGate;

        gateLinks.forEach(link => {
            const isActive = link.dataset.gate === currentGate;
            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        activeGateKicker.textContent = gate.kicker;
        activeGateTitle.textContent = gate.title;
        activeGateCopy.textContent = gate.copy;

        if (gate.mode === 'projects') {
            cyberNav.classList.remove('hidden');
            grid.classList.remove('hidden');
            gateDetail.classList.add('hidden');
            renderProjects();
        } else {
            cyberNav.classList.add('hidden');
            grid.classList.add('hidden');
            gateDetail.classList.remove('hidden');
            renderGateDetail(gate);
        }

        if (options.updateHash) {
            history.pushState(null, '', `#${gate.hash}`);
        }
    }

    function setLanguage(language) {
        if (!supportedLanguages.includes(language)) {
            return;
        }

        currentLanguage = language;
        saveLanguage(language);
        updateStaticText();

        if (currentGate === 'quest') {
            renderProjects();
        }
    }

    // Function to render projects based on current filters
    function renderProjects() {
        grid.innerHTML = ''; // Clear grid

        let filteredProjects = currentCategory === 'all'
            ? availableProjects
            : availableProjects.filter(project => project.category === currentCategory);

        filteredProjects.forEach((project, index) => {
            const projectName = getProjectName(project);
            const card = document.createElement('a');
            const iconWrapper = document.createElement('div');
            const icon = document.createElement('div');
            const title = document.createElement('h3');
            const category = document.createElement('span');

            card.href = project.path;
            card.className = `project-card project-card--${project.category}`;
            card.dataset.category = project.category;
            card.style.animationDelay = `${index * 0.05}s`;
            card.setAttribute('aria-label', projectName);

            iconWrapper.className = 'card-icon-wrapper';
            icon.className = 'card-icon';
            icon.textContent = project.icon;

            title.className = 'card-title';
            title.textContent = projectName;

            category.className = 'card-category';
            category.textContent = categoryLabel(project.categoryLabelKey);

            iconWrapper.appendChild(icon);
            card.append(iconWrapper, title, category);
            grid.appendChild(card);
        });
    }

    languageBtns.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.getAttribute('data-language'));
        });
    });

    gateLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            setActiveGate(link.dataset.gate, { updateHash: true });
        });
    });

    jackInBtn.addEventListener('click', () => {
        jackInExecuting = true;
        jackInBtn.textContent = t('intro.executing');
        jackInBtn.style.pointerEvents = 'none';
        saveJackInComplete();

        // Start tunnel expansion
        jackInTunnel.classList.remove('hidden');
        jackInTunnel.classList.add('anim-tunnel');

        // Flash screen white after short delay
        setTimeout(() => {
            jackInFlash.classList.remove('hidden');
            jackInFlash.classList.add('anim-flash');

            // Hide intro screen and show lobby during the flash
            setTimeout(() => {
                showCatalog();
            }, 200);

        }, 600);
    });

    updateStaticText();
    initializeCyberWorldCanvas();
    setActiveGate(getInitialGate());

    if (shouldOpenCatalog()) {
        showCatalog({ remember: true });
    }

    window.addEventListener('hashchange', () => {
        setActiveGate(getInitialGate());
    });

    window.addEventListener('pageshow', () => {
        if (shouldOpenCatalog()) {
            showCatalog();
        }
    });

    // Main Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.getAttribute('data-filter');

            setActiveGate('quest');
            renderProjects();
        });
    });
});
