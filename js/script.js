// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 获取所有需要的元素
    const welcomeBtn = document.getElementById('welcomeBtn');
    const themeToggle = document.getElementById('themeToggle');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const counter = document.getElementById('counter');
    const textInput = document.getElementById('textInput');
    const textDisplay = document.getElementById('textDisplay');
    const colorPicker = document.getElementById('colorPicker');
    const resetColor = document.getElementById('resetColor');
    const slideshowImg = document.getElementById('slideshowImg');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const currentTime = document.getElementById('currentTime');

    // 全局变量
    let count = 0;
    let currentSlide = 0;
    const slideImages = [
        'images/sample1.svg',
        'images/sample2.svg',
        'images/sample3.svg'
    ];

    // 欢迎按钮点击事件
    welcomeBtn.addEventListener('click', function() {
        alert('欢迎来到我的网站！这是一个部署学习项目。');
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // 主题切换功能
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.textContent = '切换到亮色主题';
            localStorage.setItem('theme', 'dark');
        } else {
            this.textContent = '切换到暗色主题';
            localStorage.setItem('theme', 'light');
        }
    });

    // 页面加载时恢复主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '切换到亮色主题';
    }

    // 计数器功能
    function updateCounter() {
        counter.textContent = count;
        counter.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 200);
    }

    decreaseBtn.addEventListener('click', function() {
        count--;
        updateCounter();
    });

    increaseBtn.addEventListener('click', function() {
        count++;
        updateCounter();
    });

    // 实时文字显示
    textInput.addEventListener('input', function() {
        const inputText = this.value;
        if (inputText.trim() === '') {
            textDisplay.textContent = '您输入的文字将在这里显示';
            textDisplay.style.fontStyle = 'italic';
            textDisplay.style.color = '#999';
        } else {
            textDisplay.textContent = inputText;
            textDisplay.style.fontStyle = 'normal';
            textDisplay.style.color = '#333';
        }
    });

    // 颜色选择器
    colorPicker.addEventListener('change', function() {
        const selectedColor = this.value;
        document.body.style.backgroundColor = selectedColor;
        
        // 如果选择了深色，自动调整文字颜色
        const rgb = hexToRgb(selectedColor);
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        
        if (brightness < 128) {
            document.body.style.color = '#ffffff';
        } else {
            document.body.style.color = '#333333';
        }
    });

    // 重置颜色
    resetColor.addEventListener('click', function() {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        colorPicker.value = '#ffffff';
    });

    // 颜色转换函数
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // 图片轮播功能
    function updateSlideshow() {
        slideshowImg.src = slideImages[currentSlide];
        slideCounter.textContent = `${currentSlide + 1} / ${slideImages.length}`;
        
        // 添加淡入效果
        slideshowImg.style.opacity = '0';
        setTimeout(() => {
            slideshowImg.style.opacity = '1';
        }, 100);
    }

    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slideImages.length) % slideImages.length;
        updateSlideshow();
    });

    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slideImages.length;
        updateSlideshow();
    });

    // 自动轮播（可选）
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slideImages.length;
        updateSlideshow();
    }, 5000); // 每5秒自动切换

    // 实时时间显示
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        currentTime.textContent = timeString;
    }

    // 每秒更新时间
    updateTime();
    setInterval(updateTime, 1000);

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 图片加载错误处理
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+acquWKoOi9veWksei0pTwvdGV4dD48L3N2Zz4=';
            this.alt = '图片加载失败';
        });
    });

    // 页面加载完成提示
    console.log('🎉 页面加载完成！所有交互功能已就绪。');
    console.log('📱 这是一个学习部署的示例项目');
    console.log('🌐 即将部署到 Netlify');

});
