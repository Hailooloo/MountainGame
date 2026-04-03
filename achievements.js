// 山中一甲子 - 成就系统
// 成就数据结构

const ACHIEVEMENTS = {
    // 基础成就
    NEW_PLAYER: {
        id: 'new_player',
        title: '初入山门',
        description: '第一次进入游戏',
        icon: '🌱',
        category: '基础',
        points: 10,
        condition: () => true, // 游戏开始自动解锁
        unlocked: false
    },
    
    FIRST_SAVE: {
        id: 'first_save',
        title: '留下印记',
        description: '第一次保存游戏',
        icon: '💾',
        category: '基础',
        points: 15,
        condition: (gameState) => gameState.saveCount > 0,
        unlocked: false
    },
    
    // 五行成就
    WOOD_MASTER: {
        id: 'wood_master',
        title: '木之掌控者',
        description: '木元素达到100点',
        icon: '🌳',
        category: '五行',
        points: 30,
        condition: (gameState) => gameState.elements.wood >= 100,
        unlocked: false
    },
    
    FIRE_MASTER: {
        id: 'fire_master',
        title: '火之掌控者',
        description: '火元素达到100点',
        icon: '🔥',
        category: '五行',
        points: 30,
        condition: (gameState) => gameState.elements.fire >= 100,
        unlocked: false
    },
    
    EARTH_MASTER: {
        id: 'earth_master',
        title: '土之掌控者',
        description: '土元素达到100点',
        icon: '⛰️',
        category: '五行',
        points: 30,
        condition: (gameState) => gameState.elements.earth >= 100,
        unlocked: false
    },
    
    METAL_MASTER: {
        id: 'metal_master',
        title: '金之掌控者',
        description: '金元素达到100点',
        icon: '⚙️',
        category: '五行',
        points: 30,
        condition: (gameState) => gameState.elements.metal >= 100,
        unlocked: false
    },
    
    WATER_MASTER: {
        id: 'water_master',
        title: '水之掌控者',
        description: '水元素达到100点',
        icon: '💧',
        category: '五行',
        points: 30,
        condition: (gameState) => gameState.elements.water >= 100,
        unlocked: false
    },
    
    // 荒山成就
    PLANT_EXPERT: {
        id: 'plant_expert',
        title: '植物专家',
        description: '荒山植物数量达到50',
        icon: '🌿',
        category: '荒山',
        points: 25,
        condition: (gameState) => gameState.mountain.plants >= 50,
        unlocked: false
    },
    
    ANIMAL_EXPERT: {
        id: 'animal_expert',
        title: '动物专家',
        description: '荒山动物数量达到30',
        icon: '🐾',
        category: '荒山',
        points: 25,
        condition: (gameState) => gameState.mountain.animals >= 30,
        unlocked: false
    },
    
    SOIL_EXPERT: {
        id: 'soil_expert',
        title: '土壤大师',
        description: '土壤肥力达到80点',
        icon: '🌱',
        category: '荒山',
        points: 20,
        condition: (gameState) => gameState.mountain.soilFertility >= 80,
        unlocked: false
    },
    
    // 游戏进度成就
    WEEK_IN_MOUNTAIN: {
        id: 'week_in_mountain',
        title: '山中七日',
        description: '游戏时间达到7天',
        icon: '📅',
        category: '时间',
        points: 20,
        condition: (gameState) => gameState.day >= 7,
        unlocked: false
    },
    
    MONTH_IN_MOUNTAIN: {
        id: 'month_in_mountain',
        title: '山中一月',
        description: '游戏时间达到30天',
        icon: '📆',
        category: '时间',
        points: 50,
        condition: (gameState) => gameState.day >= 30,
        unlocked: false
    },
    
    YEAR_IN_MOUNTAIN: {
        id: 'year_in_mountain',
        title: '山中一甲子',
        description: '游戏时间达到60天',
        icon: '🎉',
        category: '时间',
        points: 100,
        condition: (gameState) => gameState.day >= 60,
        unlocked: false
    },
    
    // 资源成就
    WATER_COIN_COLLECTOR: {
        id: 'water_coin_collector',
        title: '水币收集者',
        description: '累计获得100个水币',
        icon: '💰',
        category: '资源',
        points: 25,
        condition: (gameState) => gameState.totalWaterCoins >= 100,
        unlocked: false
    },
    
    RICH_MOUNTAIN: {
        id: 'rich_mountain',
        title: '富饶之山',
        description: '水币数量达到500',
        icon: '💎',
        category: '资源',
        points: 50,
        condition: (gameState) => gameState.waterCoins >= 500,
        unlocked: false
    },
    
    // AI对话成就
    TALK_TO_MOUNTAIN: {
        id: 'talk_to_mountain',
        title: '与山对话',
        description: '第一次与山灵对话',
        icon: '🗣️',
        category: '对话',
        points: 15,
        condition: (gameState) => gameState.dialogueHistory.length > 0,
        unlocked: false
    },
    
    MOUNTAIN_FRIEND: {
        id: 'mountain_friend',
        title: '山灵之友',
        description: '与山灵对话10次',
        icon: '🤝',
        category: '对话',
        points: 30,
        condition: (gameState) => gameState.dialogueHistory.length >= 10,
        unlocked: false
    },
    
    // 特殊成就
    FIVE_ELEMENTS_BALANCE: {
        id: 'five_elements_balance',
        title: '五行平衡',
        description: '所有五行元素都在80-120之间',
        icon: '⚖️',
        category: '特殊',
        points: 75,
        condition: (gameState) => {
            const e = gameState.elements;
            return e.wood >= 80 && e.wood <= 120 &&
                   e.fire >= 80 && e.fire <= 120 &&
                   e.earth >= 80 && e.earth <= 120 &&
                   e.metal >= 80 && e.metal <= 120 &&
                   e.water >= 80 && e.water <= 120;
        },
        unlocked: false
    },
    
    MOUNTAIN_REBORN: {
        id: 'mountain_reborn',
        title: '荒山重生',
        description: '植物、动物、土壤肥力都达到最大值',
        icon: '🏔️',
        category: '特殊',
        points: 100,
        condition: (gameState) => {
            const m = gameState.mountain;
            return m.plants >= 100 && m.animals >= 50 && m.soilFertility >= 100;
        },
        unlocked: false
    }
};

// 成就管理器
class AchievementManager {
    constructor() {
        this.achievements = { ...ACHIEVEMENTS };
        this.unlockedAchievements = new Set();
        this.totalPoints = 0;
        this.onAchievementUnlocked = null;
    }
    
    // 初始化成就状态
    init(savedAchievements = {}) {
        // 应用保存的解锁状态
        if (savedAchievements) {
            for (const [id, unlocked] of Object.entries(savedAchievements)) {
                if (this.achievements[id] && unlocked) {
                    this.achievements[id].unlocked = true;
                    this.unlockedAchievements.add(id);
                    this.totalPoints += this.achievements[id].points;
                }
            }
        }
        
        // 立即解锁新手成就
        if (!this.achievements.NEW_PLAYER.unlocked) {
            this.unlockAchievement('NEW_PLAYER');
        }
    }
    
    // 检查游戏状态并解锁成就
    checkAchievements(gameState) {
        const newlyUnlocked = [];
        
        for (const [key, achievement] of Object.entries(this.achievements)) {
            if (!achievement.unlocked && achievement.condition(gameState)) {
                this.unlockAchievement(key);
                newlyUnlocked.push(achievement);
            }
        }
        
        return newlyUnlocked;
    }
    
    // 解锁成就
    unlockAchievement(achievementKey) {
        const achievement = this.achievements[achievementKey];
        if (!achievement || achievement.unlocked) return;
        
        achievement.unlocked = true;
        this.unlockedAchievements.add(achievementKey);
        this.totalPoints += achievement.points;
        
        // 触发回调
        if (this.onAchievementUnlocked) {
            this.onAchievementUnlocked(achievement);
        }
        
        // 添加到游戏日志
        if (window.addToGameLog) {
            window.addToGameLog(`🎉 解锁成就: ${achievement.title} - ${achievement.description} (+${achievement.points}分)`);
        }
        
        console.log(`🎉 成就解锁: ${achievement.title}`);
        return achievement;
    }
    
    // 获取成就列表（按类别分组）
    getAchievementsByCategory() {
        const categories = {};
        
        for (const achievement of Object.values(this.achievements)) {
            if (!categories[achievement.category]) {
                categories[achievement.category] = [];
            }
            categories[achievement.category].push(achievement);
        }
        
        return categories;
    }
    
    // 获取统计数据
    getStats() {
        const total = Object.keys(this.achievements).length;
        const unlocked = this.unlockedAchievements.size;
        
        return {
            total,
            unlocked,
            percentage: Math.round((unlocked / total) * 100),
            totalPoints: this.totalPoints
        };
    }
    
    // 获取保存数据
    getSaveData() {
        const saveData = {};
        for (const [id, achievement] of Object.entries(this.achievements)) {
            saveData[id] = achievement.unlocked;
        }
        return saveData;
    }
    
    // 渲染成就列表
    renderAchievements() {
        const container = document.getElementById('achievements-list');
        if (!container) return;
        
        const categories = this.getAchievementsByCategory();
        let html = '';
        
        for (const [category, achievements] of Object.entries(categories)) {
            html += `
                <div class="achievement-category">
                    <h3 class="category-title">${category}成就</h3>
                    <div class="achievement-grid">
            `;
            
            achievements.forEach(achievement => {
                const unlockedClass = achievement.unlocked ? 'unlocked' : 'locked';
                const starIcon = achievement.unlocked ? '⭐' : '☆';
                
                html += `
                    <div class="achievement-item ${unlockedClass}">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-content">
                            <div class="achievement-title">
                                <span class="achievement-star">${starIcon}</span>
                                ${achievement.title}
                            </div>
                            <div class="achievement-description">${achievement.description}</div>
                            <div class="achievement-meta">
                                <span class="achievement-points">${achievement.points}分</span>
                                <span class="achievement-status">${achievement.unlocked ? '已解锁' : '未解锁'}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        }
        
        // 添加统计数据
        const stats = this.getStats();
        html += `
            <div class="achievement-stats">
                <div class="stat-item">
                    <div class="stat-label">总成就</div>
                    <div class="stat-value">${stats.total}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">已解锁</div>
                    <div class="stat-value">${stats.unlocked}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">完成度</div>
                    <div class="stat-value">${stats.percentage}%</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">总积分</div>
                    <div class="stat-value">${stats.totalPoints}</div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
}

// 创建全局成就管理器实例
window.achievementManager = new AchievementManager();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ACHIEVEMENTS, AchievementManager };
}