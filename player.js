// 1. CREATE PLAYER CHARACTER (Red Box Hero)
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff3333 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.castShadow = true;
scene.add(player);

// Set spawn position
player.position.set(0, 3, 0);

// Physics & Movement state
let playerVelocity = new THREE.Vector3(0, 0, 0);
let isGrounded = false;
const gravity = -0.015;
const jumpForce = 0.35;
const moveSpeed = 0.15;

const input = { x: 0, y: 0 };

// 2. KEYBOARD CONTROLS (For PC Testing)
window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW' || e.code === 'ArrowUp') input.y = -1;
    if (e.code === 'KeyS' || e.code === 'ArrowDown') input.y = 1;
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') input.x = -1;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') input.x = 1;
    if (e.code === 'Space' && isGrounded) {
        playerVelocity.y = jumpForce;
        isGrounded = false;
    }
});

window.addEventListener('keyup', (e) => {
    if (['KeyW', 'KeyS', 'ArrowUp', 'ArrowDown'].includes(e.code)) input.y = 0;
    if (['KeyA', 'KeyD', 'ArrowLeft', 'ArrowRight'].includes(e.code)) input.x = 0;
});

// 3. UPDATE PLAYER PHYSICS & CAMERA
function updatePlayer() {
    // Horizontal Movement
    player.position.x += input.x * moveSpeed;
    player.position.z += input.y * moveSpeed;

    // Apply Gravity
    playerVelocity.y += gravity;
    player.position.y += playerVelocity.y;

    // Check Platform Collisions
    isGrounded = false;
    platforms.forEach(platform => {
        const pBox = new THREE.Box3().setFromObject(platform);
        const playerBox = new THREE.Box3().setFromObject(player);

        if (playerBox.intersectsBox(pBox)) {
            if (player.position.y >= platform.position.y + 0.8 && playerVelocity.y <= 0) {
                player.position.y = platform.position.y + 1.5;
                playerVelocity.y = 0;
                isGrounded = true;
            }
        }
    });

    // Respawn if player falls into the void
    if (player.position.y < -15) {
        player.position.set(0, 3, 0);
        playerVelocity.set(0, 0, 0);
    }

    // 3rd Person Camera Tracking
    camera.position.x = player.position.x;
    camera.position.y = player.position.y + 5;
    camera.position.z = player.position.z + 10;
    camera.lookAt(player.position);
}
