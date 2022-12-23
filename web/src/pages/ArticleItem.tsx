import { FaClock } from 'react-icons/fa';
import coverImg from '../assets/ArticleImage.png';

export function ArticleItem() {
  return (
    <main className="row-span-1 col-span-1 bg-zinc-800 mx-3  text-zinc-100 mt-6 rounded-lg border-zinc-500 border-4 px-6 py-6">
      <p className="text-sm text-zinc-100 ">
        <span className="font-bold text-zinc-500">Autor: </span>
        <span className="uppercase">JEAN_DEV</span>
      </p>
      <div className="text-xs text-zinc-100 mt-3 flex justify-between flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <div>
            <span className="font-bold text-zinc-500">Publicado em: </span>
            <span className="">16/12/2022 13:14</span>
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
          <span className="uppercase">17/12/2022 12:00</span>
        </div>
      </div>

      <h1 className="font-[Lalezar] text-3xl text-zinc-100 mt-4">
        5 dicas para acelerar o desempenho do Node.js
      </h1>

      <div className="flex gap-2 my-3 flex-wrap">
        <span
          className="text-xs font-medium  bg-zinc-100 rounded-sm text-zinc-900 
            px-2 py-1"
        >
          backend
        </span>
        <span
          className="text-xs font-medium  bg-zinc-100 rounded-sm text-zinc-900 
            px-2 py-1"
        >
          node.js
        </span>
        <span
          className="text-xs font-medium  bg-zinc-100 rounded-sm text-zinc-900 
            px-2 py-1"
        >
          typescript
        </span>
        <span
          className="text-xs font-medium  bg-zinc-100 rounded-sm text-zinc-900 
            px-2 py-1"
        >
          shell
        </span>
      </div>

      <img src={coverImg} alt="capa" className="mb-3" />

      <p className="leading-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </main>
  );
}
