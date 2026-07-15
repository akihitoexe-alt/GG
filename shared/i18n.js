(function () {
  const STORAGE_KEY = "gameLobbyLanguage";
  const LEGACY_STORAGE_KEY = "gg-language";
  const SUPPORTED = new Set(["en", "ja"]);

  const UI_TEXT = {
    en: {
      "language.group": "Language selection",
      "language.label": "LANGUAGE",
      "language.english": "English",
      "language.japanese": "Japanese",
      "lobby.documentTitle": "Gamers' Grind - Cyberworld",
      "lobby.petTerminal": "PET TERMINAL_",
      "lobby.status": "SYSTEM STANDBY...",
      "lobby.jackIn": "JACK IN!! EXECUTE",
      "lobby.executing": "EXECUTING...",
      "lobby.subtitle": "NET AREA // CENTRAL HUB",
      "lobby.filter.all": "ALL DATA",
      "lobby.filter.cards": "BATTLE CARDS",
      "lobby.filter.board": "BOARD SIM",
      "lobby.filter.mobile": "MOBILE NET",
      "lobby.filter.console": "CONSOLE LINK",
      "lobby.filter.misc": "MISC DATA",
      "lobby.dataType": "DATA TYPE:",
      "lobby.makerId": "MAKER ID:",
      "reveal.skip": "Skip",
      "reveal.skipLabel": "Skip card reveal",
      "reveal.leftSmall": "Lunar scan",
      "reveal.leftStrong": "Signal found",
      "reveal.focus": "Focus card",
      "landing.documentTitle": "Redirecting to Gamers' Grind...",
      "landing.connecting": "CONNECTING TO THE NET...",
      "landing.redirectPrefix": "If you are not redirected automatically,",
      "landing.redirectLink": "Click here to Jack In"
    },
    ja: {
      "language.group": "言語選択",
      "language.label": "言語",
      "language.english": "英語",
      "language.japanese": "日本語",
      "lobby.documentTitle": "ゲーマーズ・グラインド - サイバーワールド",
      "lobby.petTerminal": "PET端末_",
      "lobby.status": "システム待機中...",
      "lobby.jackIn": "ジャックイン！！ 実行",
      "lobby.executing": "実行中...",
      "lobby.subtitle": "ネットエリア // セントラルハブ",
      "lobby.filter.all": "すべて",
      "lobby.filter.cards": "カード",
      "lobby.filter.board": "ボード",
      "lobby.filter.mobile": "モバイル",
      "lobby.filter.console": "コンソール",
      "lobby.filter.misc": "その他",
      "lobby.dataType": "データ種別:",
      "lobby.makerId": "メーカー:",
      "reveal.skip": "スキップ",
      "reveal.skipLabel": "カード演出をスキップ",
      "reveal.leftSmall": "月光スキャン",
      "reveal.leftStrong": "シグナル検出",
      "reveal.focus": "注目カード",
      "landing.documentTitle": "ゲーマーズ・グラインドへ接続中...",
      "landing.connecting": "ネットへ接続中...",
      "landing.redirectPrefix": "自動的に移動しない場合は、",
      "landing.redirectLink": "ここからジャックイン"
    }
  };

  const PROJECT_NAMES_JA = {
    "Dark Renaissance Xyz Dragon": "ダーク・ルネサンス・エクシーズ・ドラゴン",
    "Dark Revolution Xyz Dragon": "ダーク・レボリューション・エクシーズ・ドラゴン",
    "Baneful Javelin": "幻影騎士団ベインフル・ジャベリン",
    "Broken Helm": "幻影騎士団ブロークン・ヘルム",
    "Dark Star": "幻影騎士団ダーク・スター",
    "Decrepit Scepter": "幻影騎士団ディクレピット・セプター",
    "Dreadful Hammer": "幻影騎士団ドレッドフル・ハンマー",
    "Feeble Armor": "幻影騎士団フィーブル・アーマー",
    "Haunting Arrows": "幻影騎士団ホーンティング・アローズ",
    "Jagged Gloves": "幻影騎士団ジャギッド・グローブ",
    "Vengeful Axe": "幻影騎士団ヴェンジフル・アックス",
    "Rebellious Soul": "幻影騎士団リベリアス・ソウル",
    "Phantom Knights' Burial": "幻影騎士団の埋葬",
    "Phantom Knights' Chain": "幻影騎士団の鎖",
    "Corrupted Cuffs": "幻影騎士団の堕ちた手枷",
    "Ghostly Wail": "幻影騎士団の亡霊の嘆き",
    "Phantom Knights' Revival": "幻影騎士団の蘇生",
    "Shattered Staff": "幻影騎士団の砕けた杖",
    "Sorrowful Shackles": "幻影騎士団の悲嘆の枷",
    "Tainted Necklace": "幻影騎士団の穢れた首飾り",
    "Phantom Knights' Tombstone": "幻影騎士団の墓石",
    "Raiders' Resistance": "レイダーズ・レジスタンス",
    "Restless Souls": "反逆の彷徨える魂",
    "The Phantom Knights' Coffin": "幻影騎士団の棺",
    "The Phantom Knights' Graveyard": "幻影騎士団の墓地",
    "RUM Rebellion": "RUMリベリオン",
    "RUM Revenge": "RUMリベンジ",
    "RUM Revolution": "RUMレボリューション",
    "Regretful Shield": "幻影騎士団の悔恨の盾",
    "Shattered Spear": "幻影騎士団の砕けた槍",
    "Block Breaker": "ブロックブレイカー",
    "Dead Cells": "デッドセルズ",
    "Smoothie Slicer": "スムージー・スライサー",
    "Tetris": "テトリス",
    "Antigravity Chess": "反重力チェス",
    "Mobile RPG Adventure": "モバイルRPGアドベンチャー",
    "Puzzle Pop": "パズルポップ",
    "Pocket Racer": "ポケットレーサー",
    "Epic Fantasy VII": "エピックファンタジーVII",
    "Super Plumber Bros": "スーパープラマー兄弟",
    "Halo Strike": "ヘイロー・ストライク"
  };

  const LABELS_JA = {
    "Phantom Knights": "幻影騎士団",
    "Miscellaneous": "その他",
    "Board Game": "ボードゲーム",
    "Mobile RPG": "モバイルRPG",
    "Mobile Puzzle": "モバイルパズル",
    "Mobile Racing": "モバイルレース",
    "Console RPG": "コンソールRPG",
    "Console Platformer": "コンソールアクション",
    "Console Shooter": "コンソールシューティング",
    "All": "すべて",
    "RPG": "RPG",
    "Puzzle": "パズル",
    "Racing": "レース",
    "Action": "アクション",
    "Square-Enix": "スクウェア・エニックス",
    "King": "King",
    "Nintendo": "任天堂",
    "Apple": "Apple",
    "PlayStation": "PlayStation",
    "Xbox": "Xbox",
    "Platformer": "アクション",
    "Shooter": "シューティング"
  };

  const CARD_JA = {
    "Dark Renaissance Xyz Dragon": {
      name: "ダーク・ルネサンス・エクシーズ・ドラゴン",
      attribute: "闇",
      attributeTitle: "闇属性",
      rankLabel: "ランク",
      typeLine: "【ドラゴン族／エクシーズ／効果】",
      materials: "レベル5の闇属性モンスター×3",
      effectHtml: `<p>このカードが「ダーク・リベリオン・エクシーズ・ドラゴン」をエクシーズ素材としている場合、以下の効果を得る。</p>
        <p>● 1ターンに1度、このカードのエクシーズ素材を1つ取り除き、相手フィールドの表側表示モンスター1体を対象として発動できる。そのモンスターの攻撃力を0にし、その元々の攻撃力の半分だけ自分のLPを回復する。</p>
        <p>● 相手が魔法・罠カードまたは効果を発動した時に発動できる（相手ターンでも発動できる）。このカードのエクシーズ素材を1つ取り除き、その発動を無効にして破壊する。その後、自分の墓地の「幻影騎士団」または「エクシーズ・ドラゴン」モンスター1体を対象とし、自分フィールドに特殊召喚するか、このカードのエクシーズ素材とする。</p>`,
      statsHtml: statHtml("3000", "2500"),
      rarity: "注目カード",
      revealTagline: "闇より蘇る反逆のエクシーズ・ドラゴン。"
    },
    "Dark Revolution Xyz Dragon": {
      name: "ダーク・レボリューション・エクシーズ・ドラゴン",
      attribute: "闇",
      attributeTitle: "闇属性",
      rankLabel: "ランク",
      typeLine: "【ドラゴン族／エクシーズ／効果】",
      materials: "自分フィールドの「幻影騎士団」エクシーズモンスターまたは「エクシーズ・ドラゴン」エクシーズモンスターを対象とする「RUM」魔法カードの効果でのみ、まずエクシーズ召喚できる。（その素材もこのカードに重ねる。）この方法以外では特殊召喚できない。",
      effectHtml: `<p><strong>永続効果</strong></p>
        <p>このカードは他のカードの効果を受けない。このカードは相手モンスター全てに1回ずつ攻撃できる。ダメージステップ開始時、このカードが表側表示の特殊召喚されたモンスターと戦闘を行う場合、そのモンスターの攻撃力・守備力は0になる。</p>
        <p>① このカードがエクシーズ召喚に成功した場合、このカードの素材としているエクシーズモンスターの数まで、相手フィールドの表側表示モンスターを対象として発動できる。この効果の発動前にそのモンスターがフィールドで持っていた元々の攻撃力の合計の半分のダメージを相手に与える。</p>
        <p>②（相手ターンでも発動できる）このカードの素材を1つ取り除いて発動できる。相手フィールドの表側表示モンスター全ての攻撃力は現在の攻撃力の半分だけダウンし、このカードの攻撃力はそのダウンした数値の合計分アップする。このターン終了時まで、相手はこのカードの攻撃宣言に対してカードや効果を発動できない。</p>
        <p>③ このカードが「幻影騎士団」エクシーズモンスターを素材としている場合、以下の効果を得る。</p>
        <p>● 1ターンに1度、このカードの素材を1つ取り除き、自分の墓地の「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体を対象として発動できる。このカードはターン終了時までそのモンスターの効果を得る。その後、対象のモンスターをこのカードの素材とする。</p>
        <p>● このカードが相手のカードの効果で破壊され墓地へ送られた場合に発動できる。自分の墓地の「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体を召喚条件を無視して特殊召喚し、このカードをそのモンスターの素材とする。</p>`,
      statsHtml: statHtml("3500", "3000"),
      rarity: "注目カード",
      revealTagline: "反逆の闇を革命へ変える切り札。"
    },
    "Phantom Knights' Burial": {
      name: "幻影騎士団の埋葬",
      attribute: "罠",
      attributeTitle: "罠カード",
      badgeLabel: "永続罠",
      effectHtml: `<p>【罠カード／永続】</p>
        <p>フィールドの効果モンスター1体を対象として発動できる。そのモンスターの効果を無効にし、攻撃できず、表示形式も変更できない。モンスターはその表側表示モンスターを攻撃対象にできず、そのモンスターはリリース、融合・シンクロ・エクシーズ・リンク召喚の素材にできない。そのモンスターがフィールドを離れた時、このカードを破壊する。</p>
        <p>自分の墓地のこのカードを除外し、自分の墓地の「幻影騎士団」または「エクシーズ・ドラゴン」モンスター1体を対象として発動できる。そのモンスターを特殊召喚するかデッキに戻す。特殊召喚した場合、そのモンスターはフィールドを離れた時に除外される。</p>
        <p>「幻影騎士団の埋葬」の効果は1ターンに1つしか使用できず、その効果は1度しか使用できない。</p>`,
      setInfo: "PK-EN004 | シークレットレア",
      copyright: "©カスタムデザイン - 幻影騎士団シリーズ",
      titleLabel: "— 幻影騎士団の埋葬 —"
    },
    "Phantom Knights' Ghostly Wail": {
      name: "幻影騎士団の亡霊の嘆き",
      attribute: "魔法",
      attributeTitle: "魔法カード",
      effectHtml: `<p>【魔法カード／速攻】</p>
        <p>相手がカードまたは効果を発動した時に発動できる。自分の手札・表側表示フィールドから任意の数の「幻影騎士団」カードを墓地へ送り、その数まで相手フィールドの表側表示カードを対象とする（発動したカードがフィールドに存在する場合、それも対象にできる）。ターン終了時まで対象のカードの効果を無効にし、そのカードがフィールドを離れる場合に除外する。</p>
        <p>このカードが墓地へ送られたターンを除く、自分の墓地のこのカードを除外し、自分の除外状態の「幻影騎士団」カード1枚を対象として発動できる。そのカードを墓地へ戻す。</p>
        <p>「幻影騎士団の亡霊の嘆き」は1ターンに1枚しか発動できない。</p>`,
      setInfo: "PK-EN002 | ウルトラレア",
      copyright: "©カスタムデザイン - 幻影騎士団シリーズ",
      titleLabel: "— 幻影騎士団の亡霊の嘆き —"
    },
    "Phantom Knights' Graveyard": {
      name: "幻影騎士団の墓地",
      attribute: "魔法",
      attributeTitle: "魔法カード",
      effectHtml: `<p>【魔法カード／フィールド】</p>
        <p>自分フィールドの「幻影騎士団」エクシーズモンスターおよび「エクシーズ・ドラゴン」エクシーズモンスターは、相手の魔法・罠カードまたは効果の対象にならず、相手の魔法・罠カードの効果では破壊されない。</p>
        <p>墓地で発動する、自分の「幻影騎士団」と記されたカードおよび効果の発動は無効にされない。</p>
        <p>このカードの発動時の効果処理として、デッキから「幻影騎士団」カード1枚を手札に加えるか墓地へ送ることができる。</p>
        <p>「幻影騎士団の墓地」の以下の効果はそれぞれ1ターンに1度しか使用できない。</p>
        <p>● 自分フィールドの「幻影騎士団」または「エクシーズ・ドラゴン」モンスターが戦闘・効果で破壊される場合、代わりに自分フィールドのエクシーズモンスターの素材を1つ取り除くことができる。その場合、デッキから「幻影騎士団」カード1枚を墓地へ送る。</p>
        <p>● このカードが墓地へ送られたターンを除く、相手モンスターの直接攻撃宣言時に、自分の墓地のこのカードを除外し、自分の墓地の「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体を対象として発動できる。そのモンスターを素材として、そのモンスターよりランクが1つまたは2つ高い「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体をEXデッキから特殊召喚する。（これはエクシーズ召喚扱いとし、対象の素材は特殊召喚したモンスターへ移す。）</p>
        <p>「幻影騎士団の墓地」は1ターンに1枚しか発動できない。</p>`,
      setInfo: "PK-EN001 | ウルトラレア",
      copyright: "©カスタムデザイン - 幻影騎士団シリーズ",
      titleLabel: "— 幻影騎士団の墓地 —"
    },
    "Phantom Knights' Revival": {
      name: "幻影騎士団の蘇生",
      attribute: "罠",
      attributeTitle: "罠カード",
      badgeLabel: "通常罠",
      effectHtml: `<p>【罠カード／通常】</p>
        <p>自分フィールドにモンスターが存在しない場合に発動できる。自分の墓地の「幻影騎士団」魔法・罠カードを3枚まで除外し、その数だけ自分の墓地および除外状態の「幻影騎士団」モンスターを特殊召喚する。その後、そのモンスターのレベルを1つ上げることができる。そのモンスターの効果は無効化され、攻撃力・守備力は0になり、エンドフェイズに除外される。このカードを発動するターン、自分は「幻影騎士団」および「エクシーズ・ドラゴン」モンスター以外をEXデッキから特殊召喚できない。</p>
        <p>「幻影騎士団の蘇生」は1ターンに1枚しか発動できない。</p>`,
      setInfo: "PK-EN003 | シークレットレア",
      copyright: "©カスタムデザイン - 幻影騎士団シリーズ",
      titleLabel: "— 幻影騎士団の蘇生 —"
    },
    "Phantom Knights' Tombstone": {
      name: "幻影騎士団の墓石",
      attribute: "魔法",
      attributeTitle: "魔法カード",
      effectHtml: `<p>【魔法カード／永続】</p>
        <p>このカードの発動時の効果処理として、自分の除外状態の「幻影騎士団」および「エクシーズ・ドラゴン」カードを2枚まで対象として発動できる。そのカードを墓地へ戻す。</p>
        <p>バトルフェイズ中、自分フィールドの表側表示の「幻影騎士団」および「エクシーズ・ドラゴン」モンスターの攻撃力・守備力は800アップする。また、そのモンスターが攻撃する場合、相手はダメージステップ終了時までカードや効果を発動できない。</p>
        <p>このカードが墓地へ送られたターンを除く、自分メインフェイズに、自分の墓地のこのカードを除外し、自分の墓地の「幻影騎士団」および「エクシーズ・ドラゴン」カードを3枚まで対象として発動できる。そのカードをデッキに戻す。</p>
        <p>「幻影騎士団の墓石」は1ターンに1枚しか発動できない。</p>`,
      setInfo: "PHNT-EN088 | ウルトラレア",
      copyright: "©カスタムデザイン - 幻影騎士団シリーズ",
      titleLabel: "— 幻影騎士団の墓石 —"
    },
    "Raiders' Resistance": {
      name: "レイダーズ・レジスタンス",
      attribute: "魔法",
      attributeTitle: "魔法カード",
      typeLine: "【魔法カード／永続】",
      effectHtml: `<p>このカードはルール上「幻影騎士団」「エクシーズ・ドラゴン」「RR」カードとしても扱う。</p>
        <p>このカードの発動に対して、お互いにカードや効果を発動できない。</p>
        <p>このカードまたはその効果を発動するターン、自分はEXデッキから闇属性エクシーズモンスターしか特殊召喚できない。</p>
        <p>このカードの発動時の効果処理として、自分の手札または表側表示フィールドから「幻影騎士団」または「RR」カード1枚を墓地へ送り、デッキから「レイダーズ・レジスタンス」以外の「幻影騎士団」または「RR」カード1枚、または「RUM」魔法カード1枚を手札に加えることができる。</p>
        <p>「幻影騎士団」「エクシーズ・ドラゴン」または「RR」モンスターがEXデッキから特殊召喚された場合（ダメージステップを除く）、フィールドのカード1枚を対象として発動できる。そのカードが表側表示の場合、その効果を無効にし、破壊する。</p>
        <p>自分メインフェイズに、自分の除外状態および墓地の「レイダーズ・レジスタンス」以外の「幻影騎士団」「エクシーズ・ドラゴン」「RR」カードを3枚まで対象として発動できる。そのカードをデッキに戻し、その後、自分は1枚ドローする。</p>
        <p>このカードが墓地へ送られたターンを除く、自分メインフェイズに、自分の墓地のこのカードを除外し、自分フィールドの「幻影騎士団」「エクシーズ・ドラゴン」または「RR」エクシーズモンスター1体を対象として発動できる。ターン終了時まで、そのモンスターは他のカードの効果を受けない。</p>
        <p>「レイダーズ・レジスタンス」は1ターンに1枚しか発動できず、その各効果はそれぞれ1ターンに1度しか使用できない。</p>`
    },
    "The Phantom Knights of Broken Helm": {
      name: "幻影騎士団ブロークン・ヘルム",
      attribute: "闇",
      attributeTitle: "闇属性",
      typeLine: "【戦士族／効果】",
      effectHtml: `<p>「幻影騎士団ブロークン・ヘルム」のそれぞれの効果は1ターンに1度しか使用できない。</p>
        <p>「幻影騎士団」カードが墓地へ送られた場合または除外された場合に発動できる。このカードを手札から特殊召喚し、その攻撃力を500アップする。</p>
        <p>このカードが召喚・特殊召喚に成功した場合に発動できる。自分の手札またはデッキから「幻影騎士団」カード1枚を墓地へ送る。この効果の発動後、ターン終了時まで自分は闇属性モンスターしか特殊召喚できない。自分の墓地のこのカードを除外して発動できる（相手ターンでも発動できる）。このターンのエンドフェイズに、自分の墓地の「幻影騎士団」モンスター1体を手札に加えるか、デッキまたは墓地から「幻影騎士団」魔法・罠カード1枚を自分フィールドにセットする。</p>`,
      statsHtml: statHtml("1200", "1000")
    },
    "The Phantom Knights of Dark Star": {
      name: "幻影騎士団ダーク・スター",
      attribute: "闇",
      attributeTitle: "闇属性",
      rankLabel: "ランク",
      typeLine: "【戦士族／エクシーズ／効果】",
      effectHtml: `<p>レベル4の闇属性モンスター×2</p>
        <p>このカードの素材を1つ取り除いて発動できる。EXデッキまたは墓地から「幻影騎士団」エクシーズモンスター1体を特殊召喚する。そのモンスターの効果は無効化される。この効果の発動後、ターン終了時まで自分は闇属性モンスターしか特殊召喚できない。「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスターが自分フィールドに特殊召喚された場合に発動できる。ターン終了時まで、このカードのランクはそのモンスターの現在のランクと同じになる。</p>
        <p>このカードが墓地へ送られた場合に発動できる。デッキまたは墓地から「幻影騎士団」魔法・罠カード1枚を手札に加えるか自分フィールドにセットする。ただし、このターンそのカードは発動できない。「幻影騎士団ダーク・スター」のそれぞれの効果は1ターンに1度しか使用できない。</p>`,
      statsHtml: statHtml("2200", "1700")
    },
    "The Phantom Knights of Dreadful Hammer": {
      name: "幻影騎士団ドレッドフル・ハンマー",
      attribute: "闇",
      attributeTitle: "闇属性",
      typeLine: "【戦士族／エクシーズ／効果】",
      effectHtml: `<p>レベル3の闇属性モンスター×2</p>
        <p>① 1ターンに1度、エクシーズ召喚したこのカードが相手モンスターと戦闘を行うダメージステップ開始時、このカードの素材を1つ取り除いて発動できる。その相手モンスターを破壊し、その元々の攻撃力の半分のダメージを相手に与える。</p>
        <p>② このカードが破壊された場合に発動できる。デッキから「幻影騎士団」カード1枚を手札に加えるか自分フィールドにセットする。ただし、このターンそのカードは発動できない。</p>
        <p>③ 自分フィールドに「エクシーズ・ドラゴン」エクシーズモンスターがエクシーズ召喚された時、このカードが墓地に存在する場合に発動できる。このカードをそのモンスターの素材とする。</p>
        <p>「幻影騎士団ドレッドフル・ハンマー」のそれぞれの効果は1ターンに1度しか使用できない。</p>`,
      statsHtml: statHtml("2000", "1500")
    },
    "The Phantom Knights of Feeble Armor": {
      name: "幻影騎士団フィーブル・アーマー",
      attribute: "闇",
      attributeTitle: "闇属性",
      typeLine: "【戦士族／効果】",
      effectHtml: `<p>表側表示の「幻影騎士団」または「エクシーズ・ドラゴン」モンスターが戦闘・効果で破壊された場合に発動できる。このカードを手札または墓地から特殊召喚する。この方法による「幻影騎士団フィーブル・アーマー」の特殊召喚は1ターンに1度しかできない。</p>
        <p>このカードが召喚・特殊召喚に成功した場合に発動できる。自分の手札またはデッキから「幻影騎士団」カード1枚を墓地へ送り、自分は1枚ドローする。それが「幻影騎士団」魔法・罠カードだった場合、そのカードをセットでき、このターン発動できる。</p>
        <p>自分の墓地のこのカードを除外して発動できる。このターン、自分フィールドの「幻影騎士団」または「エクシーズ・ドラゴン」カードが初めて破壊される場合、破壊されない。自分フィールドまたは墓地に表側表示の「エクシーズ・ドラゴン」または「幻影騎士団」エクシーズモンスターが存在する場合、この効果は相手ターンでも発動できる。</p>
        <p>このカードのそれぞれの効果は1ターンに1度しか使用できない。</p>`,
      statsHtml: statHtml("500", "1000")
    },
    "The Phantom Knights of Jagged Gloves": {
      name: "幻影騎士団ジャギッド・グローブ",
      attribute: "闇",
      attributeTitle: "闇属性",
      typeLine: "【戦士族／効果】",
      effectHtml: `<p>自分の墓地に「幻影騎士団」カードが存在する場合に発動できる。このカードを手札から特殊召喚する。この方法による「幻影騎士団ジャギッド・グローブ」の特殊召喚は1ターンに1度しかできない。</p>
        <p>このカードが召喚・特殊召喚に成功した場合、「幻影騎士団ジャギッド・グローブ」以外の自分の除外状態または墓地の「幻影騎士団」カード1枚を対象として発動できる。そのカードを手札に加える。</p>
        <p>フィールドのこのカードを素材としてエクシーズ召喚した「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスターは以下の効果を得る。</p>
        <p>● このカードがエクシーズ召喚に成功した場合に発動する。このカードの攻撃力は1000アップする。</p>
        <p>手札または墓地のこのカードを除外し、自分フィールドの「幻影騎士団」および「エクシーズ・ドラゴン」モンスターを2体まで対象として発動できる。ターン終了時まで、そのモンスターのレベルまたはランクを3つまで上げるか下げる。</p>
        <p>「幻影騎士団ジャギッド・グローブ」のそれぞれの効果は1ターンに1度しか使用できない。</p>`,
      statsHtml: statHtml("1000", "500"),
      setInfo: "PK-EN002 | ウルトラレア",
      copyright: "©カスタムデザイン - 幻影騎士団シリーズ",
      titleLabel: "— 幻影騎士団ジャギッド・グローブ —"
    },
    "The Phantom Knights' Coffin": {
      name: "幻影騎士団の棺",
      attribute: "罠",
      attributeTitle: "罠カード",
      badgeLabel: "通常罠",
      effectHtml: `<p>【罠カード／通常】</p>
        <p>① 自分フィールドのレベルまたはランクを持つ表側表示の「幻影騎士団」または「エクシーズ・ドラゴン」モンスター1体をエンドフェイズまで除外して発動できる。このカードを、その除外したモンスターと同じレベルまたはランクを持つ通常モンスター（戦士族・闇・攻0／守0）として特殊召喚する。（このカードは罠カードとして扱わない。）</p>
        <p>② このカードが墓地へ送られたターンを除く、自分の墓地のこのカードを除外して発動できる。ターン終了時まで、相手フィールドの表側表示カード1枚の効果を無効にする。</p>
        <p>「幻影騎士団の棺」のそれぞれの効果は1ターンに1度しか使用できない。</p>`,
      setInfo: "PK-EN002 | ウルトラレア",
      copyright: "©カスタムデザイン - 幻影騎士団シリーズ",
      titleLabel: "— 幻影騎士団の棺 —"
    },
    "The Phantom Knights' Rank-Up Magic Rebellion": {
      name: "幻影騎士団ランクアップマジック・リベリオン",
      attribute: "魔法",
      attributeTitle: "魔法カード",
      typeLine: "【魔法カード】",
      effectHtml: `<p>このターン、自分フィールドの「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスターが破壊され墓地へ送られていた場合、自分の墓地の「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体を対象として発動できる。そのモンスターを特殊召喚し、そのモンスターを素材として、そのモンスターよりランクが1つ高い「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体をEXデッキから特殊召喚する。（これはエクシーズ召喚扱いとする。）</p>
        <p>「幻影騎士団ランクアップマジック・リベリオン」は1ターンに1枚しか発動できない。</p>`
    },
    "The Phantom Knights' Rank-Up Magic Revolution": {
      name: "幻影騎士団ランクアップマジック・レボリューション",
      attribute: "魔法",
      attributeTitle: "魔法カード",
      typeLine: "【魔法カード／速攻】",
      effectHtml: `<p>以下の効果から1つを選択して発動できる。</p>
        <p>● 自分ターン：自分フィールドの闇属性エクシーズモンスター1体を対象として発動できる。そのモンスターを素材として、そのモンスターよりランクが1つ高い「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体をEXデッキから特殊召喚する。（これはエクシーズ召喚扱いとし、対象の素材は特殊召喚したモンスターへ移す。）</p>
        <p>● 相手ターン：素材を持たない相手フィールドの表側表示エクシーズモンスター1体を対象として発動できる。そのモンスターのコントロールを得る。その後、そのモンスターを素材として、そのモンスターよりランクが1つ高い「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体をEXデッキから特殊召喚する。（これはエクシーズ召喚扱いとし、対象の素材は特殊召喚したモンスターへ移す。）</p>
        <p>このカードの発動に対して、お互いにカードや効果を発動できない。</p>
        <p>自分メインフェイズに、自分の墓地のこのカードを除外し、自分フィールドの闇属性エクシーズモンスター1体を対象として発動できる。自分の手札または墓地の「幻影騎士団」モンスター1体をそのモンスターの素材とする。</p>
        <p>「幻影騎士団ランクアップマジック・レボリューション」のそれぞれの効果は1ターンに1度しか使用できない。</p>`
    },
    "The Phantom Knights' Rank-Up Magic Revenge": {
      name: "幻影騎士団ランクアップマジック・リベンジ",
      attribute: "罠",
      attributeTitle: "罠カード",
      typeLine: "【罠カード／カウンター】",
      readoutType: "カウンター罠",
      plainEffect: `相手モンスターの直接攻撃宣言時、LPを半分払って発動できる。自分の墓地または除外状態の「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体を対象とし、そのモンスターを特殊召喚する。その後、そのモンスターを素材として、そのモンスターよりランクが1つまたは2つ高い「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体をEXデッキから特殊召喚する。（これはエクシーズ召喚扱いとする。）

このカードが墓地へ送られたターンを除く、自分の墓地のこのカードを除外し、自分フィールドの「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体を対象として発動できる。そのモンスターの攻撃力は、自分の墓地の「幻影騎士団」モンスターの数×800アップする。

自分のLPが1000以下の場合、このカードは手札から発動できる。

「幻影騎士団ランクアップマジック・リベンジ」のそれぞれの効果は1ターンに1度しか使用できない。`,
      effectHtml: `<p>相手モンスターの直接攻撃宣言時、LPを半分払って発動できる。自分の墓地または除外状態の「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体を対象とし、そのモンスターを特殊召喚する。その後、そのモンスターを素材として、そのモンスターよりランクが1つまたは2つ高い「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体をEXデッキから特殊召喚する。（これはエクシーズ召喚扱いとする。）</p>
        <p>このカードが墓地へ送られたターンを除く、自分の墓地のこのカードを除外し、自分フィールドの「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスター1体を対象として発動できる。そのモンスターの攻撃力は、自分の墓地の「幻影騎士団」モンスターの数×800アップする。</p>
        <p>自分のLPが1000以下の場合、このカードは手札から発動できる。</p>
        <p>「幻影騎士団ランクアップマジック・リベンジ」のそれぞれの効果は1ターンに1度しか使用できない。</p>`,
      activeType: "カウンター罠カード発動"
    },
    "The Phantom Knights' Rebellious Soul": {
      name: "幻影騎士団リベリアス・ソウル",
      attribute: "闇",
      attributeTitle: "闇属性",
      typeLine: "【戦士族／効果】",
      effectHtml: `<p>このカードはルール上「エクシーズ・ドラゴン」カードとしても扱う。</p>
        <p>このカードは融合モンスターの効果を受けず、融合モンスターとの戦闘では破壊されない。</p>
        <p>自分の手札またはEXデッキの「幻影騎士団」または「エクシーズ・ドラゴン」カード1枚を相手に見せて発動できる。このカードを手札から特殊召喚する。この方法による「幻影騎士団リベリアス・ソウル」の特殊召喚は1ターンに1度しかできない。</p>
        <p>このカードが召喚・特殊召喚に成功した場合に発動できる。自分の手札または墓地から「幻影騎士団」または「エクシーズ・ドラゴン」モンスター1体を手札に加えるか特殊召喚する。墓地から特殊召喚した場合、その効果は無効化される。</p>
        <p>このカードを「幻影騎士団」または「エクシーズ・ドラゴン」モンスターのエクシーズ召喚に使用する場合、このカードはレベル3または4として扱うことができる。このカードを素材としてエクシーズ召喚した「幻影騎士団」または「エクシーズ・ドラゴン」エクシーズモンスターは以下の効果を得る。</p>
        <p>● このカードがエクシーズ召喚に成功した場合に発動する。このカードは戦闘では破壊されない。</p>
        <p>自分の墓地のこのカードを除外して発動できる。デッキ・墓地・除外状態から、このカード以外の「幻影騎士団」または「エクシーズ・ドラゴン」カード1枚を手札に加える。ただし、ターン終了時まで自分はそのカードおよび同名カードを発動できない。</p>
        <p>このカードのそれぞれの効果は1ターンに1度しか使用できない。</p>`,
      statsHtml: statHtml("1500", "1000")
    },
    "The Phantom Knights' Regretful Shield": {
      name: "幻影騎士団の悔恨の盾",
      attribute: "闇",
      attributeTitle: "闇属性",
      badgeLabel: "通常罠",
      effectHtml: `<p>【罠カード／通常】</p>
        <p>このカードの効果処理時、このカードを守備表示の通常モンスター（戦士族・闇・レベル3・攻0／守0）として特殊召喚できる。（このカードは罠カードとして扱わない。）</p>
        <p>① このカードの発動時、自分フィールドの「幻影騎士団」および「エクシーズ・ドラゴン」モンスターはこのターン戦闘では破壊されない。</p>
        <p>② 自分の墓地に「幻影騎士団」モンスターまたは「エクシーズ・ドラゴン」エクシーズモンスターが存在する場合、自分の墓地のこのカードを除外して発動できる。このターン、自分が受ける戦闘ダメージは0になり、1度だけ、自分フィールドのエクシーズモンスターが戦闘・効果で破壊される場合、代わりにその素材を1つ取り除くことができる。</p>
        <p>「幻影騎士団の悔恨の盾」のそれぞれの効果は1ターンに1度しか使用できない。</p>`,
      setInfo: "PK-EN000 | ウルトラレア",
      copyright: "©カスタムデザイン - 幻影騎士団シリーズ",
      titleLabel: "— 幻影騎士団の悔恨の盾 —"
    },
    "The Phantom Knights' Shattered Spear": {
      name: "幻影騎士団の砕けた槍",
      attribute: "罠",
      attributeTitle: "罠カード",
      typeLine: "【罠カード／永続】",
      effectHtml: `<p>「幻影騎士団の砕けた槍」は1ターンに1枚しか発動できない。</p>
        <p>自分フィールドの「幻影騎士団」および「エクシーズ・ドラゴン」カードを対象とする相手のカードまたは効果が発動した時に発動できる。手札またはデッキから「幻影騎士団」カード1枚を墓地へ送るか、自分の墓地の「幻影騎士団」カード1枚を除外し、その効果を無効にする。無効にした場合、相手に500ダメージを与える。この効果は1ターンに2度まで使用できる。</p>
        <p>自分フィールドの「幻影騎士団」および「エクシーズ・ドラゴン」カードが戦闘・効果で破壊される場合、代わりに自分の墓地のこのカードを除外できる。</p>`
    }
  };

  const originalHtml = new WeakMap();
  const originalText = new WeakMap();
  const originalValues = new WeakMap();
  const originalAttrs = new WeakMap();
  const originalDocumentTitle = document.title;
  let currentLanguage = resolveInitialLanguage();

  window.GG_I18N = {
    getLanguage: () => currentLanguage,
    setLanguage,
    t,
    projectName,
    categoryLabel,
    optionLabel,
    apply: () => applyLanguage(currentLanguage, { emit: false }),
    getCardTranslation: (key) => CARD_JA[key] || null
  };

  injectStylesheet();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyLanguage(currentLanguage, { emit: false }));
  } else {
    applyLanguage(currentLanguage, { emit: false });
  }

  function setLanguage(lang) {
    if (!SUPPORTED.has(lang) || lang === currentLanguage) {
      return;
    }
    currentLanguage = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      window.localStorage.setItem(LEGACY_STORAGE_KEY, lang);
    } catch {
      // Storage is optional; the toggle still works for this page.
    }
    syncUrlLanguage(lang);
    applyLanguage(lang, { emit: true });
  }

  function applyLanguage(lang, options = {}) {
    const html = document.documentElement;
    html.lang = lang === "ja" ? "ja" : "en";
    html.classList.toggle("gg-lang-ja", lang === "ja");
    html.classList.toggle("gg-lang-en", lang === "en");

    createLanguageSwitcher();
    updateSwitcher();
    applyStaticText(lang);
    applyCardPage(lang);
    applyRankUpMagicRevenge(lang);
    applyRevealOverlay(lang);

    if (options.emit) {
      document.dispatchEvent(new CustomEvent("gg:languagechange", { detail: { language: lang } }));
    }
  }

  function resolveInitialLanguage() {
    try {
      const urlLanguage = new URL(window.location.href).searchParams.get("lang");
      if (SUPPORTED.has(urlLanguage)) return urlLanguage;
    } catch {
      // Ignore malformed URLs.
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (SUPPORTED.has(stored)) return stored;
    } catch {
      // Ignore unavailable storage.
    }

    const pageLang = document.documentElement.lang;
    if (SUPPORTED.has(pageLang)) return pageLang;

    const browserLang = String(navigator.language || "").toLowerCase();
    return browserLang.startsWith("ja") ? "ja" : "en";
  }

  function t(key, fallback = key, lang = currentLanguage) {
    return UI_TEXT[lang]?.[key] || UI_TEXT.en[key] || fallback;
  }

  function projectName(name, lang = currentLanguage) {
    return lang === "ja" ? PROJECT_NAMES_JA[name] || name : name;
  }

  function categoryLabel(label, lang = currentLanguage) {
    return lang === "ja" ? LABELS_JA[label] || label : label;
  }

  function optionLabel(label, lang = currentLanguage) {
    return lang === "ja" ? LABELS_JA[label] || label : label;
  }

  function createLanguageSwitcher() {
    if (!document.body || document.querySelector(".language-switcher")) return;

    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.setAttribute("role", "group");
    switcher.innerHTML = `
      <span class="language-switcher__label" data-language-switcher-label>LANGUAGE</span>
      <button class="language-switcher__button" type="button" data-lang-choice="en">EN</button>
      <button class="language-switcher__button" type="button" data-lang-choice="ja">日本語</button>
    `;
    switcher.addEventListener("click", (event) => {
      const button = event.target.closest("[data-lang-choice]");
      if (!button) return;
      setLanguage(button.dataset.langChoice);
    });
    document.body.appendChild(switcher);
  }

  function updateSwitcher() {
    const switcher = document.querySelector(".language-switcher");
    if (!switcher) return;

    switcher.setAttribute("aria-label", t("language.group"));
    const label = switcher.querySelector("[data-language-switcher-label]");
    if (label) label.textContent = t("language.label", "LANGUAGE");
    switcher.querySelectorAll("[data-lang-choice]").forEach((button) => {
      const selected = button.dataset.langChoice === currentLanguage;
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute(
        "aria-label",
        button.dataset.langChoice === "ja" ? t("language.japanese") : t("language.english")
      );
    });
  }

  function applyStaticText(lang) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      setText(element, UI_TEXT[lang]?.[element.dataset.i18n] || UI_TEXT.en[element.dataset.i18n], lang);
    });

    document.querySelectorAll("[data-i18n-data-text]").forEach((element) => {
      const key = element.dataset.i18nDataText;
      setAttr(element, "data-text", UI_TEXT[lang]?.[key] || UI_TEXT.en[key], lang);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      setAttr(element, "aria-label", UI_TEXT[lang]?.[key] || UI_TEXT.en[key], lang);
    });
  }

  function applyCardPage(lang) {
    const key = getPageKey();
    const card = CARD_JA[key];
    if (!card) return;

    setDocumentTitle(lang === "ja" ? `${card.name} | カスタムカード` : null);
    setBodyRevealData("title", card.name, lang);
    setBodyRevealData("attribute", card.attribute, lang);
    setBodyRevealData("rarity", card.rarity || "カスタムカード", lang);
    setBodyRevealData("tagline", card.revealTagline || `${card.name}の日本語表示`, lang);

    setBySelector(".card-name", card.name, lang, "text");
    setBySelector(".attribute-badge", card.attribute, lang, "text");
    setBySelector(".attribute-icon", card.attribute, lang, "text");
    setBySelector(".rank-label", card.rankLabel, lang, "text");
    setBySelector(".type-line", card.typeLine, lang, "html");
    setBySelector(".materials-box", card.materials, lang, "html");
    setBySelector(".effect-box", card.effectHtml, lang, "html");
    setBySelector(".stats-bar", card.statsHtml, lang, "html");
    setBySelector(".trap-badge-label", card.badgeLabel, lang, "text");
    setBySelector(".card-set-info", card.setInfo, lang, "text");
    setBySelector(".card-copyright", card.copyright, lang, "text");
    setBySelector(".card-title-label", card.titleLabel, lang, "text");
    setAttrBySelector(".card-attribute", "title", card.attributeTitle, lang);
    setAttrBySelector(".card-attribute", "aria-label", card.attributeTitle, lang);
    setAttrBySelector(".attribute-badge", "title", card.attributeTitle, lang);
    setAttrBySelector(".card, .card-container", "aria-label", `${card.name} カード`, lang);
  }

  function applyRankUpMagicRevenge(lang) {
    const key = getPageKey();
    if (key !== "The Phantom Knights' Rank-Up Magic Revenge") return;
    const card = CARD_JA[key];

    setDocumentTitle(lang === "ja" ? `${card.name} | カスタムカード` : null);
    setBySelector("#displayCardTitle, #readoutName", card.name, lang, "text");
    setBySelector("#displayCardType", card.typeLine, lang, "html");
    setBySelector("#readoutType", card.readoutType, lang, "text");
    setBySelector("#displayCardEffect", card.effectHtml, lang, "html");
    setBySelector("#activeCardNameText", card.name, lang, "text");
    setBySelector(".activated-type", card.activeType, lang, "text");
    setValueBySelector("#inputName", card.name, lang);
    setValueBySelector("#inputEffect", card.plainEffect, lang);
  }

  function applyRevealOverlay(lang) {
    const key = getPageKey();
    const card = CARD_JA[key];
    setBySelector(".card-reveal-skip", t("reveal.skip", "Skip", lang), lang, "text");
    setAttrBySelector(".card-reveal-skip", "aria-label", t("reveal.skipLabel", "Skip card reveal", lang), lang);
    setBySelector(".card-reveal-presenter.left span", t("reveal.leftSmall", "Lunar scan", lang), lang, "text");
    setBySelector(".card-reveal-presenter.left strong", t("reveal.leftStrong", "Signal found", lang), lang, "text");
    setBySelector(".card-reveal-label span:first-child", t("reveal.focus", "Focus card", lang), lang, "text");

    if (!card) return;
    setBySelector(".card-reveal-title, .card-reveal-nameplate", card.name, lang, "text");
    setBySelector(".card-reveal-tagline", card.revealTagline || `${card.name}の日本語表示`, lang, "text");
  }

  function getPageKey() {
    const parts = window.location.pathname
      .split("/")
      .filter(Boolean)
      .map((part) => {
        try {
          return decodeURIComponent(part);
        } catch {
          return part;
        }
      });
    const file = parts[parts.length - 1] || "";
    if (/^(card|index)\.html$/i.test(file)) {
      return parts[parts.length - 2] || "";
    }
    return "";
  }

  function setDocumentTitle(value) {
    document.title = value || originalDocumentTitle;
  }

  function setBodyRevealData(name, value, lang) {
    if (!document.body || value == null) return;
    setAttr(document.body, `data-reveal-${name}`, value, lang);
  }

  function syncUrlLanguage(lang) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState(null, "", url);
    } catch {
      // URL updates are helpful, but not required for translation.
    }
  }

  function setBySelector(selector, value, lang, mode) {
    if (value == null) return;
    document.querySelectorAll(selector).forEach((element) => {
      if (mode === "html") setHtml(element, value, lang);
      else setText(element, value, lang);
    });
  }

  function setAttrBySelector(selector, attr, value, lang) {
    if (value == null) return;
    document.querySelectorAll(selector).forEach((element) => setAttr(element, attr, value, lang));
  }

  function setValueBySelector(selector, value, lang) {
    if (value == null) return;
    document.querySelectorAll(selector).forEach((element) => setValue(element, value, lang));
  }

  function setHtml(element, value, lang) {
    if (!originalHtml.has(element)) originalHtml.set(element, element.innerHTML);
    element.innerHTML = lang === "ja" ? value : originalHtml.get(element);
  }

  function setText(element, value, lang) {
    if (value == null) return;
    if (!originalText.has(element)) originalText.set(element, element.textContent);
    element.textContent = lang === "ja" ? value : originalText.get(element);
  }

  function setValue(element, value, lang) {
    if (!originalValues.has(element)) originalValues.set(element, element.value);
    element.value = lang === "ja" ? value : originalValues.get(element);
  }

  function setAttr(element, attr, value, lang) {
    if (value == null) return;
    let attrs = originalAttrs.get(element);
    if (!attrs) {
      attrs = {};
      originalAttrs.set(element, attrs);
    }
    if (!(attr in attrs)) attrs[attr] = element.getAttribute(attr);

    if (lang === "ja") {
      element.setAttribute(attr, value);
    } else if (attrs[attr] == null) {
      element.removeAttribute(attr);
    } else {
      element.setAttribute(attr, attrs[attr]);
    }
  }

  function injectStylesheet() {
    const script = document.currentScript;
    if (!script?.src || document.querySelector('link[data-gg-i18n-style="true"]')) return;
    const href = new URL("language-toggle.css", script.src).href;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.ggI18nStyle = "true";
    document.head.appendChild(link);
  }

  function statHtml(atk, def) {
    return `<span class="stat">ATK / ${atk}</span><span class="stat-divider">|</span><span class="stat">DEF / ${def}</span>`;
  }
})();
