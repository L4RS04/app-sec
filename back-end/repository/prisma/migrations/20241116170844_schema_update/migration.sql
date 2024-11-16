/*
  Warnings:

  - You are about to drop the column `releaseYear` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfSeasons` on the `Series` table. All the data in the column will be lost.
  - Added the required column `release_year` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_seasons` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "releaseYear",
ADD COLUMN     "release_year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "numberOfSeasons",
ADD COLUMN     "number_of_seasons" INTEGER NOT NULL;
