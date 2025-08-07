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


