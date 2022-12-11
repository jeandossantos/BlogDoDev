import { Request, Response } from 'express';
import { ArticleService } from './ArticleService';

export class ArticleController {
  constructor(private articleService: ArticleService) {}

  async store(req: Request, res: Response) {
    const { title, description, content, authorId, imageUrl, tags } = req.body;

    const article = await this.articleService.create({
      title,
      description,
      content,
      authorId,
      imageUrl,
      tags,
    });

    return res.status(201).json(article);
  }
}
