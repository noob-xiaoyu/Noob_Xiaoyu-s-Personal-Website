// script.js

// --- 全局常量和变量 ---
const backgroundMode = 'video';
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const contentContainer = document.getElementById('content-container');

// --- 路由配置 ---
const routes = {
    '': 'content/root.html',
    '#root' : 'content/root.html',
    '#home': 'content/home.html',
    '#about': 'content/about.html',

    '#imgui_menu' : 'project/imgui_menu.html',
    '#launcher' : 'project/launcher-nc-yz.html',
    '#yt-dlp-gui' : 'project/yt-dlp-gui.html',
    '#image-binary-converter': 'project/image-binary-converter.html',
    '#steam-account-manager': 'project/steam-account-manager.html',
    '#mc-classifier': 'project/mc-projection-classifier.html',
    '#xiaoyu' : 'project/Xiaoyu-Personal-Web.html',

    '#download' : 'download.html',
};

// --- 函数定义 ---

/**
 * 设置随机的背景视频
 */
function setRandomVideo() {
    const baseUrl = 'https://media.githubusercontent.com/media/noob-xiaoyu/image/main/video/';
    const videoFiles = [];
    for (let i = 1; i <= 11; i++) {
        videoFiles.push(`a${i}.mp4`);
    }
    const randomIndex = Math.floor(Math.random() * videoFiles.length);
    const randomVideoFile = videoFiles[randomIndex];
    const finalVideoUrl = baseUrl + randomVideoFile;
    const videoSource = document.getElementById('videoSource');
    const videoElement = document.getElementById('bgVideo');
    
    if (videoSource && videoElement) {
        videoSource.src = finalVideoUrl;
        videoElement.load();
    }
}

/**
 * 应用指定的主题（亮色/暗色）
 * @param {string} theme - 'light' 或 'dark'
 */
function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌙';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '☀️';
    }
}

/**
 * 异步加载并显示内容页面
 * @param {string} path - 内容文件的路径
 */
async function loadContent(path) {
    contentContainer.classList.add('fade-out');
    setTimeout(async () => {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error('内容加载失败');
            const html = await response.text();
            contentContainer.innerHTML = html;
            contentContainer.classList.remove('fade-out');
        } catch (error) {
            console.error(error);
            contentContainer.innerHTML = '<h1>页面加载出错</h1>';
            contentContainer.classList.remove('fade-out');
        }
    }, 300);
}

/**
 * 处理URL哈希变化，加载对应内容
 */
function handleRouteChange() {
    const hash = window.location.hash || '';
    const path = routes[hash] || routes[''];
    
    const wideModePaths = [
        'project/imgui_menu.html', 
        'project/launcher-nc-yz.html', 
        'project/yt-dlp-gui.html',
        'project/image-binary-converter.html',
        'project/steam-account-manager.html',
        'project/mc-projection-classifier.html',
        'project/Xiaoyu-Personal-Web.html',
    ];

    if (wideModePaths.includes(path)) {
        contentContainer.classList.add('wide-mode');
    } else {
        contentContainer.classList.remove('wide-mode');
    }
    
    loadContent(path);
}

// --- 事件监听器 ---

// 主题切换按钮
themeToggle.addEventListener('click', () => {
    const isCurrentlyLight = body.classList.contains('dark-mode');
    const newTheme = isCurrentlyLight ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

// 监听URL哈希变化
window.addEventListener('hashchange', handleRouteChange);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 1. 设置背景模式
    if (backgroundMode === 'video') {
        body.classList.add('video-mode');
        setRandomVideo();
    } else {
        body.classList.add('image-mode');
    }

    // 2. 设置主题
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // 3. 加载初始内容
    handleRouteChange();

    // ▼▼▼ 【这是解决问题的关键代码】 ▼▼▼
    // 使用事件委托来处理动态加载内容的点击事件
    contentContainer.addEventListener('click', function(event) {
        // 检查被点击的元素是否是我们想要的下拉框标题
        const header = event.target.closest('.accordion-header');
        
        // 如果确实点击了标题栏 (header 不为 null)
        if (header) {
            // 切换标题栏的 .active 状态（用于样式变化，如图标旋转）
            header.classList.toggle('active');

            // 找到紧跟在标题栏后面的内容面板
            const panel = header.nextElementSibling;

            // 确保 panel 存在并且是正确的内容面板
            if (panel && panel.classList.contains('accordion-panel')) {
                // 切换内容面板的 .show 状态来控制显示和隐藏
                panel.classList.toggle('show');
            }
        }
    });
    // ▲▲▲ 【代码结束】 ▲▲▲
});