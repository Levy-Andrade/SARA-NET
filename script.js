/* ============================================================
   SARANET TELECOM — Script Principal Atualizado & 100% Funcional
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. TEMA CLARO / ESCURO ---------- */
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('saranet-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
    localStorage.setItem('saranet-theme', theme);

    // Atualiza o efeito Vanta se estiver rodando
    if (window.vantaPlansEffect) {
      window.vantaPlansEffect.setOptions({
        backgroundColor: theme === 'dark' ? 0x0b0d18 : 0x111322,
        color: 0xffc913,
        color2: 0xff8c00
      });
    }
  }

  /* ---------- 2. NAVBAR FIXA CONTÍNUA (ACOMPANHA SEMPRE O SCROLL) ---------- */
  const scrollBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Barra de progresso amarela no topo
    if (scrollBar && docHeight > 0) {
      const progress = (currentScrollY / docHeight) * 100;
      scrollBar.style.width = `${progress}%`;
    }

    // A Navbar nunca se esconde: apenas ativa o modo compacto/vidro fosco
    if (navbar) {
      if (currentScrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  /* ---------- 3. MENU MOBILE ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobile() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (closeMenu) closeMenu.addEventListener('click', closeMobile);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobile));

  /* ---------- 4. SCROLL REVEAL ---------- */
  const revealElements = document.querySelectorAll(
    '.benefit-card, .plan-card, .step-card, .value-card, .faq-item, .whoweare-text, .knowalso-card, .section-header'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 4) * 80}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- 5. CONTADORES DINÂMICOS (QUEM SOMOS) ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsTriggered = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsTriggered) {
        statsTriggered = true;
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-target');
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.35 });

  const statsSection = document.querySelector('.whoweare-stats');
  if (statsSection) statsObserver.observe(statsSection);

  /* ---------- 6. FILTRO DE PLANOS BLINDADO (CORREÇÃO DO BUG DAS IMAGENS) ---------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const planCards = document.querySelectorAll('.plan-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      planCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        
        // Exibe ou oculta preservando a estrutura de layout e imagens
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('plan-hidden');
        } else {
          card.classList.add('plan-hidden');
        }
      });
    });
  });

  /* ---------- 7. FAQ ACCORDION ---------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      faqQuestions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.classList.remove('open');
          }
        }
      });

      btn.setAttribute('aria-expanded', !isExpanded);
      if (answer) {
        answer.classList.toggle('open', !isExpanded);
      }
    });
  });

  /* ---------- 8. FAB E CHATBOT VIRTUAL (100% LIMPO, SEM EMOJIS) ---------- */
  const fabContainer = document.getElementById('fabContainer');
  const fabMain = document.getElementById('fabMain');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const openChatbotBtn = document.getElementById('openChatbotBtn');
  const chatMessages = document.getElementById('chatMessages');

  if (fabMain && fabContainer) {
    fabMain.addEventListener('click', () => {
      fabContainer.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!fabContainer.contains(e.target)) {
        fabContainer.classList.remove('open');
      }
    });
  }

  function toggleChatbot(open) {
    if (chatWindow) {
      chatWindow.classList.toggle('open', open);
      chatWindow.setAttribute('aria-hidden', !open);
      if (open && fabContainer) {
        fabContainer.classList.remove('open');
      }
    }
  }

  if (openChatbotBtn) openChatbotBtn.addEventListener('click', () => toggleChatbot(true));
  if (chatClose) chatClose.addEventListener('click', () => toggleChatbot(false));

  if (chatMessages) {
    chatMessages.addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-chip');
      if (!chip) return;

      const answer = chip.dataset.answer;
      const questionText = chip.textContent.trim();

      const suggestions = chatMessages.querySelector('.chat-suggestions');
      if (suggestions) suggestions.remove();

      const userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user';
      userMsg.innerHTML = `<p>${questionText}</p>`;
      chatMessages.appendChild(userMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot';
        botMsg.innerHTML = `<p>${answer}</p>`;
        chatMessages.appendChild(botMsg);

        const resetWrap = document.createElement('div');
        resetWrap.className = 'chat-suggestions';
        resetWrap.innerHTML = `<button class="chat-chip" id="chatResetBtn">Ver outras perguntas</button>`;
        chatMessages.appendChild(resetWrap);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const resetBtn = document.getElementById('chatResetBtn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            resetWrap.remove();
            renderDefaultSuggestions();
          });
        }
      }, 400);
    });
  }

  function renderDefaultSuggestions() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-suggestions';
    wrap.innerHTML = `
      <button class="chat-chip" data-answer="Nosso prazo padrão de instalação é de até <strong>48 horas úteis</strong> após a consulta na sua rua.">
        <span class="material-icons chip-icon">schedule</span> Prazo de instalação
      </button>
      <button class="chat-chip" data-answer="Todos os nossos planos são <strong>100% ilimitados</strong>, sem franquia mensal e sem corte de velocidade!">
        <span class="material-icons chip-icon">inventory_2</span> Limite de dados
      </button>
      <button class="chat-chip" data-answer="Planos: 400 Mega (R$79,90) · 700 Mega (R$99,90) · 900 Mega (R$119,90). Todos com fibra real ponta a ponta!">
        <span class="material-icons chip-icon">payments</span> Ver planos e preços
      </button>
      <button class="chat-chip" data-answer="Atendemos São Tomé e região noroeste. Para checar o poste mais próximo, fale no WhatsApp!">
        <span class="material-icons chip-icon">location_on</span> Verificar cobertura
      </button>
    `;
    chatMessages.appendChild(wrap);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /* ---------- 9. ANIMAÇÃO DE FUNDO (#bgFiberCanvas) — CORRIGIDA E 100% VISÍVEL ---------- */
  initBgFiberAnimation();

  function initBgFiberAnimation() {
    const canvas = document.getElementById('bgFiberCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 48;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.2
      });
    }

    function drawFiberNetwork() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const nodeColor = isDark ? 'rgba(255, 201, 19, 0.4)' : 'rgba(224, 123, 0, 0.4)';
      const lineColor = isDark ? 'rgba(255, 201, 19,' : 'rgba(224, 123, 0,';

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 135) * 0.15;
            ctx.strokeStyle = `${lineColor} ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawFiberNetwork);
    }

    drawFiberNetwork();
  }

  /* ---------- 10. ANIMAÇÃO DE PONTOS EM PLANOS (#planos) — CORRIGIDA COM DUAL ENGINE ---------- */
  initPlansAnimation();

  function initPlansAnimation() {
    const plansEl = document.getElementById('planos');
    if (!plansEl) return;

    let vantaLoaded = false;

    // Tentativa 1: Vanta.dots oficial se carregado
    if (typeof VANTA !== 'undefined' && typeof THREE !== 'undefined') {
      try {
        window.vantaPlansEffect = VANTA.DOTS({
          el: "#planos",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          showLines: false,
          color: 0xffc913,
          color2: 0xff8c00,
          backgroundColor: 0x0b0d18,
          size: 3.0,
          spacing: 28
        });
        vantaLoaded = true;
      } catch (err) {
        vantaLoaded = false;
      }
    }

    // Tentativa 2: Se o Vanta não carregou, o motor Canvas 3D nativo assume imediatamente
    if (!vantaLoaded) {
      initNative3DDotsCanvas();
    }
  }

  // Motor Nativo de Onda Pontilhada 3D (100% autônomo, zero dependência externa)
  function initNative3DDotsCanvas() {
    const canvas = document.getElementById('planosCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const plansSection = document.getElementById('planos');

    let width, height;
    function resize() {
      width = canvas.width = plansSection.offsetWidth;
      height = canvas.height = plansSection.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const cols = 42;
    const rows = 26;
    const spacingX = 42;
    const spacingY = 32;
    let phase = 0;
    let mouse = { x: -1000, y: -1000 };

    plansSection.addEventListener('mousemove', (e) => {
      const rect = plansSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    plansSection.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    function render3DDots() {
      ctx.clearRect(0, 0, width, height);
      phase += 0.03;

      const originX = width / 2;
      const originY = height * 0.4;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gridX = (c - cols / 2) * spacingX;
          const gridZ = (r - rows / 2) * spacingY;

          const dist = Math.sqrt(gridX * gridX + gridZ * gridZ);
          let wave = Math.sin(dist * 0.02 - phase) * 22;

          const fov = 340;
          const zDepth = gridZ + 460;
          if (zDepth <= 10) continue;

          const scale = fov / zDepth;
          const projX = originX + gridX * scale;
          let projY = originY + (wave + 80) * scale;

          // Reação ao mouse
          const dx = projX - mouse.x;
          const dy = projY - mouse.y;
          const mouseDist = Math.hypot(dx, dy);
          if (mouseDist < 160) {
            projY -= (1 - mouseDist / 160) * 30;
          }

          const radius = Math.max(1, 2.5 * scale);
          const alpha = Math.min(0.85, Math.max(0.12, (scale - 0.25) * 1.5));

          ctx.beginPath();
          ctx.arc(projX, projY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 201, 19, ${alpha})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(render3DDots);
    }

    render3DDots();
  }

});

/* ---------- FUNÇÕES GLOBAIS ---------- */
function toggleDetails(btn) {
  const details = btn.nextElementSibling;
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';

  btn.setAttribute('aria-expanded', !isExpanded);
  details.classList.toggle('open', !isExpanded);
  btn.querySelector('span').textContent = !isExpanded ? 'Ocultar detalhes' : 'Ver mais detalhes';
}

function handleCoverageCheck(event) {
  event.preventDefault();
  const address = document.getElementById('coverageAddress').value.trim();
  if (!address) return;

  const msg = encodeURIComponent(`Olá! Gostaria de checar a viabilidade da SaraNet Fibra no endereço: ${address}, em São Tomé - PR.`);
  window.open(`https://wa.me/5544991055040?text=${msg}`, '_blank');
}