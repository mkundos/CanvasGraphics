window.addEventListener('load', function () {
  const canvas = document.getElementById('gameCanvas');
  canvas.width = 600;
  canvas.height = 500;
  const ctx = canvas.getContext('2d'); // required
  const startButton = document.getElementById('startGame');

  // Game state
  let gameStarted = false;
  let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 5,
    rotation: 0,
    isMoving: false,
    isTouchingEdge: false,
  };

  // Load player image
  const playerImage = new Image();
  playerImage.src = 'https://picsum.photos/40/40';

  // Game controls
  const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
  };

  // Event listeners
  window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = true;
    }
  });

  window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = false;
    }
  });

  startButton.addEventListener('click', () => {
    if (!gameStarted) {
      gameStarted = true;
      startButton.textContent = 'Game Running';
      startButton.disabled = true;
      gameLoop();
    }
  });

  // Load sound effects
  const moveSound = new Audio(
    'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
  );
  moveSound.loop = true;
  moveSound.volume = 0.3;

  const edgeSound = new Audio(
    'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
  );
  edgeSound.volume = 0.5;

  function updatePlayer() {
    const wasMoving = player.isMoving;
    const wasTouchingEdge = player.isTouchingEdge;
    player.isMoving = false;
    player.isTouchingEdge = false;

    // Move player based on key presses
    if (keys.ArrowLeft) {
      const newX = player.x - player.speed;
      if (newX <= player.radius) {
        player.x = player.radius;
        player.isTouchingEdge = true;
      } else {
        player.x = newX;
      }
      player.rotation -= 0.1;
      player.isMoving = true;
    }
    if (keys.ArrowRight) {
      const newX = player.x + player.speed;
      if (newX >= canvas.width - player.radius) {
        player.x = canvas.width - player.radius;
        player.isTouchingEdge = true;
      } else {
        player.x = newX;
      }
      player.rotation += 0.1;
      player.isMoving = true;
    }
    if (keys.ArrowUp) {
      const newY = player.y - player.speed;
      if (newY <= player.radius) {
        player.y = player.radius;
        player.isTouchingEdge = true;
      } else {
        player.y = newY;
      }
      player.isMoving = true;
    }
    if (keys.ArrowDown) {
      const newY = player.y + player.speed;
      if (newY >= canvas.height - player.radius) {
        player.y = canvas.height - player.radius;
        player.isTouchingEdge = true;
      } else {
        player.y = newY;
      }
      player.isMoving = true;
    }

    // Handle sound effects
    if (player.isMoving && !wasMoving) {
      moveSound.play();
    } else if (!player.isMoving && wasMoving) {
      moveSound.pause();
      moveSound.currentTime = 0;
    }

    if (player.isTouchingEdge && !wasTouchingEdge) {
      edgeSound.play();
    }
  }

  function drawPlayer() {
    ctx.save();

    // Move to player position
    ctx.translate(player.x, player.y);

    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(0, 0, player.radius, 0, Math.PI * 2);
    ctx.clip();

    // Apply rotation
    ctx.rotate(player.rotation);

    // Draw the image centered on the player position
    ctx.drawImage(
      playerImage,
      -player.radius,
      -player.radius,
      player.radius * 2,
      player.radius * 2
    );

    ctx.restore();
  }

  function gameLoop() {
    if (!gameStarted) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update game state
    updatePlayer();

    // Draw game objects
    drawPlayer();

    // Request next frame
    requestAnimationFrame(gameLoop);
  }

  // Draw initial canvas state
  ctx.fillStyle = '#f5f6fa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Arial';
  ctx.fillStyle = '#2d3436';
  ctx.textAlign = 'center';
  ctx.fillText(
    'Click "Start Game" to begin',
    canvas.width / 2,
    canvas.height / 2
  );
});
