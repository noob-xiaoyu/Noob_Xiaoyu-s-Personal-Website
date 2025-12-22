// script.js
const backgroundMode = 'video';
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const contentContainer = document.getElementById('content-container');

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

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    }
}

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

themeToggle.addEventListener('click', () => {
    const isCurrentlyLight = body.classList.contains('dark-mode');
    const newTheme = isCurrentlyLight ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

window.addEventListener('hashchange', handleRouteChange);

document.addEventListener('DOMContentLoaded', () => {   
    const isDarkReaderEnabled = (
      'querySelector' in document &&
      !!document.querySelector('meta[name=darkreader]')
    );
    if (isDarkReaderEnabled) {
      document.documentElement.classList.add('dark-reader-active');
    }

    if (backgroundMode === 'video') {
        body.classList.add('video-mode');
        setRandomVideo();
    } else {
        body.classList.add('image-mode');
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    handleRouteChange();
    contentContainer.addEventListener('click', function(event) {
        const header = event.target.closest('.accordion-header');
        if (header) {
            header.classList.toggle('active');
            const panel = header.nextElementSibling;
            if (panel && panel.classList.contains('accordion-panel')) {
                panel.classList.toggle('show');
            }
        }
    });
});