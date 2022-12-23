import React, { useState, FormEvent } from 'react';

import { FaCheck } from 'react-icons/fa';
import { TextEditor } from '../components/TextEditor';

interface Tag {
  id: string;
  name: string;
  checked: boolean;
}

export function ArticleForm() {
  const [tags, setTags] = useState([
    { id: '1', name: 'backend', checked: false },
    { id: '2', name: 'frontend', checked: false },
    { id: '3', name: 'node.js', checked: false },
    { id: '4', name: 'javascript', checked: false },
    { id: '5', name: 'typescript', checked: false },
    { id: '6', name: 'shell', checked: false },
    { id: '7', name: 'html', checked: false },
    { id: '8', name: 'css', checked: false },
  ]);

  function handleSetTag(tag: Tag) {
    const updatedTagState = tags.map((currentTag) => {
      if (currentTag.id === tag.id) {
        currentTag.checked = !currentTag.checked;
      }

      return currentTag;
    });

    setTags(updatedTagState);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <main className="row-span-1 col-span-1 bg-zinc-800 mx-3  text-zinc-100 mt-6 rounded-lg border-zinc-500 border-4 px-6 py-6">
      <h1 className="font-[Lalezar] text-3xl text-zinc-100 mt-4 text-center">
        Crie um novo artigo
      </h1>

      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-3/4 px-10">
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
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="imageUrl"
              className="font-medium text-sm text-zinc-100 my-3"
            >
              Capa:
            </label>
            <input
              type="file"
              id="imageUrl"
              className="h-12 placeholder:font-medium rounded
         border-zinc-500 placeholder:text-zinc-500 placeholder:text-xs text-zinc-100 border-none outline-none focus:outline-zinc-500 focus:border-zinc-500 outline-offset-0 bg-zinc-900 file:bg-zinc-500 file:h-12 file:border-none
         file:rounded file:text-zinc-100 cursor-pointer file:cursor-pointer 
         file:outline-none "
              placeholder="Como criar um artigo"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="font-medium text-sm text-zinc-100 my-3"
            >
              Descrição:
            </label>
            <textarea
              name=""
              id="description"
              className="px-3 py-4 placeholder:font-medium rounded
            border-zinc-500 placeholder:text-zinc-500 placeholder:text-xs text-zinc-100 border-none outline-none focus:outline-zinc-500 focus:border-zinc-500 outline-offset-0 bg-zinc-900"
              placeholder="Essa é a descrição do artigo"
              rows={3}
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-2 my-3">
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

          <div className="flex flex-wrap gap-2 my-3">
            <label
              htmlFor="content"
              className="font-medium text-sm text-zinc-100  w-full"
            >
              Conteúdo:
            </label>
            <TextEditor placeholder="O conteúdo vai aqui" />
          </div>

          <input
            type="submit"
            value="Salvar artigo"
            className="flex  justify-center items-center gap-2 w-80 bg-zinc-100 
        text-zinc-900 rounded font-bold  h-12 text-center hover:bg-zinc-200 cursor-pointer"
          />
        </form>
      </div>
    </main>
  );
}
