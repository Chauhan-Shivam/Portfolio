// Smooth Scroll Function
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Smooth Scroll to Top
document.addEventListener("DOMContentLoaded", () => {
    // Ensure only one Back to Top button is initialized
    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            smoothScrollTo(0, 1200);
            console.log("Back to Top button clicked");
        });
    } else {
        console.error("Back to Top button not found in the DOM.");
    }
});

// Nav links for smooth scrolling
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            smoothScrollTo(targetElement.offsetTop, 1200);
        }
    });
});

// Intersection Observer for active nav links
const sections = document.querySelectorAll('section');
const observerOptions = { root: null, threshold: 0.4 };
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
            });
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// Scroll-based animations for .animate elements
const animateElements = document.querySelectorAll('.animate');
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            animationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
animateElements.forEach(el => animationObserver.observe(el));

// Dark/Light Mode Toggle with Icons
document.addEventListener("DOMContentLoaded", () => {
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            modeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀';
        });
    } else {
        console.error("Mode toggle button not found in the DOM.");
    }
});

// Modal for Projects (extra details)
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const clone = card.cloneNode(true);
        const extraInfo = document.createElement('p');
        extraInfo.textContent = "Additional Details: This project showcases my ability to implement advanced features and best practices in modern development.";
        clone.appendChild(extraInfo);
        modalBody.innerHTML = "";
        modalBody.appendChild(clone);
        modal.style.display = 'flex';
    });
});
modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Typewriter Effect for hero subtext (infinite loop)
document.addEventListener("DOMContentLoaded", () => {
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ["Student", "Aspiring Developer", "Aspiring Game Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let currentWord = "";
        let isDeleting = false;
        const typeSpeed = 150;
        const deleteSpeed = 100;
        const delayBetweenWords = 1500;

        function type() {
            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
            currentWord = words[wordIndex];
            if (!isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, delayBetweenWords);
                    return;
                }
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex++;
                }
            }
            const speed = isDeleting ? deleteSpeed : typeSpeed;
            setTimeout(type, speed);
        }
        type();
    } else {
        console.error("Typewriter element not found in the DOM.");
    }
});

// Horizontal slide animation for project cards when in view
const projectCardsArray = Array.from(document.querySelectorAll('.project-card'));
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view'); // triggers CSS animation
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
projectCardsArray.forEach(card => projectObserver.observe(card));

// Fix for missing stylesheet integrity metadata
const fontAwesomeLink = document.querySelector('link[href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"]');
if (fontAwesomeLink) {
    fontAwesomeLink.setAttribute("integrity", "sha512-ak+qOLBfZbJySncWrn8Q2UK0MNYQ83mZwYIYpQI4Un0aLC6YSe1ZLO0nEtUKmKFCsr5RzRfo+um2bEIgSc3eqQ==");
    fontAwesomeLink.setAttribute("crossorigin", "anonymous");
} else {
    console.warn("Font Awesome stylesheet link not found.");
}

// Fix for missing project images
const projectImages = [

    { selector: '.project-card img[src="project_images/ballGame.jpeg"]', fallback: 'project_images/default_project1.jpg' },
    { selector: '.project-card img[src="project_images/fps.webp"]', fallback: 'project_images/default_project2.jpg' },
    { selector: '.project-card img[src="project_images/gestureBlitz.jpg"]', fallback: 'project_images/default_project3.jpg' },
    { selector: '.project-card img[src="project_images/DailyAffirmations.jpg"]', fallback: 'project_images/default_project4.jpg' },
    { selector: 'img[src="hero_background.jpg"]', fallback: 'project_images/default_hero_background.jpg' }
];

projectImages.forEach(({ selector, fallback }) => {
    const imgElement = document.querySelector(selector);
    if (imgElement) {
        imgElement.onerror = () => {
            console.warn(`Image not found: ${imgElement.src}. Using fallback: ${fallback}`);
            imgElement.src = fallback;
        };
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const certificationsGrid = document.getElementById("certificationsGrid");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");

    if (!certificationsGrid) {
        console.error("Certifications grid not found in the DOM.");
        return;
    }
    if (!leftArrow || !rightArrow) {
        console.error("Arrow buttons for certifications grid not found in the DOM.");
        return;
    }

    // Array of certificate data
    let certificates = [
        {
            img: "certificates/Coursera_Python-DSAI.png",
            title: "Python for Data Science, AI & Development",
            organization: "Coursera",
            date: "May 2023",
            link: "certificates/Coursera_Python-DSAI.pdf"
        },
        {
            img: "certificates/Coursera_IntroToAI.png",
            title: "Introduction to AI",
            organization: "Coursera",
            date: "January 2023",
            link: "certificates/Coursera_IntroToAI.pdf"
        },
        {
            img: "certificates/Coursera_HumanCentered.png",
            title: "Human-Centered Design",
            organization: "Coursera",
            date: "January 2024",
            link: "certificates/Coursera_HumanCentered.pdf"
        },
        {
            img: "certificates/Coursera_Arduino.png",
            title: "Arduino Programming and Development",
            organization: "Coursera",
            date: "November 2023",
            link: "certificates/Coursera_Arduino.pdf"
        },
        {
            img: "certificates/Codechef_learnJava.png",
            title: "Learn Java",
            organization: "CodeChef",
            date: "24 August, 2023",
            link: "certificates/Codechef_learnJava.pdf"
        },
        {
            img: "certificates/Coursera_RaspberryPi.png",
            title: "Raspberry Pi Programming",
            organization: "Coursera",
            date: "February 2024",
            link: "certificates/Coursera_RaspberryPi.pdf"
        },
        {
            img: "certificates/Coursera_PythonBasics.png",
            title: "Python Basics",
            organization: "Coursera",
            date: "January 2023",
            link: "certificates/Coursera_PythonBasics.pdf"
        },
        {
            img: "certificates/infosys_ESP8266.png",
            title: "IoT Automation using ESP8266 with Projects",
            organization: "Infosys",
            date: "March 2024",
            link: "certificates/infosys_ESP8266.pdf"
        },
        {
            img: "certificates/Infosys_MAD.png",
            title: "Mobile Apps Development - Advanced Applications",
            organization: "Infosys",
            date: "March 2024",
            link: "certificates/Infosys_MAD.pdf"
        },
        {
            img: "certificates/letsUpgrade_HTML-CSS.png",
            title: "HTML & CSS Essentials Bootcamp",
            organization: "LetsUpgrade",
            date: "August 2023",
            link: "certificates/letsUpgrade_HTML-CSS.pdf"
        },
        {
            img: "certificates/LetsUpgrade_React.png",
            title: "React.js Essentials Bootcamp",
            organization: "LetsUpgrade",
            date: "July 2023",
            link: "certificates/LetsUpgrade_React.pdf"
        },
        {
            img: "certificates/LetsUpgradeCPP.png",
            title: "C++ Programming Essentials Bootcamp",
            organization: "LetsUpgrade",
            date: "August 2023",
            link: "certificates/LetsUpgradeCPP.pdf"
        }
    ];

    // Sort certificates by date in descending order
    certificates.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Dynamically create certification cards
    const createCards = () => {
        certificationsGrid.innerHTML = ""; // Clear existing cards
        certificates.forEach(cert => {
            const certCard = document.createElement("a");
            certCard.className = "card certification-card";
            certCard.href = cert.link; // Make the entire card a hyperlink
            certCard.target = "_blank"; // Open in a new tab
            certCard.innerHTML = `
                <img src="${cert.img}" alt="${cert.title}" class="project-img">
                <h3>${cert.title}</h3>
                <p><strong>Organization:</strong> ${cert.organization}</p>
                <p><strong>Date:</strong> ${cert.date}</p>
            `;
            certificationsGrid.appendChild(certCard);
        });
    };

    createCards();

    // Clone certificates for seamless looping
    const cloneCertificates = () => {
        const cards = document.querySelectorAll(".certification-card");
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            certificationsGrid.appendChild(clone);
        });
    };
    cloneCertificates();

    // Infinite scrolling with scroll wheel
    certificationsGrid.addEventListener("scroll", () => {
        const scrollLeft = certificationsGrid.scrollLeft;
        const totalWidth = certificationsGrid.scrollWidth / 2; // Total width of original cards

        // If scrolled to the end, reset to the start
        if (scrollLeft >= totalWidth) {
            certificationsGrid.scrollLeft -= totalWidth;
        }

        // If scrolled to the start, reset to the end
        if (scrollLeft === 0) {
            certificationsGrid.scrollLeft += totalWidth;
        }
    });

    // Arrow button functionality
    const scrollByAmount = certificationsGrid.offsetWidth / 2; // Scroll by half the container width

    leftArrow.addEventListener("click", () => {
        certificationsGrid.scrollBy({
            left: -scrollByAmount,
            behavior: "smooth"
        });
    });

    rightArrow.addEventListener("click", () => {
        certificationsGrid.scrollBy({
            left: scrollByAmount,
            behavior: "smooth"
        });
    });

    // Auto-scroll functionality
    const autoScrollSpeed = 1; // Adjust speed for auto-scroll
    let autoScrollInterval;

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            certificationsGrid.scrollLeft += autoScrollSpeed;

            const totalWidth = certificationsGrid.scrollWidth / 2; // Total width of original cards
            if (certificationsGrid.scrollLeft >= totalWidth) {
                certificationsGrid.scrollLeft -= totalWidth; // Reset to the start
            }
        }, 20); // Adjust interval for smoothness
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    // Start auto-scroll
    startAutoScroll();

    // Pause auto-scroll on user interaction
    certificationsGrid.addEventListener("mouseover", stopAutoScroll);
    certificationsGrid.addEventListener("mouseout", startAutoScroll);

    // Pause auto-scroll when hovering over arrow buttons
    leftArrow.addEventListener("mouseover", stopAutoScroll);
    rightArrow.addEventListener("mouseover", stopAutoScroll);
    leftArrow.addEventListener("mouseout", startAutoScroll);
    rightArrow.addEventListener("mouseout", startAutoScroll);
});