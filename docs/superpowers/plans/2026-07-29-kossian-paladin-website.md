# Kossian Paladin Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, dark gothic single-page web application featuring an interactive Campaign Chronicle timeline, Altar of Light quote generator, and Web Audio API synthesized soundscape for Kossian, a male Paladin hero on World of Warcraft (Lightbringer-EU).

**Architecture:** A lightweight, dependency-free HTML5, Vanilla CSS3, and Vanilla JavaScript single-page application. The app uses an HTML5 Canvas for floating golden ember background particles, CSS variables for a dark gothic and sacred gold color palette, Web Audio API for browser-synthesized holy sound effects, and modular JS for timeline filtering and quote generation.

**Tech Stack:** HTML5, Vanilla CSS3 (Grid/Flexbox/Keyframes), Vanilla JavaScript (ES6+), Web Audio API, HTML5 Canvas, Google Fonts (`Cinzel`, `Cinzel Decorative`, `IM Fell English`, `Inter`).

## Global Constraints

- Must run natively in browser without third-party frameworks or build tools (Vanilla JS/CSS/HTML).
- Realm attribution: World of Warcraft, Lightbringer-EU.
- Character: Kossian, Male Paladin (Retribution/Holy).
- Visual Aesthetic: Dark Gothic & Sacred Gold (`#08090C` obsidian depth, `#FFD700` sacred gold, `#E2D5B7` parchment text).
- Audio: Must use Web Audio API synthesis so no external audio files are required.

---

### Task 1: HTML Layout Scaffolding & Dark Gothic CSS Design System

**Files:**
- Create: `index.html`
- Create: `styles.css`

**Interfaces:**
- Consumes: None
- Produces: Base HTML DOM structure (`#hero`, `#legend`, `#chronicle`, `#altar`, `footer`) and CSS design variables/tokens.

- [ ] **Step 1: Create `index.html` with semantic structure and meta tags**

Create `index.html` with full semantic layout, Google Fonts references, navigation bar, hero banner, legend card shell, chronicle timeline container, altar pedestal shell, and footer.

- [ ] **Step 2: Create `styles.css` with Dark Gothic & Sacred Gold tokens**

Implement CSS custom variables (`--bg-obsidian`, `--gold-radiant`, `--parchment`, `--border-gilded`), global resets, responsive layout containers, navbar styling, card borders, and custom scrollbar styles.

- [ ] **Step 3: Verify initial HTML/CSS rendering in local environment**

Run a lightweight static HTTP server or inspect `index.html` in browser to confirm zero console errors and clean layout rendering.

- [ ] **Step 4: Commit Task 1**

```bash
git add index.html styles.css
git commit -m "feat: scaffold HTML structure and dark gothic CSS design system"
```

---

### Task 2: HTML5 Canvas Ember Particle Engine

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Create: `app.js`

**Interfaces:**
- Consumes: `#ember-canvas` element in `index.html`
- Produces: `initEmberCanvas()` background particle system in `app.js`

- [ ] **Step 1: Add Canvas element to `#hero` in `index.html`**

Ensure `#hero` contains `<canvas id="ember-canvas"></canvas>` with absolute position behind content.

- [ ] **Step 2: Implement `initEmberCanvas()` in `app.js`**

Write canvas particle loop rendering upward floating golden sparks with randomized sizes (1px–3px), speeds, opacities (0.2–0.8), and pulse behaviors using `requestAnimationFrame`. Handle window resize event listeners.

- [ ] **Step 3: Verify canvas animation smooth execution**

Verify 60 FPS animation with zero console errors.

- [ ] **Step 4: Commit Task 2**

```bash
git add index.html styles.css app.js
git commit -m "feat: implement canvas ember particle background engine"
```

---

### Task 3: Web Audio API Soundscape & Audio Toggle

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

**Interfaces:**
- Consumes: `#audio-toggle` button in `index.html`
- Produces: `playHolyBell()`, `playSpellFlash()`, `toggleAmbientDrone()` sound functions in `app.js`

- [ ] **Step 1: Implement Web Audio API Synthesizer in `app.js`**

Create `AudioContext` lazy initializer triggered on user interaction. Implement `playHolyBell()` (sine wave dual harmonic bell with decay), `playSpellFlash()` (frequency sweep spell sound), and `toggleAmbientDrone()` (low harmonic choir synth).

- [ ] **Step 2: Bind Audio Toggle control in header**

Connect `#audio-toggle` element to stateful mute/unmute audio drone manager with visual icon update (Mute/Unmute state).

- [ ] **Step 3: Test Audio API execution**

Verify sound synthesis works on button interaction without breaking on un-instantiated audio context.

- [ ] **Step 4: Commit Task 3**

```bash
git add index.html styles.css app.js
git commit -m "feat: add Web Audio API holy sound synthesizer and audio toggle"
```

---

### Task 4: Interactive Campaign Chronicle Timeline & Filtering

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

**Interfaces:**
- Consumes: `#chronicle-timeline` and filter buttons `.filter-btn`
- Produces: Campaign data rendering and expansion filter logic (`filterCampaigns(category)`)

- [ ] **Step 1: Add Campaign Sagas Data in `app.js`**

Define `CAMPAIGN_DATA` array containing 5 expansion sagas (WotLK, Legion, Shadowlands, Dragonflight, The War Within) with titles, locations, dates, boss victory trophies, and campaign lore.

- [ ] **Step 2: Render Timeline & Filter Controls in `app.js`**

Implement `renderChronicle(filter)` function to dynamically populate vertical timeline cards with gilded badges, boss kill trophies, and expansion tags.

- [ ] **Step 3: Style Timeline Cards in `styles.css`**

Add dark gothic card borders, hover glows, timeline central axis line, and responsive layout for mobile screens.

- [ ] **Step 4: Commit Task 4**

```bash
git add index.html styles.css app.js
git commit -m "feat: implement interactive campaign chronicle timeline and filtering"
```

---

### Task 5: Altar of Light Quote Generator & Visual Flare

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

**Interfaces:**
- Consumes: `#invoke-btn`, `#quote-display`, `#copy-quote-btn`
- Produces: `invokeQuote()` handler with visual Divine Flare effect and clipboard copy feedback

- [ ] **Step 1: Define Quotes Repository & Altar HTML structure**

Define `KOSSIAN_QUOTES` array in `app.js`. Ensure `#altar` contains altar pedestal graphics, quote card, and invocation trigger button.

- [ ] **Step 2: Implement `invokeQuote()` with Divine Light shockwave**

Clicking `#invoke-btn` triggers screen-wide golden radial light flash, plays `playSpellFlash()`, and displays a new randomized quote with fade-in animation.

- [ ] **Step 3: Implement Copy-to-Clipboard functionality**

Add copy button handler with temporary success message ("Quote Copied for the Light!").

- [ ] **Step 4: Commit Task 5**

```bash
git add index.html styles.css app.js
git commit -m "feat: implement Altar of Light quote generator and divine flare effect"
```

---

### Task 6: Test Suite & Final Verification

**Files:**
- Create: `tests/app.test.js`

**Interfaces:**
- Consumes: `app.js` exported functions and data structures
- Produces: Automated node assertion test suite verifying campaign filters, quote selection, and audio state initialization.

- [ ] **Step 1: Create `tests/app.test.js` unit test suite**

Write assertions using Node's `assert` module testing:
1. `CAMPAIGN_DATA` structure and filter output completeness.
2. `KOSSIAN_QUOTES` array non-empty and unique selection logic.
3. DOM element binding sanity checks.

- [ ] **Step 2: Run test suite and confirm 100% pass**

Run: `node tests/app.test.js`
Expected output: All test cases PASS.

- [ ] **Step 3: Commit Task 6**

```bash
git add tests/app.test.js
git commit -m "test: add automated unit test suite for Kossian website logic"
```
