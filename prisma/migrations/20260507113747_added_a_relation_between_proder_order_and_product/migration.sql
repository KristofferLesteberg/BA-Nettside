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
    "productId" INTEGER,
    CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductOrder" ("amount", "clientEmail", "clientName", "clientPhone", "extraDetails", "id") SELECT "amount", "clientEmail", "clientName", "clientPhone", "extraDetails", "id" FROM "ProductOrder";
DROP TABLE "ProductOrder";
ALTER TABLE "new_ProductOrder" RENAME TO "ProductOrder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
