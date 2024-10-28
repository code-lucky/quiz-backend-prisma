/*
  Warnings:

  - You are about to drop the column `name` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `name`,
    ADD COLUMN `path` VARCHAR(191) NULL;
