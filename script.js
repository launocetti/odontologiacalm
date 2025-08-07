Entendido. El problema que describes, donde el menú desplegable no se cierra después de seleccionar un enlace en dispositivos móviles, suele ocurrir por una combinación de conflictos en la estructura HTML (especialmente si se mezclan sistemas como Bootstrap con CSS/JS personalizado) y la forma en que se manejan los eventos de clic y el desplazamiento.

Tu HTML actual tiene una mezcla de clases y elementos de Bootstrap (`navbar`, `navbar-toggler`, `collapse navbar-collapse`) junto con mi estructura personalizada (`mobile-menu-toggle`, `nav-desktop`, `nav-mobile`). Esto crea conflictos y hace que el comportamiento no sea el esperado.

Para solucionar esto y asegurar que el menú se oculte correctamente, he simplificado y corregido la estructura HTML del `header` para que funcione de forma nativa con el CSS y JavaScript que te he proporcionado.

Aquí tienes el código completo y corregido para tu `header`, `styles.css` y `script.js`:

## HTML corregido (solo la sección del `header`):

```html
<!-- HEADER -->
<header class="header">
    <div class="container">
        <div class="header-content">
            <!-- Logo -->
            <div class="logo">
                <a href="#inicio" class="logo-link">
                    <div class="logo-icon">
                        <i class="fas fa-tooth"></i>
                    </div>
                    <div class="logo-text">
                        <h1>Calm Odontología</h1>
                        <p>Dra. Nanci Briner</p>
                    </div>
                </a>
            </div>

            <!-- Botón hamburguesa (solo móvil) -->
            <button class="mobile-menu-toggle" id="mobileMenuToggle">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>

            <!-- Desktop Navigation -->
            <nav class="nav-desktop">
                <div class="nav-links">
                    <a href="#inicio" class="nav-link">Inicio</a>
                    <a href="#servicios" class="nav-link">Servicios</a>
                    <a href="#equipo" class="nav-link">Equipo</a>
                    <a href="#horarios" class="nav-link">Horarios</a>
                    <a href="#contacto" class="nav-link">Contacto</a>
                </div>
                <div class="nav-actions">
                    <div class="social-icons">
                        <a href="https://api.whatsapp.com/send?phone=5491133626107&text=" target="_blank" class="social-icon whatsapp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                        <a href="#" target="_blank" class="social-icon instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    </div>

    <!-- Mobile Navigation (se despliega desde aquí) -->
    <div class="nav-mobile" id="navMobile">
        <div class="nav-mobile-content">
            <a href="#inicio" class="nav-mobile-link">
                <i class="fas fa-home"></i>
                <span>Inicio</span>
            </a>
            <a href="#servicios" class="nav-mobile-link">
                <i class="fas fa-tooth"></i>
                <span>Servicios</span>
            </a>
            <a href="#equipo" class="nav-mobile-link">
                <i class="fas fa-user-md"></i>
                <span>Equipo</span>
            </a>
            <a href="#horarios" class="nav-mobile-link">
                <i class="fas fa-clock"></i>
                <span>Horarios</span>
            </a>
            <a href="#contacto" class="nav-mobile-link">
                <i class="fas fa-envelope"></i>
                <span>Contacto</span>
            </a>
            
            <div class="mobile-actions">
                <div class="social-icons">
                    <a href="https://api.whatsapp.com/send?phone=5491133626107&text=" target="_blank" class="social-icon whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </a>
                    <a href="#" target="_blank" class="social-icon instagram">
                        <i class="fab fa-instagram"></i>
                        <span>Instagram</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
```

## CSS actualizado (asegúrate de reemplazar todo tu `styles.css`con esto):

```css
/* Variables CSS */
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --text-dark: #1f2937;
    --text-light: #6b7280;
    --white: #ffffff;
    --bg-light: #f8fafc;
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Reset y base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* HEADER */
.header {
    background-color: var(--white);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.3s ease;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

/* Logo */
.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 12px;
}

.logo-icon {
    background: var(--gradient);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.logo-text h1 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-dark);
    margin: 0;
    line-height: 1.2;
}

.logo-text p {
    font-size: 0.9rem;
    color: var(--text-light);
    margin: 0;
    line-height: 1.2;
}

/* Botón hamburguesa (oculto en desktop) */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
    transition: all 0.3s ease;
}

.hamburger-line {
    width: 25px;
    height: 3px;
    background-color: var(--primary-color);
    margin: 3px 0;
    transition: all 0.3s ease;
    border-radius: 2px;
}

/* Animación del botón hamburguesa */
.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
    background-color: var(--white);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
    background-color: var(--white);
}

/* Desktop Navigation */
.nav-desktop {
    display: flex;
    align-items: center;
    gap: 40px;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 30px;
}

.nav-link {
    color: var(--text-dark);
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: var(--primary-color);
    background-color: rgba(37, 99, 235, 0.1);
    transform: translateY(-1px);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--gradient);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav-link:hover::after {
    width: 80%;
}

/* Nav Actions */
.nav-actions {
    display: flex;
    align-items: center;
}

.social-icons {
    display: flex;
    gap: 12px;
}

.social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    position: relative;
    overflow: hidden;
}

.social-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.3s ease;
}

.social-icon:hover::before {
    transform: scale(1);
}

.social-icon.whatsapp {
    background-color: #25d366;
    color: white;
}

.social-icon.whatsapp::before {
    background-color: #128c7e;
}

.social-icon.whatsapp:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

.social-icon.instagram {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
}

.social-icon.instagram::before {
    background: linear-gradient(45deg, #e1306c 0%, #c13584 50%, #833ab4 100%);
}

.social-icon.instagram:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(188, 24, 136, 0.3);
}

/* Mobile Navigation (oculto por defecto) */
.nav-mobile {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(59, 130, 246, 0.95) 100%);
    backdrop-filter: blur(10px);
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
}

.nav-mobile.active {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
}

.nav-mobile-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
    text-align: center;
}

.nav-mobile-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.2rem;
    padding: 15px 30px;
    margin: 8px 0;
    border-radius: 12px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    min-width: 200px;
    transform: translateX(-50px);
    opacity: 0;
    animation: slideInLeft 0.6s ease forwards;
}

.nav-mobile-link:nth-child(1) { animation-delay: 0.1s; }
.nav-mobile-link:nth-child(2) { animation-delay: 0.2s; }
.nav-mobile-link:nth-child(3) { animation-delay: 0.3s; }
.nav-mobile-link:nth-child(4) { animation-delay: 0.4s; }
.nav-mobile-link:nth-child(5) { animation-delay: 0.5s; }

@keyframes slideInLeft {
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.nav-mobile-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.nav-mobile-link i {
    font-size: 1.3rem;
}

/* Mobile Actions */
.mobile-actions {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
}

.mobile-actions .social-icons {
    justify-content: center;
    gap: 20px;
}

.mobile-actions .social-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    gap: 10px;
    flex-direction: column;
    padding: 8px;
    border-radius: 16px;
    min-width: 80px;
    height: auto;
}

.mobile-actions .social-icon span {
    font-size: 0.8rem;
    font-weight: 500;
}

.mobile-actions .social-icon:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px) scale(1.05);
}

.mobile-actions .social-icon.whatsapp:hover {
    background: rgba(37, 211, 102, 0.3);
    border-color: #25d366;
}

.mobile-actions .social-icon.instagram:hover {
    background: rgba(188, 24, 136, 0.3);
    border-color: #bc1888;
}

/* RESPONSIVE DESIGN */
@media screen and (max-width: 1024px) {
    .container {
        padding: 0 15px;
    }
    
    .nav-links {
        gap: 20px;
    }
    
    .nav-desktop {
        gap: 30px;
    }
}

@media screen and (max-width: 768px) {
    /* Mostrar botón hamburguesa */
    .mobile-menu-toggle {
        display: flex;
    }
    
    /* Ocultar navegación desktop */
    .nav-desktop {
        display: none;
    }
    
    .header-content {
        height: 70px;
    }
    
    .logo-text h1 {
        font-size: 1.2rem;
    }
    
    .logo-text p {
        font-size: 0.8rem;
    }
    
    .logo-icon {
        width: 45px;
        height: 45px;
        font-size: 1.3rem;
    }
}

@media screen and (max-width: 480px) {
    .container {
        padding: 0 15px;
    }
    
    .header-content {
        height: 60px;
    }
    
    .logo-text h1 {
        font-size: 1.1rem;
    }
    
    .logo-text p {
        font-size: 0.75rem;
    }
    
    .logo-icon {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
    }
    
    .nav-mobile-content {
        padding: 15px;
    }
    
    .nav-mobile-link {
        font-size: 1.1rem;
        padding: 12px 25px;
        min-width: 180px;
    }
    
    .mobile-actions .social-icon {
        width: 50px;
        min-width: 70px;
        font-size: 1.3rem;
    }
}

/* Prevenir scroll cuando el menú móvil está abierto */
body.menu-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Efectos adicionales */
.header.scrolled {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
}

/* Estilo para link activo */
.nav-link.active {
    color: var(--primary-color);
    background-color: rgba(37, 99, 235, 0.1);
}

.nav-link.active::after {
    width: 80%;
}

.nav-mobile-link.active {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

/* Animaciones de secciones (si las tenías) */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.service-card,
.team-card {
    animation: fadeInUp 0.6s ease forwards;
}
```

## JavaScript actualizado (asegúrate de reemplazar todo tu `script.js`con esto):

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMobile = document.getElementById('navMobile');
    const body = document.body;
    const header = document.querySelector('.header');
    
    // Toggle del menú móvil
    if (mobileMenuToggle && navMobile) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el clic se propague y cierre el menú inmediatamente
            toggleMobileMenu();
        });
        
        // Función para toggle del menú
        function toggleMobileMenu() {
            const isActive = mobileMenuToggle.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        // Abrir menú móvil
        function openMobileMenu() {
            mobileMenuToggle.classList.add('active');
            navMobile.classList.add('active');
            body.classList.add('menu-open');
        }
        
        // Cerrar menú móvil
        function closeMobileMenu() {
            mobileMenuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            body.classList.remove('menu-open');
        }
        
        // Cerrar menú al hacer click en un enlace móvil y realizar smooth scroll
        document.querySelectorAll('.nav-mobile-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Previene el comportamiento por defecto del enlace
                
                // Cierra el menú inmediatamente
                closeMobileMenu();
                
                // Espera un breve momento para que la transición del menú se inicie antes de hacer scroll
                setTimeout(() => {
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        const headerHeight = header.offsetHeight;
                        // Ajusta el offset para que la sección no quede oculta por el header fijo
                        const targetPosition = target.offsetTop - headerHeight - 20; 
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100); // Pequeño retraso de 100ms
            });
        });
        
        // Cerrar menú al hacer click en el overlay (fuera del contenido del menú)
        navMobile.addEventListener('click', function(e) {
            if (e.target === navMobile) { // Solo si el clic es directamente en el fondo del nav-mobile
                closeMobileMenu();
            }
        });
        
        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMobile.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Cerrar menú al redimensionar ventana (si pasa de móvil a desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMobile.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Navbar scroll effect (cambia el estilo del header al hacer scroll)
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling para los enlaces de escritorio (si los tienes, si no, se puede eliminar)
    // Este listener es para los enlaces que no son del menú móvil, para evitar conflictos.
    document.querySelectorAll('.nav-desktop .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav link (resalta el enlace de la sección actual)
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajusta el offset para que el highlight sea preciso
            if (window.scrollY >= (sectionTop - header.offsetHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        // Resalta enlaces de desktop
        document.querySelectorAll('.nav-desktop .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Resalta enlaces de móvil
        document.querySelectorAll('.nav-mobile-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Llama a la función de highlight al cargar y al hacer scroll
    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink(); // Llamada inicial
});
```


