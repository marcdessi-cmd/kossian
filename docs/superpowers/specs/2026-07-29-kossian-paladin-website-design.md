# Kossian of Lightbringer-EU — Heroic Paladin Shrine Design Spec

## Overview
A web application serving as an **Epic Heroic Shrine & Lore Archive** for **Kossian**, a legendary male Paladin hero on the World of Warcraft realm **Lightbringer-EU**. The application adopts a **Dark Gothic & Sacred Gold** visual design system, combining atmospheric canvas ember particle animations, aged parchment aesthetics, an interactive Campaign Chronicle timeline, and an interactive "Altar of Light" quote & battle cry generator with synthesized Web Audio API sound effects.

---

## 1. System Architecture & UI Components

### 1.1 Core Technology Stack
- **Structure**: Semantic HTML5 single-page application (`index.html`).
- **Styling**: Vanilla CSS3 (`styles.css`) using CSS Custom Properties, Flexbox, CSS Grid, and custom `@keyframes` micro-animations.
- **Interactivity & Audio**: Vanilla JavaScript (`app.js`) modular engine managing Canvas particle rendering, Web Audio API sound synthesis, timeline filters, and quote generation.
- **Typography**: Google Fonts (`Cinzel Decorative`, `Cinzel`, `IM Fell English`, and `Inter`).

### 1.2 Layout & Component Structure
1. **Navigation Header (`<header>`)**:
   - Kossian's Crest & Title emblem.
   - Smooth-scrolling anchor links (`#hero`, `#legend`, `#chronicle`, `#altar`).
   - Soundscape Toggle Button (ambient choir synth & FX toggle with icon indicator).
2. **Hero Altar Section (`#hero`)**:
   - Atmospheric canvas background (`#ember-canvas`) rendering floating golden ember particles.
   - Title: **KOSSIAN** — *High Crusader of Lightbringer-EU*.
   - Subtitle: *"By the Light, I stand as shield and sword against the shadow."*
   - Interactive CTA buttons: `Read the Legend`, `Invoke Holy Quote`.
3. **Heroic Legend & Character Stats (`#legend`)**:
   - Dark gothic parchment card styled with gilded borders and corner runes.
   - Character Bio: Human Male Paladin on Lightbringer-EU, Retribution / Holy specs.
   - Stat Cards: Strength of Faith, Holy Power, Boss Trophies, Crusade Victories.
4. **Interactive Campaign Chronicle (`#chronicle`)**:
   - Vertical timeline of Kossian's major expansion sagas across World of Warcraft history.
   - Filter Tabs: `All Sagas`, `Classic Crusades`, `Modern Campaigns`.
   - Campaign Cards: Expansion badge, dates, victory summaries, boss kill trophies (The Lich King, Argus the Unmaker, Zovaal, Fyrakk the Blazing, Queen Ansurek).
5. **Altar of the Light — Quote Generator (`#altar`)**:
   - Gilded holy pedestal UI element with glowing runes.
   - Interactive Button: `Invoke Holy Light`.
   - Visual FX: Screen-wide radiant golden shockwave and light flare on button activation.
   - Audio FX: Web Audio API synthesized holy bell chime and spell flash sound.
   - Output Card: Displays randomized or selectable Kossian battle cries and holy mantras, complete with copy-to-clipboard functionality.
6. **Footer (`<footer>`)**:
   - Homage to Lightbringer-EU realm, World of Warcraft Paladin class lore, and heroic closing statement.

---

## 2. Visual Design System

### 2.1 Color Palette
- **Backgrounds**:
  - Obsidian Void: `#08090C`
  - Dark Gothic Charcoal: `#11141D`
  - Parchment Dark Card: `#181B26`
- **Sacred Light Golds**:
  - Radiant Gold: `#FFD700`
  - Divine Amber: `#F5A623`
  - Holy Glow Accent: `#FFF3CC`
- **Gothic Secondary Colors**:
  - Aged Parchment Text: `#E2D5B7`
  - Holy Silver-Blue: `#7AA5D8`
  - Defeated Boss Crimson: `#8B1E1E`

### 2.2 Typography
- **Headings & Titles**: `Cinzel Decorative`, `Cinzel` (Serif / High-Fantasy)
- **Body & Lore**: `IM Fell English`, `Inter` (Readable Parchment Serif / Clean Sans)

### 2.3 Audio & Visual Micro-Interactions
- **Ember Canvas Engine**: Canvas 2D particle simulation running floating golden sparks upward with randomized velocities and pulsing opacities.
- **Divine Light Flare**: CSS radial gradient pulse paired with canvas particle explosion on quote invocation.
- **Web Audio API Synth**:
  - *Holy Bell Chime*: Dual-oscillator sine wave with long decay simulating a golden cathedral bell.
  - *Spell Cast Flash*: Frequency sweep with white noise burst simulating a Paladin Holy Light spell.
  - *Ambient Drone*: Soft low-frequency harmonic drone toggled on/off.

---

## 3. Data & Content Schema

### 3.1 Profile Data
- **Name**: Kossian
- **Realm**: Lightbringer-EU
- **Class / Specs**: Paladin (Retribution / Holy)
- **Titles**: High Crusader of Lightbringer, Champion of the Light, Shield of Azeroth

### 3.2 Campaign Sagas
1. **The Frozen Crusade (Wrath of the Lich King)**
   - *Target*: Icecrown Citadel / Arthas Menethil
   - *Summary*: Stood at the spearhead of the Lightbringer vanguard to shatter the Scourge.
2. **The Burning Argus Campaign (Legion)**
   - *Target*: Antorus, the Burning Throne / Argus the Unmaker
   - *Summary*: Joined the Army of the Light on Argus to purge the Burning Legion.
3. **Shadowlands Redemption (Shadowlands)**
   - *Target*: Sepulcher of the First Ones / Zovaal the Jailer
   - *Summary*: Endured the realms of Death alongside Bastion's Kyrian champions.
4. **Dragonisle Guardianship (Dragonflight)**
   - *Target*: Amirdrassil, Dream's Hope / Fyrakk the Blazing
   - *Summary*: Protected the World Tree from shadowflame destruction.
5. **The Subterranean Vanguard (The War Within)**
   - *Target*: Khaz Algar & Nerub-ar Palace / Queen Ansurek
   - *Summary*: Leading Lightbringer-EU forces into the subterranean void depths.

### 3.3 Quotes & Battle Cries
- *"The Light does not promise easy victory — it promises you will never walk in darkness."*
- *"For Lightbringer-EU! By my blade, the shadow yields!"*
- *"Where darkness is thickest, our holy flame burns brightest."*
- *"Stand resolute! The Light shields all who hold faith!"*
- *"Even in the absolute cold of Icecrown, faith was our unbreakable hearth."*
- *"May the Light grant you grace, for my warhammer shall grant no quarter!"*

---

## 4. Verification & Testing Strategy
1. **Cross-Device Layout Verification**: Test breakpoints from mobile (375px) to 4K displays.
2. **Audio Autoplay Safety**: Ensure audio context initializes seamlessly on initial user gesture/click.
3. **Particle Engine Performance**: Verify 60 FPS animation loop with low CPU footprint.
4. **Interactive State Verification**: Test timeline filters, quote generator randomness, copy feedback, and mute/unmute controls.
