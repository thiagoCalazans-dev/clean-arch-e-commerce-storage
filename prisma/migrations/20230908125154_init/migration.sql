/*
  Warnings:

  - You are about to drop the column `url` on the `product_images` table. All the data in the column will be lost.
  - Added the required column `images_url` to the `product_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "unique_image_contract";

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "url",
ADD COLUMN     "images_url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_url_key" ON "Images"("url");

-- CreateIndex
CREATE INDEX "unique_image_contract" ON "product_images"("product_item_id", "images_url");

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_images_url_fkey" FOREIGN KEY ("images_url") REFERENCES "Images"("url") ON DELETE RESTRICT ON UPDATE CASCADE;
