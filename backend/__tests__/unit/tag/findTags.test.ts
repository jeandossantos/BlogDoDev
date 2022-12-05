import { TagService } from '../../../src/app/tag/TagService';

import { TagRepoInMemory } from '../../../src/inMemory/TagRepoInMemory';

const tagService = new TagService(new TagRepoInMemory());

beforeAll(async () => {
  await tagService.create('tag to be listed');
});

describe('List tags', () => {
  it('should list all tags', async () => {
    const tags = await tagService.list();

    expect(tags).toHaveProperty('[0].id');
    expect(tags).toHaveProperty('[0].name');
    expect(tags).toBeInstanceOf(Array);
  });
});
