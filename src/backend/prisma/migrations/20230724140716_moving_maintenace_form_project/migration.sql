/*
  Warnings:

  - You are about to drop the column `lastMaintenance` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `nextMaintenance` on the `project` table. All the data in the column will be lost.
  - Added the required column `scheduledAt` to the `maintenance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maintenance" ADD COLUMN     "doneAt" TIMESTAMP(3),
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "lastMaintenance",
DROP COLUMN "nextMaintenance";
