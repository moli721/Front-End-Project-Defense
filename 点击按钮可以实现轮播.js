document.addEventListener('DOMContentLoaded', function() {
    const iconList = document.querySelector('.icon-list');
    const icons = document.querySelectorAll('.icon-tab');
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
        updateHeroAndBackground();
    }

    function updateButtons() {
        leftBtn.disabled = currentIndex === 0;
        rightBtn.disabled = currentIndex >= icons.length - 5;
        leftBtn.classList.toggle('active', !leftBtn.disabled);
        rightBtn.classList.toggle('active', !rightBtn.disabled);
    }

    function updateProcessBar() {
        const totalGroups = Math.ceil(icons.length / 5);
        const processWidth = 100 / totalGroups;
        processBar.style.width = `${processWidth}%`;
        processBar.style.left = `${processWidth * currentIndex}%`;
    }

    function updateHeroAndBackground() {
        const currentHero = heroData[currentIndex];
        heroImg.src = `./images/英雄/${currentHero.hero}.webp`;
        heroImg.alt = currentHero.hero;
        hexoContainer.style.backgroundImage = currentHero.background;
    }

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
});