import { PaginatedArticleList } from './../app/article/IArticleRepository';
import {
  IArticle,
  IArticleRepository,
} from '../app/article/IArticleRepository';
import { randomUUID } from 'node:crypto';

export class ArticleRepoInMemory implements IArticleRepository {
  Article: IArticle[] = [];

  async create(article: IArticle): Promise<IArticle> {
    article.id = randomUUID();

    this.Article.push(article);

    return article;
  }

  async findByTag(
    page: number = 1,
    tagId: string
  ): Promise<PaginatedArticleList> {
    const articles = this.Article.filter((article) => {
      if (article.tags.includes(tagId)) {
        return article;
      }
    });

    return { articles, count: articles.length, limit: 4 };
  }

  async find(page?: number, search?: string): Promise<PaginatedArticleList> {
    page = page || 1;
    search = search || '';

    const articles = [
      {
        id: randomUUID(),
        title: 'My Article 1',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        imageUrl: 'imageUrl.png',
        tags: [randomUUID()],
        authorId: randomUUID(),
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'My Article 2',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        imageUrl: 'imageUrl.png',
        tags: [randomUUID()],
        authorId: randomUUID(),
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'My Article 3',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        imageUrl: 'imageUrl.png',
        tags: [randomUUID()],
        authorId: randomUUID(),
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'My Article 4',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        imageUrl: 'imageUrl.png',
        tags: [randomUUID()],
        authorId: randomUUID(),
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'My Article 5',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        imageUrl: 'imageUrl.png',
        tags: [randomUUID()],
        authorId: randomUUID(),
        createdAt: new Date(),
      },
    ];

    if (page === 1) {
      return {
        articles: [articles[0], articles[1], articles[2], articles[3]],
        count: articles.length,
        limit: 4,
      };
    }
    if (page === 2) {
      return {
        articles: [articles[4]],
        count: articles.length,
        limit: 4,
      };
    }

    return {
      articles: [],
      count: 0,
      limit: 4,
    };
  }

  async findById(articleId: string): Promise<IArticle | null> {
    const article = this.Article.find((a) => a.id === articleId);

    return article || null;
  }

  async remove(articleId: string): Promise<void> {
    this.Article = this.Article.filter((article) => article.id !== articleId);
  }

  async update(article: IArticle): Promise<IArticle> {
    this.Article = this.Article.map((a) => {
      if (a.id === article.id) {
        a.title = article.title;
        a.description = article.description;
        a.imageUrl = article.imageUrl;
        a.tags = article.tags;
        a.content = article.content;
        a.updatedAt = new Date();
      }

      article = { ...a };

      return a;
    });

    return article!;
  }
}
