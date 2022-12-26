/*
  Warnings:

  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_articleId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropTable
DROP TABLE "favorites";
