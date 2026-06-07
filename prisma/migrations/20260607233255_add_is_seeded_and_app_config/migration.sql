-- CreateTable
CREATE TABLE "AppConfig" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "orgName" TEXT,
    "orgURL" TEXT,
    "imageId" TEXT,
    "message" TEXT NOT NULL,
    "isSeeded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ClientReview" ("createdAt", "id", "imageId", "message", "name", "orgName", "orgURL", "role") SELECT "createdAt", "id", "imageId", "message", "name", "orgName", "orgURL", "role" FROM "ClientReview";
DROP TABLE "ClientReview";
ALTER TABLE "new_ClientReview" RENAME TO "ClientReview";
CREATE TABLE "new_ContactPerson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isSeeded" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_ContactPerson" ("email", "id", "name", "phone", "title") SELECT "email", "id", "name", "phone", "title" FROM "ContactPerson";
DROP TABLE "ContactPerson";
ALTER TABLE "new_ContactPerson" RENAME TO "ContactPerson";
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
    "isSeeded" BOOLEAN NOT NULL DEFAULT false,
    "contactPersonId" INTEGER,
    CONSTRAINT "Product_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "ContactPerson" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("amount", "contactPersonId", "description", "draft", "educationField", "id", "measures", "price", "publishedAt", "title") SELECT "amount", "contactPersonId", "description", "draft", "educationField", "id", "measures", "price", "publishedAt", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE INDEX "Product_educationField_idx" ON "Product"("educationField");
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
    CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductOrder" ("amount", "clientEmail", "clientName", "clientPhone", "extraDetails", "id", "productId", "status") SELECT "amount", "clientEmail", "clientName", "clientPhone", "extraDetails", "id", "productId", "status" FROM "ProductOrder";
DROP TABLE "ProductOrder";
ALTER TABLE "new_ProductOrder" RENAME TO "ProductOrder";
CREATE TABLE "new_ProjectRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "educationField" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minPrice" DECIMAL NOT NULL,
    "maxPrice" DECIMAL NOT NULL,
    "clientForename" TEXT NOT NULL,
    "clientSurname" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "organizationName" TEXT,
    "organizationNumber" TEXT,
    "address" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "isSeeded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ProjectRequest" ("address", "billingAddress", "clientEmail", "clientForename", "clientPhone", "clientSurname", "createdAt", "description", "educationField", "id", "maxPrice", "minPrice", "organizationName", "organizationNumber", "status", "title") SELECT "address", "billingAddress", "clientEmail", "clientForename", "clientPhone", "clientSurname", "createdAt", "description", "educationField", "id", "maxPrice", "minPrice", "organizationName", "organizationNumber", "status", "title" FROM "ProjectRequest";
DROP TABLE "ProjectRequest";
ALTER TABLE "new_ProjectRequest" RENAME TO "ProjectRequest";
CREATE INDEX "ProjectRequest_clientEmail_idx" ON "ProjectRequest"("clientEmail");
CREATE INDEX "ProjectRequest_clientPhone_idx" ON "ProjectRequest"("clientPhone");
CREATE INDEX "ProjectRequest_organizationNumber_idx" ON "ProjectRequest"("organizationNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
