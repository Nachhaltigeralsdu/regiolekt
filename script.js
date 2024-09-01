document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loader').style.display = 'none';

    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = document.querySelector('#dark-mode-toggle i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const current = [...sections].find(section => window.scrollY >= section.offsetTop - 70)?.id || '';
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting));
    }, { threshold: 0.1 });

    document.querySelectorAll('.bullet-points-container, .fade-in').forEach(section => observer.observe(section));

    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let currentPointIndex = 0;
    const bulletPoints = document.querySelectorAll('.bullet-points-container');
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const closeBtn = fullscreenModal.querySelector('.close-btn');
    const nextBtn = fullscreenModal.querySelector('.next-btn');

    bulletPoints.forEach((bullet, index) => {
        bullet.addEventListener('click', () => showFullscreen(index));
    });

    closeBtn.addEventListener('click', hideFullscreen);
    nextBtn.addEventListener('click', () => showFullscreen((currentPointIndex + 1) % bulletPoints.length));

    function showFullscreen(index) {
        currentPointIndex = index;
        const bullet = bulletPoints[index];
        fullscreenModal.querySelector('h2').textContent = bullet.querySelector('h2').textContent;
        fullscreenModal.querySelector('ul').innerHTML = bullet.querySelector('ul').innerHTML;
        fullscreenModal.querySelector('img').src = bullet.querySelector('img').src;
        fullscreenModal.classList.add('visible');
    }

    function hideFullscreen() {
        fullscreenModal.classList.remove('visible');
        fullscreenModal.classList.add('exiting');
        setTimeout(() => fullscreenModal.classList.remove('exiting'), 500);
    }
});
