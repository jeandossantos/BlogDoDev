export interface ITag {
  id?: string;
  name: string;
}

export interface ITagRepository {
  create(name: string): Promise<ITag>;
  find(): Promise<ITag[]>;
  delete(id: string): Promise<void>;
}
