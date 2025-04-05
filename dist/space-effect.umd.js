(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.SpaceEffect = factory());
})(this, function() {
  "use strict";
  class SpaceEffect {
    constructor(options = {}) {
      if (typeof window.THREE === "undefined") {
        throw new Error("THREE is not loaded. Please load Three.js before initializing SpaceEffect");
      }
      this.container = options.container || document.body;
      this.speed = options.speed || 1;
      this.starCount = options.starCount || 1e3;
      this.isPaused = false;
      this.init();
    }
    init() {
      this.scene = new window.THREE.Scene();
      this.camera = new window.THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1e3);
      this.camera.position.z = 1;
      this.camera.rotation.x = Math.PI / 2;
      this.renderer = new window.THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);
      const geometry = new window.THREE.BufferGeometry();
      const positions = new Float32Array(this.starCount * 3);
      for (let i = 0; i < this.starCount; i++) {
        positions[i * 3] = Math.random() * 600 - 300;
        positions[i * 3 + 1] = Math.random() * 600 - 300;
        positions[i * 3 + 2] = Math.random() * 600 - 300;
      }
      geometry.setAttribute("position", new window.THREE.BufferAttribute(positions, 3));
      const material = new window.THREE.PointsMaterial({
        color: 16777215,
        size: 2,
        sizeAttenuation: true
      });
      this.stars = new window.THREE.Points(geometry, material);
      this.scene.add(this.stars);
      this.animate();
      window.addEventListener("resize", this.onWindowResize.bind(this));
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
      window.removeEventListener("resize", this.onWindowResize.bind(this));
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
  return SpaceEffect;
});
//# sourceMappingURL=space-effect.umd.js.map
