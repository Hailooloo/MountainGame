// 山中一甲子 - 游戏主逻辑

// 游戏状态
const gameState = {
    // 五行数值 (0-100)
    elements: {
        wood: 50,
        fire: 50,
        earth: 50,
        metal: 50,
        water: 50
    },
    
    // 游戏资源
    resources: {
        waterCoins: 100,
        totalDays: 0,
        currentDay: 1,
        totalWaterCoins: 0
    },
    
    // 荒山状态
    mountain: {
        plants: 0,
        animals: 0,
        soilFertility: 50,
        storageCapacity: 100,
        storedItems: 0
    },
    
    // 游戏时间
    gameTime: {
        hour: 8,
        minute: 0,
        day: 1,
        season: '春'
    },
    
    // 天气
    weather: {
        type: 'sunny',
        description: '风和日丽',
        effect: null
    },
    
    // 五行平衡状态
    balance: '尚可',
    
    // 游戏日志
    logs: [],
    
    // 对话历史
    dialogues: [],
    
    // 成就系统
    achievements: {
        saveCount: 0,
        dialogueCount: 0,
        day: 1,
        mountainLevel: 0
    }
};

// 五行相生相克关系
const ELEMENT_CYCLES = {
    // 相生
    generate: {
        wood: 'fire',    // 木生火
        fire: 'earth',   // 火生土
        earth: 'metal',  // 土生金
        metal: 'water',  // 金生水
        water: 'wood'    // 水生木
    },
    
    // 相克
    overcome: {
        wood: 'earth',   // 木克土
        earth: 'water',  // 土克水
        water: 'fire',   // 水克火
        fire: 'metal',   // 火克金
        metal: 'wood'    // 金克木
    }
};

// 五行中文名称映射
const ELEMENT_NAMES = {
    wood: '木',
    fire: '火',
    earth: '土',
    metal: '金',
    water: '水'
};

// 五行描述映射
const ELEMENT_DESCRIPTIONS = {
    wood: '生长/技能',
    fire: '能量/名声',
    earth: '承载/防御',
    metal: '技术/工具',
    water: '财富/流通'
};

// AI回应库（在没有真实API时的替代方案）
const AI_RESPONSES = {
    tired: [
        "今日工作辛劳如山石，然山石终将化为沃土。休息片刻，让五行流转，水能生木，木能生火，新力自生。",
        "劳累如燥火攻心，需以壬水润之。静坐观山，听风过林，火气自降，心绪自宁。",
        "山不在高，有仙则名；劳不在重，有息则灵。今日之疲，恰是明日之力的沃土。",
        "工作如山间行走，时而陡峭，时而平缓。累时驻足，观云卷云舒，五行自会调节平衡。"
    ],
    
    happy: [
        "喜悦如春风拂面，木气勃发，万物生长。此乃五行调和之象，当顺势而为，滋养大地。",
        "心喜则火旺，火旺生土，土能载物。今日宜播撒种子，待来日收获满山灵植。",
        "快乐如山中清泉，源源不绝。水润木生，木助火长，五行循环，生生不息。",
        "愉悦之情如金声玉振，清脆悦耳。金生水，水润万物，福泽绵长。"
    ],
    
    stressed: [
        "压力如土重压身，需以木气疏之。栽种一株灵植，看它破土而出，压力自解。",
        "心绪纷乱如五行错位，当静心调息，观想五行相生，重归平衡。",
        "紧张如金器紧绷，需以火温之。点燃心火，熔化压力，化为前进动力。",
        "压力山大？山有承载之德，土有厚德载物。接纳压力，它将成为你的根基。"
    ],
    
    peaceful: [
        "宁静如水，润物无声。此乃修行佳境，五行平衡，福地自现。",
        "心静如山中古潭，映照天地。五行在此和谐共处，灵植自生，神兽自来。",
        "平和如秋日山林，金气肃杀而不过，火气温暖而不燥，五行恰到好处。",
        "安宁如大地沉睡，积蓄力量。此时调节五行，事半功倍。"
    ],
    
    creative: [
        "创意如火花迸发，火气旺盛。需以水润之，以金导之，化创意为实际成果。",
        "灵感如木之新芽，破土而出。滋养木气，让创意之树枝繁叶茂。",
        "创新如金器锻造，需经火炼、水淬、土养、木柄，方能成器。",
        "创造力如五行流转，相生相克中诞生新机。顺势而为，创意自涌。"
    ]
};

// 天气效果映射
const WEATHER_EFFECTS = {
    tired: { type: 'rain', element: 'water', bonus: 5, name: '壬水雨', description: '天降甘霖，水元素增加' },
    happy: { type: 'sunshine', element: 'fire', bonus: 5, name: '丙火日', description: '阳光普照，火元素增加' },
    stressed: { type: 'wind', element: 'wood', bonus: 5, name: '甲木风', description: '和风吹拂，木元素增加' },
    peaceful: { type: 'mist', element: 'earth', bonus: 5, name: '戊土雾', description: '薄雾笼罩，土元素增加' },
    creative: { type: 'clear', element: 'metal', bonus: 5, name: '庚金晴', description: '天朗气清，金元素增加' }
};

// DOM元素缓存
const DOM = {
    // 五行数值显示
    woodValue: document.getElementById('wood-value'),
    fireValue: document.getElementById('fire-value'),
    earthValue: document.getElementById('earth-value'),
    metalValue: document.getElementById('metal-value'),
    waterValue: document.getElementById('water-value'),
    
    // 五行进度条
    woodFill: document.getElementById('wood-fill'),
    fireFill: document.getElementById('fire-fill'),
    earthFill: document.getElementById('earth-fill'),
    metalFill: document.getElementById('metal-fill'),
    waterFill: document.getElementById('water-fill'),
    
    // 游戏状态显示
    plantCount: document.getElementById('plant-count'),
    animalCount: document.getElementById('animal-count'),
    soilFertility: document.getElementById('soil-fertility'),
    storageCapacity: document.getElementById('storage-capacity'),
    waterCoins: document.getElementById('water-coins'),
    totalTime: document.getElementById('total-time'),
    gameTime: document.getElementById('game-time'),
    weatherText: document.getElementById('weather-text'),
    weatherIcon: document.getElementById('weather-icon'),
    
    // 平衡指示器
    balanceText: document.getElementById('balance-text'),
    balanceTip: document.getElementById('balance-tip'),
    
    // 对话区域
    dialogueHistory: document.getElementById('dialogue-history'),
    moodInput: document.getElementById('mood-input'),
    sendMoodBtn: document.getElementById('send-mood-btn'),
    autoMoodBtn: document.getElementById('auto-mood-btn'),
    
    // 游戏日志
    logEntries: document.getElementById('log-entries'),
    clearLogBtn: document.getElementById('clear-log-btn'),
    
    // 游戏控制
    saveGameBtn: document.getElementById('save-game-btn'),
    loadGameBtn: document.getElementById('load-game-btn'),
    resetGameBtn: document.getElementById('reset-game-btn'),
    helpBtn: document.getElementById('help-btn'),
    
    // 五行按钮
    elementButtons: document.querySelectorAll('.element-btn'),
    
    // 模态框
    helpModal: document.getElementById('help-modal'),
    closeModal: document.querySelector('.close-modal'),
    
    // 荒山视觉元素
    mountainPlants: document.getElementById('mountain-plants'),
    mountainAnimals: document.getElementById('mountain-animals'),
    weatherEffect: document.getElementById('weather-effect')
};

// 初始化游戏
function initGame() {
    console.log('山中一甲子游戏初始化...');
    
    // 初始化视觉特效系统
    initVisualEffects();
    
    // 从本地存储加载游戏状态
    loadGameState();
    
    // 初始化成就系统
    initAchievementSystem();
    
    // 更新UI
    updateAllUI();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 开始游戏循环
    startGameLoop();
    
    // 添加初始日志
    addLog('你来到这座荒山，开始调节五行平衡...');
    addLog('山灵：欢迎！五行相生相克，保持平衡方能福泽连绵。');
}

// 初始化视觉特效
function initVisualEffects() {
    console.log('初始化视觉特效系统...');
    
    // 确保视觉特效模块已加载
    if (window.visualEffects) {
        // 初始化成就系统
        window.visualEffects.achievementSystem.loadAchievements();
        
        // 创建粒子系统
        window.visualEffects.particleSystem = new window.ParticleSystem('mountain-visual');
        
        console.log('视觉特效系统初始化完成');
    } else {
        console.warn('视觉特效模块未加载，使用简化版本');
    }
    
    // 初始化胜利管理器
    if (window.victoryManager) {
        window.victoryManager.loadVictoryData();
    }
}

// 初始化成就系统
function initAchievementSystem() {
    console.log('初始化成就系统...');
    
    // 等待成就脚本加载完成
    if (!window.achievementManager) {
        console.warn('成就系统脚本未加载，延迟初始化');
        setTimeout(initAchievementSystem, 1000);
        return;
    }
    
    // 从游戏状态获取已解锁的成就
    const savedAchievements = gameState.achievements.saved || {};
    
    // 初始化成就管理器
    window.achievementManager.init(savedAchievements);
    
    // 设置成就解锁回调
    window.achievementManager.onAchievementUnlocked = function(achievement) {
        // 显示成就解锁特效
        showAchievementUnlockEffect(achievement);
        
        // 保存成就状态到游戏状态
        gameState.achievements.saved = gameState.achievements.saved || {};
        gameState.achievements.saved[achievement.id] = true;
        
        // 更新UI
        updateAchievementUI();
    };
    
    // 初始渲染成就列表
    window.achievementManager.renderAchievements();
    
    // 更新成就UI统计
    updateAchievementUI();
    
    console.log('成就系统初始化完成');
}

// 显示成就解锁特效
function showAchievementUnlockEffect(achievement) {
    // 创建特效元素
    const effect = document.createElement('div');
    effect.className = 'achievement-unlock-effect';
    effect.innerHTML = `
        <div class="achievement-popup">
            <div class="achievement-icon-large">${achievement.icon}</div>
            <div class="achievement-title-large">${achievement.title}</div>
            <div class="achievement-desc-large">${achievement.description}</div>
            <div class="achievement-points-large">+${achievement.points}分</div>
        </div>
    `;
    
    document.body.appendChild(effect);
    
    // 3秒后移除
    setTimeout(() => {
        effect.remove();
    }, 3000);
}

// 更新成就UI统计
function updateAchievementUI() {
    if (!window.achievementManager) return;
    
    const stats = window.achievementManager.getStats();
    
    // 更新统计栏
    const totalElement = document.getElementById('total-achievements');
    const unlockedElement = document.getElementById('unlocked-achievements');
    const completionElement = document.getElementById('completion-rate');
    const pointsElement = document.getElementById('total-points');
    
    if (totalElement) {
        totalElement.querySelector('.stat-value').textContent = `${stats.unlocked}/${stats.total}`;
    }
    if (unlockedElement) {
        unlockedElement.querySelector('.stat-value').textContent = stats.unlocked;
    }
    if (completionElement) {
        completionElement.querySelector('.stat-value').textContent = `${stats.percentage}%`;
    }
    if (pointsElement) {
        pointsElement.querySelector('.stat-value').textContent = stats.totalPoints;
    }
}

// 检查成就（在游戏状态变化时调用）
function checkAchievements() {
    if (!window.achievementManager) return;
    
    // 更新游戏状态中的成就相关数据
    gameState.achievements.day = gameState.gameTime.day;
    gameState.achievements.dialogueCount = gameState.dialogues.length;
    
    // 检查并解锁成就
    const newlyUnlocked = window.achievementManager.checkAchievements(gameState);
    
    if (newlyUnlocked.length > 0) {
        // 更新UI
        updateAchievementUI();
        window.achievementManager.renderAchievements();
    }
}
    }
}

// 更新所有UI元素
function updateAllUI() {
    updateElementValues();
    updateMountainStats();
    updateResourceDisplay();
    updateTimeDisplay();
    updateWeatherDisplay();
    updateBalanceIndicator();
    updateMountainVisual();
}

// 更新五行数值显示
function updateElementValues() {
    // 更新数值
    DOM.woodValue.textContent = gameState.elements.wood;
    DOM.fireValue.textContent = gameState.elements.fire;
    DOM.earthValue.textContent = gameState.elements.earth;
    DOM.metalValue.textContent = gameState.elements.metal;
    DOM.waterValue.textContent = gameState.elements.water;
    
    // 更新进度条
    DOM.woodFill.style.width = `${gameState.elements.wood}%`;
    DOM.fireFill.style.width = `${gameState.elements.fire}%`;
    DOM.earthFill.style.width = `${gameState.elements.earth}%`;
    DOM.metalFill.style.width = `${gameState.elements.metal}%`;
    DOM.waterFill.style.width = `${gameState.elements.water}%`;
}

// 更新荒山状态显示
function updateMountainStats() {
    DOM.plantCount.textContent = gameState.mountain.plants;
    DOM.animalCount.textContent = gameState.mountain.animals;
    DOM.soilFertility.textContent = gameState.mountain.soilFertility;
    DOM.storageCapacity.textContent = gameState.mountain.storageCapacity;
}

// 更新资源显示
function updateResourceDisplay() {
    DOM.waterCoins.textContent = gameState.resources.waterCoins;
    DOM.totalTime.textContent = gameState.resources.totalDays;
}

// 更新时间显示
function updateTimeDisplay() {
    const hourStr = gameState.gameTime.hour.toString().padStart(2, '0');
    const minuteStr = gameState.gameTime.minute.toString().padStart(2, '0');
    DOM.gameTime.textContent = `山中第${gameState.gameTime.day}日 ${gameState.gameTime.season}季 ${hourStr}:${minuteStr}`;
}

// 更新天气显示
function updateWeatherDisplay() {
    DOM.weatherText.textContent = gameState.weather.description;
    
    // 更新天气图标
    const weatherIcons = {
        sunny: 'fa-sun',
        rainy: 'fa-cloud-rain',
        windy: 'fa-wind',
        misty: 'fa-smog',
        clear: 'fa-cloud-sun'
    };
    
    const iconClass = weatherIcons[gameState.weather.type] || 'fa-cloud-sun';
    DOM.weatherIcon.className = `fas ${iconClass}`;
}

// 更新五行平衡指示器
function updateBalanceIndicator() {
    const balance = calculateBalance();
    gameState.balance = balance.status;
    
    DOM.balanceText.textContent = `五行平衡：${balance.status}`;
    DOM.balanceTip.textContent = balance.tip;
    
    // 根据平衡状态改变颜色
    if (balance.status === '极佳') {
        DOM.balanceText.style.color = '#4CAF50';
    } else if (balance.status === '良好') {
        DOM.balanceText.style.color = '#8BC34A';
    } else if (balance.status === '尚可') {
        DOM.balanceText.style.color = '#FFC107';
    } else if (balance.status === '失衡') {
        DOM.balanceText.style.color = '#FF9800';
    } else {
        DOM.balanceText.style.color = '#F44336';
    }
}

// 计算五行平衡
function calculateBalance() {
    const values = Object.values(gameState.elements);
    const avg = values.reduce((a, b) => a + b) / values.length;
    
    // 计算标准差
    const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    
    if (stdDev < 10) {
        return { 
            status: '极佳', 
            tip: '五行和谐，生生不息，福地自现' 
        };
    } else if (stdDev < 20) {
        return { 
            status: '良好', 
            tip: '五行平衡，灵植生长，神兽渐来' 
        };
    } else if (stdDev < 30) {
        return { 
            status: '尚可', 
            tip: '五行相生相克，需稍加调节' 
        };
    } else if (stdDev < 40) {
        return { 
            status: '失衡', 
            tip: '五行失衡，需重点调节某元素' 
        };
    } else {
        return { 
            status: '严重失衡', 
            tip: '五行严重失衡，立即调节！' 
        };
    }
}

// 更新荒山视觉效果
function updateMountainVisual() {
    // 清除现有植物和动物
    DOM.mountainPlants.innerHTML = '';
    DOM.mountainAnimals.innerHTML = '';
    
    // 根据植物数量添加植物
    const plantCount = gameState.mountain.plants;
    for (let i = 0; i < Math.min(plantCount, 20); i++) {
        const plant = document.createElement('div');
        plant.className = 'plant';
        
        // 随机位置
        const left = 10 + Math.random() * 80;
        const bottom = 20 + Math.random() * 60;
        
        plant.style.left = `${left}%`;
        plant.style.bottom = `${bottom}%`;
        
        // 随机大小
        const size = 0.5 + Math.random() * 1.5;
        plant.style.transform = `scale(${size})`;
        
        // 随机颜色（木元素相关）
        const greenShade = 100 + Math.floor(gameState.elements.wood / 2);
        plant.style.backgroundColor = `rgb(76, ${greenShade}, 80)`;
        
        DOM.mountainPlants.appendChild(plant);
    }
    
    // 根据动物数量添加动物
    const animalCount = gameState.mountain.animals;
    for (let i = 0; i < Math.min(animalCount, 10); i++) {
        const animal = document.createElement('div');
        animal.className = 'animal';
        
        // 随机位置
        const left = 10 + Math.random() * 80;
        const bottom = 30 + Math.random() * 50;
        
        animal.style.left = `${left}%`;
        animal.style.bottom = `${bottom}%`;
        
        // 随机大小
        const size = 0.8 + Math.random() * 1.2;
        animal.style.transform = `scale(${size})`;
        
        // 随机颜色（火元素相关）
        const redShade = 200 + Math.floor(gameState.elements.fire / 3);
        animal.style.backgroundColor = `rgb(${redShade}, 87, 34)`;
        
        DOM.mountainAnimals.appendChild(animal);
    }
    
    // 更新天气效果
    updateWeatherEffect();
}

// 更新天气效果
function updateWeatherEffect() {
    DOM.weatherEffect.innerHTML = '';
    
    if (gameState.weather.effect) {
        if (window.visualEffects && window.visualEffects.weatherManager) {
            // 使用天气效果管理器
            window.visualEffects.weatherManager.applyWeatherEffect(
                gameState.weather.effect,
                gameState.weather.element || 'balance'
            );
        } else {
            // 回退到简单效果
            const effect = document.createElement('div');
            effect.className = gameState.weather.effect;
            DOM.weatherEffect.appendChild(effect);
        }
    }
}

// 增加五行元素
function increaseElement(element, amount = 5) {
    // 检查水币是否足够
    const cost = 10;
    if (gameState.resources.waterCoins < cost) {
        addLog('水币不足，无法调节五行！');
        return false;
    }
    
    // 扣除水币
    gameState.resources.waterCoins -= cost;
    
    // 增加目标元素
    const oldValue = gameState.elements[element];
    gameState.elements[element] = Math.min(100, oldValue + amount);
    
    // 根据五行相生，增加相生元素
    const generatedElement = ELEMENT_CYCLES.generate[element];
    if (generatedElement) {
        const currentValue = gameState.elements[generatedElement];
        gameState.elements[generatedElement] = Math.min(100, currentValue + 2);
    }
    
    // 根据五行相克，减少相克元素
    const overcomeElement = ELEMENT_CYCLES.overcome[element];
    if (overcomeElement) {
        const currentValue = gameState.elements[overcomeElement];
        gameState.elements[overcomeElement] = Math.max(0, currentValue - 2);
    }
    
    // 更新UI
    updateElementValues();
    updateResourceDisplay();
    updateBalanceIndicator();
    
    // 触发视觉特效
    triggerElementEffect(element);
    
    // 添加日志
    const elementName = ELEMENT_NAMES[element];
    addLog(`你调节了${elementName}元素，消耗${cost}水币`);
    
    // 检查是否触发事件
    checkForEvents();
    
    // 检查成就
    checkAchievements();
    
    // 检查胜利条件
    checkVictory();
    
    return true;
}

// 触发元素特效
function triggerElementEffect(element) {
    if (window.visualEffects && window.visualEffects.elementActivation) {
        // 激活元素卡片
        window.visualEffects.elementActivation.activate(element);
        
        // 触发粒子效果
        if (window.visualEffects.particleSystem) {
            window.visualEffects.particleSystem.start(element);
            setTimeout(() => {
                window.visualEffects.particleSystem.stop();
            }, 2000);
        }
    }
}

// 检查成就
function checkAchievements() {
    if (window.visualEffects && window.visualEffects.achievementSystem) {
        const newAchievements = window.visualEffects.achievementSystem.checkAchievements(gameState);
        
        // 如果有新成就，在日志中显示
        newAchievements.forEach(achievementId => {
            const achievement = window.visualEffects.achievementSystem.achievements[achievementId];
            if (achievement) {
                addLog(`成就解锁：${achievement.name} - ${achievement.description}`);
            }
        });
    }
}

// 检查胜利条件
function checkVictory() {
    if (window.victoryManager) {
        const newVictories = window.victoryManager.checkVictoryConditions(gameState);
        
        // 如果有新胜利，在日志中显示
        newVictories.forEach(victoryId => {
            const victory = window.victoryManager.victoryConditions[victoryId];
            if (victory) {
                addLog(`胜利达成：${victory.name}！`);
            }
        });
        
        // 保存胜利数据
        window.victoryManager.saveVictoryData();
    }
}

// 检查并触发游戏事件
function checkForEvents() {
    // 检查植物生长
    if (gameState.elements.wood > 60 && Math.random() < 0.3) {
        gameState.mountain.plants++;
        addLog('木气旺盛，荒山长出了一株灵植！');
        updateMountainStats();
        updateMountainVisual();
    }
    
    // 检查神兽来访
    if (gameState.elements.fire > 60 && Math.random() < 0.2) {
        gameState.mountain.animals++;
        addLog('火气旺盛，吸引了一只神兽来访！');
        updateMountainStats();
        updateMountainVisual();
    }
    
    // 检查土地肥力
    if (gameState.elements.earth > 70) {
        const increase = Math.floor(gameState.elements.earth / 20);
        gameState.mountain.soilFertility = Math.min(100, gameState.mountain.soilFertility + increase);
        updateMountainStats();
    }
    
    // 检查存储空间（金元素影响）
    if (gameState.elements.metal > 50) {
        const bonus = Math.floor(gameState.elements.metal / 10);
        gameState.mountain.storageCapacity = 100 + bonus;
        updateMountainStats();
    }
}

// 处理AI对话
async function handleMoodInput(moodText) {
    if (!moodText.trim()) {
        addLog('请输入你的心情感受');
        return;
    }
    
    // 添加用户消息到对话历史
    addDialogueMessage('player', moodText);
    
    // 显示正在思考的提示
    const thinkingMsg = addDialogueMessage('system', '山灵正在思考...');
    
    try {
        // 使用增强AI服务获取回应
        const aiResponse = await window.getAIResponse(moodText, gameState);
        
        // 移除思考提示，添加AI回应
        DOM.dialogueHistory.removeChild(DOM.dialogueHistory.lastChild);
        addDialogueMessage('system', aiResponse.response);
        
        // 触发天气变化
        triggerWeatherChange(aiResponse.element, aiResponse.weather);
        
        // 添加日志
        addLog(`山灵感知到你的${aiResponse.moodChinese}，触发了${aiResponse.weather.name}天气`);
        
        // 检查成就（对话相关成就）
        checkAchievements();
        
    } catch (error) {
        console.error('AI对话错误:', error);
        // 移除思考提示
        DOM.dialogueHistory.removeChild(DOM.dialogueHistory.lastChild);
        addDialogueMessage('system', '山灵暂时无法回应，请静心感受山中自然之音。');
    }
    
    // 清空输入框
    DOM.moodInput.value = '';
}

// 分析心情类型
function analyzeMood(text) {
    const textLower = text.toLowerCase();
    
    if (textLower.includes('累') || textLower.includes('疲惫') || textLower.includes('辛苦')) {
        return 'tired';
    } else if (textLower.includes('开心') || textLower.includes('高兴') || textLower.includes('快乐')) {
        return 'happy';
    } else if (textLower.includes('压力') || textLower.includes('紧张') || textLower.includes('焦虑')) {
        return 'stressed';
    } else if (textLower.includes('平静') || textLower.includes('安宁') || textLower.includes('放松')) {
        return 'peaceful';
    } else if (textLower.includes('创意') || textLower.includes('灵感') || textLower.includes('创造')) {
        return 'creative';
    } else {
        // 随机选择一个类型
        const types = ['tired', 'happy', 'stressed', 'peaceful', 'creative'];
        return types[Math.floor(Math.random() * types.length)];
    }
}

// 获取AI回应
async function getAIResponse(moodType, originalText) {
    // 这里可以替换为真实的AI API调用
    // 目前使用本地回应库
    
    const responses = AI_RESPONSES[moodType] || AI_RESPONSES.peaceful;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const weatherEffect = WEATHER_EFFECTS[moodType] || WEATHER_EFFECTS.peaceful;
    
    return {
        response: randomResponse,
        weather: weatherEffect.name,
        element: weatherEffect.element
    };
}

// 触发天气变化
function triggerWeatherChange(element, weatherEffect) {
    // 更新天气状态
    gameState.weather.type = weatherEffect.type;
    gameState.weather.description = weatherEffect.description;
    gameState.weather.effect = weatherEffect.type;
    gameState.weather.element = element; // 保存关联元素
    
    // 增加对应元素（5-10随机值）
    const bonus = 5 + Math.floor(Math.random() * 6);
    gameState.elements[element] = Math.min(100, gameState.elements[element] + bonus);
    
    // 更新UI
    updateWeatherDisplay();
    updateElementValues();
    updateWeatherEffect();
    updateBalanceIndicator();
    
    // 触发元素特效
    triggerElementEffect(element);
    
    // 添加天气效果，30秒后清除
    setTimeout(() => {
        gameState.weather.effect = null;
        gameState.weather.element = null;
        updateWeatherEffect();
    }, 30000);
}

// 添加对话消息
function addDialogueMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `dialogue-message ${sender}`;
    
    const header = document.createElement('div');
    header.className = 'message-header';
    
    if (sender === 'system') {
        header.innerHTML = '<i class="fas fa-mountain"></i> 山灵';
    } else {
        header.innerHTML = '<i class="fas fa-user"></i> 你';
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(header);
    messageDiv.appendChild(contentDiv);
    
    DOM.dialogueHistory.appendChild(messageDiv);
    
    // 滚动到底部
    DOM.dialogueHistory.scrollTop = DOM.dialogueHistory.scrollHeight;
    
    // 保存到游戏状态
    gameState.dialogues.push({
        sender,
        content,
        timestamp: new Date().toISOString()
    });
}

// 添加游戏日志
function addLog(content) {
    const timeStr = `山中第${gameState.gameTime.day}日`;
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'log-time';
    timeSpan.textContent = timeStr;
    
    const contentSpan = document.createElement('span');
    contentSpan.className = 'log-content';
    contentSpan.textContent = content;
    
    logEntry.appendChild(timeSpan);
    logEntry.appendChild(contentSpan);
    
    DOM.logEntries.appendChild(logEntry);
    
    // 保存到游戏状态
    gameState.logs.push({
        time: timeStr,
        content,
        timestamp: new Date().toISOString()
    });
    
    // 滚动到底部
    DOM.logEntries.scrollTop = DOM.logEntries.scrollHeight;
    
    // 限制日志数量
    if (gameState.logs.length > 50) {
        gameState.logs.shift();
        if (DOM.logEntries.children.length > 50) {
            DOM.logEntries.removeChild(DOM.logEntries.firstChild);
        }
    }
}

// 游戏主循环
function startGameLoop() {
    // 每分钟更新一次游戏时间
    setInterval(() => {
        // 增加分钟
        gameState.gameTime.minute += 10;
        
        if (gameState.gameTime.minute >= 60) {
            gameState.gameTime.minute = 0;
            gameState.gameTime.hour++;
            
            if (gameState.gameTime.hour >= 24) {
                gameState.gameTime.hour = 0;
                gameState.gameTime.day++;
                gameState.resources.totalDays++;
                
                // 每30天换季
                if (gameState.gameTime.day % 30 === 0) {
                    const seasons = ['春', '夏', '秋', '冬'];
                    const currentIndex = seasons.indexOf(gameState.gameTime.season);
                    gameState.gameTime.season = seasons[(currentIndex + 1) % 4];
                    addLog(`季节更替：${gameState.gameTime.season}季来临`);
                }
                
                // 每日收入（水元素影响）
                const dailyIncome = Math.floor(gameState.elements.water / 10);
                gameState.resources.waterCoins += dailyIncome;
                gameState.resources.totalWaterCoins = (gameState.resources.totalWaterCoins || 0) + dailyIncome;
                addLog(`新的一天开始，获得${dailyIncome}水币（水元素影响）`);
                
                // 每日检查五行平衡奖励
                checkDailyBalanceBonus();
            }
        }
        
        // 更新UI
        updateTimeDisplay();
        updateResourceDisplay();
        
        // 定期检查成就（每10分钟游戏时间检查一次）
        checkAchievements();
        
    }, 1000); // 现实1秒 = 游戏10分钟
}

// 检查每日平衡奖励
function checkDailyBalanceBonus() {
    const balance = calculateBalance();
    
    if (balance.status === '极佳') {
        const bonus = 20;
        gameState.resources.waterCoins += bonus;
        addLog(`五行极佳平衡，获得${bonus}水币奖励！`);
    } else if (balance.status === '良好') {
        const bonus = 10;
        gameState.resources.waterCoins += bonus;
        addLog(`五行良好平衡，获得${bonus}水币奖励！`);
    }
}

// 保存游戏状态
function saveGameState() {
    try {
        // 更新保存次数成就
        gameState.achievements.saveCount++;
        
        // 获取成就系统解锁状态
        let achievementData = {};
        if (window.achievementManager) {
            achievementData = window.achievementManager.getSaveData();
        }
        
        const saveData = {
            ...gameState,
            achievements: {
                ...gameState.achievements,
                day: gameState.gameTime.day,
                saved: achievementData
            },
            saveTime: new Date().toISOString()
        };
        
        localStorage.setItem('mountainGameSave', JSON.stringify(saveData));
        addLog('游戏已保存');
        
        // 检查成就
        if (window.achievementManager) {
            window.achievementManager.checkAchievements(gameState);
        }
        
        return true;
    } catch (error) {
        console.error('保存游戏失败:', error);
        addLog('保存游戏失败');
        return false;
    }
}

// 加载游戏状态
function loadGameState() {
    try {
        const savedData = localStorage.getItem('mountainGameSave');
        if (savedData) {
            const loadedState = JSON.parse(savedData);
            
            // 合并游戏状态，保留必要的默认值
            Object.assign(gameState.elements, loadedState.elements || {});
            Object.assign(gameState.resources, loadedState.resources || {});
            Object.assign(gameState.mountain, loadedState.mountain || {});
            Object.assign(gameState.gameTime, loadedState.gameTime || {});
            Object.assign(gameState.weather, loadedState.weather || {});
            
            gameState.logs = loadedState.logs || [];
            gameState.dialogues = loadedState.dialogues || [];
            
            // 恢复成就数据
            if (loadedState.achievements) {
                Object.assign(gameState.achievements, loadedState.achievements);
            }
            
            // 恢复日志显示
            restoreLogs();
            
            addLog('游戏已加载');
            return true;
        }
    } catch (error) {
        console.error('加载游戏失败:', error);
        addLog('加载游戏失败，使用新游戏');
    }
    return false;
}

// 恢复日志显示
function restoreLogs() {
    DOM.logEntries.innerHTML = '';
    gameState.logs.forEach(log => {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'log-time';
        timeSpan.textContent = log.time;
        
        const contentSpan = document.createElement('span');
        contentSpan.className = 'log-content';
        contentSpan.textContent = log.content;
        
        logEntry.appendChild(timeSpan);
        logEntry.appendChild(contentSpan);
        DOM.logEntries.appendChild(logEntry);
    });
}

// 重置游戏
function resetGame() {
    if (confirm('确定要重置游戏吗？所有进度将丢失！')) {
        // 重置游戏状态
        gameState.elements = { wood: 50, fire: 50, earth: 50, metal: 50, water: 50 };
        gameState.resources = { waterCoins: 100, totalDays: 0, currentDay: 1 };
        gameState.mountain = { plants: 0, animals: 0, soilFertility: 50, storageCapacity: 100, storedItems: 0 };
        gameState.gameTime = { hour: 8, minute: 0, day: 1, season: '春' };
        gameState.weather = { type: 'sunny', description: '风和日丽', effect: null };
        gameState.logs = [];
        gameState.dialogues = [];
        
        // 清除本地存储
        localStorage.removeItem('mountainGameSave');
        
        // 重置UI
        updateAllUI();
        DOM.logEntries.innerHTML = '';
        DOM.dialogueHistory.innerHTML = '';
        
        // 添加初始对话
        addDialogueMessage('system', '欢迎来到山中一甲子。此处时光流转，五行相生相克。今日心情如何？');
        
        // 添加初始日志
        addLog('你来到这座荒山，开始调节五行平衡...');
        addLog('游戏已重置，重新开始旅程');
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 五行按钮
    DOM.elementButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.closest('.element-btn').dataset.action;
            const element = action.split('-')[1]; // increase-wood -> wood
            
            increaseElement(element);
        });
    });
    
    // 发送心情按钮
    DOM.sendMoodBtn.addEventListener('click', () => {
        const moodText = DOM.moodInput.value;
        handleMoodInput(moodText);
    });
    
    // 回车发送
    DOM.moodInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const moodText = DOM.moodInput.value;
            handleMoodInput(moodText);
        }
    });
    
    // 随机心情按钮
    DOM.autoMoodBtn.addEventListener('click', () => {
        const moods = [
            "今天工作很累，想在山中静心",
            "心情愉快，想来山中散步",
            "有些压力，需要山的宁静",
            "内心平静，适合山中修行",
            "灵感迸发，想创作山中诗篇"
        ];
        
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        DOM.moodInput.value = randomMood;
    });
    
    // 清空日志按钮
    DOM.clearLogBtn.addEventListener('click', () => {
        if (confirm('确定要清空游戏日志吗？')) {
            DOM.logEntries.innerHTML = '';
            gameState.logs = [];
            addLog('日志已清空');
        }
    });
    
    // 游戏控制按钮
    DOM.saveGameBtn.addEventListener('click', saveGameState);
    DOM.loadGameBtn.addEventListener('click', () => {
        loadGameState();
        updateAllUI();
    });
    DOM.resetGameBtn.addEventListener('click', resetGame);
    DOM.helpBtn.addEventListener('click', () => {
        DOM.helpModal.style.display = 'flex';
    });
    
    // 模态框关闭按钮
    DOM.closeModal.addEventListener('click', () => {
        DOM.helpModal.style.display = 'none';
    });
    
    // 点击模态框背景关闭
    DOM.helpModal.addEventListener('click', (e) => {
        if (e.target === DOM.helpModal) {
            DOM.helpModal.style.display = 'none';
        }
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl+S 保存
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveGameState();
        }
        
        // Ctrl+L 加载
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            loadGameState();
            updateAllUI();
        }
        
        // Ctrl+R 重置
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            resetGame();
        }
        
        // Esc 关闭模态框
        if (e.key === 'Escape') {
            DOM.helpModal.style.display = 'none';
        }
    });
    
    // 成就系统按钮
    const refreshAchievementsBtn = document.getElementById('refresh-achievements-btn');
    const achievementHelpBtn = document.getElementById('achievement-help-btn');
    
    if (refreshAchievementsBtn) {
        refreshAchievementsBtn.addEventListener('click', () => {
            if (window.achievementManager) {
                window.achievementManager.renderAchievements();
                updateAchievementUI();
                addLog('成就列表已刷新');
            }
        });
    }
    
    if (achievementHelpBtn) {
        achievementHelpBtn.addEventListener('click', () => {
            addLog('🎮 成就系统说明：');
            addLog('• 完成特定目标解锁成就');
            addLog('• 每个成就提供积分奖励');
            addLog('• 已解锁成就会显示⭐标记');
            addLog('• 成就数据会自动保存');
        });
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);

// 导出游戏状态供调试
window.gameState = gameState;
window.gameFunctions = {
    increaseElement,
    saveGameState,
    loadGameState,
    resetGame,
    addLog
};