// 3D HUMANOID CHARACTER & FIXED JUMP PHYSICS
let playerGroup, playerBody, head;
let playerVelocity = new THREE.Vector3();
let isGrounded = false;

// Fixed Physics Parameters
const GRAVITY = -0.016;
const FIXED_JUMP_FORCE = 0.38;
const MOVE_SPEED = 0.16;

let joystickInput = { x: 0, y: 0 };

function initPlayer() {
    if (playerGroup) scene.remove(playerGroup);

    playerGroup = new THREE.Group();

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
    const torsoMat = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
    const limbMat = new THREE.MeshStandardMaterial({ color: 0x111111 });

    // Head
    const headGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.5;
    head.castShadow = true;
    playerGroup.add(head);

    // Torso
    const torsoGeo = new THREE.BoxGeometry(0.8, 1.0, 0.4);
    playerBody = new THREE.Mesh(torsoGeo, torsoMat);
    playerBody.position.y = 0.7;
    playerBody.castShadow = true;
    playerGroup.add(playerBody);

    // Left & Right Arms
    const armGeo = new THREE.BoxGeometry(0.3, 0.9, 0.3);
    const leftArm = new THREE.Mesh(armGeo, limbMat);
    leftArm.position.set(-0.6, 0.65, 0);
    playerGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, limbMat);
    rightArm.position.set(0.6, 0.65, 0);
    playerGroup.add(rightArm);

    // Left & Right Legs
    const legGeo = new THREE.BoxGeometry(0.35, 0.8, 0.35);
    const leftLeg = new THREE.Mesh(legGeo, limbMat);
    leftLeg.position.set(-0.22, -0.2, 0);
    playerGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, limbMat);
    rightLeg.position.set(0.22, -0.2, 0);
    playerGroup.add(rightLeg);

    playerGroup.position.set(0, 3, 0);
    scene.add(playerGroup);

    setupTouchControls();
}

function setupTouchControls() {
    const jumpBtn = document.getElementById('jump-button');
    jumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        triggerJump();
    });

    // Keyboard Fallback
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') triggerJump();
        if (e.code === 'KeyW') joystickInput.y = -1;
        if (e.code === 'KeyS') joystickInput.y = 1;
        if (e.code === 'KeyA') joystickInput.x = -1;
        if (e.code === 'KeyD') joystickInput.x = 1;
    });

    window.addEventListener('keyup', (e) => {
        if (['KeyW', 'KeyS'].includes(e.code)) joystickInput.y = 0;
        if (['KeyA', 'KeyD'].includes(e.code)) joystickInput.x = 0;
    });
}

function triggerJump() {
    if (isGrounded) {
        playerVelocity.y = FIXED_JUMP_FORCE;
        isGrounded = false;
    }
}

function updatePlayerPhysics() {
    if (!playerGroup) return;

    // Movement Logic
    playerGroup.position.x += joystickInput.x * MOVE_SPEED;
    playerGroup.position.z += joystickInput.y * MOVE_SPEED;

    // Gravity
    playerVelocity.y += GRAVITY;
    playerGroup.position.y += playerVelocity.y;

    // Platform Collisions
    isGrounded = false;
    levelPlatforms.forEach(p => {
        const pBox = new THREE.Box3().setFromObject(p);
        const playerBox = new THREE.Box3().setFromObject(playerGroup);

        if (playerBox.intersectsBox(pBox)) {
            if (playerGroup.position.y >= p.position.y + 0.5 && playerVelocity.y <= 0) {
                playerGroup.position.y = p.position.y + 1.0;
                playerVelocity.y = 0;
                isGrounded = true;
            }
        }
    });

    // Check Finish Platform Intersection
    if (finishPlatform) {
        const finishBox = new THREE.Box3().setFromObject(finishPlatform);
        const playerBox = new THREE.Box3().setFromObject(playerGroup);
        if (playerBox.intersectsBox(finishBox)) {
            onLevelComplete();
        }
    }

    // Respawn on Fall
    if (playerGroup.position.y < -15) {
        playerGroup.position.set(0, 3, 0);
        playerVelocity.set(0,0,0);
    }

    // Dynamic 3rd Person Camera
    camera.position.x = playerGroup.position.x;
    camera.position.y = playerGroup.position.y + 4.5;
    camera.position.z = playerGroup.position.z + 8.5;
    camera.lookAt(playerGroup.position);
        }
        
