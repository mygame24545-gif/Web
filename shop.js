// SHOP & REWARD ECONOMY ENGINE
let userCoins = parseInt(localStorage.getItem('obby_coins')) || 0;

function updateCoinDisplay() {
    document.getElementById('coin-count').innerText = userCoins;
    localStorage.setItem('obby_coins', userCoins);
}

function openShop() {
    document.getElementById('shop-modal').classList.remove('hidden');
    switchShopTab('characters');
}

function switchShopTab(tab) {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = '';

    if (tab === 'characters') {
        document.getElementById('tab-chars').classList.add('active');
        document.getElementById('tab-effects').classList.remove('active');

        for (let i = 1; i <= 50; i++) {
            const item = document.createElement('div');
            item.className = 'shop-card';
            item.innerHTML = `<p>Runner #${i}</p><button onclick="buyItem(500)">500 🪙</button>`;
            grid.appendChild(item);
        }
    } else {
        document.getElementById('tab-chars').classList.remove('active');
        document.getElementById('tab-effects').classList.add('active');

        for (let i = 1; i <= 100; i++) {
            const item = document.createElement('div');
            item.className = 'shop-card';
            item.innerHTML = `<p>Effect #${i}</p><button onclick="buyItem(250)">250 🪙</button>`;
            grid.appendChild(item);
        }
    }
}

function buyItem(cost) {
    if (userCoins >= cost) {
        userCoins -= cost;
        updateCoinDisplay();
        alert("Item Purchased!");
    } else {
        alert("Not enough coins! Watch a rewarded ad to earn +100 coins.");
    }
}

function triggerManualAdReward() {
    // Integrated AdSense for Games / AdMob Reward Callback Hook
    console.log("Triggering Rewarded Ad Unit...");
    setTimeout(() => {
        userCoins += 100;
        updateCoinDisplay();
        alert("Ad Watched! You earned +100 Coins!");
    }, 1000);
}

function triggerMilestoneAdReward() {
    alert("Level 3 Milestone Reached! Rewarded Ad Available.");
    triggerManualAdReward();
}

window.addEventListener('DOMContentLoaded', updateCoinDisplay);
