import { ZodError } from 'zod';
import { TagService } from '../../../app/tag/TagService';
import { CustomException } from '../../../exceptions/CustomException';

import { TagRepoInMemory } from '../../../inMemory/TagRepoInMemory';

const tagService = new TagService(new TagRepoInMemory());

describe('Create a Tag', () => {
  it('should create a tag', async () => {
    const tag = await tagService.create('test');

    expect(tag.name).toEqual('test');

    expect(tag.id).toBeDefined();
  });

  it('should not create a tag if it already exists', async () => {
    const tag = tagService.create('test');

    await expect(tag).rejects.toThrowError(
      new CustomException('Tag with name test already exists')
    );
  });
});
