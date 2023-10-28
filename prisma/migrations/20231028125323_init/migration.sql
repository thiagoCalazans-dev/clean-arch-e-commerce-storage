/*
  Warnings:

  - You are about to drop the column `cost` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `trending` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "cost",
DROP COLUMN "trending";

-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "product_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
