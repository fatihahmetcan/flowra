/*
  Warnings:

  - The `status` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `TimeTracking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `equipmentId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProjectImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TimeTracking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('ADMIN', 'OFFICE', 'FOREMAN');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'DOING', 'DONE');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('AVAILABLE', 'ON_SITE', 'REPAIR');

-- CreateEnum
CREATE TYPE "TimeTrackingStatus" AS ENUM ('PENDING', 'APPROVED', 'LOCKED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PAID', 'OVERDUE');

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "equipmentId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "EmployeeRole" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProjectImage" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'TODO';

-- AlterTable
ALTER TABLE "TimeTracking" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TimeTrackingStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "EquipmentCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "internalAssetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "EquipmentStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentCategory_name_key" ON "EquipmentCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_internalAssetId_key" ON "Equipment"("internalAssetId");

-- CreateIndex
CREATE INDEX "Equipment_categoryId_idx" ON "Equipment"("categoryId");

-- CreateIndex
CREATE INDEX "Assignment_projectId_idx" ON "Assignment"("projectId");

-- CreateIndex
CREATE INDEX "Assignment_employeeId_idx" ON "Assignment"("employeeId");

-- CreateIndex
CREATE INDEX "Assignment_equipmentId_idx" ON "Assignment"("equipmentId");

-- CreateIndex
CREATE INDEX "Assignment_scheduledDate_equipmentId_idx" ON "Assignment"("scheduledDate", "equipmentId");

-- CreateIndex
CREATE INDEX "Invoice_projectId_idx" ON "Invoice"("projectId");

-- CreateIndex
CREATE INDEX "InvoiceItem_invoiceId_idx" ON "InvoiceItem"("invoiceId");

-- CreateIndex
CREATE INDEX "Project_customerId_idx" ON "Project"("customerId");

-- CreateIndex
CREATE INDEX "Project_foremanId_idx" ON "Project"("foremanId");

-- CreateIndex
CREATE INDEX "ProjectImage_projectId_idx" ON "ProjectImage"("projectId");

-- CreateIndex
CREATE INDEX "ProjectImage_uploadedBy_idx" ON "ProjectImage"("uploadedBy");

-- CreateIndex
CREATE INDEX "Task_projectId_idx" ON "Task"("projectId");

-- CreateIndex
CREATE INDEX "TimeTracking_projectId_idx" ON "TimeTracking"("projectId");

-- CreateIndex
CREATE INDEX "TimeTracking_employeeId_idx" ON "TimeTracking"("employeeId");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "EquipmentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
