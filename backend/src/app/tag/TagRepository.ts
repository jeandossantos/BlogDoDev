import { prisma } from '../../connection/prisma';
import { ITag, ITagRepository } from './ITagRepository';

export class TagRepository implements ITagRepository {
  async create(name: string): Promise<ITag> {
    const tag = await prisma.tag.create({
      data: {
        name,
      },
    });

    return tag;
  }

  async find(): Promise<ITag[]> {
    const tags = await prisma.tag.findMany();

    return tags;
  }

  async delete(id: string): Promise<void> {
    await prisma.tag.delete({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<ITag | null> {
    const tag = await prisma.tag.findFirst({
      where: { name },
    });

    return tag;
  }
}
