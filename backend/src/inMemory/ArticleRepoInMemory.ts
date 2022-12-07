import { IArticle, IArticleRepository } from '../app/article/IArticle';
import { randomUUID } from 'node:crypto';

export class ArticleRepoInMemory implements IArticleRepository {
  Article: IArticle[] = [];

  async create(article: IArticle): Promise<IArticle> {
    article.id = randomUUID();

    this.Article.push(article);

    return article;
  }

  async findByTag(tagId: string): Promise<IArticle[]> {
    const articles = this.Article.filter((article) => {
      if (article.tags.includes(tagId)) {
        return article;
      }
    });

    return articles;
  }

  async find(): Promise<IArticle[]> {
    return this.Article;
  }

  async findById(articleId: string): Promise<IArticle | null> {
    const article = this.Article.find((a) => a.id === articleId);

    return article || null;
  }

  async remove(articleId: string): Promise<void> {
    this.Article = this.Article.filter((article) => article.id !== articleId);
  }

  async update(article: IArticle): Promise<IArticle> {
    throw new Error('Method not implemented.');
  }
}
