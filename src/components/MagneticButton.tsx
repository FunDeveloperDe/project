import { useRef, useState, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  onClick
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    const targetX = (distX / distance) * Math.min(distance, 50) * 0.2;
    const targetY = (distY / distance) * Math.min(distance, 50) * 0.2;

    if (!isAnimating) {
      setIsAnimating(true);
      const animate = () => {
        offsetX.current += (targetX - offsetX.current) * 0.12;
        offsetY.current += (targetY - offsetY.current) * 0.12;

        if (elementRef.current) {
          elementRef.current.style.transform = `translate(${offsetX.current}px, ${offsetY.current}px)`;
        }

        if (Math.abs(targetX - offsetX.current) > 0.5 || Math.abs(targetY - offsetY.current) > 0.5) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      animate();
    }
  };

  const handleMouseLeave = () => {
    const decay = () => {
      offsetX.current *= 0.8;
      offsetY.current *= 0.8;

      if (elementRef.current) {
        elementRef.current.style.transform = `translate(${offsetX.current}px, ${offsetY.current}px)`;
      }

      if (Math.abs(offsetX.current) > 0.1 || Math.abs(offsetY.current) > 0.1) {
        requestAnimationFrame(decay);
      }
    };
    decay();
  };

  const props = {
    ref: elementRef,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { willChange: 'transform' }
  };

  if (as === 'a') {
    return (
      <a
        {...props}
        href={href}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
