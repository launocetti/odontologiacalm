/* ============================================
   CALM Odontología — script.js
   Interactividad: Navbar, Scroll animations,
   Counters, Testimonials, FAQ, Mobile menu
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ---- MOBILE MENU ----
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navIcon = document.getElementById('nav-icon');

  navToggle.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    navIcon.innerHTML = isOpen
      ? '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
      : '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      navIcon.innerHTML = '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
    });
  });

  // ---- SMOOTH SCROLL FOR NAV LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- SCROLL ANIMATIONS ----
  const animElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animElements.forEach(function (el) {
    observer.observe(el);
  });

  // Staggered animations for cards
  document.querySelectorAll('.stagger-children').forEach(function (parent) {
    var children = parent.querySelectorAll('.stagger-item');
    var staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          children.forEach(function (child, i) {
            setTimeout(function () {
              child.classList.add('visible');
            }, i * 80);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    staggerObserver.observe(parent);
  });

  // ---- COUNTER ANIMATION ----
  var statsSection = document.querySelector('.stats');
  var countersAnimated = false;

  function animateCounter(el, end, duration) {
    var start = 0;
    var startTime = null;
    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(easeOut * end);
      el.textContent = (el.dataset.prefix || '') + current.toLocaleString('es-AR') + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        document.querySelectorAll('.counter').forEach(function (counter) {
          var end = parseInt(counter.dataset.end, 10);
          var duration = parseInt(counter.dataset.duration || '2000', 10);
          animateCounter(counter, end, duration);
        });
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) statsObserver.observe(statsSection);

  // ---- TESTIMONIALS CAROUSEL ----
  var testimonials = [
    {
      text: 'Excelente atención!! Fui sábado casi noche y resolvieron mi urgencia con mucho profesionalismo.',
      author: 'Miriam Biot',
      service: 'Urgencia Odontológica'
    },
    {
      text: 'Una genia la doctora. Y la atención desde que llegás impecable. Súper recomendable.',
      author: 'Rocío Espíndola',
      service: 'Tratamiento de Caries'
    },
    {
      text: 'Llegamos un domingo, con una urgencia y nos atendieron en forma excelente. Muy recomendable por trato y profesionalidad. Gracias.',
      author: 'Oscar Bruno Manzur',
      service: 'Urgencia Odontológica'
    }
  ];
  var currentTestimonial = 0;
  var testimonialText = document.getElementById('testimonial-text');
  var testimonialAuthor = document.getElementById('testimonial-author');
  var testimonialService = document.getElementById('testimonial-service');
  var dots = document.querySelectorAll('.testimonial-dot');

  function showTestimonial(index) {
    currentTestimonial = index;
    if (testimonialText) {
      testimonialText.textContent = '"' + testimonials[index].text + '"';
      testimonialAuthor.textContent = testimonials[index].author;
      testimonialService.textContent = testimonials[index].service;
    }
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
  }

  var btnPrev = document.getElementById('testimonial-prev');
  var btnNext = document.getElementById('testimonial-next');
  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      showTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', function () {
      showTestimonial((currentTestimonial + 1) % testimonials.length);
    });
  }
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { showTestimonial(i); });
  });

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.parentElement;
      var isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (faq) {
        faq.classList.remove('open');
      });
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

});
