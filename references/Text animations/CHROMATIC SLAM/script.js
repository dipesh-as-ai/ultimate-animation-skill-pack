/* ============================================
   CHROMATIC SLAM — script.js
   Phases:
   1. Scramble  → random chars + heavy chroma
   2. Resolve   → staggered slam per character
   3. Shockwave → canvas ring burst on slam
   4. Shimmer   → iridescent gradient sweep
   5. Hover     → magnetic float + glow
   ============================================ */

(() => {

  /* ── Config ── */
  const GLITCH_CHARS =
    '!@#$%&*?/\\|[]{}~^<>░▒▓▄▌▐■□▪0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const SCRAMBLE_DURATION  = 1400;   // ms total scramble time
  const STAGGER_DELAY      = 90;     // ms between each char slam
  const SCRAMBLE_INTERVAL  = 45;     // ms per random tick
  const SHOCKWAVE_COUNT    = 3;      // rings per character slam

  /* ── Canvas shockwave engine ── */
  const canvas = document.getElementById('shockwave-canvas');
  const ctx    = canvas.getContext('2d');
  let rings    = [];

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function spawnRings(x, y) {
    for (let i = 0; i < SHOCKWAVE_COUNT; i++) {
      rings.push({
        x, y,
        r:       0,
        maxR:    80 + i * 40,
        alpha:   0.7 - i * 0.15,
        speed:   4  + i * 2,
        delay:   i * 60,
        born:    performance.now(),
      });
    }
  }

  function drawRings(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rings = rings.filter(ring => {
      const age = now - ring.born - ring.delay;
      if (age < 0) return true;

      const progress = Math.min(age / (ring.maxR / ring.speed * 16), 1);
      ring.r = ring.maxR * easeOut(progress);
      const currentAlpha = ring.alpha * (1 - progress);

      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(123, 108, 255, ${currentAlpha})`;
      ctx.lineWidth   = 1.5 * (1 - progress * 0.6);
      ctx.stroke();

      return progress < 1;
    });
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animLoop(now) {
    drawRings(now);
    requestAnimationFrame(animLoop);
  }
  requestAnimationFrame(animLoop);

  /* ── Utility: random char from pool ── */
  function rndChar() {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }

  /* ── Build character spans for an element ── */
  function buildSpans(el) {
    const original = el.dataset.text || el.textContent.trim();
    el.innerHTML   = '';
    const spans    = [];

    [...original].forEach((ch, i) => {
      const span          = document.createElement('span');
      span.className      = 'char scrambling heavy';
      span.dataset.final  = ch;
      span.textContent    = rndChar();

      /* Random vertical offset for scattered look */
      const randY = (Math.random() - 0.5) * 60;
      span.style.setProperty('--rand-y', randY);
      span.style.transform = `translateY(${randY}px)`;

      el.appendChild(span);
      spans.push(span);
    });

    return { original, spans };
  }

  /* ── Scramble a single span continuously ── */
  function scrambleLoop(span, until, onDone) {
    const tick = setInterval(() => {
      if (performance.now() >= until) {
        clearInterval(tick);
        onDone();
        return;
      }
      span.textContent = rndChar();
    }, SCRAMBLE_INTERVAL);
  }

  /* ── Slam a character into its final form ── */
  function slamChar(span, finalChar) {
    span.classList.remove('scrambling', 'heavy');
    span.classList.add('slamming');
    span.textContent = finalChar;
    span.style.transform = '';

    /* Get screen position for shockwave origin */
    const rect = span.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    spawnRings(cx, cy);

    /* After impact animation, switch to shimmer */
    setTimeout(() => {
      span.classList.remove('slamming');
      span.classList.add('settled');
    }, 400);
  }

  /* ── Main animation driver ── */
  function runAnimation(el) {
    const { spans } = buildSpans(el);
    const startTime = performance.now();

    spans.forEach((span, i) => {
      /* Reduce chroma intensity over time */
      setTimeout(() => {
        span.classList.remove('heavy');
      }, 500 + i * 30);

      /* Staggered slam time for each char */
      const slamAt = SCRAMBLE_DURATION + i * STAGGER_DELAY;

      scrambleLoop(
        span,
        startTime + slamAt,
        () => slamChar(span, span.dataset.final)
      );
    });
  }

  /* ── Magnetic hover: letters float toward cursor ── */
  function addMagneticHover(el) {
    const spans = [...el.querySelectorAll('.char')];

    el.addEventListener('mousemove', (e) => {
      spans.forEach(span => {
        if (!span.classList.contains('settled')) return;
        const rect = span.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = e.clientX - cx;
        const dy   = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const pull    = (1 - dist / maxDist) * 14;
          const nx      = (dx / dist) * pull;
          const ny      = (dy / dist) * pull;
          span.style.transform = `translate(${nx}px, ${ny}px)`;
          span.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)';
        } else {
          span.style.transform = '';
        }
      });
    });

    el.addEventListener('mouseleave', () => {
      spans.forEach(span => {
        span.style.transform = '';
      });
    });
  }

  /* ── Init: fire on all .slam-text elements ── */
  document.querySelectorAll('.slam-text').forEach(el => {
    setTimeout(() => runAnimation(el), 300);
    addMagneticHover(el);
  });

  /* ── Sub-text: simple stagger reveal ── */
  document.querySelectorAll('.sub-text').forEach(el => {
    const original = el.dataset.text || el.textContent.trim();
    el.innerHTML   = '';

    [...original].forEach((ch, i) => {
      const span = document.createElement('span');
      span.textContent         = ch === ' ' ? '\u00A0' : ch;
      span.style.opacity       = '0';
      span.style.display       = 'inline-block';
      span.style.transform     = 'translateY(6px)';
      span.style.transition    = `opacity 0.3s ease ${3.2 + i * 0.03}s,
                                  transform 0.3s ease ${3.2 + i * 0.03}s`;
      el.appendChild(span);

      requestAnimationFrame(() => requestAnimationFrame(() => {
        span.style.opacity   = '1';
        span.style.transform = 'translateY(0)';
      }));
    });
  });

})();
