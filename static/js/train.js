// ===== Training Page JavaScript =====

function startTraining() {
    const trainBtn = document.getElementById('trainBtn');
    const trainingProgress = document.getElementById('trainingProgress');
    const trainingComplete = document.getElementById('trainingComplete');
    const trainActions = document.querySelector('.train-actions');
    const trainInfoSection = document.querySelector('.train-info-section');
    
    // Hide button and show progress
    trainActions.style.display = 'none';
    trainInfoSection.style.display = 'none';
    trainingProgress.style.display = 'block';
    
    // Simulate training stages
    const stages = [
        { name: 'Data Ingestion', duration: 3000 },
        { name: 'Data Validation', duration: 2000 },
        { name: 'Data Transformation', duration: 2500 },
        { name: 'Model Training', duration: 4000 },
        { name: 'Model Evaluation', duration: 2500 }
    ];
    
    let currentStageIndex = 0;
    const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0);
    let elapsedTime = 0;
    
    function updateStage(index) {
        const stageItems = document.querySelectorAll('.stage-item');
        const currentStageEl = document.getElementById('currentStage');
        
        // Update all previous stages to complete
        stageItems.forEach((item, i) => {
            if (i < index) {
                item.classList.add('complete');
                item.querySelector('i').className = 'fas fa-check-circle';
            } else if (i === index) {
                item.classList.add('active');
                item.querySelector('i').className = 'fas fa-spinner fa-spin';
            } else {
                item.classList.remove('active', 'complete');
                item.querySelector('i').className = 'fas fa-circle';
            }
        });
        
        // Update current stage text
        if (index < stages.length) {
            currentStageEl.innerHTML = `
                <i class="fas fa-cog fa-spin"></i>
                <span>${stages[index].name}...</span>
            `;
        }
    }
    
    function updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        elapsedTime += 100;
        const percentage = Math.min((elapsedTime / totalDuration) * 100, 100);
        
        progressFill.style.width = percentage + '%';
        progressText.textContent = Math.round(percentage) + '%';
        
        // Update stage based on elapsed time
        let cumulativeTime = 0;
        for (let i = 0; i < stages.length; i++) {
            cumulativeTime += stages[i].duration;
            if (elapsedTime <= cumulativeTime) {
                if (currentStageIndex !== i) {
                    currentStageIndex = i;
                    updateStage(i);
                }
                break;
            }
        }
        
        if (elapsedTime < totalDuration) {
            requestAnimationFrame(updateProgress);
        } else {
            completeTraining();
        }
    }
    
    function completeTraining() {
        // Make actual training request
        fetch('/train')
            .then(response => response.text())
            .then(data => {
                // Mark all stages as complete
                document.querySelectorAll('.stage-item').forEach(item => {
                    item.classList.add('complete');
                    item.querySelector('i').className = 'fas fa-check-circle';
                });
                
                // Show completion
                setTimeout(() => {
                    trainingProgress.style.display = 'none';
                    trainingComplete.style.display = 'block';
                    
                    // Success notification
                    showNotification('Model trained successfully!', 'success');
                }, 500);
            })
            .catch(error => {
                console.error('Training error:', error);
                showNotification('Training failed. Please try again.', 'error');
                
                // Reset UI
                trainActions.style.display = 'flex';
                trainInfoSection.style.display = 'block';
                trainingProgress.style.display = 'none';
            });
    }
    
    // Start progress animation
    updateStage(0);
    requestAnimationFrame(updateProgress);
}

// Notification function for training page
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    const colorMap = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.innerHTML = `
        <i class="fas fa-${iconMap[type]}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colorMap[type]};
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
        min-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

console.log('🚀 Training page loaded successfully!');
