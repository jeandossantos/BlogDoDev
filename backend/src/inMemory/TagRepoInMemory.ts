import { ITag, ITagRepository } from '../app/tag/ITagRepository';
import { randomUUID } from 'node:crypto';
export class TagRepoInMemory implements ITagRepository {
  Tag: ITag[] = [];

  async create(name: string): Promise<ITag> {
    const tagExists = this.Tag.some((t) => t.name === name);
    if (tagExists) {
      throw new Error(`Tag with name ${name} already exists`);
    }

    const task = { id: crypto.randomUUID(), name };

    this.Tag.push(task);

    return task;
  }

  async find(): Promise<ITag[]> {
    return this.Tag;
  }

  async delete(id: string): Promise<void> {
    this.Tag.forEach((t) => {
      if (t.id === id) {
        this.Tag = this.Tag.filter((t) => t.id !== id);
      }
    });
  }
}
