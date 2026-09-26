// IR Seguridad - Lógica Interactiva y Simulación de Cerradura Inteligente
document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Sintetizador de Sonido Mecánico / Beep
  // ==========================================
  let audioCtx = null;
  const playSound = (type) => {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'click') {
        // Sonido de pestillo deslizándose
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'error') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(280, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      // Ignorar errores de audio si el navegador bloquea autoplay
    }
  };

  // ==========================================
  // 2. SIMULACIÓN CERRADURA INTELIGENTE
  // ==========================================
  const statusLed = document.getElementById('lock-led');
  const lockStatusText = document.getElementById('lock-status-text');
  const lockDisplayText = document.getElementById('lock-display-main');
  const lockDisplaySub = document.getElementById('lock-display-sub');
  const deadbolt = document.getElementById('deadbolt');
  const fingerprintSensor = document.getElementById('fingerprint-sensor');
  const keypadButtons = document.querySelectorAll('.key-btn');
  const appCircle = document.getElementById('app-lock-circle');
  const appStatusText = document.getElementById('app-status-text');

  let currentPin = '';
  let isUnlocked = false;
  let autoLockTimeout = null;

  // Función Desbloquear
  const unlockLock = (methodName) => {
    if (isUnlocked) return;
    isUnlocked = true;

    // Reproducir sonidos
    playSound('success');
    setTimeout(() => playSound('click'), 150);

    // Actualizar Estado Hardware
    statusLed?.classList.add('unlocked');
    if (lockStatusText) lockStatusText.textContent = 'DESBLOQUEADA';
    deadbolt?.classList.add('retracted');

    // Display
    if (lockDisplayText) {
      lockDisplayText.textContent = 'ACCESO CONCEDIDO';
      lockDisplayText.style.color = '#4ADE80';
    }
    if (lockDisplaySub) lockDisplaySub.textContent = `Apertura vía: ${methodName}`;

    // Actualizar App Móvil
    if (appCircle) {
      appCircle.classList.add('unlocked');
      const lockIcon = appCircle.querySelector('svg');
      if (lockIcon) {
        lockIcon.innerHTML = '<path d="M7 11V7a5 5 0 0 1 9.9-1"></path><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>';
      }
      const label = appCircle.querySelector('span');
      if (label) label.textContent = 'DESBLOQUEADA';
    }
    if (appStatusText) appStatusText.textContent = 'Puerta Abierta · En uso';

    // Auto-bloqueo tras 5 segundos
    clearTimeout(autoLockTimeout);
    autoLockTimeout = setTimeout(() => {
      lockDoor();
    }, 5000);
  };

  // Función Bloquear
  const lockDoor = () => {
    isUnlocked = false;
    currentPin = '';

    playSound('click');

    // Hardware
    statusLed?.classList.remove('unlocked');
    if (lockStatusText) lockStatusText.textContent = 'BLOQUEADA';
    deadbolt?.classList.remove('retracted');

    // Display
    if (lockDisplayText) {
      lockDisplayText.textContent = 'CERRADURA BLOQUEADA';
      lockDisplayText.style.color = '#E2E8F0';
    }
    if (lockDisplaySub) lockDisplaySub.textContent = 'Ingrese PIN o Huella dactilar';

    // App Móvil
    if (appCircle) {
      appCircle.classList.remove('unlocked');
      const lockIcon = appCircle.querySelector('svg');
      if (lockIcon) {
        lockIcon.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
      }
      const label = appCircle.querySelector('span');
      if (label) label.textContent = 'TOCAR PARA ABRIR';
    }
    if (appStatusText) appStatusText.textContent = 'Puerta Cerrada y Asegurada';
  };

  // Sensor de Huella
  if (fingerprintSensor) {
    fingerprintSensor.addEventListener('click', () => {
      if (isUnlocked) return;
      playSound('beep');
      fingerprintSensor.classList.add('scanning');

      if (lockDisplayText) {
        lockDisplayText.textContent = 'VERIFICANDO HUELLA...';
        lockDisplayText.style.color = '#38BDF8';
      }

      setTimeout(() => {
        fingerprintSensor.classList.remove('scanning');
        unlockLock('Huella Dactilar');
      }, 700);
    });
  }

  // Teclado Numérico
  keypadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isUnlocked) return;
      const key = btn.getAttribute('data-key');
      playSound('beep');

      if (key === 'clear') {
        currentPin = '';
        if (lockDisplayText) lockDisplayText.textContent = 'PIN BORRADO';
        setTimeout(() => {
          if (!isUnlocked && lockDisplayText) lockDisplayText.textContent = 'INGRESE PIN (1234#)';
        }, 500);
        return;
      }

      if (key === 'enter' || key === '#') {
        if (currentPin === '1234' || currentPin.length >= 4) {
          unlockLock('Código PIN Digital');
        } else {
          playSound('error');
          if (lockDisplayText) {
            lockDisplayText.textContent = 'PIN INCORRECTO';
            lockDisplayText.style.color = '#EF4444';
          }
          currentPin = '';
          setTimeout(() => {
            if (!isUnlocked && lockDisplayText) {
              lockDisplayText.textContent = 'INGRESE PIN (1234#)';
              lockDisplayText.style.color = '#E2E8F0';
            }
          }, 1200);
        }
        return;
      }

      // Dígitos normales
      if (currentPin.length < 6) {
        currentPin += key;
        const masked = '• '.repeat(currentPin.length).trim();
        if (lockDisplayText) lockDisplayText.textContent = `PIN: ${masked}`;

        // Si ingresa 1234 automáticamente
        if (currentPin === '1234') {
          setTimeout(() => {
            unlockLock('Código PIN Digital (1234)');
          }, 300);
        }
      }
    });
  });

  // Botón en App Celular
  if (appCircle) {
    appCircle.addEventListener('click', () => {
      if (isUnlocked) {
        lockDoor();
      } else {
        playSound('beep');
        if (appStatusText) appStatusText.textContent = 'Transmitiendo orden segura...';
        setTimeout(() => {
          unlockLock('App Móvil Remota');
        }, 400);
      }
    });
  }

  // Botones de acción rápida bajo el simulador
  document.getElementById('sim-test-finger')?.addEventListener('click', () => {
    fingerprintSensor?.click();
  });

  document.getElementById('sim-test-pin')?.addEventListener('click', () => {
    if (isUnlocked) lockDoor();
    currentPin = '1234';
    if (lockDisplayText) lockDisplayText.textContent = 'PIN: • • • •';
    setTimeout(() => unlockLock('Código PIN Demo (1234)'), 400);
  });

  document.getElementById('sim-test-app')?.addEventListener('click', () => {
    appCircle?.click();
  });

  document.getElementById('sim-test-lock')?.addEventListener('click', () => {
    lockDoor();
  });

  // ==========================================
  // 3. Header Scroll Effect
  // ==========================================
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================
  // 4. Mobile Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 5. Scroll Reveal con IntersectionObserver
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-up-element');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================
  // 6. Formulario de Contacto -> Redirección WhatsApp
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim() || '';
      const phone = document.getElementById('form-phone')?.value.trim() || '';
      const address = document.getElementById('form-address')?.value.trim() || '';
      const service = document.getElementById('form-service')?.value.trim() || '';
      const message = document.getElementById('form-message')?.value.trim() || '';

      const targetPhone = '5491126083145'; // +54 9 11 2608-3145

      let waText = `*Solicitud de Presupuesto - IR Seguridad*\n\n`;
      waText += `*Nombre:* ${name}\n`;
      waText += `*Teléfono:* ${phone}\n`;
      if (address) waText += `*Dirección / Zona:* ${address} (CABA/GBA)\n`;
      if (service) waText += `*Servicio requerido:* ${service}\n`;
      if (message) waText += `*Detalle:* ${message}\n\n`;
      waText += `Hola, quiero un presupuesto sin cargo para cerrajería/cerradura inteligente.`;

      const encoded = encodeURIComponent(waText);
      const url = `https://wa.me/${targetPhone}?text=${encoded}`;

      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // ==========================================
  // 7. Active Nav Link on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });
});
