import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  icon?: string;
}

export default function Card({ title, children, className = '', icon }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 animate-scale-in ${className}`}>
      {title && (
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
          {icon && <span className="text-3xl">{icon}</span>}
          <h2 className="text-2xl font-display font-bold text-gray-800">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}
