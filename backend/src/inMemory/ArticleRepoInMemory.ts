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
    throw new Error('Method not implemented.');
  }

  async findById(articleId: string): Promise<IArticle> {
    throw new Error('Method not implemented.');
  }

  async remove(articleId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(article: IArticle): Promise<IArticle> {
    throw new Error('Method not implemented.');
  }
}
