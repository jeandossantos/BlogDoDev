import { ZodError } from 'zod';
import { TagService } from '../../../app/tag/TagService';

import { TagRepoInMemory } from '../../../inMemory/TagRepoInMemory';

const tagService = new TagService(new TagRepoInMemory());

describe('Create a Tag', () => {
  it('should create a tag', async () => {
    const tag = await tagService.create('test');

    expect(tag.name).toEqual('test');

    expect(tag.id).toBeDefined();
  });
});
