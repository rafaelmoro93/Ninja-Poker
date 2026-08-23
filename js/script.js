/**
 * ============================================================
 * NINJA POKER — INTERAÇÕES v2
 * Vanilla JS, zero dependências.
 * ============================================================ */
(function () {
  "use strict";

  var CFG = window.NINJA_CONFIG || {};
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isCoarsePointer = window.matchMedia("(pointer: coarse), (hover: none)").matches;

  /* ------------------------------------------------------------
   * 1. Configuração central (WhatsApp, logo, textos)
   * ------------------------------------------------------------ */
  function buildWhatsappUrl(context) {
    var base = CFG.WHATSAPP_URL || "#";
    var msgs = CFG.WHATSAPP_MENSAGENS || {};
    var text = msgs[context] || msgs.default || "";
    if (base === "#" || !base) return "#";
    var separator = base.indexOf("?") > -1 ? "&" : "?";
    return base + separator + "text=" + encodeURIComponent(text);
  }

  function applyConfig() {
    document.querySelectorAll("[data-wa-context]").forEach(function (el) {
      var context = el.getAttribute("data-wa-context");
      el.setAttribute("href", buildWhatsappUrl(context));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
    document.querySelectorAll("[data-logo-src]").forEach(function (el) {
      if (CFG.LOGO_URL) el.setAttribute("src", CFG.LOGO_URL);
    });
    document.querySelectorAll("[data-instagram-url]").forEach(function (el) {
      if (CFG.INSTAGRAM_URL) el.setAttribute("href", CFG.INSTAGRAM_URL);
    });
    document.querySelectorAll("[data-suprema-url]").forEach(function (el) {
      if (CFG.SUPREMA_POKER_URL) el.setAttribute("href", CFG.SUPREMA_POKER_URL);
    });
    document.querySelectorAll("[data-agency-name]").forEach(function (el) {
      if (CFG.NOME_DA_AGENCIA) el.textContent = CFG.NOME_DA_AGENCIA;
    });
  }

  /* ------------------------------------------------------------
   * 2. Header: fundo ao rolar
   * ------------------------------------------------------------ */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------
   * 3. Menu mobile
   * ------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.querySelector(".nav-mobile");
    if (!toggle || !panel) return;

    function closeMenu() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function openMenu() {
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    toggle.addEventListener("click", function () {
      panel.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ------------------------------------------------------------
   * 4. Cursor customizado + glow que segue o mouse (assinatura "O Corte")
   * ------------------------------------------------------------ */
  function initCursorEffects() {
    if (isCoarsePointer) return;

    var cursor = document.querySelector(".ninja-cursor");
    if (!cursor) return;
    document.body.classList.add("ninja-cursor-active");
    var root = document.documentElement;
    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var curX = targetX;
    var curY = targetY;
    var raf = null;

    function setVars(x, y) {
      root.style.setProperty("--mx", x + "px");
      root.style.setProperty("--my", y + "px");
    }
    setVars(targetX, targetY);

    window.addEventListener(
      "mousemove",
      function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        setVars(targetX, targetY);
        if (cursor && !raf) {
          raf = requestAnimationFrame(tick);
        }
      },
      { passive: true }
    );

    function tick() {
      curX += (targetX - curX) * 0.35;
      curY += (targetY - curY) * 0.35;
      if (cursor) cursor.style.transform = "translate(" + curX + "px, " + curY + "px) translate(-50%, -50%)";
      if (Math.abs(targetX - curX) > 0.3 || Math.abs(targetY - curY) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    if (cursor) {
      var hoverables = "a, button, summary, .card, [data-tilt]";
      document.addEventListener("mouseover", function (e) {
        if (e.target.closest && e.target.closest(hoverables)) {
          cursor.classList.add("is-hover");
        }
      });
      document.addEventListener("mouseout", function (e) {
        if (e.target.closest && e.target.closest(hoverables)) {
          cursor.classList.remove("is-hover");
        }
      });
    }
  }

  /* ------------------------------------------------------------
   * 5. Efeito de decodificação no headline do hero
   * ------------------------------------------------------------ */
  function initDecryptHeadline() {
    var el = document.querySelector("[data-decrypt]");
    if (!el) return;

    var finalHTML = el.innerHTML;
    if (prefersReducedMotion) return; // mantém o texto final, sem animar

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234$#%&";
    // Extrai apenas os nós de texto para animar, preservando tags (ex: <span class="text-accent">)
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var textNodes = [];
    var node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim().length) textNodes.push(node);
    }

    var originals = textNodes.map(function (n) {
      return n.textContent;
    });

    var globalIndex = 0;
    var totalChars = originals.reduce(function (sum, s) {
      return sum + s.length;
    }, 0);

    function renderFrame(revealCount) {
      var counted = 0;
      textNodes.forEach(function (n, i) {
        var original = originals[i];
        var out = "";
        for (var c = 0; c < original.length; c++) {
          if (original[c] === " " || original[c] === "\n") {
            out += original[c];
          } else if (counted < revealCount) {
            out += original[c];
          } else {
            out += chars[Math.floor(Math.random() * chars.length)];
          }
          counted++;
        }
        n.textContent = out;
      });
    }

    var frame = 0;
    var totalFrames = 26;
    var interval = setInterval(function () {
      frame++;
      var revealCount = Math.floor((frame / totalFrames) * totalChars);
      renderFrame(revealCount);
      if (frame >= totalFrames) {
        clearInterval(interval);
        el.innerHTML = finalHTML;
      }
    }, 32);
  }

  /* ------------------------------------------------------------
   * 6. Tilt 3D nos cards
   * ------------------------------------------------------------ */
  function initTiltCards() {
    if (isCoarsePointer || prefersReducedMotion) return;
    var cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var px = e.clientX - rect.left;
        var py = e.clientY - rect.top;
        var rx = ((px / rect.width) - 0.5) * 10; // rotateY
        var ry = ((py / rect.height) - 0.5) * -10; // rotateX
        card.style.setProperty("--rx", rx + "deg");
        card.style.setProperty("--ry", ry + "deg");
        card.style.setProperty("--px", px + "px");
        card.style.setProperty("--py", py + "px");
      });
      card.addEventListener("mouseleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ------------------------------------------------------------
   * 7. Scroll reveal (IntersectionObserver)
   * ------------------------------------------------------------ */
  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var groupCounters = new WeakMap();
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var group = el.closest("[data-reveal-group]");
            if (group) {
              var count = groupCounters.get(group) || 0;
              el.style.setProperty("--reveal-index", count);
              groupCounters.set(group, count + 1);
            }
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------
   * 8. Contadores animados
   * ------------------------------------------------------------ */
  function animateCount(el, target, duration) {
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    window.requestAnimationFrame(step);
  }

  function initStatCounters() {
    var stats = document.querySelectorAll("[data-count-target]");
    if (!stats.length) return;
    if (!("IntersectionObserver" in window)) {
      stats.forEach(function (el) {
        el.textContent = el.getAttribute("data-count-target");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.getAttribute("data-count-target"), 10) || 0;
            animateCount(el, target, 1400);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    stats.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------
   * 9. Mobile CTA bar
   * ------------------------------------------------------------ */
  function initMobileCtaBar() {
    var bar = document.querySelector(".mobile-cta-bar");
    var hero = document.querySelector(".hero");
    if (!bar || !hero || !("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          bar.classList.toggle("is-visible", !entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  }

  /* ------------------------------------------------------------
   * 10. Tracking de eventos
   * ------------------------------------------------------------ */
  function trackEvent(eventName, payload) {
    payload = payload || {};
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, payload));
    if (typeof window.gtag === "function") window.gtag("event", eventName, payload);
    if (typeof window.fbq === "function") window.fbq("trackCustom", eventName, payload);
  }

  function initEventTracking() {
    document.querySelectorAll("[data-wa-context]").forEach(function (el) {
      el.addEventListener("click", function () {
        trackEvent("click_whatsapp", { context: el.getAttribute("data-wa-context") });
      });
    });
    document.querySelectorAll("[data-track='cta']").forEach(function (el) {
      el.addEventListener("click", function () {
        trackEvent("click_cta", { label: el.textContent.trim() });
      });
    });
    var howItWorksLink = document.querySelector("[data-track='how-it-works']");
    if (howItWorksLink) {
      howItWorksLink.addEventListener("click", function () {
        trackEvent("click_how_it_works");
      });
    }
    document.querySelectorAll(".accordion-item").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          trackEvent("faq_open", { question: item.querySelector("summary").textContent.trim() });
        }
      });
    });
    var tracked50 = false;
    var tracked90 = false;
    window.addEventListener(
      "scroll",
      function () {
        var scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (!tracked50 && scrolled > 0.5) {
          tracked50 = true;
          trackEvent("scroll_50");
        }
        if (!tracked90 && scrolled > 0.9) {
          tracked90 = true;
          trackEvent("scroll_90");
        }
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------
   * 11. FAQ exclusivo
   * ------------------------------------------------------------ */
  function initAccordionExclusive() {
    var items = document.querySelectorAll(".accordion-item");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          items.forEach(function (other) {
            if (other !== item) other.removeAttribute("open");
          });
        }
      });
    });
  }

  /* ------------------------------------------------------------
   * Init
   * ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initHeaderScroll();
    initMobileNav();
    initCursorEffects();
    initDecryptHeadline();
    initTiltCards();
    initScrollReveal();
    initStatCounters();
    initMobileCtaBar();
    initEventTracking();
    initAccordionExclusive();
  });
})();
