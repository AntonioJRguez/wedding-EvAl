(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     CUENTA ATRÁS
     --------------------------------------------------------------------- */
  const countdown = document.getElementById("countdown");
  if (countdown) {
    const weddingDate = new Date("2027-09-18T00:00:00");
    const pad = (n) => String(n).padStart(2, "0");
    const values = {
      days: countdown.querySelector('[data-unit="days"]'),
      hours: countdown.querySelector('[data-unit="hours"]'),
      minutes: countdown.querySelector('[data-unit="minutes"]'),
      seconds: countdown.querySelector('[data-unit="seconds"]'),
    };

    const tick = () => {
      const diff = weddingDate - new Date();
      if (diff <= 0) {
        countdown.innerHTML = '<span class="countdown__done">Hoy es el día.</span>';
        clearInterval(timer);
        return;
      }
      values.days.textContent = Math.floor(diff / 86400000);
      values.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
      values.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
      values.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
    };

    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------------------
     NAV — fondo al hacer scroll + sección activa
     --------------------------------------------------------------------- */
  const nav = document.getElementById("siteNav");
  const navLinks = document.querySelectorAll(".site-nav__links a, .mobile-menu a");
  const sections = document.querySelectorAll("main > section[id]");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", isMatch);
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------------------------------------------------------------------
     MENÚ MÓVIL
     --------------------------------------------------------------------- */
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");

  const openMenu = () => {
    mobileMenu.classList.add("is-open");
    mobileMenu.inert = false;
    menuToggle.setAttribute("aria-expanded", "true");
  };
  const closeMenu = () => {
    mobileMenu.classList.remove("is-open");
    mobileMenu.inert = true;
    menuToggle.setAttribute("aria-expanded", "false");
  };
  mobileMenu.inert = true;

  menuToggle?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  mobileMenu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------------------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------------------------------------------------------------
     CURSOR PERSONALIZADO SOBRE FOTOS
     --------------------------------------------------------------------- */
  const cursorDot = document.getElementById("cursor-dot");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (cursorDot && canHover && !reducedMotion) {
    let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0, scale = 0.4;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const render = () => {
      dotX += (mouseX - dotX) * 0.18;
      dotY += (mouseY - dotY) * 0.18;
      const targetScale = cursorDot.classList.contains("is-active") ? 1 : 0.4;
      scale += (targetScale - scale) * 0.18;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(${scale})`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    document.body.classList.add("has-custom-cursor");
    document.querySelectorAll(".photo").forEach((photo) => {
      photo.addEventListener("mouseenter", () => {
        cursorDot.classList.add("is-active");
        cursorDot.textContent = "Ver";
      });
      photo.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("is-active");
      });
    });
  }

  /* ---------------------------------------------------------------------
     PARALLAX SUTIL EN LA FOTO DE APERTURA
     --------------------------------------------------------------------- */
  const heroPhoto = document.querySelector(".opening-photo");
  if (heroPhoto && !reducedMotion) {
    let ticking = false;
    document.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const offset = Math.min(window.scrollY * 0.08, 60);
          heroPhoto.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* ---------------------------------------------------------------------
     PATRÓN DE FONDO — foco tipo linterna que sigue al cursor
     --------------------------------------------------------------------- */
  const patternSections = document.querySelectorAll(".has-pattern");
  if (patternSections.length && canHover && !reducedMotion) {
    patternSections.forEach((section) => {
      section.addEventListener("mousemove", (e) => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        section.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ---------------------------------------------------------------------
     RSVP — acompañante condicional + envío solo-frontend
     --------------------------------------------------------------------- */
  const acompananteCheck = document.getElementById("acompanante-check");
  const acompananteField = document.getElementById("acompananteField");
  const acompananteInput = document.getElementById("acompanante");

  acompananteInput.disabled = true;
  acompananteCheck?.addEventListener("change", () => {
    const isChecked = acompananteCheck.checked;
    acompananteField.classList.toggle("is-visible", isChecked);
    acompananteInput.disabled = !isChecked;
    if (!isChecked) {
      acompananteInput.value = "";
    }
  });

  const rsvpForm = document.getElementById("rsvpForm");
  const formStatus = document.getElementById("formStatus");

  rsvpForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!rsvpForm.checkValidity()) {
      rsvpForm.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(rsvpForm).entries());
    // Sin backend conectado todavía: la respuesta solo se registra en consola.
    // Para recibir confirmaciones reales, conectar a Formspree / Netlify Forms
    // (ver comentario junto al <form> en index.html).
    console.log("RSVP recibido (pendiente de backend):", data);

    rsvpForm.classList.add("is-hidden");
    formStatus.classList.add("is-visible");
  });
})();
