/*
  Warnings:

  - You are about to drop the `Dislike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_userId_fkey";

-- DropTable
DROP TABLE "Dislike";
