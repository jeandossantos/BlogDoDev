import { randomUUID } from 'crypto';

import { IArticle } from './../../../src/app/article/IArticleRepository';

import { ArticleService } from '../../../src/app/article/ArticleService';

import { ArticleRepoInMemory } from '../../../src/inMemory/ArticleRepoInMemory';

const articleService = new ArticleService(new ArticleRepoInMemory());

let article: IArticle;

beforeAll(async () => {
  article = await articleService.create({
    title: 'My Article',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    imageUrl: 'imageUrl.png',
    tags: [randomUUID()],
    authorId: randomUUID(),
  });
});

describe('Remove an article', () => {
  it('should remove an article', async () => {
    const result = await articleService.remove(article.id!);

    expect(result).toBeUndefined();
  });
});
