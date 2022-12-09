import { IArticleRepository } from './../article/IArticleRepository';
import { ITagRepository } from './ITagRepository';
import { CustomException } from '../../exceptions/CustomException';
import { z } from 'zod';

export class TagService {
  constructor(
    private tagRepository: ITagRepository,
    private articleRepository: IArticleRepository
  ) {}

  async create(name: string) {
    name = z.string().min(2).parse(name.toLowerCase().trim());

    const tagFromDB = await this.tagRepository.findByName(name);

    if (tagFromDB) {
      throw new CustomException(`Tag with name ${name} already exists`);
    }

    const tag = await this.tagRepository.create(name);

    return tag;
  }

  async list() {
    const tags = await this.tagRepository.find();

    return tags;
  }

  async remove(tagId: string) {
    const result = await this.articleRepository.findByTag(1, tagId);

    if (result.articles.length > 0) {
      throw new CustomException(`This tag has articles. It cannot be removed.`);
    }

    await this.tagRepository.delete(tagId);
  }
}
