document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Greeting
    const greetingElement = document.querySelector('.welcome-banner h1');
    const hours = new Date().getHours();
    let greetingText = 'Hola, Admin 👋';

    if (hours < 12) {
        greetingText = 'Buenos días, Admin ☀️';
    } else if (hours < 18) {
        greetingText = 'Buenas tardes, Admin 🌤️';
    } else {
        greetingText = 'Buenas noches, Admin 🌙';
    }
    
    // Animate typing effect or just set text
    greetingElement.textContent = greetingText;

    // Navigation Active State
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if it's the logout link
            if(link.parentElement.classList.contains('logout')) return;
            
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Mobile Sidebar Toggle (We need to add a trigger in HTML if we want this)
    // For now, let's assume we might add a hamburger menu locally if needed.
    // Let's inject a toggle button for mobile if it doesn't exist
    if (window.innerWidth <= 768) {
        const topBar = document.querySelector('.top-bar');
        const toggleBtn = document.createElement('i');
        toggleBtn.className = 'fa-solid fa-bars';
        toggleBtn.style.fontSize = '1.5rem';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.color = 'var(--text-main)';
        toggleBtn.style.marginRight = '1rem';
        
        // Insert before search bar
        topBar.insertBefore(toggleBtn, topBar.firstChild);

        const sidebar = document.querySelector('.sidebar');
        
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            
            // Close when clicking outside (simple version)
            // In a real app we'd add an overlay
        });
        
        // Close sidebar when clicking a link on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
               sidebar.classList.remove('open'); 
            });
        });
    }

    // Chart Animation Simulation
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            // Trigger a small 'growth' animation on load if we wanted
            // but CSS transition handles the hover
        }, index * 100);
    });
});
