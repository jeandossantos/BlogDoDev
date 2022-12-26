import { Routes, Route } from 'react-router-dom';
import { ArticleForm } from '../pages/ArticleForm';
import { ArticleById } from '../pages/ArticleById';

import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { PrivateRoute } from './PrivateRoute';
import { ArticlesFound } from '../pages/ArticlesFound';
import { ArticlesByTag } from '../pages/ArticlesByTag';

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:articleId" element={<ArticleById />} />
      <Route path="/articles/result" element={<ArticlesFound />} />
      <Route path="/articles/tag/:tagId" element={<ArticlesByTag />} />

      <Route
        path="/articles"
        element={
          <PrivateRoute>
            <ArticleForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
