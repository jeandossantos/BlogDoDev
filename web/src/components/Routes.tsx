import { Routes, Route } from 'react-router-dom';
import { ArticleForm } from '../pages/ArticleForm';
import { ArticleItem } from '../pages/ArticleItem';

import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { PrivateRoute } from './PrivateRoute';

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:articleId" element={<ArticleItem />} />
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
