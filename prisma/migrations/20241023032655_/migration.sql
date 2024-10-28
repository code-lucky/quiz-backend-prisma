/*
  Warnings:

  - You are about to drop the column `frame_src` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `frame_src`,
    ADD COLUMN `href` VARCHAR(191) NULL;
