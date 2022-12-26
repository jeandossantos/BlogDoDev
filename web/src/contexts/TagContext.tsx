import { createContext, ReactNode, useState } from 'react';
import { api } from '../services/api';

interface ITag {
  id: string;
  name: string;
}

type TagContextData = {
  listTags: () => Promise<ITag[]>;
  createTag: (name: string) => Promise<void>;
  tagId: string;
  setTagId: React.Dispatch<React.SetStateAction<string>>;
};

type TagProviderProps = {
  children: ReactNode;
};

export const TagContext = createContext({} as TagContextData);

export function TagProvider({ children }: TagProviderProps) {
  const [tagId, setTagId] = useState('');

  async function listTags() {
    const response = await api.get('/tags');
    const tags = response.data;

    return tags;
  }

  async function createTag(name: string) {
    await api.post('/tags', {
      name,
    });
  }

  return (
    <TagContext.Provider value={{ listTags, createTag, setTagId, tagId }}>
      {children}
    </TagContext.Provider>
  );
}
