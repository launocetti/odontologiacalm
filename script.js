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

// Vertical Carousel Functionality
class VerticalCarousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    if (!this.container) return

    this.items = this.container.getElementsByClassName("carousel-item")
    this.indicators = document.getElementsByClassName("indicator")
    this.currentIndex = 0
    this.autoPlayInterval = null
    this.isAutoPlaying = false

    this.init()
  }

  init() {
    // Set up event listeners for controls
    this.setupControls()

    // Set up indicator clicks
    this.setupIndicators()

    // Start auto-play
    this.startAutoPlay()

    // Pause on hover
    this.setupHoverControls()
  }

  setupControls() {
    const prevBtn = document.querySelector(".carousel-btn.prev")
    const nextBtn = document.querySelector(".carousel-btn.next")

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        this.stopAutoPlay()
        this.moveCarousel(-1)
        this.startAutoPlay()
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.stopAutoPlay()
        this.moveCarousel(1)
        this.startAutoPlay()
      })
    }
  }

  setupIndicators() {
    Array.from(this.indicators).forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.stopAutoPlay()
        this.goToSlide(index)
        this.startAutoPlay()
      })
    })
  }

  setupHoverControls() {
    const carouselContainer = document.querySelector(".vertical-carousel-container")
    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", () => {
        this.stopAutoPlay()
      })

      carouselContainer.addEventListener("mouseleave", () => {
        this.startAutoPlay()
      })
    }
  }

  moveCarousel(step) {
    const newIndex = (this.currentIndex + step + this.items.length) % this.items.length
    this.goToSlide(newIndex)
  }

  goToSlide(index) {
    // Remove active class from current item and indicator
    if (this.items[this.currentIndex]) {
      this.items[this.currentIndex].classList.remove("active")
    }
    if (this.indicators[this.currentIndex]) {
      this.indicators[this.currentIndex].classList.remove("active")
    }

    // Update current index
    this.currentIndex = index

    // Add active class to new item and indicator
    if (this.items[this.currentIndex]) {
      this.items[this.currentIndex].classList.add("active")
    }
    if (this.indicators[this.currentIndex]) {
      this.indicators[this.currentIndex].classList.add("active")
    }

    // Trigger animation
    this.animateTransition()
  }

  animateTransition() {
    const activeItem = this.items[this.currentIndex]
    if (activeItem) {
      // Add entrance animation
      activeItem.style.animation = "carouselSlideIn 0.8s ease-out"

      // Remove animation after completion
      setTimeout(() => {
        activeItem.style.animation = ""
      }, 800)
    }
  }

  startAutoPlay() {
    this.stopAutoPlay() // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.moveCarousel(1)
    }, 4000) // Change slide every 4 seconds
    this.isAutoPlaying = true
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
    this.isAutoPlaying = false
  }

  destroy() {
    this.stopAutoPlay()
    // Remove event listeners if needed
  }
}

// Global function for backward compatibility
function moveCarousel(step) {
  if (window.verticalCarouselInstance) {
    window.verticalCarouselInstance.moveCarousel(step)
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize vertical carousel
  window.verticalCarouselInstance = new VerticalCarousel("verticalCarousel")
})

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Validate form first
  if (!validateForm(this)) {
    showNotification("Por favor, completa todos los campos requeridos correctamente.", "error")
    return
  }

  // Get form data
  const formData = new FormData(this)

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]')
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  btnText.classList.add("d-none")
  btnLoading.classList.remove("d-none")
  submitBtn.disabled = true

  // Send form data to Formspree
  fetch(this.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Show success message
        showNotification("¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.", "success")

        // Reset form
        this.reset()

        // Optional: Redirect to WhatsApp as confirmation
        setTimeout(() => {
          const phone = "5491133626107"
          const nombre = formData.get("nombre") || ""
          const apellido = formData.get("apellido") || ""
          const message = `Hola, soy ${nombre} ${apellido}. Acabo de enviar una solicitud de cita a través del formulario web. ¡Espero su respuesta!`

          if (confirm("¿Te gustaría confirmar tu solicitud también por WhatsApp?")) {
            window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, "_blank")
          }
        }, 2000)
      } else {
        response.json().then((data) => {
          if (data.errors) {
            throw new Error(data.errors.map((error) => error.message).join(", "))
          } else {
            throw new Error("Error en el envío")
          }
        })
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      showNotification(
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos por WhatsApp.",
        "error",
      )

      // Fallback to WhatsApp
      setTimeout(() => {
        const phone = "5491133626107"
        const nombre = formData.get("nombre") || ""
        const apellido = formData.get("apellido") || ""
        const servicio = formData.get("servicio") || ""
        const mensaje = formData.get("mensaje") || ""

        const whatsappMessage = `Hola, soy ${nombre} ${apellido}. Me interesa el servicio de ${servicio}. ${mensaje}`

        if (confirm("El formulario no pudo enviarse. ¿Te gustaría contactarnos por WhatsApp?")) {
          window.open(
            `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappMessage)}`,
            "_blank",
          )
        }
      }, 1000)
    })
    .finally(() => {
      // Reset button state
      btnText.classList.remove("d-none")
      btnLoading.classList.add("d-none")
      submitBtn.disabled = false
    })
})

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  const alertClass = type === "success" ? "alert-success" : type === "error" ? "alert-danger" : "alert-info"
  notification.className = `notification alert ${alertClass} alert-dismissible fade show`
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

  // Animate vertical carousel container
  const carouselContainer = document.querySelector(".vertical-carousel-container")
  if (carouselContainer) {
    carouselContainer.style.opacity = "0"
    carouselContainer.style.transform = "translateX(-30px)"
    carouselContainer.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(carouselContainer)
  }
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

// Carousel card hover effects
document.addEventListener("DOMContentLoaded", () => {
  const carouselCards = document.querySelectorAll(".carousel-card")

  carouselCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02) rotateY(2deg)"
      this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotateY(0deg)"
      this.style.boxShadow = "none"
    })
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
  // Carousel keyboard controls
  if (document.activeElement && document.activeElement.closest(".vertical-carousel-container")) {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      if (window.verticalCarouselInstance) {
        window.verticalCarouselInstance.moveCarousel(-1)
      }
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      if (window.verticalCarouselInstance) {
        window.verticalCarouselInstance.moveCarousel(1)
      }
    } else if (e.key === " ") {
      e.preventDefault()
      if (window.verticalCarouselInstance) {
        if (window.verticalCarouselInstance.isAutoPlaying) {
          window.verticalCarouselInstance.stopAutoPlay()
        } else {
          window.verticalCarouselInstance.startAutoPlay()
        }
      }
    }
  }

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

  // Check carousel performance
  const carouselContainer = document.querySelector(".vertical-carousel-container")
  if (carouselContainer) {
    console.log("Vertical carousel initialized successfully")
  }
})

// Error handling
window.addEventListener("error", (e) => {
  if (e.error && e.error.message && e.error.message.includes("carousel")) {
    console.error("Carousel error:", e.error)
    // Fallback: reinitialize carousel
    setTimeout(() => {
      if (window.verticalCarouselInstance) {
        window.verticalCarouselInstance.destroy()
      }
      window.verticalCarouselInstance = new VerticalCarousel("verticalCarousel")
    }, 1000)
  }
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

// Carousel utility functions
window.carouselUtils = {
  // Get current slide info
  getCurrentSlide: () => {
    if (window.verticalCarouselInstance) {
      return {
        index: window.verticalCarouselInstance.currentIndex,
        total: window.verticalCarouselInstance.items.length,
      }
    }
    return null
  },

  // Programmatically control carousel
  goToSlide: (index) => {
    if (window.verticalCarouselInstance) {
      window.verticalCarouselInstance.goToSlide(index)
    }
  },

  // Toggle auto-play
  toggleAutoPlay: () => {
    if (window.verticalCarouselInstance) {
      if (window.verticalCarouselInstance.isAutoPlaying) {
        window.verticalCarouselInstance.stopAutoPlay()
      } else {
        window.verticalCarouselInstance.startAutoPlay()
      }
    }
  },
}

// Intersection Observer for carousel visibility
document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".vertical-carousel-container")

  if (carouselContainer) {
    const carouselObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start auto-play when carousel comes into view
            if (window.verticalCarouselInstance && !window.verticalCarouselInstance.isAutoPlaying) {
              window.verticalCarouselInstance.startAutoPlay()
            }
          } else {
            // Stop auto-play when carousel is out of view
            if (window.verticalCarouselInstance && window.verticalCarouselInstance.isAutoPlaying) {
              window.verticalCarouselInstance.stopAutoPlay()
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    carouselObserver.observe(carouselContainer)
  }
})



