import { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { FaCheck, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { compile } from 'html-to-text';
import { Link } from 'react-router-dom';
import { Label } from '../../components/Label';
import { TextEditor } from '../../components/TextEditor';
import { useArticle } from '../../hooks/useArticle';
import { useAuth } from '../../hooks/useAuth';
import { useTag } from '../../hooks/useTag';
import { RemoveArticleModal } from './RemoveArticleModal';

import Pagination from 'react-js-pagination';

interface ITag {
  id: string;
  name: string;
  checked?: boolean;
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

export function ArticleForm() {
  const { user } = useAuth();
  const { createArticle, updateArticle, listArticleByUser } = useArticle();
  const { listTags } = useTag();

  const [articles, setArticles] = useState<IArticle[]>();

  const [articleId, setArticleId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<File>();
  const [tags, setTags] = useState<ITag[]>([]);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);
  const [count, setCount] = useState(0);

  const [articleTobeDeleted, setArticleTobeDeleted] = useState<IArticle>();

  const [isRemoveArticleModalOpen, setIsRemoveArticleModalOpen] =
    useState(false);

  useEffect(() => {
    handleListTag();
    handleListArticles();
  }, []);

  async function handleListTag() {
    const tags = await listTags();

    setTags(
      tags.map((tag: ITag) => {
        tag.checked = false;

        return tag;
      })
    );
  }

  async function handleListArticles(selectedPage: number = 1) {
    setPage(selectedPage);

    try {
      const { articles, count, limit } = await listArticleByUser({
        page: selectedPage,
        userId: user?.id!,
        search,
      });

      setArticles(articles);
      setCount(count);
      setLimit(limit);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSetTag(tag: ITag) {
    const updatedTagState = tags.map((currentTag) => {
      if (currentTag.id === tag.id) {
        currentTag.checked = !currentTag.checked;
      }

      return currentTag;
    });

    setTags(updatedTagState);
  }

  function handleSetImageUrl(e: ChangeEvent<HTMLInputElement>) {
    let file: File;

    if (e.target.files) {
    }

    file = e.target.files![0]!;

    if (file.size! > 2097152) {
      toast.error('Tamanho da imagem grande demais!');
      e.target.value = '';
      return;
    }

    setImageUrl(file);
  }

  async function handleCreateArticle(e: FormEvent) {
    e.preventDefault();

    if (title.length < 2) {
      toast.error('Título do artigo deve ter pelo menos 2 caracteres!');

      return;
    }

    if (content.length < 240) {
      toast.error('Artigo deve ter pelo menos 240 caracteres!');

      return;
    }

    const articlesTags = [];

    for (let tag of tags) {
      if (tag.checked) {
        articlesTags.push(tag.id);
      }
    }

    if (articlesTags.length === 0) {
      toast.error('Artigo deve ter pelo menos 1 tag!');

      return;
    }

    try {
      await createArticle({
        content,
        title,
        description,
        tags: articlesTags,
        authorId: user?.id!,
        image: imageUrl!,
      });
      toast.success('Artigo criado com sucesso!');
      handleClear();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateArticle(e: FormEvent) {
    e.preventDefault();

    if (title.length < 2) {
      toast.error('Título do artigo deve ter pelo menos 2 caracteres!');

      return;
    }

    if (content.length < 240) {
      toast.error('Artigo deve ter pelo menos 240 caracteres!');

      return;
    }

    const articlesTags = [];

    for (let tag of tags) {
      if (tag.checked) {
        articlesTags.push(tag.id);
      }
    }

    if (articlesTags.length === 0) {
      toast.error('Artigo deve ter pelo menos 1 tag!');

      return;
    }

    try {
      await updateArticle({
        content,
        title,
        description,
        tags: articlesTags,
        authorId: user?.id!,
        image: imageUrl!,
        articleId,
      });
      toast.success('Artigo editado com sucesso!');
      handleClear();
      handleListArticles();
    } catch (error) {
      toast.error('Não foi possível completar a operação!');
      console.log(error);
    }
  }

  function handleClear() {
    handleListArticles();

    setArticleId('');
    setTitle('');
    setDescription('');
    setArticles([]);
    setImageUrl(undefined);
    setTags(
      tags.map((tag: ITag) => {
        tag.checked = false;

        return tag;
      })
    );
    setContent('');
  }

  function loadArticle(article: IArticle) {
    const htmlToText = compile();

    const markedTagsId = article.tags.map((tag: ITag) => tag.id);

    const ArticleTags = tags.map((tag: ITag) => {
      if (markedTagsId.includes(tag.id)) {
        tag.checked = true;
      } else {
        tag.checked = false;
      }

      return tag;
    });

    setArticleId(article.id);
    setTitle(article.title);
    setDescription(htmlToText(article.description || ''));
    setImageUrl(undefined);
    setTags(ArticleTags);

    setContent(article.content);
  }

  function handleIsRemoveArticleModalOpen(isOpen: boolean) {
    setIsRemoveArticleModalOpen(isOpen);
  }

  return (
    <main className="row-span-1 col-span-1 bg-zinc-800 mx-3  text-zinc-100 mt-6 rounded-lg border-zinc-500 border-4 px-6 py-6">
      <h1 className="font-[Lalezar] text-3xl text-zinc-100 mt-4 text-center">
        Crie um novo artigo
      </h1>

      <div className="flex justify-center">
        <form
          onSubmit={!articleId ? handleCreateArticle : handleUpdateArticle}
          className="w-3/4 px-10"
        >
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="font-medium text-sm text-zinc-100 my-3"
            >
              Título:
            </label>
            <input
              type="text"
              id="title"
              className="h-12 px-3 placeholder:font-medium rounded
         border-zinc-500 placeholder:text-zinc-500 placeholder:text-xs text-zinc-100 border-none outline-none focus:outline-zinc-500 focus:border-zinc-500 outline-offset-0 bg-zinc-900"
              placeholder="Como criar um artigo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label label="Capa:" htmlFor="imageUrl" />
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              id="imageUrl"
              className="h-12 placeholder:font-medium rounded
         border-zinc-500 placeholder:text-zinc-500 placeholder:text-xs text-zinc-100 border-none outline-none focus:outline-zinc-500 focus:border-zinc-500 outline-offset-0 bg-zinc-900 file:bg-zinc-500 file:h-12 file:border-none
         file:rounded file:text-zinc-100 cursor-pointer file:cursor-pointer 
         file:outline-none "
              onChange={handleSetImageUrl}
            />
          </div>
          <div className="flex flex-col">
            <Label label="Descrição:" htmlFor="description" />
            <textarea
              name=""
              id="description"
              className="px-3 pt-4 placeholder:font-medium rounded
            border-zinc-500 placeholder:text-zinc-500 placeholder:text-xs text-zinc-100 border-none outline-none focus:outline-zinc-500 focus:border-zinc-500 outline-offset-0 bg-zinc-900"
              placeholder="Essa é a descrição do artigo"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <label className="font-medium text-sm text-zinc-100  w-full">
              Tags:
            </label>
            {tags.map((tag) => {
              return (
                <label
                  htmlFor={`tag-${tag.id}`}
                  className="flex relative cursor-pointer"
                  key={tag.id}
                >
                  <input
                    className="appearance-none h-5 w-5 border-zinc-500 rounded mr-1
                    border-2  bg-zinc-900 cursor-pointer"
                    type="checkbox"
                    id={`tag-${tag.id}`}
                    name="tag"
                    value={tag.id}
                    checked={tag.checked}
                    onChange={() => handleSetTag(tag)}
                  />

                  <FaCheck
                    className="pointer-events-none absolute top-1 left-1"
                    color="#D9D9D9"
                    size={12}
                    style={{
                      contentVisibility: !tag.checked ? 'hidden' : 'visible',
                    }}
                  />

                  {tag.name}
                </label>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <Label htmlFor="content" label="Conteúdo" />
            <TextEditor
              content={content}
              setContent={setContent}
              placeholder="O conteúdo vai aqui"
            />
          </div>

          <div className="flex  justify-center items-center gap-3">
            <button
              type="submit"
              className="flex  justify-center items-center gap-2 w-[300px] bg-zinc-100 
        text-zinc-900 rounded font-bold  h-12 text-center hover:bg-zinc-200 cursor-pointer"
            >
              {articleId ? 'Editar' : 'Criar'}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex h-12  justify-center items-center bg-zinc-secondary hover:bg-zinc-secondary-hover text-zinc-100 rounded font-bold
            w-[300px]"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div className=" flex flex-col justify-center items-center">
        <h2
          className="font-[Lalezar] text-3xl text-zinc-100 mt-4 
      text-center"
        >
          Meus Artigos
        </h2>

        <table className="min-w-[500px] w-[620px] table-auto bg-zinc-900 rounded border-collapse border border-zinc-500 mt-3">
          <thead className="bg-zinc-100 text-zinc-900">
            <tr className="border-4  border-zinc-500 p-2">
              <th className="border-4  border-zinc-500 p-2">Título</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article) => {
              return articles.length === 0 ? (
                <>
                  <tr>
                    <td className="text-center" colSpan={2}>
                      Nada para exibir
                    </td>
                  </tr>
                </>
              ) : (
                <tr key={article.id} className="border-4   border-zinc-500 p-2">
                  <td className="border-4  border-zinc-500 p-2">
                    <Link
                      to={`/articles/${article.id}`}
                      target="_blank"
                      title="Ver artigo"
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td className="flex justify-center items-center gap-2  p-2">
                    <Link
                      to={`/articles/${article.id}`}
                      target="_blank"
                      className="bg-zinc-secondary hover:bg-zinc-secondary-hover rounded p-2"
                    >
                      <FaEye size={20} />
                    </Link>

                    <button
                      title="Editar"
                      className="bg-yellow-warning hover:bg-yellow-warning-hover rounded p-2"
                    >
                      <FaEdit
                        onClick={() => loadArticle(article)}
                        size={20}
                        className="text-zinc-900"
                      />
                    </button>

                    <button
                      onClick={() => {
                        setArticleTobeDeleted(article);
                        handleIsRemoveArticleModalOpen(true);
                      }}
                      title="Excluir"
                      className="bg-red-danger hover:bg-red-danger-hover rounded p-2"
                    >
                      <FaTrash size={20} className="pointer-events-none" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6">
        <Pagination
          activePage={page}
          itemsCountPerPage={limit}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          onChange={(page) => handleListArticles(page)}
          prevPageText="Anterior"
          nextPageText="Próximo"
          innerClass="w-[433px] flex justify-center items-center gap-3"
          activeClass="h-12 w-12
          bg-zinc-100 text-zinc-900 hover:bg-[#BEBEBE]  font-[Lalezar] h-12 w-12  border-2 border-zinc-500 rounded flex justify-center items-center"
          itemClass="cursor-pointer-node font-[Lalezar] h-12 w-12 bg-zinc-900 text-zinc-100 border-2 border-zinc-500 rounded flex justify-center items-center cursor-pointer
          hover:bg-zinc-700"
          itemClassPrev="font-[Lalezar] cursor-pointer-node h-12 w-12 bg-zinc-900 text-zinc-100 border-2 border-zinc-500 h-12 w-20 rounded flex justify-center items-center cursor-pointer
          hover:bg-zinc-700 "
          itemClassNext="font-[Lalezar] cursor-pointer-node h-12 w-12 bg-zinc-900 text-zinc-100 border-2 border-zinc-500 h-12 w-20 rounded flex justify-center items-center
          hover:bg-zinc-700 cursor-pointer"
        />
      </div>

      <RemoveArticleModal
        articleId={articleTobeDeleted?.id!}
        handleListArticles={handleListArticles}
        handleIsRemoveArticleModalOpen={handleIsRemoveArticleModalOpen}
        isRemoveArticleModalOpen={isRemoveArticleModalOpen}
      />
    </main>
  );
}
