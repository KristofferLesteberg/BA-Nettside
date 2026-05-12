/*
  Warnings:

  - The primary key for the `ProjectRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
