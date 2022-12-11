import { ArticleController } from './../app/article/ArticleController';
import { ArticleService } from './../app/article/ArticleService';
import { ArticleRepository } from './../app/article/ArticleRepository';
import { Router } from 'express';

const routes = Router();

const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

routes.post('/articles', (req, res) => {
  return articleController.store(req, res);
});

routes.delete('/articles/:articleId', (req, res) => {
  return articleController.destroy(req, res);
});

routes.get('/articles/:articleId', (req, res) => {
  return articleController.show(req, res);
});

routes.put('/articles/:articleId', (req, res) => {
  return articleController.update(req, res);
});

export { routes };
