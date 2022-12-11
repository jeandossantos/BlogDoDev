import { IArticle, IArticleRepository } from './IArticleRepository';
import { z } from 'zod';

type CreateArticleProps = Omit<IArticle, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateArticleProps = Omit<
  IArticle,
  'authorId' | 'createdAt' | 'updatedAt'
>;

export class ArticleService {
  constructor(private articleRepository: IArticleRepository) {}

  async create(props: CreateArticleProps) {
    const { title, imageUrl, content, authorId, tags } = z
      .object({
        title: z.string().min(2),
        imageUrl: z.string().optional(),
        content: z.string().min(200),
        authorId: z.string().uuid(),
        tags: z.array(z.string().uuid()).min(1),
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

  async findById(id: string) {
    const article = await this.articleRepository.findById(id);

    return article;
  }

  async remove(articleId: string) {
    await this.articleRepository.remove(articleId);
  }

  async update(props: UpdateArticleProps) {
    const { id, title, description, imageUrl, content, tags } = z
      .object({
        id: z.string(),
        title: z.string().min(2),
        imageUrl: z.string().optional(),
        content: z.string().min(200),
        description: z.string().optional(),
        tags: z.array(z.string().uuid()).min(1),
      })
      .parse(props);

    const article = await this.articleRepository.update({
      id,
      title,
      imageUrl,
      description,
      content,
      tags,
    });

    return article;
  }

  async list(page?: number, search?: string) {
    const articles = await this.articleRepository.find(page, search);

    return articles;
  }

  async findByTagId(page: number, tagId: string) {
    const result = this.articleRepository.findByTag(page, tagId);

    return result;
  }
}
