import { ITagRepository } from './ITagRepository';
import { CustomException } from '../../exceptions/CustomException';
import { z } from 'zod';

export class TagService {
  constructor(private TagRepository: ITagRepository) {}

  async create(name: string) {
    name = z.string().min(2).parse(name.toLowerCase().trim());

    const tagFromDB = await this.TagRepository.findByName(name);

    if (tagFromDB) {
      throw new CustomException(`Tag with name ${name} already exists`);
    }

    const tag = await this.TagRepository.create(name);

    return tag;
  }

  async list() {
    const tags = await this.TagRepository.find();

    return tags;
  }
}
