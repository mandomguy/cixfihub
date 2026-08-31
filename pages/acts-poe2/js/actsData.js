/**
 * POE2 Campaign Data
 * Extracted from official walkthroughs / maxroll campaign guide (new 7.txt)
 */

const ACTS_DATA = [
  {
    tag: "Act 1",
    title: "Act 1: A Cold Beginning",
    subtitle: "Beach to Oghman Manor",
    summary: "Explore dark forests, sepulchers, and blighted landscapes to track down the Seed of Corruption and confront Count Geonor.",
    areas: [
      {
        name: "The Riverbank",
        waypoint: false,
        bosses: ["Bloated Miller"],
        quests: ["Reaching Clearfell (Uncut Skill Gem Lvl 1)"],
        steps: [
          "Select movement type, talk to wounded man, kill Zombie to get starting weapon.",
          "Find Large Chest in middle of zone for first Skill Gem (Hotkey G to socket).",
          "Defeat Bloated Miller and enter The Clearfell Encampment."
        ]
      },
      {
        name: "The Clearfell Encampment",
        isTown: true,
        waypoint: true,
        npcs: ["Renly (Armour/Weapons)", "Una (Casters/Disenchant)", "Finn (Gamble Gold)"],
        steps: [
          "First town hub with Waypoint, Stash, Healing Well, and vendors.",
          "Disenchant items at Una or gamble gold at Finn."
        ]
      },
      {
        name: "Clearfell",
        waypoint: true,
        bosses: ["Beira of the Rotten Pack (Optional)"],
        pois: ["Head of Winter Wolf (+10% Cold Resist)", "Mud Burrow Entrance", "Abandoned Stash"],
        steps: [
          "Optional Boss: Defeat Beira for +10% Cold Resistance consumable.",
          "Find Abandoned Stash on opposite side for Uncut Skill Gem Lvl 1.",
          "Proceed to Mud Burrow or top-right exit to The Grelwood."
        ]
      },
      {
        name: "The Mud Burrow",
        waypoint: false,
        bosses: ["The Devourer (Optional)"],
        quests: ["Treacherous Ground (Uncut Support Gem Lvl 1)"],
        steps: [
          "Optional zone: Defeat The Devourer (dodge roll its chaos barrage).",
          "Reward: Uncut Support Gem Level 1 & Gold."
        ]
      },
      {
        name: "The Grelwood",
        waypoint: true,
        bosses: ["Gerung, the Brambleghast (Optional)", "Areagne, Forgotten Witch (Optional)"],
        quests: ["Secrets in the Dark"],
        pois: ["Tree of Souls", "Cauldron (Medium Flasks)"],
        steps: [
          "Search for Tree of Souls or proceed to Red Vale first.",
          "Defeat Areagne for Uncut Support Gem Lvl 1 (or loot Cauldron for flasks)."
        ]
      },
      {
        name: "The Red Vale",
        waypoint: true,
        bosses: ["The Rust King"],
        quests: ["Secrets in the Dark"],
        pois: ["3 Obelisks of Rust"],
        steps: [
          "Interact with 3 Obelisks of Rust to collect 3 Runed Girdles.",
          "Defeat The Rust King at 3rd obelisk for final girdle.",
          "Return to town and speak to Renly to get Runed Spikes."
        ]
      },
      {
        name: "Return to The Grelwood",
        waypoint: true,
        quests: ["Secrets in the Dark"],
        pois: ["Tree of Souls", "The Grim Tangle Exit"],
        steps: [
          "Return to Tree of Souls, summon Una, stab Runed Spikes into Runic Seals.",
          "Talk to Una in town to complete quest, then search Grelwood for The Grim Tangle."
        ]
      },
      {
        name: "The Grim Tangle",
        waypoint: true,
        bosses: ["Ervig, Rotted Druid (Optional)"],
        quests: ["The Mysterious Shade"],
        steps: [
          "Navigate winding zone searching for Cemetery of the Eternals.",
          "Defeat Ervig for Uncut Support Gem Lvl 1."
        ]
      },
      {
        name: "Cemetery of the Eternals",
        waypoint: true,
        npcs: ["Lachlann the Lost"],
        quests: ["Sorrow Among Stones"],
        pois: ["Tomb of Consort", "Mausoleum of Praetor", "Ancient Ruins Secret"],
        steps: [
          "Search for Tomb of Consort & Mausoleum of Praetor to defeat bosses.",
          "Check edge of zone for Ancient Ruins secret (guaranteed Ring)."
        ]
      },
      {
        name: "Tomb of the Consort",
        waypoint: true,
        bosses: ["Asinia, Praetor Consort"],
        quests: ["Sorrow Among Stones"],
        pois: ["Haunted Treasure Secret"],
        steps: [
          "Defeat Asinia to acquire Asinia's Memorial Key Piece.",
          "Optional: Haunted Treasure secret drops Uncut Support Gem Lvl 1."
        ]
      },
      {
        name: "The Mausoleum",
        waypoint: true,
        bosses: ["Draven, Eternal Praetor"],
        quests: ["Sorrow Among Stones"],
        pois: ["Forgotten Riches Secret"],
        steps: [
          "Defeat Draven to acquire Draven's Memorial Key Piece.",
          "Optional: Forgotten Riches secret for gold & rare chest."
        ]
      },
      {
        name: "Return to Cemetery of the Eternals",
        waypoint: true,
        bosses: ["Lachlann of Endless Lament"],
        quests: ["Sorrow Among Stones", "Mysterious Shade"],
        steps: [
          "Use both key pieces to open Memorial Gate near Lachlann.",
          "Follow Lachlann to family grave; defeat Lachlann of Endless Lament.",
          "Loot Count Lachlann's Ring, head to Hunting Grounds, take waypoint to town, speak to Una to revive Hooded One."
        ]
      },
      {
        name: "The Hunting Grounds",
        waypoint: true,
        bosses: ["The Crowbell (Optional: +2 Passive Skill Points)"],
        pois: ["Freythorn Entrance", "Ogham Farmlands Entrance", "Dryadic Ritual Secret"],
        steps: [
          "Dangerous zone: progress carefully.",
          "Enter Freythorn first for +30 Spirit buff.",
          "Defeat Crowbell for 2 Weapon Set Passive Skill Points."
        ]
      },
      {
        name: "Freythorn",
        waypoint: true,
        bosses: ["The King in the Mists (+30 Spirit, Uncut Spirit Gem Lvl 4)"],
        quests: ["Ominous Altars (Normal Charm Reward)"],
        pois: ["3 Ritual Altars"],
        steps: [
          "Cleanse 3 Ritual Altars, then activate central large Ritual Altar.",
          "Defeat King in Mists (Purple debuff = keep moving; Red debuff = stand still/stun boss).",
          "Consume Gembloom Skull for +30 Spirit & Uncut Spirit Gem Lvl 4.",
          "Talk to Finn in town for charm selection."
        ]
      },
      {
        name: "Ogham Farmlands",
        waypoint: true,
        quests: ["The Lost Lute (Optional: +2 Passive Skill Points)"],
        steps: [
          "Search hut for Una's Lute, return it to Una in town for 2 Weapon Set Passive Skill Points."
        ]
      },
      {
        name: "Ogham Village",
        waypoint: true,
        bosses: ["The Executioner"],
        quests: ["The Trail of Corruption (Uncut Skill Gem Lvl 5)", "Finding the Forge (Salvage Bench)"],
        pois: ["Blacksmith's Chest (Artificer's Orb & Blank Rune)"],
        steps: [
          "Find Renly's Smithing Tools & Blacksmith's Chest (socket Lesser Rune in weapon).",
          "Defeat Executioner (watch out for lethal slam animations).",
          "Free prisoner, proceed to Manor Ramparts, speak to Leitis in town for reward."
        ]
      },
      {
        name: "The Manor Ramparts",
        waypoint: true,
        pois: ["The Gallows Secret (Uncut Support Gem Lvl 1)"],
        steps: [
          "Open zone leading to Oghman Manor.",
          "Loot Gallows secret on edge of map."
        ]
      },
      {
        name: "Oghman Manor",
        waypoint: true,
        bosses: ["Candlemass (Optional: +20 Max Life)", "Count Geonor (Act 1 Finale)"],
        quests: ["The Mad Wolf of Ogham"],
        steps: [
          "First floor: defeat Candlemass for +20 Maximum Life.",
          "Top floor: defeat Count Geonor (human/wolf phase, fog phase lunges, AoE attacks).",
          "Return to town, talk to Hooded One, select 'Follow the Beast's trail' for Act 2."
        ]
      }
    ]
  },
  {
    tag: "Act 2",
    title: "Act 2: Vastiri Plains",
    subtitle: "Vastiri Outskirts to The Dreadnought",
    summary: "Pursue Countess Oriana and the Seed of Corruption across vast deserts, ancient ruins, and underground caverns with the Ardura Caravan.",
    areas: [
      {
        name: "Vastiri Outskirts",
        isTown: true,
        waypoint: true,
        npcs: ["The Hooded One", "Zarka"],
        bosses: ["Rathbreaker"],
        quests: ["Earning Passage (Uncut Skill Gem Lvl 5)"],
        steps: [
          "Combat town: defeat Rathbreaker (mitigate physical damage, avoid cliff javelin range).",
          "Speak to Zarka to unlock Ardura Caravan."
        ]
      },
      {
        name: "The Ardura Caravan",
        isTown: true,
        waypoint: true,
        npcs: ["The Hooded One (Respec)", "Shambrin (Armour/Weapons)", "Zarka (Casters/Disenchant)", "Sekhema Asala", "Risu (Gamble)"],
        steps: [
          "Main town hub of Act 2.",
          "Interact with Desert Map to travel to Mawdun Quarry."
        ]
      },
      {
        name: "Mawdun Quarry",
        waypoint: true,
        pois: ["Faridun War Cache (Artificer's Orb)"],
        steps: [
          "Navigate passages to reach Mawdun Mine.",
          "Loot Faridun War Cache near bridge checkpoint."
        ]
      },
      {
        name: "Mawdun Mine",
        waypoint: true,
        bosses: ["Rudja, the Dread Engineer"],
        quests: ["The Trail of Corruption"],
        pois: ["Lesser Essence of Insulation"],
        steps: [
          "Equip fire resist gear / Ruby Charm for Rudja.",
          "Defeat Rudja, free Risu from cage, return to town and use Desert Map for Halani Gates."
        ]
      },
      {
        name: "The Halani Gates",
        waypoint: false,
        npcs: ["Sekhema Asala"],
        steps: [
          "Gates are closed! Talk to Asala, return to caravan, travel to Traitor's Passage."
        ]
      },
      {
        name: "Traitor's Passage",
        waypoint: true,
        bosses: ["Balbala, The Traitor (Ascendancy Djinn Barya)"],
        pois: ["Bell Chest (Uncut Skill Gem Lvl 6)"],
        steps: [
          "Search for alternate entrance to Halani Gates.",
          "Defeat Balbala to unlock Trial of Sekhemas (Ascendancy)."
        ]
      },
      {
        name: "The Halani Gates (Returned)",
        waypoint: true,
        bosses: ["Jamanra, the Risen King", "L'im the Impaler (Optional)"],
        quests: ["Trail of Corruption (Uncut Skill Gem Lvl 7)"],
        steps: [
          "Interact with Summon Asala objects to open gates.",
          "Battle Jamanra (Lightning/Physical), follow him into sandstorm.",
          "Sandstorm impassable: return to town, talk to Zarka and Asala for 3 new quest paths."
        ]
      },
      {
        name: "Mastodon Badlands",
        waypoint: true,
        quests: ["A Theft of Ivory", "Ancient Vows"],
        pois: ["Lightless Passage (Abyss Crafting)", "Effigy Secret"],
        steps: [
          "Search for entrance to Bone Pits.",
          "Visit Lightless Passage / Well of Souls to unlock Abyssal Crafting (Desecrated mods)."
        ]
      },
      {
        name: "The Bone Pits",
        waypoint: true,
        bosses: ["Iktab, the Deathlord & Ekbab Ancient Steed"],
        quests: ["A Theft of Ivory (Uncut Support Gem Lvl 2)", "Ancient Vows (Sun Clan Relic)"],
        steps: [
          "Defeat Iktab & Ekbab for Mastodon Tusks.",
          "Collect Sun Clan Relic for Ancient Vows quest."
        ]
      },
      {
        name: "Keth",
        waypoint: true,
        bosses: ["Kabala, Constrictor Queen (Optional: +2 Passive Skill Points)"],
        quests: ["The City of Seven Waters"],
        pois: ["Abandoned Prayer Secret (Magic Amulet)"],
        steps: [
          "Beware lightning scarabs. Search for entrance to Lost City.",
          "Defeat Kabala for 2 Weapon Set Passive Skill Points."
        ]
      },
      {
        name: "The Lost City",
        waypoint: true,
        quests: ["Ancient Vows (Kabala Clan Relic)"],
        pois: ["Golden Tomb Secret (Uncut Spirit Gem Lvl 6)"],
        steps: [
          "Navigate underground city towards Buried Shrines.",
          "Find Kabala Clan Relic for Ancient Vows."
        ]
      },
      {
        name: "Buried Shrines",
        waypoint: true,
        bosses: ["Azarian, The Forsaken Son"],
        quests: ["City of Seven Waters (Uncut Support Gem Lvl 2)"],
        pois: ["Elemental Shrine (Offering of Fire for Ruby Ring)"],
        steps: [
          "Visit Elemental Shrine for Ruby Ring & Lesser Desert Rune.",
          "Defeat Azarian (avoid breaking all 4 fire pots).",
          "Ignite Water Goddess, loot Essence of Water."
        ]
      },
      {
        name: "Valley of the Titans",
        waypoint: true,
        quests: ["A Crown of Stone", "Ancient Vows (+1 Charm Slot & Permanent Buff)"],
        pois: ["3 Ancient Seals", "Relic Altar"],
        steps: [
          "Place Kabala & Sun Relics in Relic Altar for +1 Charm Slot & 30% Charm buff.",
          "Interact with 3 Ancient Seals to open Titan Grotto."
        ]
      },
      {
        name: "The Titan Grotto",
        waypoint: true,
        bosses: ["Zalmarath, the Colossus"],
        quests: ["A Crown of Stone (Uncut Support Gem Lvl 2)"],
        pois: ["Titan's Sword (Lesser Rune)"],
        steps: [
          "Defeat Zalmarath for Flame Ruby.",
          "Return to Zarka for Horn of Vastiri. Sound Horn at top of Caravan to clear Sandstorm!"
        ]
      },
      {
        name: "Deshar",
        waypoint: true,
        quests: ["Tradition's Toll (Optional: +2 Passive Skill Points)"],
        pois: ["Fallen Dekhara", "Unremembered Skeleton (Artificer's Orb)"],
        steps: [
          "Interact with Fallen Dekhara for Final Letter -> Shambrin for 2 Skill Points.",
          "Proceed to Path of Mourning."
        ]
      },
      {
        name: "Path of Mourning",
        waypoint: true,
        pois: ["Hushed Urn Secret (Uncut Support Gem Lvl 2)"],
        steps: [
          "Interconnected elevated walkways leading to Spires of Deshar."
        ]
      },
      {
        name: "The Spires of Deshar",
        waypoint: true,
        bosses: ["Tor Gul, the Defiler"],
        pois: ["Sisters of Garukhan (+10% Lightning Resist)"],
        steps: [
          "Interact with Sisters of Garukhan for +10% Lightning Resistance buff.",
          "Defeat Tor Gul, then use Desert Map to board The Dreadnought."
        ]
      },
      {
        name: "The Dreadnought",
        waypoint: true,
        bosses: ["Jamanra, the Abomination (Act 2 Finale)"],
        steps: [
          "Moving train carts zone.",
          "Phase 1: Lightning bolts & pylons. Stand near Asala during wind gust.",
          "Phase 2: Sword cleaves, sunders, tornadoes & electrical gates.",
          "Speak to Asala & Hooded One -> Travel to Sandswept Marsh for Act 3."
        ]
      }
    ]
  },
  {
    tag: "Act 3",
    title: "Act 3: Vaal Jungles & Aggorat",
    subtitle: "Sandswept Marsh to Black Chambers (Past)",
    summary: "Team up with Alva Valai to explore ancient jungles, manipulate Vaal machinarium puzzles, and travel through time to past Aggorat.",
    areas: [
      {
        name: "Sandswept Marsh",
        isTown: true,
        waypoint: true,
        bosses: ["Rootdredge (Optional: Uncut Skill Gem Lvl 9)"],
        pois: ["Orok Campfire (Lesser Jeweller's Orb)", "Hanging Tree (Magic Ring)"],
        steps: [
          "Cross marsh toward Ziggurat Encampment.",
          "Optional: kill Rootdredge for Lvl 9 skill gem."
        ]
      },
      {
        name: "Ziggurat Encampment",
        isTown: true,
        waypoint: true,
        npcs: ["The Hooded One", "Alva", "Oswald (Armour/Weapons/Idols)", "Servi (Casters/Local Knowledge)"],
        steps: [
          "Main Act 3 town hub.",
          "Speak to Alva and Hooded One, exit to Jungle Ruins."
        ]
      },
      {
        name: "Jungle Ruins",
        waypoint: true,
        bosses: ["Mighty Silverfist (Optional: +2 Passive Skill Points)"],
        pois: ["Troubled Camp", "Venom Crypts Entrance", "Submerged Matlan Waterways"],
        steps: [
          "Defeat Mighty Silverfist for 2 Skill Points.",
          "Enter Venom Crypts for permanent stat buff, then search for Infested Barrens."
        ]
      },
      {
        name: "The Venom Crypts",
        waypoint: false,
        quests: ["The Slithering Dead (Permanent Buff Choice & Artificer's Orb)"],
        steps: [
          "Loot Corpse-snake Venom, return to Servi for Artificer's Orb.",
          "Select permanent buff: +25% Stun Threshold, +30% Ailment Threshold, or +25% Mana Reg."
        ]
      },
      {
        name: "Infested Barrens",
        waypoint: true,
        pois: ["Troubled Camp", "Chimeral Wetlands Exit"],
        steps: [
          "Dense jungle with anthills. Locate Chimeral Wetlands."
        ]
      },
      {
        name: "Chimeral Wetlands",
        waypoint: true,
        bosses: ["Xyclucian, the Chimera"],
        pois: ["Temple of Chaos (Ascendancy Trial)", "Ravaged Camp", "Toxic Bloom Secret"],
        steps: [
          "Defeat Xyclucian (3 heads: fire cone, lightning sparks, frost breath; break platform when flying).",
          "Loot Chimeral Ultimatum, proceed to Jiquani's Machinarium.",
          "Optional: Visit Temple of Chaos for 2nd Ascendancy."
        ]
      },
      {
        name: "Jiquani's Machinarium",
        waypoint: true,
        bosses: ["Blackjaw, the Remnant (Optional: +10% Fire Resist)"],
        pois: ["4 Small Soul Cores"],
        steps: [
          "Collect Small Soul Cores to unlock puzzle doors.",
          "Optional: Defeat Blackjaw for Flame Core (+10% Fire Resistance)."
        ]
      },
      {
        name: "Jiquani's Sanctum",
        waypoint: true,
        bosses: ["Zicoatl, Warden of the Core"],
        pois: ["2 Medium Soul Cores", "Corruption Altar"],
        steps: [
          "Find 2 Medium Soul Cores, place in generators, talk to Alva.",
          "Defeat Zicoatl (stay near vertices during triangle slam).",
          "Loot Large Soul Core, return to Jungle Ruins stone altar to drain water."
        ]
      },
      {
        name: "The Matlan Waterways",
        waypoint: false,
        pois: ["Azak Bog Entrance", "Ravaged Corpse (Rare Belt)", "Narag's Hut"],
        steps: [
          "Press pressure pads to drain canals.",
          "Visit Azak Bog side zone for +30 Spirit buff.",
          "Pull final lever, enter Drowned City."
        ]
      },
      {
        name: "The Azak Bog",
        waypoint: true,
        bosses: ["Ignagduk, the Bog Witch (+30 Spirit, Uncut Spirit Gem Lvl 10)"],
        quests: ["Tribal Vengeance (Charm Reward)"],
        pois: ["Flameskin Ritual (+Fire Resist Buff)"],
        steps: [
          "Interact with Flameskin Ritual for massive fire resistance buff.",
          "Defeat Ignagduk (Phase 1 broomstick charges, Phase 2 infernal corridor V-blast).",
          "Consume Gemrot Skull for +30 Spirit, talk to Servi for charm."
        ]
      },
      {
        name: "The Drowned City",
        waypoint: true,
        pois: ["Molten Vault Entrance", "Secret Gold Cellars"],
        steps: [
          "Watch out for drowning teal orb hazard.",
          "Proceed to Apex of Filth or enter optional Molten Vault."
        ]
      },
      {
        name: "The Molten Vault",
        waypoint: true,
        bosses: ["Mektul, the Forgemaster (Reforging Bench)"],
        quests: ["Treasures of Utzaal (Uncut Skill Gem Lvl 10)"],
        steps: [
          "Pull sluice gate levers, follow molten gold flow.",
          "Defeat Mektul within 4-minute time limit.",
          "Return Hammer of Kamasa to Oswald to unlock Reforging Bench."
        ]
      },
      {
        name: "Apex of Filth",
        waypoint: true,
        bosses: ["Queen of Filth"],
        pois: ["Cauldron Keeper (Flasks / Caster Shop)"],
        steps: [
          "Defeat Queen of Filth (mobile chaos boss, avoid cursed ground).",
          "Loot Temple Door idol, speak to Alva to open Temple of Kopec."
        ]
      },
      {
        name: "Temple of Kopec",
        waypoint: false,
        bosses: ["Ketzuli, High Priest of the Sun"],
        steps: [
          "Indoor sun hazard: stay in shade to avoid burning debuff.",
          "Defeat Ketzuli (fireballs, fiery black hole, scorching beam).",
          "Alva sacrifices blood to open Time Portal to past Vaal Empire!"
        ]
      },
      {
        name: "Utzaal (Past)",
        waypoint: true,
        bosses: ["Viper Napuatzi"],
        pois: ["Chaos Statue", "Sacrificial Heart", "Peculiar Fortunes"],
        steps: [
          "Loot Sacrificial Heart for next zone.",
          "Defeat Viper Napuatzi (spear chains, firestorm/meteors, arena shrink)."
        ]
      },
      {
        name: "Aggorat (Past)",
        waypoint: true,
        quests: ["Blood Sacrifice (+2 Passive Skill Points)"],
        steps: [
          "Stab Sacrificial Heart into altar for 2 Weapon Set Passive Skill Points.",
          "Locate entrance to Black Chambers."
        ]
      },
      {
        name: "The Black Chambers (Past)",
        waypoint: true,
        bosses: ["Doryani, Royal Thaumaturge (Act 3 Finale)"],
        steps: [
          "Phase 1: Tri-elemental spell rotations.",
          "Phase 2: Rotating laser altar & electrical floor spikes.",
          "Phase 3: Doryani's Triumph mech (arm slams, frost/flame lasers, head slam).",
          "Phase 4: Detached mech fist slam & laser sky rain.",
          "Doryani activates Cataclysm. Speak to Alva to sail to Kingsmarch for Act 4!"
        ]
      }
    ]
  },
  {
    tag: "Act 4",
    title: "Act 4: Islands of Ngamakanui",
    subtitle: "Kingsmarch to Heart of the Tribe",
    summary: "Sail across Karui archipelagos to forge the instrument of the Third Edict and battle ancestral powers.",
    areas: [
      {
        name: "Kingsmarch",
        isTown: true,
        waypoint: true,
        npcs: ["Dannig (Armour)", "Rog (Casters/Disenchant)", "Tujen (Gamble)", "Ange (Exchange)", "Makoru (Ship Charter)"],
        steps: [
          "Act 4 main hub.",
          "Take Boat Charter from Rog, speak to Makoru at docks to set sail."
        ]
      },
      {
        name: "Isle of Kin",
        waypoint: true,
        bosses: ["The Blind Beast (Blank Greater Rune)"],
        pois: ["Voltaxic Spire Buff", "Flayed Sailor (Torn Map Piece 1)"],
        steps: [
          "Sulphite quarry zone. Defeat Blind Beast for Blank Greater Rune.",
          "Loot Flayed Sailor for Map Piece 1."
        ]
      },
      {
        name: "Volcanic Warrens",
        waypoint: true,
        bosses: ["Krutog, Lord of Kin"],
        steps: [
          "Volcanic caverns. Defeat Krutog, then sail to Kedge Bay."
        ]
      },
      {
        name: "Kedge Bay",
        waypoint: true,
        pois: ["Dead Man's Chest (Torn Map Piece 2)", "Abandoned Ship"],
        steps: [
          "Shipwrecked strand. Loot Dead Man's Chest for Map Piece 2.",
          "Proceed to Journey's End."
        ]
      },
      {
        name: "Journey's End",
        waypoint: true,
        bosses: ["Captain Hartlin", "Omniphobia, Fear Manifest (+2 Passive Skill Points & Uncut Gem Lvl 13)"],
        steps: [
          "Defeat Captain Hartlin, get Verisium Spikes from Dannig, free Freya.",
          "Freya is Omniphobia! Defeat Omniphobia, talk to Tujen for 2 Skill Points."
        ]
      },
      {
        name: "Abandoned Prison",
        waypoint: true,
        pois: ["The Chapel (Flask Buff Choice)", "The Armoury Secret"],
        steps: [
          "Chapel Goddess choice: +30% Life Recovery from Flasks OR +30% Mana Recovery.",
          "Proceed to Solitary Confinement."
        ]
      },
      {
        name: "Solitary Confinement",
        waypoint: true,
        bosses: ["The Prisoner"],
        steps: [
          "Water rising hazard.",
          "Defeat Prisoner (shoot ballista when staggered at 50%/25%/10% to prevent healing)."
        ]
      },
      {
        name: "Whakapanu Island",
        waypoint: true,
        bosses: ["Great White One (Shark Fin -> Lesson Buff)"],
        pois: ["Petrified Pirate (Torn Map Piece 3)", "Crabshell Cavern"],
        steps: [
          "Defeat Great White One for Shark Fin (trade for permanent Lesson buff).",
          "Loot Petrified Pirate for Map Piece 3."
        ]
      },
      {
        name: "Singing Caverns",
        waypoint: true,
        bosses: ["Diamora, Song of Death"],
        pois: ["Beckoning Clam (Pearlescent Amulet)"],
        steps: [
          "Defeat siren Diamora (avoid petrifying gaze/song).",
          "Free Matiki to unlock Eye of Hinekora island."
        ]
      },
      {
        name: "Shrike Island",
        waypoint: true,
        bosses: ["Scourge of the Skies"],
        pois: ["Corpse Nest (Torn Map Piece 4)"],
        steps: [
          "Loot Corpse Nest for final Map Piece 4 (unlocks Plunder's Point / Expedition).",
          "Defeat Scourge of the Skies."
        ]
      },
      {
        name: "Eye of Hinekora",
        waypoint: true,
        npcs: ["Matiki", "Navali"],
        pois: ["3 Tests of Mettle", "Silent Hall (+5% Max Mana)"],
        steps: [
          "Pass Kaom, Maata, & Rakiata tests.",
          "Visit Silent Hall secret for +5% Maximum Mana buff."
        ]
      },
      {
        name: "Halls of the Dead",
        waypoint: true,
        bosses: ["Yama, the White (+2 Passive Skill Points)"],
        pois: ["Tasalio, Ngamahu, Tawhoa Tests (Attribute/Resist Tattoos)"],
        steps: [
          "Complete ancestor tests for permanent Tattoos.",
          "Defeat Yama the White, speak to Navali for 2 Skill Points."
        ]
      },
      {
        name: "Arastas",
        waypoint: true,
        bosses: ["Torvian, Hand of the Saviour"],
        pois: ["Morning Bell (3 Regal Orbs)", "Evening Bell (3 Exalted Orbs)"],
        steps: [
          "Loot Golden Bells for currency.",
          "Defeat Torvian (dodge thrown rocks into caster platforms to break shield)."
        ]
      },
      {
        name: "The Excavation",
        waypoint: true,
        bosses: ["Benedictus, First Herald"],
        steps: [
          "Defeat Benedictus (dodge roll earthen maze).",
          "Follow Makoru to the ancient weapon."
        ]
      },
      {
        name: "Ngakanu",
        waypoint: true,
        steps: ["Raging Tukohama village. Battle through to Heart of the Tribe."]
      },
      {
        name: "Heart of the Tribe",
        waypoint: true,
        bosses: ["Tavakai, the Chieftain (Act 4 Finale)"],
        pois: ["Meeting House Secret"],
        steps: [
          "Multi-phase elemental boss.",
          "Defeat Tavakai. Hooded One cures blood rage. Unlock Interludes!"
        ]
      }
    ]
  },
  {
    tag: "Interlude 1",
    title: "Interlude 1: Curse of Holten",
    subtitle: "Return to Ogham",
    summary: "Return to dark Ogham to help Renly defeat the impenetrable darkness encasing Holten.",
    areas: [
      {
        name: "The Refuge",
        isTown: true,
        waypoint: true,
        npcs: ["The Hooded One", "Renly", "Una", "Finn"],
        steps: ["Town hub for Interlude 1. Exit to Scorched Farmlands."]
      },
      {
        name: "Scorched Farmlands",
        waypoint: true,
        bosses: ["Isolde of White Shroud & Heldra of Black Pyre"],
        steps: ["Defeat Isolde (cold) and Heldra (fire) duo to break the stalemate."]
      },
      {
        name: "Stones of Serle",
        waypoint: true,
        bosses: ["Siora, Blade of the Mists"],
        steps: [
          "Activate 6 Megaliths around edge of zone.",
          "Defeat Siora (run to glowing Megalith when arena turns dark)."
        ]
      },
      {
        name: "The Blackwood",
        waypoint: true,
        pois: ["Omen Altars (Crafting Omens)"],
        steps: ["Touch Omen Altars for crafting items. Locate entrance to Holten."]
      },
      {
        name: "Holten",
        waypoint: true,
        npcs: ["The Ferryman (Greater Runes Shop)"],
        bosses: ["Sigbert & Godwin (Optional)"],
        steps: ["Buy Greater Runes from Ferryman. Enter Wolvenhold & Holten Estate."]
      },
      {
        name: "Wolvenhold",
        waypoint: true,
        bosses: ["Oswin, the Dread Warden (+2 Passive Skill Points)"],
        steps: ["Defeat Oswin, consume Warden's Ledger for 2 Skill Points."]
      },
      {
        name: "Holten Estate",
        waypoint: true,
        bosses: ["Thane Wulfric & Lady Elyswyth (Interlude 1 Finale)"],
        steps: ["Defeat Wulfric (fire) & Elyswyth (chaos) duo in courtyard."]
      }
    ]
  },
  {
    tag: "Interlude 2",
    title: "Interlude 2: The Stolen Barya",
    subtitle: "Vastiri Desert & Sacred Water",
    summary: "Assist Sekhema Asala and the Sel Khari tribe in securing the Sacred Water.",
    areas: [
      {
        name: "The Khari Bazaar",
        isTown: true,
        waypoint: true,
        npcs: ["The Hooded One", "Sekhema Asala", "Zarka", "Risu"],
        steps: ["Town hub. Take exit to Khari Crossing."]
      },
      {
        name: "The Khari Crossing",
        waypoint: false,
        bosses: ["Akthi, Final Sting & Anundr, Sandworm"],
        quests: ["Clearing the Way (+2 Passive Skill Points)"],
        pois: ["Molten Shrine (+5% Max Life)"],
        steps: [
          "Visit Molten Shrine secret for +5% Max Life.",
          "Defeat Akthi & Anundr, return to Risu for 2 Skill Points."
        ]
      },
      {
        name: "Sel Khari Sanctuary",
        waypoint: true,
        bosses: ["Elzarah, the Cobra Lord"],
        pois: ["Two Wishes (Choice of 2: Rare Ring, Amulet, or Jewel)"],
        steps: ["Defeat Elzarah. Make 2 wishes at Barya altars."]
      },
      {
        name: "The Galai Gates",
        waypoint: true,
        bosses: ["Vornas, the Fell Flame"],
        steps: ["Defeat Vornas to open gateway to Qimah."]
      },
      {
        name: "Qimah",
        waypoint: true,
        pois: ["Orbala's Pillar (Changeable Permanent Boons)"],
        steps: ["Select permanent boon at Orbala's Pillar (e.g. 15% Global Defences or +5 All Attributes)."]
      },
      {
        name: "Qimah Reservoir",
        waypoint: true,
        bosses: ["Azmadi, Faridun Prince (Interlude 2 Finale)"],
        pois: ["2 Sacred Wells (Random Currency)"],
        steps: ["Defeat Azmadi (long attack combos, dodge roll timing key)."]
      }
    ]
  },
  {
    tag: "Interlude 3",
    title: "Interlude 3: Doryani's Contingency",
    subtitle: "Kriar Peaks & Vaal Descendants",
    summary: "Search the icy mountains for ancient Vaal descendants to help save humanity.",
    areas: [
      {
        name: "The Glade",
        isTown: true,
        waypoint: true,
        npcs: ["The Hooded One", "Doryani", "Delwyn", "Hilda"],
        steps: ["Town hub. Take exit to Ashen Forest."]
      },
      {
        name: "Ashen Forest",
        waypoint: true,
        pois: ["Ancient Monument (Uncut Skill Gem Lvl 14)"],
        steps: ["Touch Ancient Monument for Lvl 14 Gem."]
      },
      {
        name: "Kriar Village",
        waypoint: true,
        bosses: ["Lythara, Wayward Spear (+40 Spirit, Uncut Spirit Gem Lvl 14)"],
        steps: ["Defeat Lythara before wisp empowerment stacks too high."]
      },
      {
        name: "Glacial Tarn",
        waypoint: true,
        bosses: ["Rakkar, Frozen Talon"],
        steps: ["Defeat Rakkar to access Kriar Peaks climb."]
      },
      {
        name: "Howling Caves",
        waypoint: true,
        bosses: ["Abominable Yeti (+2 Passive Skill Points)"],
        steps: ["Defeat Abominable Yeti, return Icy Tusks to Hilda for 2 Skill Points."]
      },
      {
        name: "Kriar Peaks",
        waypoint: true,
        npcs: ["Elder Madox"],
        steps: ["Talk to Elder Madox for one free Unique Item!"]
      },
      {
        name: "Etched Ravine",
        waypoint: true,
        bosses: ["Stormgore, the Guardian"],
        steps: ["Defeat Stormgore to unlock Cuachic Vault."]
      },
      {
        name: "The Cuachic Vault",
        waypoint: true,
        bosses: ["Zelin & Zelina, Blood Priests (Interlude 3 Finale)"],
        steps: [
          "Defeat Zolin & Zelina.",
          "Speak to Doryani, then return to Kingsmarch for final +2 Passive Skill Points!"
        ]
      }
    ]
  }
];
