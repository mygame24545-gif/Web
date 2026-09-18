// 100-LEVEL GENERATOR ENGINE
let levelPlatforms = [];
let finishPlatform = null;

function clearLevel() {
    levelPlatforms.forEach(p => scene.remove(p));
    levelPlatforms = [];
    if (finishPlatform) scene.remove(finishPlatform);
}

function buildLevel(levelNum) {
    clearLevel();

    // Theme Selector
    let platformColor = 0x2e8b57; // Grass/Nature (1-30)
    let skyColor = 0x87ceeb;

    if (levelNum > 30 && levelNum <= 65) {
        platformColor = 0xff007f; // Neon Sky (31-65)
        skyColor = 0x1a0033;
    } else if (levelNum > 65) {
        platformColor = 0x00dfff; // Ice Glacial (66-100)
        skyColor = 0xd0f4de;
    }

    scene.background.setHex(skyColor);
    scene.fog.color.setHex(skyColor);

    // 1. Starting Base Platform
    const startBase = createBlock(0, -0.5, 0, 8, 1, 8, 0x333333);
    
    // 2. Generate Platforms across predictability matrix
    let lastZ = 0;
    let lastY = 0;
    const totalBlocks = 8 + Math.min(levelNum, 25);

    for (let i = 0; i < totalBlocks; i++) {
        const gapZ = 5.5 + Math.random() * 2.5; // Guaranteed within fixed jump range
        const gapX = (Math.random() - 0.5) * 6;
        lastY += (Math.random() - 0.3) * 1.5;
        lastZ -= gapZ;

        const p = createBlock(gapX, lastY, lastZ, 3.5, 0.8, 3.5, platformColor);
        levelPlatforms.push(p);
    }

    // 3. Gold Finish Pad
    finishPlatform = createBlock(0, lastY + 1, lastZ - 8, 6, 1, 6, 0xffd700);
    document.getElementById('level-display').innerText = `LEVEL ${levelNum}`;
}

function createBlock(x, y, z, w, h, d, color) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);
    return mesh;
}

function updatePlatforms() {
    // Reserved for moving/rotating platform logic in levels 30+
}

function onLevelComplete() {
    currentLevelIndex++;
    if (currentLevelIndex % 3 === 0) {
        triggerMilestoneAdReward();
    }
    buildLevel(currentLevelIndex);
    playerGroup.position.set(0, 3, 0);
}
