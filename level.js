// Array to store all platforms so our player can land on them
const platforms = [];

// Helper function to generate a 3D block platform
function createPlatform(x, y, z, width, height, depth, color = 0xffffff) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.4 
    });
    const platform = new THREE.Mesh(geometry, material);
    
    platform.position.set(x, y, z);
    platform.receiveShadow = true;
    platform.castShadow = true;
    
    scene.add(platform);
    platforms.push(platform);
    return platform;
}

// 1. STARTING PLATFORM (Green Floor)
createPlatform(0, -1, 0, 10, 1, 10, 0x2e8b57);

// 2. FLOATING PARKOUR JUMP BLOCKS (Ascending Course)
createPlatform(0, 1, -12, 4, 1, 4, 0xffffff);
createPlatform(0, 3, -22, 4, 1, 4, 0xffffff);
createPlatform(6, 5, -30, 4, 1, 4, 0xffffff);
createPlatform(0, 7, -40, 4, 1, 4, 0xffffff);
createPlatform(-6, 9, -50, 4, 1, 4, 0xffffff);

// 3. FIRST CHECKPOINT PLATFORM (Gold/Yellow Floor)
createPlatform(0, 11, -62, 8, 1, 8, 0xffd700);
