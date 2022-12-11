interface Tag {
  id: string;
  name?: string;
}

export interface IArticle {
  id?: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  authorId: string;
  tags: Tag[];
}

export type PaginatedArticleList = {
  articles: Omit<IArticle, 'content'>[];
  count: number;
  limit: number;
};

export interface IArticleRepository {
  create(article: IArticle): Promise<IArticle>;
  find(page?: number, search?: string): Promise<PaginatedArticleList>;
  findById(articleId: string): Promise<IArticle | null>;
  remove(articleId: string): Promise<void>;
  update(article: Omit<IArticle, 'authorId'>): Promise<IArticle>;
  findByTag(page: number, tagId: string): Promise<PaginatedArticleList>;
}
