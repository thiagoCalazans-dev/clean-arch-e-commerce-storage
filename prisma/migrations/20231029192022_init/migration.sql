/*
  Warnings:

  - A unique constraint covering the columns `[product_item_id]` on the table `stock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_product_item_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "stock_product_item_id_key" ON "stock"("product_item_id");

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
