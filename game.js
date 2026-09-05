// 1. CREATE THE 3D SCENE & CAMERA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue background
scene.fog = new THREE.FogExp2(0x87ceeb, 0.015); // Smooth fog for parkour platforms

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

// 2. CREATE THE 3D RENDERER (The Graphics Engine)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // High resolution on mobile
renderer.shadowMap.enabled = true; // Enables 3D platform shadows
document.body.appendChild(renderer.domElement);

// 3. ADD LIGHTING (Sunlight & Environment Light)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
sunLight.position.set(20, 40, 20);
sunLight.castShadow = true;
scene.add(sunLight);

// 4. HANDLE MOBILE RESIZING & ROTATION
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 5. MAIN 60-FPS ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    
    // Run player physics, controls, and gravity from player.js
    if (typeof updatePlayer === 'function') {
        updatePlayer();
    }
    
    // Render the 3D scene from the camera view
    renderer.render(scene, camera);
}

// Start rendering
animate();
