import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTag } from '../hooks/useTag';

interface ITag {
  id: string;
  name: string;
}

export function Aside() {
  const { listTags, setTagId } = useTag();
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    getTags();
  }, []);

  async function getTags() {
    const rs = await listTags();
    setTags(rs);
  }

  return (
    <aside className="col-span-1 bg-zinc-800 mt-6 pb-5 min-h-[70vh] mr-3 border-4 border-zinc-500 rounded">
      <h1 className="font-[Lalezar] mb-8 mt-5 text-center text-zinc-100 text-3xl">
        Tags
      </h1>

      <div className="flex gap-2 flex-wrap  px-5">
        {tags.map(({ id, name }) => {
          return (
            <Link
              onClick={(e) => setTagId(id)}
              to={`/articles/tag/${id}`}
              className="text-xs font-medium  bg-zinc-100 rounded-sm text-zinc-900 
          px-2 py-1"
              key={id}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
