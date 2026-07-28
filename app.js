/**
 * Kossian - Paladin of Lightbringer-EU
 * Particle Canvas & Interactive Application Script
 */

/* ==========================================================================
   1. HTML5 Canvas Ember Particle Engine
   ========================================================================== */

/**
 * Initializes the HTML5 Canvas Ember Particle Engine.
 * Renders floating golden sparks drifting upwards with dynamic glow, 
 * pulsing opacity, and responsive window resize support.
 */
function initEmberCanvas() {
    const canvas = document.getElementById('ember-canvas');
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;

    // Particle Configuration
    const PARTICLE_COUNT = 65; // Density appropriate for hero background
    const GOLD_PALETTE = [
        { r: 255, g: 215, b: 0 },   // #FFD700 Radiant Gold
        { r: 255, g: 229, b: 92 },  // #FFE55C Bright Gold
        { r: 245, g: 166, b: 35 },  // #F5A623 Warm Ember Gold
        { r: 197, g: 160, b: 89 }   // #C5A059 Muted Gold
    ];

    /**
     * Resizes canvas buffer size to match display dimensions.
     */
    function resizeCanvas() {
        const hero = canvas.parentElement || document.body;
        width = canvas.width = hero.clientWidth || window.innerWidth;
        height = canvas.height = hero.clientHeight || window.innerHeight;
    }

    /**
     * Particle Class representing an individual sacred ember.
     */
    class EmberParticle {
        constructor(isInitial = false) {
            this.reset(isInitial);
        }

        reset(isInitial = false) {
            this.x = Math.random() * width;
            // Spawn across full height initially, or at bottom on recycle
            this.y = isInitial ? Math.random() * height : height + Math.random() * 20;
            
            this.radius = 1 + Math.random() * 2; // 1px to 3px
            this.vy = -(0.3 + Math.random() * 0.9); // Upward speed -0.3 to -1.2 px/frame
            this.vx = (Math.random() - 0.5) * 0.4; // Subtle horizontal drift
            
            // Sway properties (sine wave oscillation)
            this.swayAngle = Math.random() * Math.PI * 2;
            this.swaySpeed = 0.01 + Math.random() * 0.02;
            this.swayMagnitude = 0.3 + Math.random() * 0.5;

            // Opacity & Pulsing
            this.baseAlpha = 0.2 + Math.random() * 0.6; // 0.2 to 0.8
            this.alpha = this.baseAlpha;
            this.pulseAngle = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.02 + Math.random() * 0.03;

            // Color selection from palette
            this.color = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
        }

        update() {
            // Horizontal sway
            this.swayAngle += this.swaySpeed;
            this.x += this.vx + Math.sin(this.swayAngle) * this.swayMagnitude;

            // Upward movement
            this.y += this.vy;

            // Pulsing opacity
            this.pulseAngle += this.pulseSpeed;
            this.alpha = Math.max(0.1, Math.min(0.85, this.baseAlpha + Math.sin(this.pulseAngle) * 0.2));

            // Recycle when particle moves out of view at top or sides
            if (this.y < -10 || this.x < -20 || this.x > width + 20) {
                this.reset(false);
            }
        }

        draw(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

            // Sacred golden fill with radial glow effect
            const { r, g, b } = this.color;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
            
            // Soft outer glow for embers
            ctx.shadowBlur = this.radius * 4;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.8})`;

            ctx.fill();
            ctx.restore();
        }
    }

    /**
     * Initializes particle population.
     */
    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new EmberParticle(true));
        }
    }

    /**
     * Main animation loop running at 60 FPS via requestAnimationFrame.
     */
    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(ctx);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // Setup & Start
    resizeCanvas();
    initParticles();
    animate();

    return {
        stop: () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }
    };
}


/* ==========================================================================
   2. Sacred Web Audio API Sound Synthesizer
   ========================================================================== */

let audioCtx = null;
let isDroneActive = false;
let droneState = null;

/**
 * Lazy initializer for AudioContext triggered on user gesture.
 * Handles suspended context resuming for browser autoplay policies.
 */
function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

/**
 * Plays a sacred Holy Bell chime using dual harmonic sine wave synthesis.
 * Features realistic bell attack and exponential decay.
 */
function playHolyBell() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Master gain for the bell chime
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.015); // Fast attack
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5); // Warm exponential decay

    masterGain.connect(ctx.destination);

    // Harmonic frequencies (Fundamental = 528Hz Sacred Solfeggio / C5-ish)
    const harmonics = [
        { freq: 528, gain: 0.6 },   // Fundamental C5
        { freq: 1056, gain: 0.35 }, // 2nd Harmonic Octave (1056Hz)
        { freq: 1584, gain: 0.15 }, // 3rd Harmonic Perfect Fifth (1584Hz)
        { freq: 264, gain: 0.25 }    // Sub-harmonic warmth (264Hz)
    ];

    harmonics.forEach(({ freq, gain }) => {
        const osc = ctx.createOscillator();
        const nodeGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        nodeGain.gain.setValueAtTime(gain, now);
        if (freq > 528) {
            nodeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        } else {
            nodeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
        }

        osc.connect(nodeGain);
        nodeGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 2.6);
    });
}

/**
 * Plays a divine Spell Flash sound using frequency sweep synthesis.
 * Simulates a rising holy aura bursting into light.
 */
function playSpellFlash() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.45;

    // Master gain with quick envelope
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(0.28, now + 0.04);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Dynamic sweeping resonant filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.3);
    filter.Q.setValueAtTime(3.0, now);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Primary sweeping oscillator (Sine)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(320, now);
    osc1.frequency.exponentialRampToValueAtTime(1280, now + 0.32);

    // Secondary shimmer oscillator (Triangle harmonic)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(640, now);
    osc2.frequency.exponentialRampToValueAtTime(2560, now + 0.32);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.4, now);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
}

/**
 * Toggles the sacred ambient choir soundscape.
 * Generates a continuous low-harmonic choir drone with smooth fade transitions.
 */
function toggleAmbientDrone() {
    const ctx = getAudioContext();
    if (!ctx) return false;

    const now = ctx.currentTime;

    if (isDroneActive && droneState) {
        // Fade out and stop active drone
        const { masterGain, oscs, lfo } = droneState;

        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

        setTimeout(() => {
            try {
                oscs.forEach(osc => osc.stop());
                if (lfo) lfo.stop();
            } catch (e) {
                // Nodes already stopped
            }
        }, 1100);

        droneState = null;
        isDroneActive = false;
        updateAudioToggleUI(false);
        return false;
    } else {
        // Start drone soundscape with smooth fade in
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.linearRampToValueAtTime(0.18, now + 1.5); // Smooth 1.5s fade-in

        // Sacred choir lowpass filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, now);
        filter.Q.setValueAtTime(1.5, now);

        // LFO for subtle choir breath modulation (0.2 Hz)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.2, now); // 5 second cycle
        lfoGain.gain.setValueAtTime(120, now); // Modulate filter cutoff +-120Hz

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        // Choir harmonic note stack (A2, E3, A3, C#4 - A Major Sacred Chord)
        const chordFreqs = [
            { freq: 110.00, type: 'sine', gain: 0.5 },    // A2 Root
            { freq: 164.81, type: 'sine', gain: 0.35 },   // E3 Fifth
            { freq: 220.00, type: 'triangle', gain: 0.25 },// A3 Octave
            { freq: 277.18, type: 'sine', gain: 0.2 }     // C#4 Major Third
        ];

        const oscs = chordFreqs.map(({ freq, type, gain }) => {
            const osc = ctx.createOscillator();
            const nodeGain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            nodeGain.gain.setValueAtTime(gain, now);

            osc.connect(nodeGain);
            nodeGain.connect(filter);
            osc.start(now);
            return osc;
        });

        lfo.start(now);

        droneState = {
            masterGain,
            oscs,
            lfo,
            lfoGain
        };
        isDroneActive = true;
        updateAudioToggleUI(true);
        return true;
    }
}

/**
 * Updates the visual state of the #audio-toggle button in the navigation header.
 * @param {boolean} active - Whether the ambient soundscape is active.
 */
function updateAudioToggleUI(active) {
    const btn = document.getElementById('audio-toggle');
    if (!btn) return;

    if (active) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        btn.innerHTML = `
            <span class="audio-icon">🔊</span>
            <span class="audio-status">Soundscape: ON</span>
        `;
    } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML = `
            <span class="audio-icon">🔇</span>
            <span class="audio-status">Soundscape: OFF</span>
        `;
    }
}

/**
 * Binds DOM event handlers for audio control and lazy AudioContext unlock.
 */
function initAudioControls() {
    const audioBtn = document.getElementById('audio-toggle');
    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            toggleAmbientDrone();
        });
    }

    // Lazy AudioContext unlock on first user interaction anywhere on page
    const unlockAudio = () => {
        getAudioContext();
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('keydown', unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });
}

// Expose public sound synthesis API globally on window object
if (typeof window !== 'undefined') {
    window.playHolyBell = playHolyBell;
    window.playSpellFlash = playSpellFlash;
    window.toggleAmbientDrone = toggleAmbientDrone;
    window.getAudioContext = getAudioContext;
}

/* ==========================================================================
   3. Campaign Chronicle Data & Filtering Engine
   ========================================================================== */

/**
 * Historical Sagas of Kossian, Paladin of Lightbringer-EU.
 * Spans iconic World of Warcraft expansions with boss kill trophies.
 */
const CAMPAIGN_DATA = [
    {
        id: 'wotlk',
        category: 'classic',
        title: 'Wrath of the Lich King',
        location: 'Northrend • Icecrown Citadel',
        era: '2008 – 2010',
        description: 'Joined the Argent Crusade upon the frozen shores of Northrend. Wielding divine retribution, Kossian stood atop the Frozen Throne during the siege of Icecrown Citadel to vanquish Arthas Menethil and break the Scourge command.',
        bossTrophy: {
            icon: '👑',
            name: 'The Lich King',
            status: 'Vanquished • Icecrown Citadel'
        },
        tags: ['Icecrown Citadel', 'Argent Crusade', 'Undead Scourge', 'Retribution']
    },
    {
        id: 'legion',
        category: 'classic',
        title: 'Legion',
        location: 'Broken Isles & Argus • Antorus',
        era: '2016 – 2018',
        description: 'As High Lord of the Order of the Silver Hand at Netherlight Temple, Kossian led paladins against the Burning Legion. Traversed the demonic realm of Argus to strike down Argus the Unmaker in Antorus, the Burning Throne.',
        bossTrophy: {
            icon: '🔥',
            name: 'Argus the Unmaker',
            status: 'Banished • Antorus, the Burning Throne'
        },
        tags: ['Order of the Silver Hand', 'Burning Legion', 'High Lord', 'Holy/Retribution']
    },
    {
        id: 'shadowlands',
        category: 'modern',
        title: 'Shadowlands',
        location: 'Shadowlands • Sepulcher of the First Ones',
        era: '2020 – 2022',
        description: 'Breached the realm of Death to defend the cosmos from reality rewrite. Aligned with the Kyrian Covenant of Bastion, channeling holy radiance into Zereth Mortis to seal away Zovaal the Jailer.',
        bossTrophy: {
            icon: '💀',
            name: 'Zovaal, The Jailer',
            status: 'Bound • Sepulcher of the First Ones'
        },
        tags: ['Zereth Mortis', 'Kyrian Covenant', 'First Ones', 'Holy Light']
    },
    {
        id: 'dragonflight',
        category: 'modern',
        title: 'Dragonflight',
        location: 'Dragon Isles • Amirdrassil',
        era: '2022 – 2024',
        description: 'Heeded the awakening of the Dragon Isles, battling alongside the Dragon Aspects. Stood as a holy bulwark at the Emerald Dream to extinguish Fyrakk the Blazing before the World Tree Amirdrassil.',
        bossTrophy: {
            icon: '🐉',
            name: 'Fyrakk the Blazing',
            status: 'Extinguished • Amirdrassil, the Dream\'s Hope'
        },
        tags: ['Amirdrassil', 'Dragon Aspects', 'Primalist Fall', 'Retribution']
    },
    {
        id: 'tww',
        category: 'modern',
        title: 'The War Within',
        location: 'Khaz Algar • Nerub\'ar Palace',
        era: '2024 – Present',
        description: 'Descended into the subterranean depths of Khaz Algar and the Radiant Song of Hallowfall. Defending the Arathi sacred flames and breaching Nerub\'ar Palace to dethrone Queen Ansurek.',
        bossTrophy: {
            icon: '🕷️',
            name: 'Queen Ansurek',
            status: 'Shattered • Nerub\'ar Palace, Azj-Kahet'
        },
        tags: ['Khaz Algar', 'Hallowfall Arathi', 'Sacred Flame', 'Paladin Champion']
    }
];

/**
 * Dynamic chronicle renderer.
 * Filters campaign sagas by category/expansion and populates #chronicle-timeline DOM element.
 * @param {string} filterCategory - 'all', 'classic', 'modern', or specific expansion ID
 */
function renderChronicle(filterCategory = 'all') {
    const timelineContainer = document.getElementById('chronicle-timeline');
    if (!timelineContainer) return;

    // Filter items
    const filteredData = CAMPAIGN_DATA.filter(saga => {
        if (filterCategory === 'all') return true;
        if (saga.category === filterCategory) return true;
        if (saga.id === filterCategory) return true;
        return false;
    });

    if (filteredData.length === 0) {
        timelineContainer.innerHTML = `
            <div class="timeline-placeholder text-center">
                <p class="parchment-text">No campaign sagas found for the selected filter.</p>
            </div>
        `;
        return;
    }

    // Build timeline cards HTML
    const cardsHTML = filteredData.map((saga, index) => {
        const positionClass = (index % 2 === 0) ? 'left' : 'right';
        const tagsHTML = saga.tags.map(tag => `<span class="tag-badge">${escapeHTML(tag)}</span>`).join('');

        return `
            <div class="timeline-item ${positionClass} animate-fade-in">
                <div class="timeline-marker" title="${escapeHTML(saga.title)}"></div>
                <div class="timeline-card legend-card">
                    <div class="card-corner corner-tl"></div>
                    <div class="card-corner corner-tr"></div>
                    <div class="card-corner corner-bl"></div>
                    <div class="card-corner corner-br"></div>

                    <div class="timeline-card-header">
                        <div class="timeline-meta">
                            <span class="timeline-era">${escapeHTML(saga.era)}</span>
                            <span class="timeline-location">${escapeHTML(saga.location)}</span>
                        </div>
                        <h3 class="timeline-title">${escapeHTML(saga.title)}</h3>
                    </div>

                    <p class="timeline-description">${escapeHTML(saga.description)}</p>

                    <div class="boss-trophy-badge">
                        <span class="trophy-icon">${saga.bossTrophy.icon}</span>
                        <div class="trophy-info">
                            <span class="trophy-boss">${escapeHTML(saga.bossTrophy.name)}</span>
                            <span class="trophy-status">${escapeHTML(saga.bossTrophy.status)}</span>
                        </div>
                    </div>

                    <div class="timeline-tags">
                        ${tagsHTML}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    timelineContainer.innerHTML = cardsHTML;
}

/**
 * Escapes HTML characters to prevent XSS injection.
 * @param {string} str 
 * @returns {string}
 */
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, match => {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

/**
 * Binds event handlers for chronicle filter buttons in #chronicle-filters.
 * Plays Holy Bell sound upon selection.
 */
function initChronicleFilters() {
    const filterContainer = document.getElementById('chronicle-filters');
    if (!filterContainer) return;

    const filterButtons = filterContainer.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterCategory = button.getAttribute('data-filter') || 'all';

            // Remove active class from all buttons and set active on clicked
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Play sacred sound chime
            if (typeof window.playHolyBell === 'function') {
                window.playHolyBell();
            }

            // Render filtered timeline
            renderChronicle(filterCategory);
        });
    });
}

// Expose chronicle API globally on window object
if (typeof window !== 'undefined') {
    window.CAMPAIGN_DATA = CAMPAIGN_DATA;
    window.renderChronicle = renderChronicle;
    window.initChronicleFilters = initChronicleFilters;
}

/* ==========================================================================
   4. Altar of Light Quote Generator & Divine Light Flare Engine
   ========================================================================== */

/**
 * Archive of Kossian's battle cries, paladin oaths, and holy incantations.
 * Character: Kossian, Male Paladin (Retribution/Holy) of Lightbringer-EU.
 */
const KOSSIAN_QUOTES = [
    {
        quote: "Where shadow looms, the Holy Light shines brightest. Stand firm, champions of the Silver Hand!",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "Retribution is not vengeance—it is the unwavering balance of divine justice.",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "By the sacred fires of Hallowfall and the honor of Lightbringer-EU, no darkness shall prevail!",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "With shield uplifted and holy blade drawn, I stand as an eternal bulwark for the Alliance!",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "May the grace of the Light mend your wounds and purge the corruption from this realm.",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "From Northrend's frozen spire to the depths of Khaz Algar, our crusade never falters!",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "Faith is our shield, zeal is our sword. For the Light and for Azeroth!",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "In the face of the abyss, we do not retreat. We shine!",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "A true Paladin does not fight for glory, but to be the beacon in the darkest night.",
        author: "Kossian, Lightbringer-EU"
    },
    {
        quote: "Let divine judgment strike down those who threaten the innocent and break the peace of Azeroth!",
        author: "Kossian, Lightbringer-EU"
    }
];

let currentQuoteIndex = 0;

/**
 * Handler for #invoke-btn click event.
 * Triggers golden radial shockwaves on screen and pedestal, plays spell flash sound,
 * and updates #quote-display with a non-repeating random quote.
 */
function invokeQuote() {
    // 1. Select next non-repeating randomized quote
    if (KOSSIAN_QUOTES.length > 1) {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * KOSSIAN_QUOTES.length);
        } while (nextIndex === currentQuoteIndex);
        currentQuoteIndex = nextIndex;
    }

    const selectedQuote = KOSSIAN_QUOTES[currentQuoteIndex];

    // 2. Play spell flash sound effect
    if (typeof window.playSpellFlash === 'function') {
        window.playSpellFlash();
    }

    // 3. Trigger Screen Divine Flare Overlay
    const screenOverlay = document.getElementById('divine-flare-overlay');
    if (screenOverlay) {
        screenOverlay.classList.remove('active');
        // Force DOM reflow to restart CSS keyframe animation
        void screenOverlay.offsetWidth;
        screenOverlay.classList.add('active');
    }

    // 4. Trigger Pedestal Golden Shockwave
    const pedestal = document.getElementById('altar-pedestal');
    if (pedestal) {
        pedestal.classList.remove('flare-active');
        void pedestal.offsetWidth;
        pedestal.classList.add('flare-active');
    }

    // 5. Update Quote Display DOM with animated transition
    const quoteDisplay = document.getElementById('quote-display');
    if (quoteDisplay) {
        quoteDisplay.classList.remove('quote-animated');
        void quoteDisplay.offsetWidth;

        const textEl = quoteDisplay.querySelector('.quote-text');
        const authorEl = quoteDisplay.querySelector('.quote-author');

        if (textEl) textEl.textContent = `"${selectedQuote.quote}"`;
        if (authorEl) authorEl.textContent = `— ${selectedQuote.author}`;

        quoteDisplay.classList.add('quote-animated');
    }
}

/**
 * Copies the current inscription to the user's clipboard and triggers feedback toast.
 */
function copyCurrentQuote() {
    const textEl = document.querySelector('#quote-display .quote-text');
    const authorEl = document.querySelector('#quote-display .quote-author');
    if (!textEl) return;

    const fullText = authorEl ? `${textEl.textContent} ${authorEl.textContent}` : textEl.textContent;

    const showSuccessToast = () => {
        const feedbackEl = document.getElementById('altar-feedback');
        if (feedbackEl) {
            feedbackEl.textContent = '✨ Quote Copied for the Light!';
            feedbackEl.classList.remove('active');
            void feedbackEl.offsetWidth;
            feedbackEl.classList.add('active');

            setTimeout(() => {
                feedbackEl.classList.remove('active');
                setTimeout(() => {
                    if (!feedbackEl.classList.contains('active')) {
                        feedbackEl.textContent = '';
                    }
                }, 300);
            }, 3000);
        }

        if (typeof window.playHolyBell === 'function') {
            window.playHolyBell();
        }
    };

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(fullText).then(() => {
            showSuccessToast();
        }).catch(() => {
            fallbackCopyText(fullText);
            showSuccessToast();
        });
    } else {
        fallbackCopyText(fullText);
        showSuccessToast();
    }
}

/**
 * Fallback clipboard copy for browsers restricting navigator.clipboard API.
 * @param {string} text 
 */
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (e) {
        console.error('Fallback copy command error:', e);
    }
    document.body.removeChild(textArea);
}

/**
 * Binds event listeners for Altar of Light buttons (#invoke-btn and #copy-quote-btn).
 */
function initAltarControls() {
    const invokeBtn = document.getElementById('invoke-btn');
    if (invokeBtn) {
        invokeBtn.addEventListener('click', invokeQuote);
    }

    const copyBtn = document.getElementById('copy-quote-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyCurrentQuote);
    }
}

// Expose public Altar API globally on window object
if (typeof window !== 'undefined') {
    window.KOSSIAN_QUOTES = KOSSIAN_QUOTES;
    window.invokeQuote = invokeQuote;
    window.copyCurrentQuote = copyCurrentQuote;
    window.initAltarControls = initAltarControls;
}

/* ==========================================================================
   5. Main Application Initialization
   ========================================================================== */

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initEmberCanvas();
        initAudioControls();
        renderChronicle('all');
        initChronicleFilters();
        initAltarControls();
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CAMPAIGN_DATA,
        renderChronicle,
        initChronicleFilters,
        escapeHTML,
        KOSSIAN_QUOTES,
        invokeQuote,
        copyCurrentQuote,
        initAltarControls
    };
}



