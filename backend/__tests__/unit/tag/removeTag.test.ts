import { ITag } from '../../../src/app/tag/ITagRepository';
import { TagService } from '../../../src/app/tag/TagService';

import { TagRepoInMemory } from '../../../src/inMemory/TagRepoInMemory';

const tagService = new TagService(new TagRepoInMemory());
let tag: ITag;

beforeAll(async () => {
  tag = await tagService.create('tag to me deleted');
});

describe('Remove a Tag', () => {
  it('should remove a tag', async () => {
    const result = await tagService.remove(tag.id!);

    expect(result).toBe(undefined);
  });
});