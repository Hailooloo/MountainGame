// 山中一甲子 - 视觉特效模块

// 粒子系统
class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.maxParticles = 50;
        this.isActive = false;
    }
    
    // 启动粒子系统
    start(elementType) {
        this.isActive = true;
        this.elementType = elementType;
        this.createParticles();
    }
    
    // 停止粒子系统
    stop() {
        this.isActive = false;
        this.clearParticles();
    }
    
    // 创建粒子
    createParticles() {
        if (!this.isActive) return;
        
        this.clearParticles();
        
        const particleCount = Math.min(this.maxParticles, 15 + Math.floor(Math.random() * 10));
        const particleClass = `${this.elementType}-particle`;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${particleClass}`;
            
            // 随机大小
            const size = 3 + Math.random() * 7;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机位置
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            
            // 随机延迟
            const delay = Math.random() * 2;
            particle.style.animationDelay = `${delay}s`;
            
            // 随机透明度
            const opacity = 0.3 + Math.random() * 0.4;
            particle.style.opacity = opacity;
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    // 清除粒子
    clearParticles() {
        this.particles.forEach(particle => {
            if (particle.parentNode === this.container) {
                this.container.removeChild(particle);
            }
        });
        this.particles = [];
    }
    
    // 更新粒子位置（如果需要动态移动）
    updateParticles() {
        if (!this.isActive) return;
        
        this.particles.forEach(particle => {
            // 可以在这里添加粒子移动逻辑
        });
    }
}

// 天气效果管理器
class WeatherEffectManager {
    constructor() {
        this.currentEffect = null;
        this.effectContainer = document.getElementById('weather-effect');
        this.particleSystem = new ParticleSystem('weather-effect');
    }
    
    // 应用天气效果
    applyWeatherEffect(weatherType, elementType) {
        // 清除现有效果
        this.clearEffect();
        
        // 设置新的天气效果
        this.currentEffect = weatherType;
        
        // 添加天气效果类
        const effectDiv = document.createElement('div');
        effectDiv.className = weatherType;
        this.effectContainer.appendChild(effectDiv);
        
        // 根据元素类型启动粒子系统
        if (elementType && elementType !== 'balance') {
            this.particleSystem.start(elementType);
            
            // 粒子系统持续时间
            setTimeout(() => {
                this.particleSystem.stop();
            }, 8000);
        }
        
        // 添加声音效果（如果有的话）
        this.playWeatherSound(weatherType);
    }
    
    // 清除天气效果
    clearEffect() {
        this.effectContainer.innerHTML = '';
        this.particleSystem.stop();
        this.currentEffect = null;
    }
    
    // 播放天气声音（模拟）
    playWeatherSound(weatherType) {
        const soundMap = {
            rain: 'rain',
            sunshine: 'sun',
            wind: 'wind',
            mist: 'mist',
            clear: 'clear',
            balanced: 'harmony'
        };
        
        // 这里可以添加实际的声音播放逻辑
        console.log(`播放天气声音: ${soundMap[weatherType] || 'default'}`);
    }
}

// 成就系统
class AchievementSystem {
    constructor() {
        this.achievements = {
            firstPlant: { unlocked: false, name: '初生之木', description: '种下第一株灵植' },
            firstAnimal: { unlocked: false, name: '神兽来访', description: '吸引第一只神兽' },
            elementMaster: { unlocked: false, name: '五行大师', description: '所有元素达到80以上' },
            balanceExpert: { unlocked: false, name: '平衡专家', description: '五行平衡达到极佳状态' },
            mountainLord: { unlocked: false, name: '山主', description: '拥有20株灵植和10只神兽' },
            waterWealth: { unlocked: false, name: '水润万物', description: '水元素达到90以上' },
            fireEnergy: { unlocked: false, name: '火照四方', description: '火元素达到90以上' },
            woodGrowth: { unlocked: false, name: '木秀于林', description: '木元素达到90以上' },
            earthStability: { unlocked: false, name: '厚德载物', description: '土元素达到90以上' },
            metalCraft: { unlocked: false, name: '金玉其质', description: '金元素达到90以上' }
        };
        
        this.unlockedAchievements = [];
    }
    
    // 检查成就
    checkAchievements(gameState) {
        const newAchievements = [];
        
        // 检查灵植成就
        if (!this.achievements.firstPlant.unlocked && gameState.mountain.plants >= 1) {
            this.unlockAchievement('firstPlant');
            newAchievements.push('firstPlant');
        }
        
        // 检查神兽成就
        if (!this.achievements.firstAnimal.unlocked && gameState.mountain.animals >= 1) {
            this.unlockAchievement('firstAnimal');
            newAchievements.push('firstAnimal');
        }
        
        // 检查五行大师成就
        if (!this.achievements.elementMaster.unlocked) {
            const allHigh = Object.values(gameState.elements).every(value => value >= 80);
            if (allHigh) {
                this.unlockAchievement('elementMaster');
                newAchievements.push('elementMaster');
            }
        }
        
        // 检查平衡专家成就
        if (!this.achievements.balanceExpert.unlocked) {
            // 计算平衡（简化版本）
            const values = Object.values(gameState.elements);
            const avg = values.reduce((a, b) => a + b) / values.length;
            const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
            const stdDev = Math.sqrt(variance);
            
            if (stdDev < 10) { // 极佳平衡
                this.unlockAchievement('balanceExpert');
                newAchievements.push('balanceExpert');
            }
        }
        
        // 检查山主成就
        if (!this.achievements.mountainLord.unlocked && 
            gameState.mountain.plants >= 20 && 
            gameState.mountain.animals >= 10) {
            this.unlockAchievement('mountainLord');
            newAchievements.push('mountainLord');
        }
        
        // 检查各元素成就
        const elementAchievements = {
            water: 'waterWealth',
            fire: 'fireEnergy',
            wood: 'woodGrowth',
            earth: 'earthStability',
            metal: 'metalCraft'
        };
        
        for (const [element, achievementId] of Object.entries(elementAchievements)) {
            if (!this.achievements[achievementId].unlocked && gameState.elements[element] >= 90) {
                this.unlockAchievement(achievementId);
                newAchievements.push(achievementId);
            }
        }
        
        return newAchievements;
    }
    
    // 解锁成就
    unlockAchievement(achievementId) {
        if (!this.achievements[achievementId]) return;
        
        this.achievements[achievementId].unlocked = true;
        this.unlockedAchievements.push(achievementId);
        
        // 显示成就通知
        this.showAchievementNotification(achievementId);
        
        // 保存到本地存储
        this.saveAchievements();
    }
    
    // 显示成就通知
    showAchievementNotification(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return;
        
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-glow"></div>
            <div class="achievement-content">
                <i class="fas fa-trophy"></i>
                <div>
                    <h4>成就解锁：${achievement.name}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 添加样式
        if (!document.querySelector('#achievement-styles')) {
            const style = document.createElement('style');
            style.id = 'achievement-styles';
            style.textContent = `
                .achievement-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
                    border: 2px solid var(--accent-color);
                    border-radius: var(--radius-md);
                    padding: 15px;
                    min-width: 300px;
                    max-width: 400px;
                    z-index: 10000;
                    animation: slideIn 0.5s ease-out;
                    box-shadow: var(--shadow-lg);
                }
                
                .achievement-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .achievement-content i {
                    color: var(--accent-color);
                    font-size: 2rem;
                }
                
                .achievement-content h4 {
                    color: var(--accent-color);
                    margin-bottom: 5px;
                    font-size: 1.1rem;
                }
                
                .achievement-content p {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin: 0;
                }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }
    
    // 保存成就
    saveAchievements() {
        try {
            localStorage.setItem('mountainAchievements', JSON.stringify({
                achievements: this.achievements,
                unlocked: this.unlockedAchievements
            }));
        } catch (error) {
            console.error('保存成就失败:', error);
        }
    }
    
    // 加载成就
    loadAchievements() {
        try {
            const saved = localStorage.getItem('mountainAchievements');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(this.achievements, data.achievements);
                this.unlockedAchievements = data.unlocked || [];
            }
        } catch (error) {
            console.error('加载成就失败:', error);
        }
    }
    
    // 获取成就统计
    getStats() {
        const total = Object.keys(this.achievements).length;
        const unlocked = this.unlockedAchievements.length;
        return {
            total,
            unlocked,
            percentage: Math.round((unlocked / total) * 100)
        };
    }
}

// 元素激活效果
class ElementActivation {
    constructor() {
        this.activeElements = new Set();
    }
    
    // 激活元素
    activate(elementType) {
        const elementCards = document.querySelectorAll('.element-card');
        elementCards.forEach(card => {
            if (card.dataset.element === elementType) {
                card.classList.add('active');
                this.activeElements.add(elementType);
                
                // 3秒后自动取消激活
                setTimeout(() => {
                    this.deactivate(elementType);
                }, 3000);
            }
        });
    }
    
    // 取消激活元素
    deactivate(elementType) {
        const elementCards = document.querySelectorAll('.element-card');
        elementCards.forEach(card => {
            if (card.dataset.element === elementType) {
                card.classList.remove('active');
                this.activeElements.delete(elementType);
            }
        });
    }
    
    // 取消激活所有元素
    deactivateAll() {
        const elementCards = document.querySelectorAll('.element-card');
        elementCards.forEach(card => {
            card.classList.remove('active');
        });
        this.activeElements.clear();
    }
}

// 创建全局特效管理器实例
window.visualEffects = {
    weatherManager: new WeatherEffectManager(),
    achievementSystem: new AchievementSystem(),
    elementActivation: new ElementActivation(),
    particleSystem: null // 将在游戏初始化时设置
};

// 导出供游戏使用
window.WeatherEffectManager = WeatherEffectManager;
window.AchievementSystem = AchievementSystem;
window.ElementActivation = ElementActivation;
window.ParticleSystem = ParticleSystem;

console.log('山中一甲子 视觉特效系统已加载');