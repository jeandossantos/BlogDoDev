import { IArticle, IArticleRepository } from './IArticle';
import { z } from 'zod';

type CreateArticleProps = Omit<IArticle, 'id'>;

export class ArticleService {
  constructor(private articleRepository: IArticleRepository) {}

  async create(props: CreateArticleProps) {
    const { title, imageUrl, content, authorId, tags } = z
      .object({
        title: z.string().min(2),
        imageUrl: z.string().optional(),
        content: z.string().min(200),
        authorId: z.string(),
        tags: z.array(z.string()),
      })
      .parse(props);

    const article = await this.articleRepository.create({
      title,
      imageUrl,
      content,
      authorId,
      tags,
    });

    return article;
  }
}
