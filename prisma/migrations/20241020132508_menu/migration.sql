/*
  Warnings:

  - Made the column `path` on table `menu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `menu` MODIFY `path` VARCHAR(191) NOT NULL;
