import { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import articleImg from '../assets/article.png';
import { api } from '../services/api';
import htmlParse from 'html-react-parser';

interface ITag {
  id: string;
  name: string;
}

interface IArticle {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: ITag[];
}

export function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    getArticles();
  }, []);

  function getArticles() {
    api
      .get('/articles')
      .then((response) => setArticles(response.data.articles));
  }

  return (
    <main className="row-span-1 col-span-1 bg-zinc-800 mx-3  text-zinc-100 mt-6 rounded-lg border-zinc-500 border-4">
      <h1 className="font-[Lalezar] mb-8 mt-5 text-center text-zinc-100 text-3xl">
        Recentes
      </h1>

      {articles.map((article) => {
        return (
          <section
            key={article.id}
            className="flex gap-11  bg-zinc-900 rounded-lg border-zinc-500 border-4 p-5 mx-8 mb-3"
          >
            <img
              className="rounded-lg w-40 h-40"
              src={articleImg}
              width={150}
              height={150}
              alt="article image"
            />

            <div>
              <div className="flex justify-between">
                <span className="text-xs">
                  <span className="font-medium">Publicado em:</span>{' '}
                  {new Date(article.createdAt).toLocaleDateString() +
                    ' ' +
                    new Date(article.createdAt).toLocaleTimeString()}
                </span>

                <span className="text-xs">
                  <span className=" flex justify-center items-center gap-1">
                    <FaClock />
                    <span className="font-medium">Tempo de leitura: </span>
                    <span className="text-normal"> 5 min </span>
                  </span>
                </span>
              </div>

              <h2 className="font-[Lalezar] mt-3 text-3xl block">
                {article.title}
              </h2>

              <div className="flex gap-2 mt-3 flex-wrap">
                {article.tags.map((tag) => {
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
              <p className="mt-3 font-medium">
                {htmlParse(article.description!)}
              </p>
            </div>
          </section>
        );
      })}
    </main>
  );
}
