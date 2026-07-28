/**
 * Automated Unit Test Suite for Kossian Paladin Website Logic
 * 
 * Realm: Lightbringer-EU
 * Character: Kossian, Male Paladin (Retribution/Holy)
 * Framework: Node.js standard assert module
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Setup mock browser environment before requiring app.js
const mockElements = {};

function createMockElement(id, tagName = 'div') {
    const children = [];
    const classes = new Set();
    const attributes = {};

    const el = {
        id,
        tagName,
        children,
        offsetWidth: 800,
        offsetHeight: 600,
        clientWidth: 800,
        clientHeight: 600,
        parentElement: null,
        classList: {
            add: (cls) => classes.add(cls),
            remove: (cls) => classes.delete(cls),
            contains: (cls) => classes.has(cls)
        },
        setAttribute: (attr, val) => { attributes[attr] = String(val); },
        getAttribute: (attr) => attributes[attr] || null,
        _innerHTML: '',
        get innerHTML() { return this._innerHTML; },
        set innerHTML(val) { this._innerHTML = val; },
        _textContent: '',
        get textContent() { return this._textContent; },
        set textContent(val) { this._textContent = val; },
        querySelector: (selector) => {
            if (selector === '.quote-text') {
                if (!mockElements['quote-text']) mockElements['quote-text'] = createMockElement('quote-text', 'p');
                return mockElements['quote-text'];
            }
            if (selector === '.quote-author') {
                if (!mockElements['quote-author']) mockElements['quote-author'] = createMockElement('quote-author', 'cite');
                return mockElements['quote-author'];
            }
            return null;
        },
        querySelectorAll: (selector) => {
            if (selector === '.filter-btn') {
                return [
                    { getAttribute: () => 'all', addEventListener: () => {}, classList: { add: () => {}, remove: () => {} } },
                    { getAttribute: () => 'classic', addEventListener: () => {}, classList: { add: () => {}, remove: () => {} } },
                    { getAttribute: () => 'modern', addEventListener: () => {}, classList: { add: () => {}, remove: () => {} } }
                ];
            }
            return [];
        },
        addEventListener: () => {},
        removeEventListener: () => {}
    };
    mockElements[id] = el;
    return el;
}

const mockDocument = {
    getElementById: (id) => {
        if (!mockElements[id]) {
            mockElements[id] = createMockElement(id);
        }
        return mockElements[id];
    },
    querySelector: (selector) => {
        if (selector === '#quote-display .quote-text') {
            const display = mockDocument.getElementById('quote-display');
            return display.querySelector('.quote-text');
        }
        if (selector === '#quote-display .quote-author') {
            const display = mockDocument.getElementById('quote-display');
            return display.querySelector('.quote-author');
        }
        return null;
    },
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
    body: createMockElement('body')
};

// Global browser window setup
global.window = global;
global.document = mockDocument;

// Mock Web Audio API AudioContext
global.window.AudioContext = class MockAudioContext {
    constructor() {
        this.state = 'running';
        this.currentTime = 0;
        this.destination = {};
    }
    createGain() {
        return {
            gain: {
                setValueAtTime: () => {},
                linearRampToValueAtTime: () => {},
                exponentialRampToValueAtTime: () => {},
                cancelScheduledValues: () => {},
                value: 0.1
            },
            connect: () => {}
        };
    }
    createOscillator() {
        return {
            type: 'sine',
            frequency: {
                setValueAtTime: () => {},
                linearRampToValueAtTime: () => {},
                exponentialRampToValueAtTime: () => {}
            },
            connect: () => {},
            start: () => {},
            stop: () => {}
        };
    }
    createBiquadFilter() {
        return {
            type: 'lowpass',
            frequency: {
                setValueAtTime: () => {},
                linearRampToValueAtTime: () => {},
                exponentialRampToValueAtTime: () => {}
            },
            Q: {
                setValueAtTime: () => {},
                linearRampToValueAtTime: () => {},
                exponentialRampToValueAtTime: () => {}
            },
            connect: () => {}
        };
    }
    resume() {
        return Promise.resolve();
    }
};

// Import app module
const app = require('../app.js');

let passCount = 0;
let failCount = 0;

function runTest(name, testFn) {
    try {
        testFn();
        console.log(`  ✓ PASS: ${name}`);
        passCount++;
    } catch (err) {
        console.error(`  ✗ FAIL: ${name}`);
        console.error(`    ${err.message}`);
        failCount++;
    }
}

console.log('====================================================');
console.log('  KOSSIAN WEBSITE AUTOMATED TEST SUITE');
console.log('  Realm: Lightbringer-EU | Class: Paladin');
console.log('====================================================\n');

// 1. CAMPAIGN_DATA Completeness & Structure Tests
console.log('--- 1. Testing CAMPAIGN_DATA Completeness & Boss Trophies ---');

runTest('CAMPAIGN_DATA should contain exactly 5 expansion sagas', () => {
    assert.strictEqual(Array.isArray(app.CAMPAIGN_DATA), true, 'CAMPAIGN_DATA must be an array');
    assert.strictEqual(app.CAMPAIGN_DATA.length, 5, 'Should contain 5 expansion sagas');
});

runTest('CAMPAIGN_DATA should contain required WoW expansions (WotLK, Legion, Shadowlands, Dragonflight, TWW)', () => {
    const expectedIds = ['wotlk', 'legion', 'shadowlands', 'dragonflight', 'tww'];
    const actualIds = app.CAMPAIGN_DATA.map(s => s.id);
    assert.deepStrictEqual(actualIds, expectedIds, 'Expansions must match required campaign order');
});

runTest('CAMPAIGN_DATA sagas must have complete schema and boss trophies', () => {
    const expectedTrophies = {
        wotlk: { name: 'The Lich King', icon: '👑' },
        legion: { name: 'Argus the Unmaker', icon: '🔥' },
        shadowlands: { name: 'Zovaal, The Jailer', icon: '💀' },
        dragonflight: { name: 'Fyrakk the Blazing', icon: '🐉' },
        tww: { name: 'Queen Ansurek', icon: '🕷️' }
    };

    app.CAMPAIGN_DATA.forEach(saga => {
        assert.ok(saga.id, `Saga missing id: ${saga.title}`);
        assert.ok(saga.category, `Saga missing category: ${saga.id}`);
        assert.ok(saga.title, `Saga missing title: ${saga.id}`);
        assert.ok(saga.location, `Saga missing location: ${saga.id}`);
        assert.ok(saga.era, `Saga missing era: ${saga.id}`);
        assert.ok(saga.description, `Saga missing description: ${saga.id}`);
        assert.ok(Array.isArray(saga.tags) && saga.tags.length > 0, `Saga missing tags: ${saga.id}`);

        assert.ok(saga.bossTrophy, `Saga missing bossTrophy: ${saga.id}`);
        assert.strictEqual(saga.bossTrophy.name, expectedTrophies[saga.id].name, `Boss trophy name mismatch for ${saga.id}`);
        assert.strictEqual(saga.bossTrophy.icon, expectedTrophies[saga.id].icon, `Boss trophy icon mismatch for ${saga.id}`);
        assert.ok(saga.bossTrophy.status, `Boss trophy status missing for ${saga.id}`);
    });
});

runTest('CAMPAIGN_DATA category classification (2 Classic, 3 Modern)', () => {
    const classicSagas = app.CAMPAIGN_DATA.filter(s => s.category === 'classic');
    const modernSagas = app.CAMPAIGN_DATA.filter(s => s.category === 'modern');
    assert.strictEqual(classicSagas.length, 2, 'Should have 2 classic sagas (WotLK, Legion)');
    assert.strictEqual(modernSagas.length, 3, 'Should have 3 modern sagas (Shadowlands, Dragonflight, TWW)');
});

// 2. KOSSIAN_QUOTES Array Completeness & Thematic Integrity Tests
console.log('\n--- 2. Testing KOSSIAN_QUOTES Array & Lightbringer-EU Themes ---');

runTest('KOSSIAN_QUOTES should be non-empty with unique entries', () => {
    assert.strictEqual(Array.isArray(app.KOSSIAN_QUOTES), true, 'KOSSIAN_QUOTES must be an array');
    assert.strictEqual(app.KOSSIAN_QUOTES.length, 10, 'Should contain 10 paladin quotes');

    const quoteTexts = app.KOSSIAN_QUOTES.map(q => q.quote);
    const uniqueQuotes = new Set(quoteTexts);
    assert.strictEqual(uniqueQuotes.size, quoteTexts.length, 'All quotes must be unique');
});

runTest('KOSSIAN_QUOTES author and thematic attributes', () => {
    app.KOSSIAN_QUOTES.forEach((item, index) => {
        assert.ok(item.quote && item.quote.length > 10, `Quote ${index} is too short or empty`);
        assert.strictEqual(item.author, 'Kossian, Lightbringer-EU', `Author mismatch on quote ${index}`);
    });
});

runTest('KOSSIAN_QUOTES should reflect Paladin and Lightbringer-EU motifs', () => {
    const combinedText = app.KOSSIAN_QUOTES.map(q => q.quote).join(' ');
    const requiredKeywords = ['Light', 'Silver Hand', 'Retribution', 'Lightbringer-EU', 'Hallowfall', 'Alliance'];

    requiredKeywords.forEach(keyword => {
        assert.ok(combinedText.includes(keyword), `Quotes should include thematic keyword: ${keyword}`);
    });
});

// 3. Timeline Filtering Engine Tests
console.log('\n--- 3. Testing Timeline Filtering Logic & Render Engine ---');

function filterCampaigns(category) {
    return app.CAMPAIGN_DATA.filter(saga => {
        if (category === 'all') return true;
        if (saga.category === category) return true;
        if (saga.id === category) return true;
        return false;
    });
}

runTest('filterCampaigns logic for "all" category', () => {
    const results = filterCampaigns('all');
    assert.strictEqual(results.length, 5, '"all" should return all 5 sagas');
});

runTest('filterCampaigns logic for "classic" category', () => {
    const results = filterCampaigns('classic');
    assert.strictEqual(results.length, 2, '"classic" should return 2 sagas');
    assert.deepStrictEqual(results.map(r => r.id), ['wotlk', 'legion']);
});

runTest('filterCampaigns logic for "modern" category', () => {
    const results = filterCampaigns('modern');
    assert.strictEqual(results.length, 3, '"modern" should return 3 sagas');
    assert.deepStrictEqual(results.map(r => r.id), ['shadowlands', 'dragonflight', 'tww']);
});

runTest('filterCampaigns logic for specific expansion ID', () => {
    const results = filterCampaigns('wotlk');
    assert.strictEqual(results.length, 1, 'Specific ID filter should return 1 saga');
    assert.strictEqual(results[0].title, 'Wrath of the Lich King');
});

runTest('renderChronicle DOM output generation', () => {
    const timelineEl = mockDocument.getElementById('chronicle-timeline');
    
    app.renderChronicle('classic');
    assert.ok(timelineEl.innerHTML.includes('Wrath of the Lich King'), 'Rendered HTML should include WotLK title');
    assert.ok(timelineEl.innerHTML.includes('Legion'), 'Rendered HTML should include Legion title');
    assert.ok(!timelineEl.innerHTML.includes('The War Within'), 'Rendered HTML should not include TWW for classic filter');

    app.renderChronicle('nonexistent');
    assert.ok(timelineEl.innerHTML.includes('timeline-placeholder'), 'Rendered HTML should show placeholder for empty filter result');
});

// 4. Quote Selection & Altar Logic Tests
console.log('\n--- 4. Testing Quote Selection Logic & Altar Generator ---');

runTest('invokeQuote should avoid immediate consecutive repeat selection', () => {
    let previousQuoteText = '';
    const quoteDisplayEl = mockDocument.getElementById('quote-display');
    const textNode = quoteDisplayEl.querySelector('.quote-text');

    // Run 100 consecutive invocations
    for (let i = 0; i < 100; i++) {
        app.invokeQuote();
        const currentText = textNode.textContent;
        assert.notStrictEqual(currentText, previousQuoteText, `Iteration ${i}: Consecutive quote repeat detected! (${currentText})`);
        previousQuoteText = currentText;
    }
});

runTest('invokeQuote updates DOM elements correctly', () => {
    const quoteDisplayEl = mockDocument.getElementById('quote-display');
    const textNode = quoteDisplayEl.querySelector('.quote-text');
    const authorNode = quoteDisplayEl.querySelector('.quote-author');

    app.invokeQuote();
    assert.ok(textNode.textContent.startsWith('"'), 'Quote text should be enclosed in quotes');
    assert.strictEqual(authorNode.textContent, '— Kossian, Lightbringer-EU', 'Author should match expected attribution');
});

// 5. Audio Synthesizer API & Window Exports Tests
console.log('\n--- 5. Testing Web Audio API Exports & Soundscape Toggle ---');

runTest('Audio synthesizer functions exposed on window object', () => {
    assert.strictEqual(typeof window.playHolyBell, 'function', 'window.playHolyBell must be a function');
    assert.strictEqual(typeof window.playSpellFlash, 'function', 'window.playSpellFlash must be a function');
    assert.strictEqual(typeof window.toggleAmbientDrone, 'function', 'window.toggleAmbientDrone must be a function');
    assert.strictEqual(typeof window.getAudioContext, 'function', 'window.getAudioContext must be a function');
});

runTest('getAudioContext creates and returns AudioContext instance', () => {
    const ctx = window.getAudioContext();
    assert.ok(ctx, 'getAudioContext must return AudioContext instance');
    assert.strictEqual(ctx.state, 'running', 'AudioContext state should be running');
});

runTest('toggleAmbientDrone toggles active state', () => {
    const activeFirstCall = window.toggleAmbientDrone();
    assert.strictEqual(activeFirstCall, true, 'First toggle call should activate drone soundscape');

    const activeSecondCall = window.toggleAmbientDrone();
    assert.strictEqual(activeSecondCall, false, 'Second toggle call should deactivate drone soundscape');
});

// 6. DOM Structure & HTML Integrity Tests
console.log('\n--- 6. Testing index.html Structure & Character Metadata ---');

runTest('index.html contains required section containers and element IDs', () => {
    const htmlPath = path.join(__dirname, '../index.html');
    assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    const requiredIds = [
        'ember-canvas',
        'audio-toggle',
        'chronicle-timeline',
        'chronicle-filters',
        'quote-display',
        'invoke-btn',
        'copy-quote-btn',
        'divine-flare-overlay',
        'altar-pedestal'
    ];

    requiredIds.forEach(id => {
        assert.ok(htmlContent.includes(`id="${id}"`), `index.html missing required element ID: #${id}`);
    });
});

runTest('index.html contains accurate realm attribution & character metadata', () => {
    const htmlPath = path.join(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(htmlContent.includes('Lightbringer-EU'), 'index.html must mention realm Lightbringer-EU');
    assert.ok(htmlContent.includes('Kossian') || htmlContent.includes('KOSSIAN'), 'index.html must mention character Kossian');
    assert.ok(htmlContent.includes('Paladin'), 'index.html must mention Paladin class');
    assert.ok(htmlContent.includes('Retribution'), 'index.html must mention Retribution specialization');
    assert.ok(htmlContent.includes('Holy'), 'index.html must mention Holy specialization');
});

console.log('\n====================================================');
console.log(`  TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('====================================================\n');

if (failCount > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
