import { ArticleRepository } from './../app/article/ArticleRepository';
import { Router } from 'express';
import { TagController } from '../app/tag/TagController';
import { TagRepository } from '../app/tag/TagRepository';
import { TagService } from '../app/tag/TagService';

const tagRepository = new TagRepository();
const articleRepository = new ArticleRepository();

const tagService = new TagService(tagRepository, articleRepository);
const tagController = new TagController(tagService);

const routes = Router();

routes.post('/tags', (req, res) => {
  return tagController.store(req, res);
});

routes.get('/tags', (req, res) => {
  return tagController.index(req, res);
});

export { routes };
