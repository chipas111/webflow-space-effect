import * as THREE from 'three';

class SpaceEffect {
  constructor(options = {}) {
    this.container = options.container || document.body;
    this.speed = options.speed || 1;
    this.starCount = options.starCount || 1000;
    this.isPaused = false;

    this.init();
  }

  init() {
    // Setup scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = Math.PI/2;

    // Setup renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // Create stars
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.starCount * 3);

    for (let i = 0; i < this.starCount; i++) {
      positions[i * 3] = Math.random() * 600 - 300;
      positions[i * 3 + 1] = Math.random() * 600 - 300;
      positions[i * 3 + 2] = Math.random() * 600 - 300;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);

    // Start animation
    this.animate();

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  animate() {
    if (!this.isPaused) {
      const positions = this.stars.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= this.speed;

        if (positions[i + 1] < -200) {
          positions[i + 1] = 200;
        }
      }

      this.stars.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  destroy() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.container.removeChild(this.renderer.domElement);
    this.renderer.dispose();
  }
}

export default SpaceEffect; 