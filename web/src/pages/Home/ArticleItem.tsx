import { FaClock } from 'react-icons/fa';
import { compile } from 'html-to-text';
import articleImg from '../../assets/article.png';
import { Link } from 'react-router-dom';

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
  createdAt?: Date;
  updatedAt?: Date;
  tags: ITag[];
}

interface ArticleItemProps {
  article: IArticle;
}

export function ArticleItem({ article }: ArticleItemProps) {
  function handleRenderingDescription(description: string) {
    if (!description) return 'Descrição não informada...';

    const isDescriptionTooLong = description.length > 240;

    if (isDescriptionTooLong) {
      return description.slice(0, 240) + '...';
    } else {
      return description + '...';
    }
  }

  return (
    <section className="">
      <Link
        to={`/articles/${article.id}`}
        key={article.id}
        className="flex gap-11 overflow-hidden  bg-zinc-900 rounded-lg border-zinc-500 border-4 p-5 mx-8 mb-3"
      >
        <img
          className="rounded-lg w-40 h-40"
          crossOrigin="anonymous"
          src={
            article.imageUrl
              ? 'http://localhost:3001/static/' + article.imageUrl
              : articleImg
          }
          width={150}
          height={150}
          alt="article image"
        />

        <div>
          <div className="flex justify-between flex-wrap">
            <span className="text-xs">
              <span className="font-medium">Publicado em:</span>{' '}
              {new Date(article.createdAt!).toLocaleDateString() +
                ' ' +
                new Date(article.createdAt!).toLocaleTimeString()}
            </span>

            <span className="text-xs">
              <span className=" flex justify-center items-center flex-wrap gap-1">
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
          <div className="mt-3 font-medium">
            {handleRenderingDescription(compile()(article.description!))}
          </div>
        </div>
      </Link>
    </section>
  );
}
