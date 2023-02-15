/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `Dislike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dislike_userId_movieId_key" ON "Dislike"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_movieId_key" ON "Like"("userId", "movieId");
