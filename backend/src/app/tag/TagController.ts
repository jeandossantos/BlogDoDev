import { Response, Request } from 'express';
import { TagService } from './TagService';

export class TagController {
  constructor(private tagService: TagService) {}

  async store(req: Request, res: Response) {
    const { name } = req.body;

    const tag = await this.tagService.create(name);

    return res.status(201).json(tag);
  }

  async index(req: Request, res: Response) {
    const tags = await this.tagService.list();

    return res.json(tags);
  }

  async destroy(req: Request, res: Response) {
    const tagId = req.params.tagId;

    await this.tagService.remove(tagId);

    return res.send();
  }
}
