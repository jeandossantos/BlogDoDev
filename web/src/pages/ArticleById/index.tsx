import { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useArticle } from '../../hooks/useArticle';
import htmlParse from 'html-react-parser';

interface ITag {
  id: string;
  name: string;
}

interface Author {
  id: string;
  username: string;
}

interface IArticle {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date | undefined;
  tags: ITag[];
}
export function ArticleById() {
  const { getArticleById } = useArticle();
  const { articleId } = useParams();

  const [article, setArticle] = useState<IArticle>();
  const [author, setAuthor] = useState<Author>();
  useEffect(() => {
    handleGetArticleById();
  }, []);

  async function handleGetArticleById() {
    const { author, ...article } = await getArticleById(articleId!);

    setAuthor(author);
    setArticle(article);
  }

  return (
    <main className="row-span-1 col-span-1 bg-zinc-800 mx-3  text-zinc-100 mt-6 rounded-lg border-zinc-500 border-4 px-6 py-6">
      <p className="text-sm text-zinc-100 ">
        <span className="font-bold text-zinc-500">Autor: </span>
        <span className="uppercase">
          {author?.username.toLocaleUpperCase() || 'Anonymous'}
        </span>
      </p>
      <div className="text-xs text-zinc-100 mt-3 flex justify-between flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <div>
            <span className="font-bold text-zinc-500">Publicado em: </span>
            <span>
              {new Date(article?.createdAt!).toLocaleDateString() +
                ' ' +
                new Date(article?.createdAt!).toLocaleTimeString()}
            </span>
          </div>

          <div>
            <span className="flex gap-1 font-bold text-zinc-500">
              <FaClock color="bg-zinc-100" /> Tempo de leitura:{' '}
              <span className="text-zinc-100 font-normal">5 min</span>
            </span>
          </div>
        </div>
        <div>
          <span className="font-bold text-zinc-500">Atualizado em: </span>
          <span>
            {new Date(article?.updatedAt!).toLocaleDateString() +
              ' ' +
              new Date(article?.updatedAt!).toLocaleTimeString()}
          </span>
        </div>
      </div>

      <h1 className="font-[Lalezar] text-3xl text-zinc-100 mt-4">
        {article?.title}
      </h1>

      <div className="flex gap-2 my-3 flex-wrap">
        {article?.tags.map((tag) => {
          return (
            <span
              key={tag.id}
              className="text-xs font-medium  bg-zinc-100 rounded-sm text-zinc-900 
            px-2 py-1"
            >
              {tag.name}
            </span>
          );
        })}
      </div>

      <div className="article-content leading-6">
        {htmlParse(
          article?.content ||
            '<p class="flex justify-center items-center>Carregando...</p>'
        )}
      </div>
    </main>
  );
}
