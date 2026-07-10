import React, { useState, Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Lazy load page components to enable code splitting and reduce main chunk size
const LandingPage = lazy(() => import('./pages/LandingPage'));
const GettingStarted = lazy(() => import('./pages/GettingStarted'));
const ApiReference = lazy(() => import('./pages/ApiReference'));
const Diagnostics = lazy(() => import('./pages/Diagnostics'));
import { AlertTriangle } from 'lucide-react';

const RootErrorBoundary: React.FC = () => {
  const error = useRouteError();
  
  let errorMessage = 'An unexpected error occurred.';
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '2rem', textAlign: 'center' }}>
      <AlertTriangle size={64} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oops! Something went wrong.</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{errorMessage}</p>
      <a href="/" className="button-primary">Return to Home</a>
    </div>
  );
};

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-container" style={{ flexDirection: 'column' }}>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 64px)' }}>
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main-content" style={{ flex: 1, minWidth: 0, transition: 'all 0.3s ease' }}>
          <Suspense fallback={<div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading content...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RootErrorBoundary />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/getting-started', element: <GettingStarted /> },
      { path: '/api-reference', element: <ApiReference /> },
      { path: '/diagnostics', element: <Diagnostics /> },
    ]
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
