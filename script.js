// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navbar = document.getElementById("navbar")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    mobileMenuBtn.classList.toggle("active")
    navbar.classList.toggle("active")

    // Prevent body scroll when menu is open
    if (navbar.classList.contains("active")) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active")
      navbar.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !mobileMenuBtn.contains(event.target) &&
      !navbar.contains(event.target) &&
      navbar.classList.contains("active")
    ) {
      mobileMenuBtn.classList.remove("active")
      navbar.classList.remove("active")
      document.body.style.overflow = ""
    }
  })

  // Close mobile menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023) {
      mobileMenuBtn.classList.remove("active")
      navbar.classList.remove("active")
      document.body.style.overflow = ""
    }
  })

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("active")) {
      mobileMenuBtn.classList.remove("active")
      navbar.classList.remove("active")
      document.body.style.overflow = ""
    }
  })

  // Smooth scrolling for navigation links
  const navLinksScroll = document.querySelectorAll('a[href^="#"]')
  navLinksScroll.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const formObject = {}
      formData.forEach((value, key) => {
        formObject[key] = value
      })

      // Show success message (you can replace this with actual form submission)
      alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.")

      // Reset form
      this.reset()
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".service-card, .team-card, .contact-item")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Header background on scroll
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
    }
  })

  // WhatsApp button functionality
  const whatsappButtons = document.querySelectorAll('a[href*="whatsapp"]')
  whatsappButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Track WhatsApp click (you can add analytics here)
      console.log("WhatsApp button clicked")
    })
  })

  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px)"
    })
  })

  // Team card hover effects
  const teamCards = document.querySelectorAll(".team-card")
  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px)"
    })
  })

  // Button click effects
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add ripple CSS
  const style = document.createElement("style")
  style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  // Lazy loading for images
  const images = document.querySelectorAll('img[src*="placeholder"]')
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // You can replace placeholder images with actual images here
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const handleScroll = debounce(() => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "0 1px 2px 0 rgb(0 0 0 / 0.05)"
  }
}, 10)

window.addEventListener("scroll", handleScroll)
