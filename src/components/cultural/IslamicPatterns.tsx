
import React from 'react';
import { useCultural } from '@/contexts/CulturalContext';

interface IslamicPatternProps {
  type?: 'divider' | 'background' | 'border';
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({ 
  type = 'divider', 
  className = '', 
  color,
  size = 'md'
}) => {
  const { theme, religiousPreference } = useCultural();
  
  // Use provided color or default from theme
  const patternColor = color || theme.colors.primary;
  
  // Size mappings
  const sizeMap = {
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12'
  };
  
  // Pattern complexity based on religious preference
  const patternComplexity = {
    conservative: 'simple',
    moderate: 'standard',
    liberal: 'elaborate'
  };
  
  // Pattern type styles
  const typeStyles = {
    divider: 'w-full my-4',
    background: 'absolute inset-0 -z-10 opacity-10',
    border: 'absolute inset-0 opacity-80 pointer-events-none'
  };
  
  const selectedPattern = patternComplexity[religiousPreference];
  const heightClass = sizeMap[size];
  
  return (
    <div 
      className={`${typeStyles[type]} ${heightClass} ${className} overflow-hidden`}
      style={{ color: patternColor }}
    >
      {type === 'divider' && (
        <div className="relative w-full h-full">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent to-current opacity-30"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
            <div className="w-2 h-2 rounded-full bg-current mx-1"></div>
            <div className="w-3 h-3 rounded-full border-2 border-current mx-1"></div>
            <div className="w-4 h-4 rotate-45 border-2 border-current mx-1"></div>
            <div className="w-3 h-3 rounded-full border-2 border-current mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-current mx-1"></div>
          </div>
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent to-current opacity-30"></div>
        </div>
      )}
      
      {type === 'background' && (
        <div className="w-full h-full opacity-10" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0l6.364 6.364-1.414 1.414L41.2 0h2.12zM16.686 0L10.322 6.364l1.414 1.414L19.8 0h-3.114zM30 0l9.9 9.9-1.414 1.414L30 2.828 21.515 11.313 20.1 9.9 30 0zm13.656 0l12.728 12.728-1.414 1.414L43.97 3.142 42.556 4.556 55.284 17.284l-1.414 1.414L40.97 5.8l-1.414 1.414 13.557 13.556-1.414 1.414L39.142 8.628l-1.414 1.414L51.07 23.384l-1.414 1.414-15.556-15.556L32.686 10.657l18.385 18.385-1.414 1.414L30 10.8 13.543 27.257l-1.414-1.414L30 7.8l1.414 1.413L16.342 24.284l1.414 1.414 16.485-16.485 1.414 1.414L19.97 25.313l1.414 1.414 16.486-16.486 1.414 1.415L23.728 27.212l1.414 1.414L40.97 12.8l1.415 1.414-15.556 15.556 1.414 1.414 17.384-17.385 1.414 1.414-18.384 18.385 1.414 1.414L48.9 15.385l1.414 1.414-21.213 21.213 1.414 1.414 21.213-21.213 1.414 1.414-21.213 21.213 1.414 1.414L54.627 19.97l1.414 1.415-21.212 21.213 1.414 1.414 21.212-21.213 1.415 1.414-21.213 21.213 1.414 1.414L59.9 24.9l1.415 1.414-24.85 24.85 1.414 1.414L60 30l1.414 1.414-30 30L30 60l-1.414-1.414-30-30L0 27.172l30-30L31.414 0 30 1.414 1.414 30l-1.413-1.414 30-30L31.415 0z' fill='%239C92AC' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: selectedPattern === 'simple' ? '100px 100px' : selectedPattern === 'standard' ? '60px 60px' : '30px 30px',
        }}></div>
      )}
      
      {type === 'border' && (
        <div className="absolute inset-0 border-2 border-current rounded-lg" style={{
          borderImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 0h25v25H0zM25 0h25v25H25zM50 0h25v25H50zM75 0h25v25H75zM0 25h25v25H0zM50 25h25v25H50zM0 50h25v25H0zM25 50h25v25H25zM50 50h25v25H50zM75 50h25v25H75zM0 75h25v25H0zM25 75h25v25H25zM50 75h25v25H50zM75 75h25v25H75z' fill='currentColor' fill-opacity='.1'/%3E%3C/svg%3E") 25`,
          borderImageRepeat: 'repeat'
        }}></div>
      )}
    </div>
  );
};

export const HennaBorder: React.FC<{className?: string, children?: React.ReactNode}> = ({ 
  className = '', 
  children 
}) => {
  const { theme } = useCultural();
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-1 rounded-lg opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='12' viewBox='0 0 44 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 12v-2L0 0v10l4 2h16zm18 0l4-2V0L22 10v2h16zM20 0v8L4 0h16zm18 0L22 8V0h16z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
        backgroundColor: theme.colors.primary,
      }}></div>
      <div className="relative rounded-md bg-background border border-primary/20 p-4">
        {children}
      </div>
    </div>
  );
};

export const AmiriText: React.FC<{
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
}> = ({ 
  children, 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };
  
  return (
    <div className={`font-amiri ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};
