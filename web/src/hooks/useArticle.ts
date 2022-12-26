import { useContext } from 'react';
import { ArticleContext } from '../contexts/ArticleContext';

export function useArticle() {
  return useContext(ArticleContext);
}
