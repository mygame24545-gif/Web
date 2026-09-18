// 3D PARKOUR OBBY - CORE ENGINE
let scene, camera, renderer, sunLight;
let currentLevelIndex = 1;
let isGamePaused = false;

function initEngine() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.FogExp2(0x87ceeb, 0.012);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    sunLight = new THREE.DirectionalLight(0xffffff, 0.85);
    sunLight.position.set(30, 50, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    window.addEventListener('resize', onWindowResize);
    
    // Hide loading screen
    document.getElementById('loading-screen').classList.add('hidden');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function startGame() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('hud-layer').classList.remove('hidden');
    
    initPlayer();
    buildLevel(currentLevelIndex);
    animate();
}

function pauseGame() {
    isGamePaused = !isGamePaused;
    if (isGamePaused) {
        document.getElementById('main-menu').classList.remove('hidden');
    } else {
        document.getElementById('main-menu').classList.add('hidden');
    }
}

function animate() {
    if (!isGamePaused) {
        requestAnimationFrame(animate);
        updatePlayerPhysics();
        updatePlatforms();
        renderer.render(scene, camera);
    }
}

window.onload = () => {
    initEngine();
};
