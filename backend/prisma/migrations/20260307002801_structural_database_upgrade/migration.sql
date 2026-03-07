-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EmployeeRole" ADD VALUE 'SUPERADMIN';
ALTER TYPE "EmployeeRole" ADD VALUE 'SITE_MANAGER';

-- AlterEnum
ALTER TYPE "EquipmentStatus" ADD VALUE 'ARCHIVED';

-- AlterEnum
ALTER TYPE "InvoiceStatus" ADD VALUE 'CANCELED';

-- DropForeignKey
ALTER TABLE "TimeTracking" DROP CONSTRAINT "TimeTracking_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "purchaseDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "parentInvoiceId" TEXT,
ADD COLUMN     "sentAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "taxRate" DECIMAL(5,2) NOT NULL DEFAULT 0.19;

-- AlterTable
ALTER TABLE "TimeTracking" ADD COLUMN     "description" TEXT,
ADD COLUMN     "externalWorkerName" TEXT,
ALTER COLUMN "employeeId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CompanyProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "streetHouseNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfile_taxId_key" ON "CompanyProfile"("taxId");

-- CreateIndex
CREATE INDEX "Customer_companyName_lastName_idx" ON "Customer"("companyName", "lastName");

-- CreateIndex
CREATE INDEX "Invoice_parentInvoiceId_idx" ON "Invoice"("parentInvoiceId");

-- CreateIndex
CREATE INDEX "TimeTracking_workDate_projectId_idx" ON "TimeTracking"("workDate", "projectId");

-- AddForeignKey
ALTER TABLE "TimeTracking" ADD CONSTRAINT "TimeTracking_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_parentInvoiceId_fkey" FOREIGN KEY ("parentInvoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
