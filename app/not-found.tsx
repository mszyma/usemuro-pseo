'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState('');

  useEffect(() => {
    const path = window.location.pathname;

    // Pattern: /en/colors/manufacturer/color-slug or /de/colors/... or /pl/colors/...
    const colorPagePattern = /^\/(en|de|pl)\/colors\/([^\/]+)\/([^\/]+)\/?$/;
    const match = path.match(colorPagePattern);

    if (match) {
      const [, , manufacturer, colorSlug] = match;

      // Redirect to manufacturer page with color anchor
      const targetUrl = `/en/colors/${manufacturer}#color-${colorSlug}`;
      setRedirectTarget(targetUrl);
      setIsRedirecting(true);

      // Small delay so user sees the redirect message
      setTimeout(() => {
        window.location.replace(targetUrl);
      }, 300);
    }
  }, []);

  if (isRedirecting) {
    return (
      <div
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: '#FDF8F4',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '500px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '3px solid #C4704F',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem',
            }}
          />
          <p style={{ fontSize: '1rem', color: '#C4704F', marginBottom: '1rem' }}>
            Redirecting to color...
          </p>
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: '#FDF8F4',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '500px' }}>
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 700,
            color: '#2D2D2D',
            marginBottom: '1rem',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            color: '#666666',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        <Link
          href="/en"
          style={{
            display: 'inline-block',
            background: '#2D2D2D',
            color: 'white',
            padding: '0.875rem 2rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
