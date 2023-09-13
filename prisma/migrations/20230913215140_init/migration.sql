/*
  Warnings:

  - You are about to drop the column `images_url` on the `product_image` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `product_image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_images_url_fkey";

-- DropIndex
DROP INDEX "unique_image_contract";

-- AlterTable
ALTER TABLE "product_image" DROP COLUMN "images_url",
ADD COLUMN     "image_url" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "unique_image_contract" ON "product_image"("product_item_id", "image_url");

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_image_url_fkey" FOREIGN KEY ("image_url") REFERENCES "image"("url") ON DELETE RESTRICT ON UPDATE CASCADE;
