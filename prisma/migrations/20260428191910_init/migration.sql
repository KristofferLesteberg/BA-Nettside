-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "educationField" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "measures" JSONB,
    "amount" INTEGER NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactPersonId" INTEGER,
    CONSTRAINT "Product_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "ContactPerson" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- CreateTable
CREATE TABLE "ClientReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "orgName" TEXT,
    "orgURL" TEXT,
    "imageId" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ContactPerson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Product_educationField_idx" ON "Product"("educationField");

-- CreateIndex
CREATE INDEX "ProjectRequest_clientEmail_idx" ON "ProjectRequest"("clientEmail");

-- CreateIndex
CREATE INDEX "ProjectRequest_clientPhone_idx" ON "ProjectRequest"("clientPhone");

-- CreateIndex
CREATE INDEX "ProjectRequest_organizationNumber_idx" ON "ProjectRequest"("organizationNumber");
