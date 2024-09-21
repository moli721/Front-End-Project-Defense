document.addEventListener('DOMContentLoaded', function () {
    const iconList = document.querySelector('.icon-list');
    const icons = document.querySelectorAll('.icon-tab');
    const iconTabImgs = document.querySelectorAll('.icon-tab-img img');
    const leftBtn = document.querySelector('.trigger-left-btn');
    const rightBtn = document.querySelector('.trigger-right-btn');
    const processBar = document.querySelector('.icon-processbar-line');
    const heroImg = document.querySelector('.hero-img img');
    const hexoContainer = document.querySelector('.hexo-container');
    let currentIndex = 0;

    const heroData = [
        { type: '刺客', hero: '阿卡丽', background: 'url("./images/英雄背景图/刺客背景图.webp")' },
        { type: '战士', hero: '亚索', background: 'url("./images/英雄背景图/战士背景图.webp")' },
        { type: '法师', hero: '拉克丝', background: 'url("./images/英雄背景图/法师背景图.webp")' },
        { type: '射手', hero: '金克斯', background: 'url("./images/英雄背景图/射手背景图.svg")' },
        { type: '辅助', hero: '锤石', background: 'url("./images/英雄背景图/辅助背景图.webp")' },
        { type: '坦克', hero: '雷欧娜', background: 'url("./images/英雄背景图/坦克背景图.webp")' }
    ];

    function updateIcons() {
        icons.forEach((icon, index) => {
            icon.style.transform = `translateX(${-100 * currentIndex}%)`;
        });
        updateButtons();
        updateProcessBar();
    }

    function updateButtons() {
        // classList 是一个只读属性，返回一个元素的类属性的实时 DOMTokenList 集合。
        // toggle 方法用于在元素的 classList 中添加或删除一个类名。如果类名已经存在，则将其删除；如果类名不存在，则将其添加。
        leftBtn.disabled = currentIndex === 0;
        rightBtn.disabled = currentIndex >= icons.length - 5; /* icons.length - 5 表示currentIndex的最大值 */
        leftBtn.classList.toggle('active', !leftBtn.disabled);
        rightBtn.classList.toggle('active', !rightBtn.disabled);
    }

    function updateProcessBar() {
        const totalGroups = Math.ceil(icons.length / 5);
        const processWidth = 100 / totalGroups;
        processBar.style.width = `${processWidth}%`;
        processBar.style.left = `${processWidth * currentIndex}%`;
    }




    function updateHeroAndBackground(heroType, clickedIcon) {
        const currentHero = heroData.find(hero => hero.type === heroType);
        if (currentHero) {
            heroImg.src = `./images/英雄/${currentHero.hero}.webp`;
            heroImg.alt = currentHero.hero;
            hexoContainer.style.backgroundImage = currentHero.background;

            // 移除所有图标的 active 类
            icons.forEach(icon => icon.classList.remove('active'));
            // 为点击的图标添加 active 类
            clickedIcon.classList.add('active');
        }
    }
        
    

    // 给每一个tab添加一个点击事件，当点击时，获取到该tab的data-hero属性的值，然后根据该值，更新heroImg的src属性，以及hexoContainer的backgroundImage属性
    icons.forEach(icon => {
        icon.addEventListener('click', function () {
            const heroType = this.getAttribute('data-hero');
            updateHeroAndBackground(heroType,this);
        });
    });

    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateIcons();
        }
    });

    rightBtn.addEventListener('click', () => {
        if (currentIndex < icons.length - 5) {
            currentIndex++;
            updateIcons();
        }
    });

    updateIcons();

    // 在初始化时，为第一个图标添加 active 类
    function initializeActiveIcon() {
        const firstIcon = icons[0];
        firstIcon.classList.add('active');
        updateHeroAndBackground(firstIcon.getAttribute('data-hero'), firstIcon);
    }

    // 在 DOMContentLoaded 事件的最后调用这个函数
    initializeActiveIcon();




// 游戏模式数据
const gameModeData = {
    arena: {
        background: 'url("./images/峡谷背景图/竞技场背景图.webp")',
        video: './images/峡谷视频/竞技场视频.mp4'
    },
    'summoners-rift': {
        background: 'url("./images/峡谷背景图/召唤师峡谷背景图.webp")',
        video: './images/峡谷视频/召唤师峡谷视频.mp4'
    },
    aram: {
        background: 'url("./images/峡谷背景图/大乱斗背景图.webp")',
        video: './images/峡谷视频/大乱斗视频.mp4'
    },
    tft: {
        background: 'url("./images/峡谷背景图/云顶之弈背景图.webp")',
        video: './images/峡谷视频/云顶之弈视频.mp4'
    }
};

// 获取所有游戏模式项
const gameModeItems = document.querySelectorAll('.gameplay-img-item');
const gameplaySection = document.querySelector('.gameplay-section');
const gameplayVideo = document.querySelector('.gameplay-video video');

function setActiveGameMode(clickedItem) {
    // 移除所有项的活动状态
    gameModeItems.forEach(item => item.classList.remove('active'));
    // 为当前点击的项添加活动状态
    clickedItem.classList.add('active');

    const mode = clickedItem.getAttribute('data-mode');
    const modeData = gameModeData[mode];
    
    if (modeData) {
        // 更新背景图
        gameplaySection.style.backgroundImage = modeData.background;
        
        // 更新视频
        gameplayVideo.src = modeData.video;
        gameplayVideo.load(); // 重新加载视频
        gameplayVideo.play(); // 播放新视频
    }
}

// 为每个游戏模式项添加点击事件
gameModeItems.forEach(item => {
    item.addEventListener('click', function() {
        setActiveGameMode(this);
    });
});

// 初始化默认选中的游戏模式（这里假设默认是竞技场）
setActiveGameMode(gameModeItems[0]);

});