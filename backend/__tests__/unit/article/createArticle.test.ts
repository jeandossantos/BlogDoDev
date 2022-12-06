import { ArticleService } from '../../../src/app/article/ArticleService';
import { IUser } from '../../../src/app/user/IUserRepository';
import { ArticleRepoInMemory } from '../../../src/inMemory/ArticleRepoInMemory';
import { UserRepoInMemory } from '../../../src/inMemory/UserRepoInMemory';
import { TagRepoInMemory } from '../../../src/inMemory/TagRepoInMemory';
import { ITag } from '../../../src/app/tag/ITagRepository';

const articleService = new ArticleService(new ArticleRepoInMemory());

let user: IUser;
let tag: ITag;

beforeAll(async () => {
  user = await new UserRepoInMemory().create({
    username: 'bob',
    email: 'bob@example.com',
    password: 'password',
    createdAt: new Date(),
  });

  tag = await new TagRepoInMemory().create('TagForArticle');
});

describe('Create a article', () => {
  it('should create an article', async () => {
    const article = await articleService.create({
      title: 'My Article',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
      imageUrl: 'imageUrl.png',
      tags: [tag.id!],
      authorId: user.id!,
    });

    expect(article.id).toBeDefined();
  });

  it('should create an article without an imageUrl', async () => {
    const article = await articleService.create({
      title: 'My Article',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
      tags: [tag.id!],
      authorId: user.id!,
    });

    expect(article.id).toBeDefined();
  });
});
