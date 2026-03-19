import { useEffect, useRef } from 'react';

export default function HeroGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isPlaying = false;
    let isGameOver = false;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('fishRunnerHighScore') || '0', 10);
    let frameCount = 0;
    let speed = 2; // 1/3 of previous speed
    
    const fish = {
      x: 50,
      y: 0,
      w: 40,
      h: 24,
      vy: 0,
      gravity: 0.25,
      thrust: 0,
      jumps: 0,
      isGrounded: true
    };
    
    let obstacles: any[] = [];
    let groundY = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        // Move game up: instead of height - 80, use height / 2 + 50
        groundY = Math.floor(canvas.height / 2 + 80);
        if (!isPlaying && !isGameOver) {
          fish.y = groundY - fish.h;
        }
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const resetGame = () => {
      score = 0;
      speed = 2;
      obstacles = [];
      fish.y = groundY - fish.h;
      fish.vy = 0;
      fish.thrust = 0;
      fish.jumps = 0;
      fish.isGrounded = true;
      isPlaying = true;
      isGameOver = false;
      frameCount = 0;
    };

    const handleInput = () => {
      if (isGameOver) {
        resetGame();
        return;
      }
      if (!isPlaying) {
        resetGame();
        return;
      }
      if (fish.jumps < 2) {
        fish.vy = -2; // Start with slow upward velocity
        fish.thrust = 10; // Apply thrust for 10 frames to accelerate upwards
        fish.jumps++;
        fish.isGrounded = false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousedown', handleInput);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInput(); }, { passive: false });

    // Hand-drawn jitter helper
    const j = (val: number) => val + (Math.random() - 0.5) * 1.5;

    const drawFish = (x: number, y: number, w: number, h: number, frame: number) => {
      ctx.save();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Body (ellipse-like)
      ctx.beginPath();
      ctx.ellipse(j(x + w/2), j(y + h/2), w/2, h/2, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Tail
      ctx.beginPath();
      const tailWag = fish.isGrounded ? 0 : Math.sin(frame * 0.5) * 6;
      ctx.moveTo(j(x), j(y + h/2));
      ctx.lineTo(j(x - 12), j(y + h/2 - 10 + tailWag));
      ctx.lineTo(j(x - 12), j(y + h/2 + 10 + tailWag));
      ctx.closePath();
      ctx.stroke();

      // Eye
      ctx.beginPath();
      ctx.arc(j(x + w * 0.75), j(y + h * 0.35), 2, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Fin
      ctx.beginPath();
      const finWag = fish.isGrounded ? 0 : Math.sin(frame * 0.5 + 1) * 4;
      ctx.moveTo(j(x + w * 0.4), j(y + h * 0.5));
      ctx.lineTo(j(x + w * 0.3), j(y + h * 0.8 + finWag));
      ctx.lineTo(j(x + w * 0.5), j(y + h * 0.6));
      ctx.stroke();

      // Bubbles from mouth
      if (frame % 60 < 40 && !fish.isGrounded) {
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        // Alternating up-down pattern
        const isUp = Math.floor(frame / 15) % 2 === 0;
        const bY = y + h * 0.4 - (frame % 20) + (isUp ? -5 : 5);
        ctx.arc(j(x + w + 5 + (isUp ? 0 : 5)), j(bY), 1.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCoral = (x: number, y: number, w: number, h: number) => {
      ctx.save();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Main stem
      ctx.beginPath();
      ctx.moveTo(j(x + w/2), j(y + h));
      ctx.quadraticCurveTo(j(x + w*0.8), j(y + h*0.6), j(x + w/2), j(y + h*0.2));
      
      // Side branch 1
      ctx.moveTo(j(x + w*0.65), j(y + h*0.5));
      ctx.quadraticCurveTo(j(x + w), j(y + h*0.4), j(x + w*0.9), j(y + h*0.1));

      // Side branch 2
      ctx.moveTo(j(x + w*0.4), j(y + h*0.7));
      ctx.quadraticCurveTo(j(x), j(y + h*0.6), j(x + w*0.1), j(y + h*0.3));

      ctx.stroke();

      // Coral pores
      ctx.beginPath();
      ctx.strokeStyle = '#000000';
      ctx.arc(j(x + w*0.5), j(y + h*0.4), 1.5, 0, Math.PI*2);
      ctx.arc(j(x + w*0.8), j(y + h*0.3), 1, 0, Math.PI*2);
      ctx.arc(j(x + w*0.2), j(y + h*0.5), 1.5, 0, Math.PI*2);
      ctx.stroke();

      ctx.restore();
    };

    const drawRock = (x: number, y: number, w: number, h: number) => {
      ctx.save();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Rock outline
      ctx.beginPath();
      ctx.moveTo(j(x), j(y + h));
      ctx.lineTo(j(x + w * 0.2), j(y + h * 0.4));
      ctx.lineTo(j(x + w * 0.5), j(y + h * 0.2));
      ctx.lineTo(j(x + w * 0.8), j(y + h * 0.5));
      ctx.lineTo(j(x + w), j(y + h));
      ctx.stroke();

      // Inner details
      ctx.beginPath();
      ctx.moveTo(j(x + w * 0.3), j(y + h * 0.6));
      ctx.lineTo(j(x + w * 0.6), j(y + h * 0.8));
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.stroke();

      ctx.restore();
    };

    const drawSeabed = (width: number, y: number, offset: number) => {
      ctx.save();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, j(y));
      
      // Smoother, wider waves for seabed
      for (let i = 0; i < width; i += 20) {
        const wave = Math.sin((i + offset) * 0.02) * 4;
        ctx.lineTo(i, j(y + wave));
      }
      ctx.stroke();
      
      // Seabed texture (sand and rising bubbles)
      ctx.fillStyle = '#000000';
      for (let i = 0; i < width; i += 50) {
        const dotX = (i - offset % 50);
        if (dotX > 0 && dotX < width) {
           ctx.fillRect(j(dotX), j(y + 10 + Math.sin(i)*5), 1.5, 1.5);
           if (i % 100 === 0) {
             ctx.beginPath();
             ctx.strokeStyle = '#000000';
             // Alternating up-down pattern for seabed bubbles
             const altOffset = (i % 200 === 0) ? 0 : 40;
             const bubbleY = y - 10 - ((offset * 0.15 + altOffset) % 80);
             ctx.arc(j(dotX + 15), j(bubbleY), 1.5, 0, Math.PI*2);
             ctx.stroke();
           }
        }
      }
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isPlaying && !isGameOver) {
        drawSeabed(canvas.width, groundY, 0);
        drawFish(fish.x, groundY - fish.h, fish.w, fish.h, 0);
        
        ctx.fillStyle = '#000000';
        ctx.font = '16px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Press Space or Click to Start', canvas.width / 2, groundY + 40);
        
        animationFrameId = requestAnimationFrame(update);
        return;
      }
      
      if (isPlaying) {
        frameCount++;
        score += 0.02;
        speed += 0.0005; // gradually increase speed
        
        // Physics: Slow to fast upward jump
        if (fish.thrust > 0) {
          fish.vy -= 0.6; // Accelerate upwards
          fish.thrust--;
        }
        fish.vy += fish.gravity;
        fish.y += fish.vy;
        
        if (fish.y + fish.h >= groundY) {
          fish.y = groundY - fish.h;
          fish.vy = 0;
          fish.jumps = 0;
          fish.isGrounded = true;
        }
        
        // Obstacles
        // Spawn logic (frequency increased by 1/4)
        if (frameCount % Math.floor(Math.random() * 180 + 144) === 0) {
          const obsType = Math.random();
          const isCoral = Math.random() > 0.5;
          obstacles.push({
            x: canvas.width,
            y: groundY - (obsType > 0.5 ? 45 : 35),
            w: obsType > 0.5 ? 25 : 18,
            h: obsType > 0.5 ? 45 : 35,
            type: isCoral ? 'coral' : 'rock'
          });
        }
        
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.x -= speed;
          
          // Collision detection
          const hitBoxShrinkX = 8;
          const hitBoxShrinkY = 6;
          if (
            fish.x + hitBoxShrinkX < obs.x + obs.w &&
            fish.x + fish.w - hitBoxShrinkX > obs.x &&
            fish.y + hitBoxShrinkY < obs.y + obs.h &&
            fish.y + fish.h - hitBoxShrinkY > obs.y
          ) {
            isGameOver = true;
            isPlaying = false;
            if (score > highScore) {
              highScore = Math.floor(score);
              localStorage.setItem('fishRunnerHighScore', highScore.toString());
            }
          }
          
          if (obs.x + obs.w < 0) {
            obstacles.splice(i, 1);
          }
        }
      }
      
      // Draw
      drawSeabed(canvas.width, groundY, isGameOver ? 0 : frameCount * speed);
      
      obstacles.forEach(obs => {
        if (obs.type === 'coral') {
          drawCoral(obs.x, obs.y, obs.w, obs.h);
        } else {
          drawRock(obs.x, obs.y, obs.w, obs.h);
        }
      });
      
      drawFish(fish.x, fish.y, fish.w, fish.h, frameCount);
      
      // Score
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.font = 'bold 20px "Inter", sans-serif';
      ctx.textAlign = 'right';
      const currentScoreStr = Math.floor(score).toString().padStart(5, '0');
      const highScoreStr = highScore > 0 ? `HI ${highScore.toString().padStart(5, '0')} ` : '';
      ctx.fillText(`${highScoreStr}${currentScoreStr}`, canvas.width - 30, 40);
      
      if (isGameOver) {
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 32px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, groundY - 60);
        ctx.font = '16px "Inter", sans-serif';
        ctx.fillText('Press Space or Click to Restart', canvas.width / 2, groundY - 30);
      }
      
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('mousedown', handleInput);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-transparent">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
