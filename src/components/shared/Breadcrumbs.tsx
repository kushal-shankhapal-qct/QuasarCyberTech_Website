import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Helper to format path slugs into readable titles
  const formatRouteName = (route: string) => {
    return route
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="flex items-center text-sm font-medium text-gray-500 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
      <Link to="/" className="flex items-center hover:text-[#0B1F3B] transition-colors">
        <Home className="w-4 h-4 mr-1" />
        <span className="sr-only">Home</span>
      </Link>
      
      {pathnames.length > 0 && (
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
      )}

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            {isLast ? (
              <span className="text-[#0F172A] font-semibold" aria-current="page">
                {formatRouteName(name)}
              </span>
            ) : (
              <Link to={routeTo} className="hover:text-[#0B1F3B] transition-colors">
                {formatRouteName(name)}
              </Link>
            )}
            
            {!isLast && (
              <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
