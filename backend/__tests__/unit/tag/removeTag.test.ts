import { ITag } from '../../../src/app/tag/ITagRepository';
import { TagService } from '../../../src/app/tag/TagService';

import { TagRepoInMemory } from '../../../src/inMemory/TagRepoInMemory';
import { ArticleRepoInMemory } from '../../../src/inMemory/ArticleRepoInMemory';
import { CustomException } from '../../../src/exceptions/CustomException';

const articleRepository = new ArticleRepoInMemory();

const tagService = new TagService(new TagRepoInMemory(), articleRepository);

let tag: ITag;

beforeAll(async () => {
  tag = await tagService.create('tag to me deleted');
});

describe('Remove a Tag', () => {
  it('should remove a tag', async () => {
    const result = await tagService.remove(tag.id!);

    expect(result).toBe(undefined);
  });

  it('should not remove a tag if it has an article', async () => {
    const tagWithArticle = await tagService.create(
      'tag with article cannot be deleted'
    );

    await articleRepository.create({
      title: 'My Article',
      content: 'This is the content of the article',
      authorId: 'UUID',
      tags: [tagWithArticle.id!],
    });

    const result = tagService.remove(tagWithArticle.id!);

    await expect(result).rejects.toThrowError(
      new CustomException('This tag has articles. It cannot be removed.')
    );
  });
});
