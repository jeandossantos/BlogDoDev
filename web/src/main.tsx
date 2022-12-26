import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ArticleProvider } from './contexts/ArticleContext';
import { AuthProvider } from './contexts/authContext';
import { TagProvider } from './contexts/TagContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <TagProvider>
        <ArticleProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ArticleProvider>
      </TagProvider>
    </AuthProvider>
  </React.StrictMode>
);
