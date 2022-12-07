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

export interface IArticleRepository {
  create(article: IArticle): Promise<IArticle>;
  find(): Promise<IArticle[]>;
  findById(articleId: string): Promise<IArticle | null>;
  remove(articleId: string): Promise<void>;
  update(article: IArticle): Promise<IArticle>;
  findByTag(tagId: string): Promise<IArticle[]>;
}
