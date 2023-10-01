-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_product_item_id_fkey";

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
