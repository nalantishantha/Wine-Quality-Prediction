// ===== Particles.js Configuration =====
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#8e44ad'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#8e44ad',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// ===== Form Validation and Enhancement =====
const predictionForm = document.getElementById('predictionForm');

if (predictionForm) {
    // Add input validation
    const inputs = predictionForm.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Add visual feedback on input
            this.style.borderColor = 'rgba(142, 68, 173, 0.6)';
        });
        
        input.addEventListener('blur', function() {
            // Validate on blur
            if (this.value === '') {
                this.style.borderColor = 'rgba(231, 76, 60, 0.6)';
            } else {
                this.style.borderColor = 'rgba(39, 174, 96, 0.6)';
            }
        });
    });
    
    // Form submission with loading state
    predictionForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Predicting...';
        submitBtn.disabled = true;
        
        // If validation fails, restore button
        setTimeout(() => {
            if (!this.checkValidity()) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 100);
    });
}

// ===== Fill Sample Data Function =====
function fillSampleData() {
    const sampleData = {
        fixed_acidity: 7.4,
        volatile_acidity: 0.70,
        citric_acid: 0.00,
        residual_sugar: 1.9,
        chlorides: 0.076,
        free_sulfur_dioxide: 11.0,
        total_sulfur_dioxide: 34.0,
        density: 0.9978,
        pH: 3.51,
        sulphates: 0.56,
        alcohol: 9.4
    };
    
    Object.keys(sampleData).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = sampleData[key];
            input.style.borderColor = 'rgba(39, 174, 96, 0.6)';
            
            // Add animation
            input.style.transform = 'scale(1.05)';
            setTimeout(() => {
                input.style.transform = 'scale(1)';
            }, 200);
        }
    });
    
    // Show notification
    showNotification('Sample data filled successfully!', 'success');
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Add CSS for notifications =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    input[type="number"] {
        transition: all 0.3s ease !important;
    }
`;
document.head.appendChild(style);

// ===== Smooth Scroll =====
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

// ===== Input Range Validation =====
const inputRanges = {
    fixed_acidity: { min: 4.6, max: 15.9 },
    volatile_acidity: { min: 0.12, max: 1.58 },
    citric_acid: { min: 0.0, max: 1.0 },
    residual_sugar: { min: 0.9, max: 15.5 },
    chlorides: { min: 0.012, max: 0.611 },
    free_sulfur_dioxide: { min: 1.0, max: 72.0 },
    total_sulfur_dioxide: { min: 6.0, max: 289.0 },
    density: { min: 0.99007, max: 1.00369 },
    pH: { min: 2.74, max: 4.01 },
    sulphates: { min: 0.33, max: 2.0 },
    alcohol: { min: 8.4, max: 14.9 }
};

Object.keys(inputRanges).forEach(key => {
    const input = document.getElementById(key);
    if (input) {
        input.addEventListener('change', function() {
            const value = parseFloat(this.value);
            const range = inputRanges[key];
            
            if (value < range.min || value > range.max) {
                showNotification(
                    `${key.replace(/_/g, ' ')} should be between ${range.min} and ${range.max}`,
                    'warning'
                );
                this.style.borderColor = 'rgba(243, 156, 18, 0.6)';
            }
        });
    }
});

// ===== Add warning notification style =====
const warningStyle = document.createElement('style');
warningStyle.textContent = `
    .notification-warning {
        background: #f39c12 !important;
    }
`;
document.head.appendChild(warningStyle);

// ===== Loading Animation on Page Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Form Auto-save to LocalStorage =====
if (predictionForm) {
    // Load saved data
    const savedData = localStorage.getItem('wineFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const input = document.getElementById(key);
            if (input && data[key]) {
                input.value = data[key];
            }
        });
    }
    
    // Save data on input
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formData = {};
            inputs.forEach(inp => {
                formData[inp.id] = inp.value;
            });
            localStorage.setItem('wineFormData', JSON.stringify(formData));
        });
    });
    
    // Clear saved data on successful submission
    predictionForm.addEventListener('submit', function() {
        localStorage.removeItem('wineFormData');
    });
}

console.log('🍷 Wine Quality Prediction System Loaded Successfully!');
