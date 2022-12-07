export interface IArticle {
  id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  authorId: string;
  tags: string[];
}

export type PaginatedArticleList = {
  articles: IArticle[];
  count: number;
  limit: number;
};

export interface IArticleRepository {
  create(article: IArticle): Promise<IArticle>;
  find(page?: number, search?: string): Promise<PaginatedArticleList>;
  findById(articleId: string): Promise<IArticle | null>;
  remove(articleId: string): Promise<void>;
  update(article: Omit<IArticle, 'authorId'>): Promise<IArticle>;
  findByTag(tagId: string): Promise<IArticle[]>;
}
