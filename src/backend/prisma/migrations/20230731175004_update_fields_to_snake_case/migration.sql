/*
  Warnings:

  - You are about to drop the column `createdAt` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `doneAt` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledAt` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `project` table. All the data in the column will be lost.
  - Added the required column `project_id` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduled_at` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenance_projectId_fkey";

-- AlterTable
ALTER TABLE "maintenance" DROP COLUMN "createdAt",
DROP COLUMN "doneAt",
DROP COLUMN "projectId",
DROP COLUMN "scheduledAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "done_at" TIMESTAMP(3),
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "scheduled_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
