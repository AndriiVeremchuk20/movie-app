/*
  Warnings:

  - You are about to drop the column `ageLimit` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `trailerPath` on the `Movie` table. All the data in the column will be lost.
  - The `year` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `moviePath` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Movie_path_key";

-- DropIndex
DROP INDEX "Movie_trailerPath_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "ageLimit",
DROP COLUMN "duration",
DROP COLUMN "genre",
DROP COLUMN "path",
DROP COLUMN "rating",
DROP COLUMN "trailerPath",
ADD COLUMN     "moviePath" TEXT NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "Genre";
