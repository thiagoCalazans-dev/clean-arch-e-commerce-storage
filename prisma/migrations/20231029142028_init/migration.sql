-- CreateTable
CREATE TABLE "pentry_stock" (
    "id" TEXT NOT NULL,
    "product_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "pentry_stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pentry_stock" ADD CONSTRAINT "pentry_stock_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
