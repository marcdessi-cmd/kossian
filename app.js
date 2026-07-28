/**
 * Kossian - Paladin of Lightbringer-EU
 * Particle Canvas & Interactive Application Script
 */

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

// Auto-initialize canvas engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initEmberCanvas();
});
