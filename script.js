// Smooth scrolling para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Cerrar menú móvil al hacer click en un enlace
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar-custom")
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.backgroundColor = "#ffffff"
    navbar.style.backdropFilter = "none"
  }
})

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Enviando..."
  submitBtn.disabled = true

  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    // Show success message
    showNotification("¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.", "success")

    // Reset form
    this.reset()

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification alert alert-${type === "success" ? "success" : "info"} alert-dismissible fade show`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `

  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// WhatsApp button functionality
document.querySelectorAll('a[href*="whatsapp"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    // Track WhatsApp click (you can add analytics here)
    console.log("WhatsApp contact initiated")
  })
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".service-card, .team-card, .testimonial-card, .horarios-card")

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Stats counter animation
function animateStats() {
  const stats = document.querySelectorAll(".stat-number")

  stats.forEach((stat) => {
    const target = Number.parseInt(stat.textContent.replace(/\D/g, ""))
    const suffix = stat.textContent.replace(/\d/g, "")
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      stat.textContent = Math.floor(current) + suffix
    }, 20)
  })
}

// Trigger stats animation when stats section is visible
const statsSection = document.querySelector(".stats-section")
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statsObserver.observe(statsSection)
}

// Service card hover effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Mobile menu improvements
const navbarToggler = document.querySelector(".navbar-toggler")
const navbarCollapse = document.querySelector(".navbar-collapse")

if (navbarToggler && navbarCollapse) {
  navbarToggler.addEventListener("click", () => {
    // Add animation class
    navbarCollapse.classList.toggle("show")
  })
}

// Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="placeholder"]')

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // Here you would replace with actual image URLs
        img.classList.add("loaded")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("is-invalid")
      isValid = false
    } else {
      field.classList.remove("is-invalid")
    }
  })

  // Email validation
  const emailField = form.querySelector('input[type="email"]')
  if (emailField && emailField.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailField.value)) {
      emailField.classList.add("is-invalid")
      isValid = false
    }
  }

  // Phone validation
  const phoneField = form.querySelector('input[type="tel"]')
  if (phoneField && phoneField.value) {
    const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,}$/
    if (!phoneRegex.test(phoneField.value)) {
      phoneField.classList.add("is-invalid")
      isValid = false
    }
  }

  return isValid
}

// Add input event listeners for real-time validation
document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", function () {
    if (this.classList.contains("is-invalid")) {
      if (this.value.trim()) {
        this.classList.remove("is-invalid")
      }
    }
  })
})

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  // Skip to main content with Tab key
  if (e.key === "Tab" && !e.shiftKey) {
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )

    // Add focus indicators
    focusableElements.forEach((el) => {
      el.addEventListener("focus", function () {
        this.style.outline = "2px solid var(--primary-color)"
        this.style.outlineOffset = "2px"
      })

      el.addEventListener("blur", function () {
        this.style.outline = "none"
      })
    })
  }
})

// Print styles
window.addEventListener("beforeprint", () => {
  document.body.classList.add("printing")
})

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing")
})

// Performance monitoring
window.addEventListener("load", () => {
  // Log page load time
  const loadTime = performance.now()
  console.log(`Page loaded in ${Math.round(loadTime)}ms`)

  // Check for slow loading elements
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    if (!img.complete) {
      console.warn("Slow loading image:", img.src)
    }
  })
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // You could send this to an error tracking service
})

// Service worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}


