import { ArticleService } from '../../../src/app/article/ArticleService';

import { ArticleRepoInMemory } from '../../../src/inMemory/ArticleRepoInMemory';

const articleService = new ArticleService(new ArticleRepoInMemory());

describe('List articles with pagination', () => {
  it('should list articles with pagination', async () => {
    const articles = await articleService.list();

    expect(articles).toHaveProperty('count');
    expect(articles).toHaveProperty('articles');
    expect(articles).toHaveProperty('limit');

    expect(articles.articles).toHaveLength(4);
  });

  it('should list articles by page', async () => {
    const articles = await articleService.list(2);

    console.log(articles);

    expect(articles).toHaveProperty('count');
    expect(articles).toHaveProperty('articles');
    expect(articles).toHaveProperty('limit');

    expect(articles.articles).toHaveLength(1);
  });
});
