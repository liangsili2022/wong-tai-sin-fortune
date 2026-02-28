let fortuneData = [];
let currentFortune = null;

// 加载签文数据
fetch('fortune-data.json')
    .then(response => response.json())
    .then(data => {
        fortuneData = data;
        initializeApp();
    })
    .catch(error => {
        console.error('加载签文数据失败:', error);
        alert('加载签文数据失败，请检查网络或文件路径');
    });

function initializeApp() {
    const drawBtn = document.getElementById('drawBtn');
    const resetBtn = document.getElementById('resetBtn');
    const viewAllBtn = document.getElementById('viewAllBtn');
    const closeAllBtn = document.getElementById('closeAllBtn');

    drawBtn.addEventListener('click', drawFortune);
    resetBtn.addEventListener('click', resetFortune);
    viewAllBtn.addEventListener('click', viewAllFortunes);
    closeAllBtn.addEventListener('click', closeAllFortunes);
}

function drawFortune() {
    const lotteryStick = document.getElementById('lotteryStick');
    const drawBtn = document.getElementById('drawBtn');
    const resetBtn = document.getElementById('resetBtn');
    const result = document.getElementById('result');

    // 添加摇动动画
    lotteryStick.classList.add('shaking');
    drawBtn.disabled = true;

    // 模拟抽签过程
    setTimeout(() => {
        // 随机选择一支签
        const randomIndex = Math.floor(Math.random() * fortuneData.length);
        currentFortune = fortuneData[randomIndex];

        // 更新签号显示
        document.getElementById('stickNumber').textContent = currentFortune.number;

        // 停止动画并显示结果
        lotteryStick.classList.remove('shaking');
        displayFortuneResult();

        // 切换按钮状态
        drawBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
        result.style.display = 'block';
    }, 1500);
}

function displayFortuneResult() {
    document.getElementById('fortuneTitle').textContent = `第${currentFortune.number}签`;
    document.getElementById('fortuneLevel').textContent = currentFortune.level;
    document.getElementById('fortuneText').innerHTML = `<p>${currentFortune.text}</p>`;
    document.getElementById('fortuneInterpretation').innerHTML = `<h3>解签</h3><p>${currentFortune.interpretation}</p>`;
}

function resetFortune() {
    const lotteryStick = document.getElementById('lotteryStick');
    const drawBtn = document.getElementById('drawBtn');
    const resetBtn = document.getElementById('resetBtn');
    const result = document.getElementById('result');

    // 重置状态
    lotteryStick.innerHTML = '<span id="stickNumber">?</span>';
    drawBtn.style.display = 'inline-block';
    drawBtn.disabled = false;
    resetBtn.style.display = 'none';
    result.style.display = 'none';
    currentFortune = null;
}

function viewAllFortunes() {
    const allFortunes = document.getElementById('allFortunes');
    const fortuneList = document.getElementById('fortuneList');

    // 清空列表
    fortuneList.innerHTML = '';

    // 生成所有签文列表
    fortuneData.forEach(fortune => {
        const fortuneItem = document.createElement('div');
        fortuneItem.className = 'fortune-item';
        fortuneItem.innerHTML = `
            <h4>第${fortune.number}签 - ${fortune.level}</h4>
            <p><strong>签文：</strong>${fortune.text}</p>
            <p><strong>解签：</strong>${fortune.interpretation}</p>
        `;
        fortuneList.appendChild(fortuneItem);
    });

    allFortunes.style.display = 'block';
}

function closeAllFortunes() {
    const allFortunes = document.getElementById('allFortunes');
    allFortunes.style.display = 'none';
}