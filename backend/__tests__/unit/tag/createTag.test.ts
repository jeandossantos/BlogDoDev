import { ZodError } from 'zod';
import { TagService } from '../../../src/app/tag/TagService';
import { CustomException } from '../../../src/exceptions/CustomException';

import { TagRepoInMemory } from '../../../src/inMemory/TagRepoInMemory';

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

  it('should not create a tag whit name less than 2 characters', async () => {
    const tag = tagService.create('1');

    await expect(tag).rejects.toThrow(ZodError);
  });
});
