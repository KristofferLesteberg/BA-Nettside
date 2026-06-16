/*
  Warnings:

  - You are about to drop the column `notes` on the `ProductOrder` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "OrderNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "authorName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderNote_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "ProductOrder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "extraDetails" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "isSeeded" BOOLEAN NOT NULL DEFAULT false,
    "productId" INTEGER,
    "snapshotTitle" TEXT,
    "snapshotPrice" DECIMAL,
    "snapshotContact" JSONB,
    CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductOrder" ("amount", "clientEmail", "clientName", "clientPhone", "extraDetails", "id", "isSeeded", "productId", "snapshotContact", "snapshotPrice", "snapshotTitle", "status") SELECT "amount", "clientEmail", "clientName", "clientPhone", "extraDetails", "id", "isSeeded", "productId", "snapshotContact", "snapshotPrice", "snapshotTitle", "status" FROM "ProductOrder";
DROP TABLE "ProductOrder";
ALTER TABLE "new_ProductOrder" RENAME TO "ProductOrder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "OrderNote_orderId_idx" ON "OrderNote"("orderId");
