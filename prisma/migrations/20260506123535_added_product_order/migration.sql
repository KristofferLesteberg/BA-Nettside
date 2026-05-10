-- CreateTable
CREATE TABLE "ProductOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "extraDetails" TEXT
);
