import { createContext, ReactNode, useState } from 'react';
import { api } from '../services/api';

interface ITag {
  id: string;
  name: string;
}

interface IUser {
  id: string;
  username: string;
  email: string;
}

interface IArticle {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: IUser;
  tags: ITag[];
}

interface PaginatedArticles {
  limit: number;
  count: number;
  articles: IArticle[];
}

interface ListArticlesProps {
  search?: string;
  page: number;
}

interface ListArticleByTagProps {
  page: number;
  tagId: string;
}

interface ListArticlesByUserProps {
  search?: string;
  page: number;
  userId: string;
}

type CreateArticleProps = Omit<
  IArticle,
  'id' | 'authorId' | 'author' | 'imageUrl' | 'tags'
> & {
  authorId: string;
  image: File;
  tags: string[];
};

type UpdateArticleProps = Omit<
  IArticle,
  'id' | 'authorId' | 'author' | 'imageUrl' | 'tags'
> & {
  authorId: string;
  image: File;
  tags: string[];
  articleId: string;
};

interface ArticleProviderData {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  listArticles: ({
    search,
    page,
  }: ListArticlesProps) => Promise<PaginatedArticles>;
  listArticleByUser: (
    props: ListArticlesByUserProps
  ) => Promise<PaginatedArticles>;
  getArticleById: (id: string) => Promise<IArticle>;
  createArticle: (props: CreateArticleProps) => Promise<void>;
  updateArticle: (props: UpdateArticleProps) => Promise<void>;
  removeArticle: (articleId: string) => Promise<void>;
  listArticleByTag: (
    props: ListArticleByTagProps
  ) => Promise<PaginatedArticles>;
}

interface ArticleProviderProps {
  children: ReactNode;
}

export const ArticleContext = createContext({} as ArticleProviderData);

export function ArticleProvider({ children }: ArticleProviderProps) {
  const [search, setSearch] = useState('');

  async function listArticles({ search = '', page }: ListArticlesProps) {
    const response = await api.get<PaginatedArticles>(
      `/articles?search=${search}&page=${page}`
    );

    const { articles, count, limit } = response.data;

    return {
      articles,
      count,
      limit,
    };
  }

  async function getArticleById(id: string) {
    const response = await api.get(`/articles/${id}`);

    return response.data as IArticle;
  }

  async function listArticleByUser({
    userId,
    page,
    search,
  }: ListArticlesByUserProps) {
    const response = await api.get<PaginatedArticles>(
      `/users/${userId}/articles?search=${search}&page=${page}`
    );

    const { articles, count, limit } = response.data;

    return {
      articles,
      count,
      limit,
    };
  }

  async function listArticleByTag({ tagId, page }: ListArticleByTagProps) {
    const response = await api.get<PaginatedArticles>(
      `/tags/${tagId}/articles?page=${page}`
    );

    const { articles, count, limit } = response.data;

    return {
      articles,
      count,
      limit,
    };
  }

  async function createArticle({
    title,
    description = '',
    image,
    content,
    tags,
    authorId,
  }: CreateArticleProps) {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('image', image);
    data.append('content', content);

    tags.forEach((tag) => data.append('tags', tag));

    data.append('authorId', authorId);

    try {
      await api.post(`/articles`, data);
    } catch (error) {
      throw error;
    }
  }

  async function updateArticle({
    title,
    description = '',
    image,
    content,
    tags,
    authorId,
    articleId,
  }: UpdateArticleProps) {
    const data = new FormData();

    data.append('title', title);
    data.append('description', description);
    data.append('image', image);
    data.append('content', content);

    tags.forEach((tag) => data.append('tags', tag));

    data.append('authorId', authorId);

    try {
      await api.put(`/articles/${articleId}`, data);
    } catch (error) {
      throw error;
    }
  }

  async function removeArticle(articleId: string) {
    try {
      await api.delete(`/articles/${articleId}`);
    } catch (error) {
      throw error;
    }
  }

  return (
    <ArticleContext.Provider
      value={{
        listArticles,
        listArticleByTag,
        getArticleById,
        createArticle,
        listArticleByUser,
        removeArticle,
        updateArticle,
        search,
        setSearch,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}
