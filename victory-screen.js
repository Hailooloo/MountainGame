// 山中一甲子 - 胜利画面模块

// 胜利条件
const VICTORY_CONDITIONS = {
    allElementsHigh: {
        name: '五行圆满',
        description: '所有五行元素达到90以上',
        check: (gameState) => {
            return Object.values(gameState.elements).every(value => value >= 90);
        }
    },
    mountainProsperity: {
        name: '福地洞天',
        description: '拥有30株灵植和15只神兽',
        check: (gameState) => {
            return gameState.mountain.plants >= 30 && gameState.mountain.animals >= 15;
        }
    },
    perfectBalance: {
        name: '天人合一',
        description: '五行平衡保持极佳状态连续7天',
        check: (gameState) => {
            // 需要额外的状态跟踪
            return false; // 暂时不实现
        }
    },
    wisdomMaster: {
        name: '智慧如山',
        description: '与山灵对话50次以上',
        check: (gameState) => {
            return gameState.dialogues.length >= 50;
        }
    }
};

// 胜利画面管理器
class VictoryScreenManager {
    constructor() {
        this.victoryConditions = VICTORY_CONDITIONS;
        this.victoryAchieved = false;
        this.achievedVictories = [];
        this.victoryScreen = null;
    }
    
    // 检查胜利条件
    checkVictoryConditions(gameState) {
        if (this.victoryAchieved) return [];
        
        const newVictories = [];
        
        for (const [conditionId, condition] of Object.entries(this.victoryConditions)) {
            if (!this.achievedVictories.includes(conditionId) && condition.check(gameState)) {
                this.achievedVictories.push(conditionId);
                newVictories.push(conditionId);
                
                // 显示胜利通知
                this.showVictoryNotification(condition);
            }
        }
        
        // 如果获得了足够多的胜利条件，显示完整胜利画面
        if (this.achievedVictories.length >= 2 && !this.victoryAchieved) {
            this.victoryAchieved = true;
            this.showVictoryScreen();
        }
        
        return newVictories;
    }
    
    // 显示胜利通知
    showVictoryNotification(condition) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'victory-notification';
        notification.innerHTML = `
            <div class="victory-glow"></div>
            <div class="victory-content">
                <i class="fas fa-crown"></i>
                <div>
                    <h4>达成成就：${condition.name}</h4>
                    <p>${condition.description}</p>
                </div>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 添加样式
        if (!document.querySelector('#victory-styles')) {
            const style = document.createElement('style');
            style.id = 'victory-styles';
            style.textContent = `
                .victory-notification {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background: linear-gradient(135deg, #FFD54F, #FF9800);
                    border: 3px solid #FF5722;
                    border-radius: var(--radius-md);
                    padding: 15px;
                    min-width: 300px;
                    max-width: 400px;
                    z-index: 10000;
                    animation: slideIn 0.5s ease-out;
                    box-shadow: 0 8px 32px rgba(255, 87, 34, 0.4);
                }
                
                .victory-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .victory-content i {
                    color: #FFF;
                    font-size: 2rem;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
                }
                
                .victory-content h4 {
                    color: #FFF;
                    margin-bottom: 5px;
                    font-size: 1.2rem;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                .victory-content p {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.9rem;
                    margin: 0;
                }
                
                .victory-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at center, rgba(255, 213, 79, 0.4), transparent 70%);
                    animation: victoryGlow 2s ease-out infinite;
                    pointer-events: none;
                    border-radius: inherit;
                }
                
                @keyframes victoryGlow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // 5秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }
    
    // 显示完整胜利画面
    showVictScreen() {
        if (this.victoryScreen) return;
        
        // 创建胜利画面
        this.victoryScreen = document.createElement('div');
        this.victoryScreen.className = 'victory-screen';
        this.victoryScreen.innerHTML = `
            <div class="victory-overlay"></div>
            <div class="victory-container">
                <div class="victory-header">
                    <i class="fas fa-mountain-sun"></i>
                    <h2>山中一甲子</h2>
                    <h3>恭喜你达成游戏目标！</h3>
                </div>
                
                <div class="victory-message">
                    <p>经过你的精心调理，这座荒山已经成为真正的世外桃源。</p>
                    <p>五行流转和谐，灵植遍布山野，神兽悠然栖息。</p>
                    <p>这正是"地山谦"卦象所预示的福地。</p>
                </div>
                
                <div class="victory-stats">
                    <h4>你的成就：</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">五行圆满</span>
                            <span class="stat-value">${this.achievedVictories.includes('allElementsHigh') ? '✓' : '○'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">福地洞天</span>
                            <span class="stat-value">${this.achievedVictories.includes('mountainProsperity') ? '✓' : '○'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">天人合一</span>
                            <span class="stat-value">${this.achievedVictories.includes('perfectBalance') ? '✓' : '○'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">智慧如山</span>
                            <span class="stat-value">${this.achievedVictories.includes('wisdomMaster') ? '✓' : '○'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="victory-quote">
                    <i class="fas fa-quote-left"></i>
                    <p>山中无甲子，寒尽不知年。你已领悟五行流转之道，成就一段山中传奇。</p>
                    <i class="fas fa-quote-right"></i>
                </div>
                
                <div class="victory-actions">
                    <button id="continue-playing" class="victory-btn">
                        <i class="fas fa-play"></i> 继续游玩
                    </button>
                    <button id="new-game" class="victory-btn secondary">
                        <i class="fas fa-redo"></i> 新的开始
                    </button>
                    <button id="share-victory" class="victory-btn">
                        <i class="fas fa-share-alt"></i> 分享成就
                    </button>
                </div>
                
                <div class="victory-footer">
                    <p>山中时光流转，五行生生不息。感谢你的陪伴！</p>
                </div>
            </div>
        `;
        
        // 添加到页面
        document.body.appendChild(this.victoryScreen);
        
        // 添加样式
        if (!document.querySelector('#victory-screen-styles')) {
            const style = document.createElement('style');
            style.id = 'victory-screen-styles';
            style.textContent = `
                .victory-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 20000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .victory-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, 
                        rgba(26, 47, 26, 0.95), 
                        rgba(42, 63, 42, 0.9),
                        rgba(26, 47, 26, 0.95));
                    backdrop-filter: blur(10px);
                }
                
                .victory-container {
                    position: relative;
                    background: linear-gradient(135deg, 
                        rgba(58, 95, 58, 0.9), 
                        rgba(76, 175, 80, 0.2));
                    border: 4px solid var(--accent-color);
                    border-radius: var(--radius-lg);
                    padding: 40px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-lg);
                    animation: scaleIn 0.5s ease-out;
                }
                
                .victory-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                
                .victory-header i {
                    font-size: 4rem;
                    color: var(--accent-color);
                    margin-bottom: 15px;
                    filter: drop-shadow(0 4px 8px rgba(255, 213, 79, 0.4));
                }
                
                .victory-header h2 {
                    font-family: 'Ma Shan Zheng', cursive;
                    font-size: 3rem;
                    color: var(--accent-color);
                    margin-bottom: 10px;
                    text-shadow: 0 0 20px rgba(255, 213, 79, 0.5);
                }
                
                .victory-header h3 {
                    font-size: 1.8rem;
                    color: var(--text-primary);
                    opacity: 0.9;
                }
                
                .victory-message {
                    text-align: center;
                    margin-bottom: 30px;
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: var(--text-primary);
                }
                
                .victory-stats {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: var(--radius-md);
                    padding: 20px;
                    margin-bottom: 30px;
                }
                
                .victory-stats h4 {
                    color: var(--accent-color);
                    margin-bottom: 15px;
                    font-size: 1.3rem;
                    text-align: center;
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                }
                
                .stat-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 15px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: var(--radius-sm);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .stat-label {
                    color: var(--text-secondary);
                }
                
                .stat-value {
                    color: var(--accent-color);
                    font-weight: bold;
                    font-size: 1.2rem;
                }
                
                .victory-quote {
                    text-align: center;
                    font-style: italic;
                    margin-bottom: 30px;
                    padding: 20px;
                    background: rgba(255, 213, 79, 0.1);
                    border-radius: var(--radius-md);
                    border-left: 4px solid var(--accent-color);
                }
                
                .victory-quote i {
                    color: var(--accent-color);
                    font-size: 1.5rem;
                    opacity: 0.6;
                }
                
                .victory-quote p {
                    color: var(--text-primary);
                    font-size: 1.2rem;
                    line-height: 1.6;
                    margin: 10px 0;
                }
                
                .victory-actions {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                
                .victory-btn {
                    padding: 15px 30px;
                    border: none;
                    border-radius: var(--radius-md);
                    font-family: 'Noto Serif SC', serif;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 160px;
                    justify-content: center;
                }
                
                .victory-btn:not(.secondary) {
                    background: linear-gradient(135deg, var(--accent-color), #FF9800);
                    color: white;
                }
                
                .victory-btn.secondary {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--text-primary);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }
                
                .victory-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(255, 87, 34, 0.3);
                }
                
                .victory-btn:active {
                    transform: translateY(-1px);
                }
                
                .victory-footer {
                    text-align: center;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 20px;
                }
                
                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
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
        
        // 添加事件监听器
        setTimeout(() => {
            this.setupVictoryEventListeners();
        }, 100);
    }
    
    // 设置胜利画面事件监听器
    setupVictoryEventListeners() {
        // 继续游玩按钮
        const continueBtn = document.getElementById('continue-playing');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.hideVictoryScreen();
            });
        }
        
        // 新游戏按钮
        const newGameBtn = document.getElementById('new-game');
        if (newGameBtn) {
            newGameBtn.addEventListener('click', () => {
                if (confirm('开始新游戏将丢失当前进度，确定要继续吗？')) {
                    localStorage.removeItem('mountainGameSave');
                    location.reload();
                }
            });
        }
        
        // 分享按钮
        const shareBtn = document.getElementById('share-victory');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareVictory();
            });
        }
    }
    
    // 隐藏胜利画面
    hideVictoryScreen() {
        if (this.victoryScreen && this.victoryScreen.parentNode) {
            this.victoryScreen.parentNode.removeChild(this.victoryScreen);
            this.victoryScreen = null;
        }
    }
    
    // 分享胜利
    shareVictory() {
        const stats = this.getVictoryStats();
        const shareText = `我在《山中一甲子》游戏中达成了${stats.total}项成就！\n五行流转，福地自现。你也来试试吧！`;
        
        // 使用Web Share API如果可用
        if (navigator.share) {
            navigator.share({
                title: '山中一甲子 - 游戏成就',
                text: shareText,
                url: window.location.href
            }).catch(error => {
                console.log('分享失败:', error);
                this.copyToClipboard(shareText);
            });
        } else {
            this.copyToClipboard(shareText);
        }
    }
    
    // 复制到剪贴板
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('成就文本已复制到剪贴板！');
        }).catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
        });
    }
    
    // 获取胜利统计
    getVictoryStats() {
        return {
            total: this.achievedVictories.length,
            achieved: this.achievedVictories.map(id => this.victoryConditions[id].name),
            percentage: Math.round((this.achievedVictories.length / Object.keys(this.victoryConditions).length) * 100)
        };
    }
    
    // 保存胜利数据
    saveVictoryData() {
        try {
            const victoryData = {
                achieved: this.achievedVictories,
                victoryAchieved: this.victoryAchieved
            };
            localStorage.setItem('mountainVictoryData', JSON.stringify(victoryData));
        } catch (error) {
            console.error('保存胜利数据失败:', error);
        }
    }
    
    // 加载胜利数据
    loadVictoryData() {
        try {
            const saved = localStorage.getItem('mountainVictoryData');
            if (saved) {
                const data = JSON.parse(saved);
                this.achievedVictories = data.achieved || [];
                this.victoryAchieved = data.victoryAchieved || false;
            }
        } catch (error) {
            console.error('加载胜利数据失败:', error);
        }
    }
}

// 创建全局胜利管理器实例
window.victoryManager = new VictoryScreenManager();

// 导出供游戏使用
window.VictoryScreenManager = VictoryScreenManager;

console.log('山中一甲子 胜利画面系统已加载');