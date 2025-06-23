// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Enhanced header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation
// (If you want to keep this, ensure nav links have .nav-link class)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Chart.js configuration
const chartColors = {
    green: '#007F3E',
    darkGreen: '#00532A',
    lightGreen: '#E8F5E8',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#E5E7EB',
    lightGray: '#F3F4F6',
    yellow: '#FFD700'
};

const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: '#FFFFFF',
            bodyColor: '#FFFFFF',
            borderColor: '#007F3E',
            borderWidth: 2,
            cornerRadius: 12,
            padding: 12,
            titleFont: {
                size: 14,
                weight: '600'
            },
            bodyFont: {
                size: 13
            }
        }
    },
    scales: {
        x: {
            ticks: { 
                color: '#000000', 
                font: { weight: '500', size: 12 } 
            },
            grid: { 
                color: chartColors.lightGray,
                drawBorder: false
            }
        },
        y: {
            ticks: { 
                color: '#000000', 
                font: { weight: '500', size: 12 } 
            },
            grid: { 
                color: chartColors.lightGray,
                drawBorder: false
            }
        }
    }
};

// Center Status Chart
const centerStatusData = {
    labels: ['Commissioned & Operational', 'Classes Ongoing (Not Commissioned)', 'Ready (Awaiting Classes)', 'Under Construction'],
    datasets: [{
        label: 'Number of Centers',
        data: [7, 2, 2, 5],
        backgroundColor: [
            chartColors.green,
            chartColors.darkGreen,
            chartColors.yellow,
            chartColors.gray
        ],
        borderColor: [
            chartColors.green,
            chartColors.darkGreen,
            chartColors.yellow,
            chartColors.gray
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
    }]
};

const centerStatusCtx = document.getElementById('centerStatusChart');
if (centerStatusCtx) {
    new Chart(centerStatusCtx, {
        type: 'bar',
        data: centerStatusData,
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#000000',
                        font: { weight: '500', size: 12 },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
}

// First Batch Chart
const firstBatchData = {
    labels: ['Enrolled', 'Graduated'],
    datasets: [{
        label: 'Trainees',
        data: [1025, 345],
        backgroundColor: [chartColors.green, chartColors.darkGreen],
        borderColor: [chartColors.green, chartColors.darkGreen],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
    }]
};

const firstBatchCtx = document.getElementById('firstBatchChart');
if (firstBatchCtx) {
    new Chart(firstBatchCtx, {
        type: 'bar',
        data: firstBatchData,
        options: {
            ...defaultChartOptions,
            scales: {
                x: {
                    display: false
                },
                y: {
                    ticks: { 
                        color: '#000000', 
                        font: { weight: '500', size: 12 } 
                    },
                    grid: { 
                        color: chartColors.lightGray,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

// Enhanced Pass Rate Mini Charts
function createPassRateChart(canvasId, passed, failed) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const total = passed + failed;
    const passPercentage = Math.round((passed / total) * 100);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Passed', 'Failed'],
            datasets: [{
                data: [passed, failed],
                backgroundColor: [chartColors.green, chartColors.gray],
                borderColor: [chartColors.white, chartColors.white],
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#000000',
                        font: { weight: '500', size: 11 },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#007F3E',
                    borderWidth: 2,
                    cornerRadius: 12,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Initialize all pass rate charts
createPassRateChart('passRateBayo', 148, 0);
createPassRateChart('passRateGubio', 189, 5);
createPassRateChart('passRateMagumeri', 76, 1);
createPassRateChart('passRateNganzai', 116, 2);
createPassRateChart('passRateMobbar', 129, 20);
createPassRateChart('passRateMafa', 42, 14);

// Add intersection observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe all cards and sections for enhanced animations
document.querySelectorAll('.glass-card, .kpi-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Add counter animation for KPI values
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes(',')) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate KPI counters when they come into view
const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const valueElement = entry.target.querySelector('.kpi-value');
            if (valueElement && !valueElement.dataset.animated) {
                const text = valueElement.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (!isNaN(number)) {
                    valueElement.dataset.animated = 'true';
                    animateCounter(valueElement, number);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.kpi-card').forEach(card => {
    kpiObserver.observe(card);
});

// Animate numbers in impact cards
document.querySelectorAll('.impact-number').forEach(element => {
    const target = parseInt(element.textContent);
    animateCounter(element, target);
});

// Animate numbers in stat cards
document.querySelectorAll('.stat-number').forEach(element => {
    const target = parseInt(element.textContent);
    animateCounter(element, target);
});

// Enhanced timeline animations
const timelineEvents = document.querySelectorAll('.timeline-event');
timelineEvents.forEach((event, index) => {
    event.style.opacity = '0';
    event.style.transform = 'translateX(-20px)';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    event.style.transition = 'all 0.6s ease';
                    event.style.opacity = '1';
                    event.style.transform = 'translateX(0)';
                }, index * 200);
                observer.unobserve(event);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(event);
});

// Center cards hover effect
document.querySelectorAll('.center-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initiative cards hover effect
document.querySelectorAll('.initiative-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.querySelector('.initiative-icon').style.transform = 'scale(1.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.querySelector('.initiative-icon').style.transform = 'scale(1)';
    });
});

// Organization structure animations
const orgLeader = document.querySelector('.org-leader');
if (orgLeader) {
    orgLeader.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.querySelector('.org-avatar').style.transform = 'scale(1.1)';
    });
    
    orgLeader.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.querySelector('.org-avatar').style.transform = 'scale(1)';
    });
}

// Achievement cards animations
document.querySelectorAll('.achievement-card').forEach(card => {
    const icon = card.querySelector('.achievement-icon');
    const list = card.querySelector('ul');
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        if (icon) icon.style.transform = 'scale(1.1)';
        if (list) {
            list.querySelectorAll('li').forEach((li, index) => {
                li.style.transition = 'all 0.3s ease';
                li.style.transitionDelay = `${index * 0.1}s`;
                li.style.transform = 'translateX(10px)';
            });
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        if (icon) icon.style.transform = 'scale(1)';
        if (list) {
            list.querySelectorAll('li').forEach(li => {
                li.style.transform = 'translateX(0)';
            });
        }
    });
});

// Staff list animations
document.querySelectorAll('.glass-card ul').forEach(list => {
    list.querySelectorAll('li').forEach(li => {
        li.addEventListener('mouseenter', function() {
            const number = this.querySelector('.font-bold');
            if (number) {
                number.style.transform = 'scale(1.1)';
                number.style.color = 'var(--dark-green)';
            }
        });
        
        li.addEventListener('mouseleave', function() {
            const number = this.querySelector('.font-bold');
            if (number) {
                number.style.transform = 'scale(1)';
                number.style.color = 'var(--primary-green)';
            }
        });
    });
}); 