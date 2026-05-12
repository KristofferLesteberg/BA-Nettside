-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "educationField" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "measures" JSONB,
    "amount" INTEGER NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "contactPersonId" INTEGER,
    CONSTRAINT "Product_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "ContactPerson" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("amount", "contactPersonId", "description", "educationField", "id", "measures", "price", "publishedAt", "title") SELECT "amount", "contactPersonId", "description", "educationField", "id", "measures", "price", "publishedAt", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE INDEX "Product_educationField_idx" ON "Product"("educationField");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
