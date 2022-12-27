import { encryptPassword } from '../src/app/utils/utils';
import { prisma } from '../src/connection/prisma';

const article = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet',
  content:
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices. Auctor elit sed vulputate mi sit amet mauris commodo quis.Varius sit amet</p>',
};

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'superblogueiro@gmail.com' },
    update: {},
    create: {
      username: 'Super blogueiro',
      email: 'superblogueiro@gmail.com',
      password: encryptPassword('123456'),
      Article: {
        create: [
          {
            title: 'Como instalar o node.js no linux',
            description: article.description,
            content: article.content,
            tags: {
              create: [
                {
                  name: 'node.js',
                },
                {
                  name: 'linux',
                },
              ],
            },
            imageUrl: '1671927337677_1417589427_nodejs-256.png',
          },
          {
            title: 'Primeiros passos com git e github',
            description: article.description,
            content: article.content,
            tags: {
              create: [
                {
                  name: 'git',
                },
                {
                  name: 'shell',
                },
              ],
            },
            imageUrl: '1671925457005_git.png',
          },
          {
            title: 'Tipando seu projeto com typescript',
            description: article.description,
            content: article.content,
            tags: {
              create: [
                {
                  name: 'typescript',
                },
              ],
            },
            imageUrl: '5968381.png',
          },
        ],
      },
    },
  });
}

main().catch((err) => console.error(err));
