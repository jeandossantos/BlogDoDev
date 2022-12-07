import { ZodError } from 'zod';
import { randomUUID } from 'crypto';

import { IArticle } from './../../../src/app/article/IArticle';

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

describe('Update article', () => {
  it('should update article', async () => {
    const articleUpdated = await articleService.update({
      id: article.id,
      title: 'Article updated',
      description: 'description updated',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
      tags: [randomUUID(), randomUUID()],
      imageUrl: 'imageUrlUpdated.png',
    });

    expect(articleUpdated.id).toBe(article.id);
    expect(articleUpdated.title).toBe('Article updated');
    expect(articleUpdated.description).toBe('description updated');
    expect(articleUpdated.content).toBe(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    );
    expect(articleUpdated.tags).toHaveLength(2);
    expect(articleUpdated.imageUrl).toBe('imageUrlUpdated.png');
    expect(articleUpdated.updatedAt).toBeDefined();
  });

  it('should update article with no description', async () => {
    const articleUpdated = await articleService.update({
      id: article.id,
      title: 'Article updated',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
      tags: [randomUUID(), randomUUID()],
      imageUrl: 'imageUrlUpdated.png',
    });

    expect(articleUpdated.id).toBe(article.id);
    expect(articleUpdated.title).toBe('Article updated');
    expect(articleUpdated.description).toBe(article.description);
    expect(articleUpdated.content).toBe(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    );
    expect(articleUpdated.tags).toHaveLength(2);
    expect(articleUpdated.imageUrl).toBe('imageUrlUpdated.png');
    expect(articleUpdated.updatedAt).toBeDefined();
  });

  it('should update article with no imageUrl', async () => {
    const articleUpdated = await articleService.update({
      id: article.id,
      title: 'Article updated',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
      tags: [randomUUID(), randomUUID()],
      imageUrl: '',
    });

    expect(articleUpdated.id).toBe(article.id);
    expect(articleUpdated.title).toBe('Article updated');
    expect(articleUpdated.description).toBe(article.description);
    expect(articleUpdated.content).toBe(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    );
    expect(articleUpdated.tags).toHaveLength(2);
    expect(articleUpdated.imageUrl).toBe(article.imageUrl);
    expect(articleUpdated.updatedAt).toBeDefined();
  });

  it('should not update article with description less than 200 characters', async () => {
    const articleUpdated = articleService.update({
      id: article.id,
      title: 'Article updated',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      tags: [randomUUID(), randomUUID()],
      imageUrl: 'imageUrlUpdated.png',
    });

    await expect(articleUpdated).rejects.toThrow(ZodError);
  });

  it('should not update article with any tag', async () => {
    const articleUpdated = articleService.update({
      id: article.id,
      title: 'Article updated',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      tags: [],
      imageUrl: 'imageUrlUpdated.png',
    });

    await expect(articleUpdated).rejects.toThrow(ZodError);
  });
});
