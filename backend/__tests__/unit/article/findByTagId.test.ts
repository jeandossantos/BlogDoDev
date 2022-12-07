import { IArticle } from './../../../src/app/article/IArticle';
import { ArticleService } from '../../../src/app/article/ArticleService';
import { randomUUID } from 'crypto';
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

describe('List articles by tag', () => {
  it('should list articles by tag with pagination', async () => {
    const articles = await articleService.findByTagId(1, article.id!);

    expect(articles).toHaveProperty('count');
    expect(articles).toHaveProperty('articles');
    expect(articles).toHaveProperty('limit');

    expect(articles.articles).toBeInstanceOf(Array);
  });
});
