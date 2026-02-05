// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const certificateCards = document.querySelectorAll('.certificate-card');
const viewCertBtns = document.querySelectorAll('.view-cert-btn');
const certificateModal = document.getElementById('certificateModal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalOrg = document.getElementById('modalOrg');
const modalIssueDate = document.getElementById('modalIssueDate');
const modalId = document.getElementById('modalId');
const modalSkills = document.getElementById('modalSkills');
const connectForm = document.getElementById('connectForm');
const formMessage = document.getElementById('formMessage');
const header = document.querySelector('.header');

// Certificate data
const certificateData = {
    1: {
        title: "Impact of COVID-19 on Indian Economy",
        date: "State Level Webinar • May 2021",
        image: "asset/covid.jpg",
        organization: "H.H THE Rajah's College",
        issueDate: "May 27, 2021",
        skills: "Economic Analysis, Market Trends, Financial Forecasting"
    },
    2: {
        title: "TNPSC, TNUSRB, TRB & UPSC Workshop",
        date: "Online Workshop • March 2022",
        image: "asset/tnpsc.jpg",
        organization: "Government Arts college",
        issueDate: "March 03, 2022",
        skills: "Exam Preparation, Public Administration, Government Processes"
    },
    3: {
        title: "Barclays LifeSkills Programme",
        date: "Life Skills Training • October 2021",
        image: "asset/barcil.jpg",
        organization: "GTT Foundation",
        issueDate: "October 13, 2021",
        skills: "Communication, Financial Literacy, Career Development"
    },
    4: {
        title: "Financial Analytics",
        date: "Professional Certification • June 2022",
        image: "asset/financial averness.jpg",
        organization: "H.H THE Rajah's College",
        issueDate: "June 15, 2022",
        skills: "SQL Queries, Database Design, Performance Optimization"
    },
    5: {
        title: "Certified Financial Analyst",
        date: "Professional Certification • January 2021",
        image: "asset/barcil2.jpg",
        organization: "GTT Foundation",
        issueDate: "January 05, 2021",
        skills: "Financial Analysis, Investment Strategies, Risk Management"
    },
    
    6: {
        title: "Introduction To Securities Market",
        date: "College certificate • February 2022",
        image: "asset/introduction of secutity.jpg",
        organization: "H.H THE Rajah's College",
        issueDate: "February 25, 2022",
        skills: "Public Speaking, Communication, Presentation Skills"
    }
};

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Experience Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(item => item.classList.remove('active'));
        tabContents.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Certificate Modal Functions
function openCertificateModal(certId) {
    const certData = certificateData[certId];
    
    if (certData) {
        modalImage.src = certData.image;
        modalTitle.textContent = certData.title;
        modalDate.textContent = certData.date;
        modalOrg.textContent = certData.organization;
        modalIssueDate.textContent = certData.issueDate;
        modalId.textContent = certData.id;
        modalSkills.textContent = certData.skills;
        
        certificateModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Add click event to certificate cards
certificateCards.forEach(card => {
    card.addEventListener('click', () => {
        const certId = card.getAttribute('data-cert');
        openCertificateModal(certId);
    });
});

// Add click event to view certificate buttons
viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.certificate-card');
        const certId = card.getAttribute('data-cert');
        openCertificateModal(certId);
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    certificateModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
certificateModal.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
        certificateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.style.display === 'flex') {
        certificateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Prevent image downloads
function preventImageDownload() {
    // Prevent right-click on certificate images
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG' && e.target.closest('.certificate-image')) {
            e.preventDefault();
            alert('Right-click is disabled to protect certificate images.');
            return false;
        }
    }, false);
    
    // Prevent drag on certificate images
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG' && e.target.closest('.certificate-image')) {
            e.preventDefault();
            return false;
        }
    }, false);
    
    // Prevent keyboard shortcuts for saving in modal
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey && e.key === 's') || (e.ctrlKey && e.key === 'S')) {
            if (certificateModal.style.display === 'flex') {
                e.preventDefault();
                alert('Saving certificate images is disabled.');
                return false;
            }
        }
    });
}

// Contact Form Submission
if (connectForm) {
    connectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(connectForm);
        const formValues = Object.fromEntries(formData);
        
        // Simple validation
        let isValid = true;
        const inputs = connectForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Simulate form submission (in a real app, you would send to a server)
        formMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
        formMessage.className = 'form-message success';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            connectForm.reset();
            formMessage.style.display = 'none';
        }, 3000);
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + header.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate header height for offset
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Prevent image downloads
    preventImageDownload();
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Add animation to elements on scroll
    initScrollAnimations();
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.certificate-card, .extracurricular-card, .project-card, .skill-item').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Additional download protection for certificate images */
    .certificate-image img {
        pointer-events: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;
document.head.appendChild(style);