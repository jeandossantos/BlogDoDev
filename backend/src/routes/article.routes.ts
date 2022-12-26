import { ArticleController } from './../app/article/ArticleController';
import { ArticleService } from './../app/article/ArticleService';
import { ArticleRepository } from './../app/article/ArticleRepository';
import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import multer from 'multer';
import multerConfig from '../config/multer.config';

const routes = Router();

const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

routes.post(
  '/articles',
  ensureAuthenticated,
  multer(multerConfig).single('image'),
  (req, res) => {
    return articleController.store(req, res);
  }
);

routes.get('/articles', (req, res) => {
  return articleController.index(req, res);
});

routes.get('/articles/:articleId', (req, res) => {
  return articleController.show(req, res);
});

routes.get('/tags/:tagId/articles', (req, res) => {
  return articleController.findByTag(req, res);
});

routes.get('/users/:userId/articles', (req, res) => {
  return articleController.findByUser(req, res);
});

routes.delete('/articles/:articleId', ensureAuthenticated, (req, res) => {
  return articleController.destroy(req, res);
});

routes.put(
  '/articles/:articleId',
  ensureAuthenticated,
  multer(multerConfig).single('image'),
  (req, res) => {
    return articleController.update(req, res);
  }
);

export { routes };
