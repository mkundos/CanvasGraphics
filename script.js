console.log('Hello!');

const buttonClickHandler = () => {
  const canvas = document.getElementById('canvas_1');
  const ctx = canvas.getContext('2d');

  const text = document.getElementById('text').value;
  console.log(text);

  ctx.font = '24px Arial';
  ctx.fillStyle = 'blue';
  ctx.fillText(text, 350, 350);
};

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas_1');
  canvas.width = 1500;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d'); // required

  ctx.fillStyle = 'red';
  ctx.fillRect(50, 80, 100, 200);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.strokeRect(180, 150, 100, 80);

  // Triangle
  ctx.beginPath();
  ctx.moveTo(500, 50); // Starting point
  ctx.lineTo(680, 130); // Line to bottom-left
  ctx.lineTo(450, 430); // Line to bottom-right
  ctx.closePath(); // Closes the path back to start
  ctx.fillStyle = '#2ecc71';
  ctx.fill();

  // ============= Text =============

  ctx.font = '24px Arial';
  ctx.fillStyle = 'blue';
  ctx.fillText('Canvas Tutorial', 250, 250);

  // ============= Gradients =============

  // Linear Gradient
  const gradient = ctx.createLinearGradient(50, 250, 250, 250);
  gradient.addColorStop(0, '#f1c40f');
  gradient.addColorStop(1, '#e67e22');

  ctx.fillStyle = gradient;
  ctx.fillRect(50, 250, 200, 100);

  // Radial Gradient
  const radialGradient = ctx.createRadialGradient(600, 300, 10, 600, 300, 70);
  radialGradient.addColorStop(0, '#ff7675');
  radialGradient.addColorStop(1, '#d63031');

  ctx.fillStyle = radialGradient;
  ctx.beginPath();
  ctx.arc(600, 300, 70, 0, Math.PI * 2);
  ctx.fill();

  // ============= Shadows =============

  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 15;
  ctx.shadowOffsetY = 35;

  ctx.fillStyle = '#e84393';
  ctx.fillRect(300, 250, 150, 100);

  // Reset shadows
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // ============= Bezier Curves =============
  ctx.beginPath();
  ctx.moveTo(300, 400);
  // Control point 1, Control point 2, End point
  ctx.bezierCurveTo(350, 350, 450, 450, 500, 400);
  ctx.strokeStyle = '#0984e3';
  ctx.lineWidth = 3;
  ctx.stroke();

  // ============= Image Drawing =============
  const img = new Image();
  img.src = 'https://picsum.photos/100/100'; // Random image from Lorem Picsum

  img.onload = function () {
    // Basic image drawing
    ctx.drawImage(img, 300, 450, 100, 100);

    // Draw image with clipping
    ctx.save();
    ctx.beginPath();
    ctx.arc(500, 500, 50, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 450, 450, 100, 100);
    ctx.restore();

    // Draw image with scaling and rotation
    ctx.save();
    ctx.translate(650, 500);
    ctx.rotate(Math.PI / 6); // 30 degrees
    ctx.scale(0.7, 0.7);
    ctx.drawImage(img, -50, -50, 100, 100);
    ctx.restore();
  };

  let angle = 0;

  function animate() {
    ctx.clearRect(100, 400, 200, 250);
    ctx.save();
    ctx.translate(200, 530);
    ctx.rotate(angle);

    ctx.fillStyle = `rgb(${angle * 100},0,0)`;
    ctx.fillRect(-50, -50, 100, 100);

    ctx.restore();
    angle += 0.02;

    requestAnimationFrame(animate);
  }

  animate();

  // ============= Video Drawing =============
  const video = document.createElement('video');
  video.src =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  video.crossOrigin = 'anonymous'; // Enable CORS
  video.loop = true;
  video.muted = true;

  // Error handling for video
  video.addEventListener('error', function (e) {
    console.error('Error loading video:', e);
    // Draw fallback content
    ctx.fillStyle = '#2d3436';
    ctx.fillRect(300, 150, 200, 150);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Video unavailable', 400, 225);
  });

  // Wait for video to load metadata
  video.addEventListener('loadedmetadata', function () {
    // Set video dimensions
    const videoWidth = 200;
    const videoHeight = (videoWidth / video.videoWidth) * video.videoHeight;

    // Position for video rendering
    const videoX = 1000;
    const videoY = 150;

    // Start playing the video
    video.play().catch(function (error) {
      console.error('Error playing video:', error);
    });

    // Render video frames
    function drawVideo() {
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.drawImage(video, videoX, videoY, videoWidth, videoHeight);
      }
      requestAnimationFrame(drawVideo);
    }

    drawVideo();
  });
});
