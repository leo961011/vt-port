import { useEffect } from 'react';
import styles from './mouseEffect.module.css';

const MouseEffect = () => {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = styles.mouseContainer;
    document.body.appendChild(container);

    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let moveTimeout;

    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      // Random offset for more natural movement
      const offsetX = (Math.random() - 0.5) * 10;
      const offsetY = (Math.random() - 0.5) * 10;
      
      particle.style.left = `${x + offsetX}px`;
      particle.style.top = `${y + offsetY}px`;
      
      // Random size between 2-4px for more density
      const size = Math.random() * 2 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Faster fade out for more density
      particle.style.animation = `${styles.fadeOut} 0.8s ease-out forwards`;
      
      container.appendChild(particle);
      particles.push(particle);

      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
        particles = particles.filter(p => p !== particle);
      }, 800);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;

      // Create more particles per movement for higher density
      for (let i = 0; i < 3; i++) {
        createParticle(mouseX, mouseY);
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 50);
    };

    const handleMouseDown = () => {
      // Create a burst of particles on click with reduced spread
      for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 * i) / 15;
        const distance = Math.random() * 20; // Reduced spread
        const x = mouseX + Math.cos(angle) * distance;
        const y = mouseY + Math.sin(angle) * distance;
        createParticle(x, y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      container.remove();
    };
  }, []);

  return null;
};

export default MouseEffect; 