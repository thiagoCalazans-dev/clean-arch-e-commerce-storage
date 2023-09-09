/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_images_url_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_product_item_id_fkey";

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "product_images";

-- CreateTable
CREATE TABLE "product_image" (
    "id" TEXT NOT NULL,
    "product_item_id" TEXT NOT NULL,
    "images_url" TEXT NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "unique_image_contract" ON "product_image"("product_item_id", "images_url");

-- CreateIndex
CREATE UNIQUE INDEX "image_url_key" ON "image"("url");

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_images_url_fkey" FOREIGN KEY ("images_url") REFERENCES "image"("url") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
