import { ReactNode } from 'react';

interface SpringTiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function SpringTiltCard({
  children,
  className = '',
  style
}: SpringTiltCardProps) {
  return (
    <div
      className={className}
      style={{
        ...style,
        transform: 'none',
        transition: 'transform 0.3s ease'
      }}
    >
      {children}
    </div>
  );
} 