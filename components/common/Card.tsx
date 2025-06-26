
import React, { ReactNode, HTMLAttributes } from 'react';

// Interface for Card-specific props
interface CardSpecificProps {
  title?: string;
  titleClassName?: string;
  bodyClassName?: string;
  icon?: ReactNode;
  children?: ReactNode; // Explicitly include children here
}

// Combine Card-specific props with standard HTML div attributes
// This makes className, id, style, onClick, etc., available
type FullCardProps = CardSpecificProps & HTMLAttributes<HTMLDivElement>;

const Card = ({
  title,
  children,
  className = '', // className comes from HTMLAttributes via FullCardProps
  titleClassName = '',
  bodyClassName = '',
  icon,
  ...rest // 'rest' will correctly be the remaining HTMLAttributes
}: FullCardProps): JSX.Element => {
  return (
    // Spread ...rest props here and apply className
    <div {...rest} className={`bg-slate-800 shadow-xl rounded-lg overflow-hidden fade-in ${className}`}>
      {title && (
        <div className={`p-4 sm:p-5 border-b border-slate-700 flex items-center space-x-3 ${titleClassName}`}>
          {icon && <span className="text-indigo-400">{icon}</span>}
          <h3 className="text-lg sm:text-xl font-semibold text-slate-100">{title}</h3>
        </div>
      )}
      <div className={`p-4 sm:p-5 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
