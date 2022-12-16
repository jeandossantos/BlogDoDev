import { prisma } from '../../connection/prisma';
import {
  IArticle,
  IArticleRepository,
  PaginatedArticleList,
} from './IArticleRepository';

export class ArticleRepository implements IArticleRepository {
  async create({
    title,
    content,
    description,
    imageUrl,
    tags,
    authorId,
  }: IArticle): Promise<IArticle> {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        description,
        imageUrl,
        authorId,
        tags: {
          connect: tags,
        },
      },
      include: {
        tags: true,
      },
    });

    return article;
  }

  async find(
    page?: number | undefined,
    search?: string | undefined
  ): Promise<PaginatedArticleList> {
    const limit = 4;
    page = page || 1;

    const count = await prisma.article.count({
      where: {
        title: {
          startsWith: search,
        },
      },
    });

    const articles = await prisma.article.findMany({
      where: {
        title: {
          startsWith: search,
        },
      },
      take: limit,
      skip: page * limit - limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        tags: true,
      },
    });

    return { articles, count, limit };
  }

  async findById(articleId: string): Promise<IArticle | null> {
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        tags: true,
      },
    });

    return article;
  }

  async remove(articleId: string): Promise<void> {
    await prisma.article.delete({
      where: {
        id: articleId,
      },
    });
  }

  async update({
    id,
    title,
    description,
    content,
    imageUrl,
    tags,
  }: Omit<IArticle, 'authorId'>): Promise<IArticle> {
    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        description,
        content,
        imageUrl,
        tags: {
          connect: tags,
        },
      },
      include: { tags: true },
    });

    return article;
  }

  async findByTag(page: number, tagId: string): Promise<PaginatedArticleList> {
    const limit = 4;

    const count = await prisma.article.count({
      where: {
        tags: {
          some: {
            id: tagId,
          },
        },
      },
    });

    const articles = await prisma.article.findMany({
      where: {
        tags: {
          some: {
            id: tagId,
          },
        },
      },
      include: { tags: true },
      take: limit,
      skip: page * limit - limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { articles, count, limit };
  }
}
