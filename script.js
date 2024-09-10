document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');

    // Reusable GSAP function to clear props
    const animateElement = (selector, config) => {
        gsap.from(selector, { ...config, onComplete: () => {
            gsap.set(selector, { clearProps: 'all' });
        }});
    };

    // Initial Animations with GSAP
    animateElement('header h1', { duration: 1.5, y: -50, opacity: 0 });
    animateElement('header p', { duration: 1.5, y: 50, opacity: 0, delay: 0.5 });
    animateElement('nav ul li', { duration: 1, y: 20, opacity: 0, stagger: 0.2, delay: 1 });
    animateElement('.portfolio-item', { duration: 1, y: 20, opacity: 0, stagger: 0.2, delay: 1.5 });

    // ScrollMagic for scroll-triggered animations
    const controller = new ScrollMagic.Controller();
    
    document.querySelectorAll('.portfolio-item, .skill, .testimonial').forEach((item) => {
        new ScrollMagic.Scene({
            triggerElement: item,
            triggerHook: 0.9,
            reverse: false
        })
        .setTween(gsap.from(item, { y: 50, opacity: 0, duration: 1 }))
        .addTo(controller);
    });

    // Optimized MutationObserver
    const container = document.querySelector('.container');
    let throttleTimeout = null; // For throttling the MutationObserver
    const observer = new MutationObserver(mutations => {
        if (throttleTimeout) return;
        
        throttleTimeout = setTimeout(() => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'style') {
                    console.log('Container style changed:', container.style.opacity);
                }
            });
            throttleTimeout = null; // Reset throttle
        }, 200); // Adjust throttle delay as needed
    });
    
    observer.observe(container, { attributes: true });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form.search-bar button').addEventListener('click', searchPortfolio);


    function searchPortfolio() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const portfolioItems = document.querySelectorAll('.portfolio-item');
    
        portfolioItems.forEach(item => {
            const title = item.getAttribute('data-title').toLowerCase();
    
            // Check if the title includes the search input
            if (title.includes(searchInput)) {
                item.style.display = 'block'; // Show matching items
                item.style.opacity = '1'; // Ensure opacity is set to 1
            } else {
                item.style.display = 'none'; // Hide non-matching items
            }
        });
    }
    
});

