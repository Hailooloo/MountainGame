// 山中一甲子 - AI服务模块
// 模拟真实AI API接口，可根据需要替换为真实API

// 五行智慧语录数据库
const WISDOM_DATABASE = {
    wood: [
        "木曰曲直，能屈能伸方为生存之道。",
        "春木生发，新的开始总是充满希望。",
        "木主仁，仁者爱人，爱者得助。",
        "十年树木，百年树人，耐心是美德。",
        "木气通达，思维活跃，创意无限。"
    ],
    
    fire: [
        "火曰炎上，热情向上，照亮前路。",
        "夏火旺盛，能量充沛，把握时机。",
        "火主礼，礼貌待人，人缘自来。",
        "星星之火，可以燎原，小开始大成就。",
        "火气光明，心地光明，前途光明。"
    ],
    
    earth: [
        "土爰稼穑，厚德载物，包容万象。",
        "长夏土旺，稳定踏实，根基牢固。",
        "土主信，诚信为本，信者得助。",
        "大地母亲，滋养万物，无私奉献。",
        "土气中和，心态平和，万事皆顺。"
    ],
    
    metal: [
        "金曰从革，变革创新，锐意进取。",
        "秋金肃杀，去旧迎新，断舍离得自在。",
        "金主义，义字当头，朋友遍天下。",
        "真金不怕火炼，困难造就强者。",
        "金气清明，思维清晰，决策果断。"
    ],
    
    water: [
        "水曰润下，谦逊低调，顺势而为。",
        "冬水寒冷，静心沉淀，积蓄力量。",
        "水主智，智慧如水，随物赋形。",
        "上善若水，水利万物而不争。",
        "水气流通，财源广进，人脉通达。"
    ],
    
    balance: [
        "五行平衡，阴阳调和，身心安康。",
        "相生相克，循环往复，生生不息。",
        "金木水火土，缺一不可，和谐共生。",
        "五行流转，如四季更替，自然之道。",
        "平衡之道，中庸之道，成功之道。"
    ]
};

// 情绪分析器
class MoodAnalyzer {
    static analyze(text) {
        const textLower = text.toLowerCase();
        
        // 情绪关键词映射
        const moodPatterns = {
            tired: ['累', '疲惫', '辛苦', '困', '乏', '倦', '筋疲力尽'],
            happy: ['开心', '高兴', '快乐', '喜悦', '愉快', '幸福', '兴奋'],
            stressed: ['压力', '紧张', '焦虑', '烦躁', '压抑', '崩溃', '负担'],
            peaceful: ['平静', '安宁', '放松', '宁静', '祥和', '恬淡', '心静'],
            creative: ['创意', '灵感', '创造', '创新', '发明', '设计', '创作'],
            grateful: ['感谢', '感恩', '感激', '感动', '谢谢', '幸有'],
            confused: ['困惑', '迷茫', '不解', '疑惑', '迷失', '不知'],
            hopeful: ['希望', '期待', '展望', '憧憬', '向往', '梦想']
        };
        
        // 计算情绪分数
        const scores = {};
        for (const [mood, patterns] of Object.entries(moodPatterns)) {
            scores[mood] = patterns.reduce((score, pattern) => {
                return textLower.includes(pattern) ? score + 1 : score;
            }, 0);
        }
        
        // 找出主要情绪
        let primaryMood = 'peaceful';
        let maxScore = 0;
        
        for (const [mood, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                primaryMood = mood;
            }
        }
        
        // 如果没有明显情绪，根据五行平衡随机选择
        if (maxScore === 0) {
            const moods = Object.keys(moodPatterns);
            primaryMood = moods[Math.floor(Math.random() * moods.length)];
        }
        
        return {
            primary: primaryMood,
            scores,
            confidence: maxScore / Math.max(1, textLower.length / 3)
        };
    }
    
    // 获取情绪强度描述
    static getIntensityDescription(score) {
        if (score >= 3) return '非常';
        if (score >= 2) return '比较';
        if (score >= 1) return '有些';
        return '略微';
    }
}

// 易学智慧生成器
class WisdomGenerator {
    static generate(moodAnalysis, gameState) {
        const { primary, scores } = moodAnalysis;
        
        // 根据情绪选择五行智慧
        const elementFocus = this.getElementFocus(primary);
        const wisdomPool = WISDOM_DATABASE[elementFocus] || WISDOM_DATABASE.balance;
        
        // 选择随机智慧语录
        const wisdom = wisdomPool[Math.floor(Math.random() * wisdomPool.length)];
        
        // 构建回应
        let response = `感知到你${MoodAnalyzer.getIntensityDescription(scores[primary])}${this.getMoodChinese(primary)}。\n\n`;
        response += `${wisdom}\n\n`;
        
        // 添加五行建议
        const suggestion = this.getElementSuggestion(elementFocus, gameState);
        response += suggestion;
        
        return {
            response,
            weather: this.getWeatherEffect(elementFocus),
            element: elementFocus,
            wisdom: wisdom
        };
    }
    
    static getMoodChinese(mood) {
        const moodMap = {
            tired: '疲惫',
            happy: '喜悦',
            stressed: '压力',
            peaceful: '平静',
            creative: '创意',
            grateful: '感恩',
            confused: '困惑',
            hopeful: '希望'
        };
        return moodMap[mood] || '平静';
    }
    
    static getElementFocus(mood) {
        const moodToElement = {
            tired: 'water',      // 疲惫需要水润
            happy: 'fire',       // 喜悦如火焰
            stressed: 'wood',    // 压力需木疏
            peaceful: 'earth',   // 平静如大地
            creative: 'metal',   // 创意如金器
            grateful: 'water',   // 感恩如水润
            confused: 'fire',    // 困惑需火明
            hopeful: 'wood'      // 希望如木生
        };
        return moodToElement[mood] || 'balance';
    }
    
    static getWeatherEffect(element) {
        const elementWeather = {
            wood: { name: '甲木风', type: 'wind', description: '和风吹拂，木元素滋养' },
            fire: { name: '丙火日', type: 'sunshine', description: '阳光普照，火元素旺盛' },
            earth: { name: '戊土雾', type: 'mist', description: '薄雾笼罩，土元素稳定' },
            metal: { name: '庚金晴', type: 'clear', description: '天朗气清，金元素锐利' },
            water: { name: '壬水雨', type: 'rain', description: '天降甘霖，水元素滋润' },
            balance: { name: '五行和', type: 'balanced', description: '天气平和，五行和谐' }
        };
        return elementWeather[element] || elementWeather.balance;
    }
    
    static getElementSuggestion(element, gameState) {
        const suggestions = {
            wood: '建议：栽种一株植物，或进行创意活动。木气生发，有助于生长和技能提升。',
            fire: '建议：参与社交活动，或进行体育锻炼。火气旺盛，有助于能量和名声提升。',
            earth: '建议：整理环境，或进行冥想静心。土气稳定，有助于承载和防御提升。',
            metal: '建议：学习新技能，或进行工具整理。金气锐利，有助于技术和效率提升。',
            water: '建议：进行财务规划，或与人交流合作。水气流通，有助于财富和人脉提升。',
            balance: '建议：保持当前状态，五行平衡是福。'
        };
        
        // 根据当前元素值调整建议
        const currentValue = gameState?.elements?.[element] || 50;
        let extraAdvice = '';
        
        if (currentValue < 30) {
            extraAdvice = '（当前该元素较低，建议重点加强）';
        } else if (currentValue > 70) {
            extraAdvice = '（当前该元素较高，可适当调节其他元素）';
        }
        
        return suggestions[element] + extraAdvice;
    }
}

// AI服务主类
class AIService {
    constructor() {
        this.moodAnalyzer = new MoodAnalyzer();
        this.wisdomGenerator = new WisdomGenerator();
        this.conversationHistory = [];
    }
    
    // 处理用户输入
    async processUserInput(userInput, gameState = null) {
        try {
            // 分析情绪
            const moodAnalysis = MoodAnalyzer.analyze(userInput);
            
            // 生成智慧回应
            const wisdomResponse = WisdomGenerator.generate(moodAnalysis, gameState);
            
            // 记录对话
            this.recordConversation(userInput, wisdomResponse);
            
            // 返回结果
            return {
                success: true,
                data: {
                    mood: moodAnalysis.primary,
                    moodChinese: MoodAnalyzer.getMoodChinese(moodAnalysis.primary),
                    intensity: MoodAnalyzer.getIntensityDescription(moodAnalysis.scores[moodAnalysis.primary]),
                    response: wisdomResponse.response,
                    weather: wisdomResponse.weather,
                    element: wisdomResponse.element,
                    wisdom: wisdomResponse.wisdom,
                    timestamp: new Date().toISOString(),
                    analysis: moodAnalysis
                }
            };
            
        } catch (error) {
            console.error('AI处理错误:', error);
            return {
                success: false,
                error: '山灵暂时无法回应，请稍后再试。',
                fallbackResponse: this.getFallbackResponse()
            };
        }
    }
    
    // 记录对话历史
    recordConversation(userInput, aiResponse) {
        this.conversationHistory.push({
            user: userInput,
            ai: aiResponse,
            timestamp: new Date().toISOString()
        });
        
        // 限制历史记录长度
        if (this.conversationHistory.length > 50) {
            this.conversationHistory.shift();
        }
    }
    
    // 获取备用回应
    getFallbackResponse() {
        const fallbacks = [
            "山灵正在静修，此刻山中宁静，正适合观心自省。",
            "风过竹林，声如天籁。此时无声胜有声，静心感受五行流转。",
            "云遮雾绕，不见山灵。或许这正是让你独立思考的时刻。",
            "泉水叮咚，自然之音。倾听内心，答案自现。"
        ];
        
        return {
            response: fallbacks[Math.floor(Math.random() * fallbacks.length)],
            weather: { name: '自然态', type: 'normal', description: '天气如常，五行自转' },
            element: 'balance'
        };
    }
    
    // 获取对话摘要
    getConversationSummary() {
        if (this.conversationHistory.length === 0) {
            return '尚未开始对话';
        }
        
        const recent = this.conversationHistory.slice(-5);
        return recent.map(conv => `你：${conv.user.substring(0, 20)}...\n山灵：${conv.ai.response.substring(0, 30)}...`).join('\n\n');
    }
    
    // 清除对话历史
    clearHistory() {
        this.conversationHistory = [];
    }
}

// 创建全局AI服务实例
window.mountainAI = new AIService();

// 导出供游戏使用
window.AIService = AIService;
window.MoodAnalyzer = MoodAnalyzer;
window.WisdomGenerator = WisdomGenerator;

// API接口函数（模拟真实API）
window.getAIResponse = async function(userInput, gameState) {
    const aiService = window.mountainAI;
    const result = await aiService.processUserInput(userInput, gameState);
    
    if (result.success) {
        return result.data;
    } else {
        // 使用备用回应
        const fallback = aiService.getFallbackResponse();
        return {
            response: fallback.response,
            weather: fallback.weather,
            element: fallback.element,
            mood: 'peaceful',
            moodChinese: '平静',
            intensity: '略微',
            wisdom: '静心自然得智慧',
            timestamp: new Date().toISOString()
        };
    }
};

console.log('山中一甲子 AI服务已加载，使用 window.getAIResponse(userInput, gameState) 调用。');