/*
  Warnings:

  - You are about to drop the column `code` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `product_item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `product_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "product_code_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "product_item" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_item_code_key" ON "product_item"("code");
