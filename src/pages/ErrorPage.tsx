import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, TYPOGRAPHY } from '../config/themeConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
  data?: any;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError;

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const isFetchError = error?.message?.includes('Failed to fetch') || error?.message?.includes('fetch');

  return (
    <div style={{ background: '#040B1D', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem'
      }}>
        <div style={{
          maxWidth: '600px',
          textAlign: 'center',
          color: COLORS.textOnDark
        }}>
          <h1 style={{
            fontFamily: TYPOGRAPHY.fontHeading,
            fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: 700,
            marginBottom: '1rem',
            color: COLORS.gold
          }}>
            {isNotFound ? '404' : 'Oops!'}
          </h1>

          <p style={{
            fontFamily: TYPOGRAPHY.fontHeading,
            fontSize: '1.75rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            color: COLORS.textOnDark
          }}>
            {isNotFound 
              ? 'Page Not Found'
              : isFetchError
              ? 'Network Error'
              : 'Something Went Wrong'
            }
          </p>

          <p style={{
            fontFamily: TYPOGRAPHY.fontBody,
            fontSize: '1.125rem',
            color: COLORS.textMuted,
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            {isNotFound 
              ? "The page you're looking for doesn't exist or has been moved."
              : isFetchError
              ? "We're having trouble connecting to our servers. Please ensure your internet connection is stable and try again."
              : error?.message || 'An unexpected error occurred. Please try again.'
            }
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: COLORS.burgundy,
                color: '#FFFFFF',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontFamily: TYPOGRAPHY.fontBody,
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.burgundyHover;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.burgundy;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            {isFetchError && (
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: COLORS.gold,
                  border: `2px solid ${COLORS.gold}`,
                  borderRadius: '0.5rem',
                  fontFamily: TYPOGRAPHY.fontBody,
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(214, 176, 92, 0.1)`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Try Again
              </button>
            )}
          </div>

          {import.meta.env.DEV && error?.message && (
            <details style={{
              marginTop: '3rem',
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.5rem',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              <summary style={{ color: COLORS.gold, cursor: 'pointer', marginBottom: '1rem' }}>
                Error Details (Dev Only)
              </summary>
              <pre style={{
                color: '#FF6B6B',
                fontSize: '0.875rem',
                overflow: 'auto',
                fontFamily: 'monospace'
              }}>
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
