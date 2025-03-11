window.addEventListener('load', function() {
    // Character Animation Canvas
    const characterCanvas = document.getElementById('characterCanvas');
    characterCanvas.width = 400;
    characterCanvas.height = 400;
    const ctx = characterCanvas.getContext('2d');

    // Parallax Canvas
    const parallaxCanvas = document.getElementById('parallaxCanvas');
    parallaxCanvas.width = 800;
    parallaxCanvas.height = 400;
    const pCtx = parallaxCanvas.getContext('2d');

    // Character sprite
    class Character {
        constructor() {
            this.image = new Image();
            this.image.src = '/images/viking.jpg';
            this.spriteWidth = 16;
            this.spriteHeight = 18;
            this.width = 64;
            this.height = 72;
            this.x = 200;
            this.y = 200;
            this.frame = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.moving = false;
        }

        draw(context) {
            context.drawImage(
                this.image,
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        update() {
            if (this.moving) {
                this.frameX = this.frame % 4;
                if (this.frame % 10 === 0) {
                    this.frameY = (this.frameY + 1) % 4;
                }
            } else {
                this.frameX = 0;
                this.frameY = 0;
            }
            this.frame++;
        }
    }

    // Parallax background layers
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 400;
            this.x2 = this.width;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = 5 * speedModifier;
        }

        update() {
            this.x = this.x - this.speed;
            if (this.x <= -this.width) {
                this.x = this.width + this.x2 - this.speed;
            }
            this.x2 = this.x - this.speed;
            if (this.x2 <= -this.width) {
                this.x2 = this.width + this.x - this.speed;
            }
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x2, this.y, this.width, this.height);
        }
    }

    // Create character instance
    const character = new Character();

    // Load parallax background images
    const backgroundLayers = [];
    const layerImages = [
        'https://raw.githubusercontent.com/frankarendpoth/frankarendpoth.github.io/master/content/pop-vlog/javascript/2017/015-parallax/background_0.png',
        'https://raw.githubusercontent.com/frankarendpoth/frankarendpoth.github.io/master/content/pop-vlog/javascript/2017/015-parallax/background_1.png',
        'https://raw.githubusercontent.com/frankarendpoth/frankarendpoth.github.io/master/content/pop-vlog/javascript/2017/015-parallax/background_2.png',
        'https://raw.githubusercontent.com/frankarendpoth/frankarendpoth.github.io/master/content/pop-vlog/javascript/2017/015-parallax/background_3.png'
    ];

    let loadedImages = 0;
    layerImages.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            backgroundLayers[index] = new Layer(img, (index + 1) * 0.2);
            loadedImages++;
            if (loadedImages === layerImages.length) {
                animate();
                animateParallax();
            }
        };
    });

    // Animation functions
    function animate() {
        ctx.clearRect(0, 0, characterCanvas.width, characterCanvas.height);
        character.moving = true;
        character.draw(ctx);
        character.update();
        requestAnimationFrame(animate);
    }

    function animateParallax() {
        pCtx.clearRect(0, 0, parallaxCanvas.width, parallaxCanvas.height);

        backgroundLayers.forEach(layer => {
            layer.update();
            layer.draw(pCtx);
        });

        // Draw a simple character in the parallax scene
        pCtx.fillStyle = 'red';
        pCtx.fillRect(100, 200, 50, 50);

        requestAnimationFrame(animateParallax);
    }

    // Event listeners for character movement
    window.addEventListener('keydown', function(e) {
        character.moving = true;
    });

    window.addEventListener('keyup', function(e) {
        character.moving = false;
    });
});