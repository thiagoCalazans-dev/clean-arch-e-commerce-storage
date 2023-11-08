/*
  Warnings:

  - You are about to drop the `pentry_stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pentry_stock" DROP CONSTRAINT "pentry_stock_product_item_id_fkey";

-- DropTable
DROP TABLE "pentry_stock";

-- CreateTable
CREATE TABLE "entry_stock" (
    "id" TEXT NOT NULL,
    "product_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "entry_stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entry_stock" ADD CONSTRAINT "entry_stock_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
