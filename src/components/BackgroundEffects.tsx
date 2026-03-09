import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

export const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let raf = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];

    const createParticles = () => {
      const count = Math.min(60, Math.max(24, Math.floor((width * height) / 30000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createParticles();
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= -8) particle.x = width + 8;
        if (particle.x >= width + 8) particle.x = -8;
        if (particle.y <= -8) particle.y = height + 8;
        if (particle.y >= height + 8) particle.y = -8;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(104, 224, 255, 0.55)";
        context.shadowBlur = 12;
        context.shadowColor = "rgba(87, 243, 255, 0.8)";
        context.fill();
      }

      context.shadowBlur = 0;
      raf = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="background-effects" aria-hidden>
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="cyber-grid" />
      <div className="ambient-glow" />
    </div>
  );
};
