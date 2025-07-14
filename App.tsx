
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import CoordinatorList from './pages/CoordinatorList';
import CoordinatorDetail from './pages/CoordinatorDetail';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<CoordinatorList />} />
              <Route path="/coordinator/:id" element={<CoordinatorDetail />} />
            </Routes>
          </main>
          <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 mt-12">
            <p>&copy; {new Date().getFullYear()} WedPlan. All rights reserved.</p>
          </footer>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
