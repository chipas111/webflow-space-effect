// Space Effect - Vanilla JS version
(function(window) {
    'use strict';

    // SpaceEffect constructor
    function SpaceEffect(options) {
        if (typeof window.THREE === 'undefined') {
            throw new Error('THREE is not loaded. Please load Three.js before initializing SpaceEffect');
        }

        options = options || {};
        this.container = options.container || document.body;
        this.speed = options.speed || 1;
        this.starCount = options.starCount || 1000;
        this.isPaused = false;

        this.init();
    }

    // Initialize the effect
    SpaceEffect.prototype.init = function() {
        // Setup scene
        this.scene = new window.THREE.Scene();
        this.camera = new window.THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 1;
        this.camera.rotation.x = Math.PI/2;

        // Setup renderer
        this.renderer = new window.THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // Create stars
        var geometry = new window.THREE.BufferGeometry();
        var positions = new Float32Array(this.starCount * 3);

        for (var i = 0; i < this.starCount; i++) {
            positions[i * 3] = Math.random() * 600 - 300;
            positions[i * 3 + 1] = Math.random() * 600 - 300;
            positions[i * 3 + 2] = Math.random() * 600 - 300;
        }

        geometry.setAttribute('position', new window.THREE.BufferAttribute(positions, 3));
        
        var material = new window.THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            sizeAttenuation: true
        });

        this.stars = new window.THREE.Points(geometry, material);
        this.scene.add(this.stars);

        // Start animation
        this.animate();

        // Handle window resize
        this._onWindowResizeBound = this.onWindowResize.bind(this);
        window.addEventListener('resize', this._onWindowResizeBound);
    };

    // Animation loop
    SpaceEffect.prototype.animate = function() {
        if (!this.isPaused) {
            var positions = this.stars.geometry.attributes.position.array;

            for (var i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= this.speed;

                if (positions[i + 1] < -200) {
                    positions[i + 1] = 200;
                }
            }

            this.stars.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    };

    // Window resize handler
    SpaceEffect.prototype.onWindowResize = function() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Public methods
    SpaceEffect.prototype.setSpeed = function(speed) {
        this.speed = speed;
    };

    SpaceEffect.prototype.pause = function() {
        this.isPaused = true;
    };

    SpaceEffect.prototype.resume = function() {
        this.isPaused = false;
    };

    SpaceEffect.prototype.destroy = function() {
        window.removeEventListener('resize', this._onWindowResizeBound);
        this.container.removeChild(this.renderer.domElement);
        this.renderer.dispose();
    };

    // Add to global scope
    window.SpaceEffect = SpaceEffect;

})(window); 