-- CreateTable
CREATE TABLE "stock_out" (
    "id" TEXT NOT NULL,
    "product_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "stock_out_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock_out" ADD CONSTRAINT "stock_out_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
