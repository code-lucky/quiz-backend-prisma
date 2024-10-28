/*
  Warnings:

  - You are about to drop the column `label` on the `menu` table. All the data in the column will be lost.
  - Added the required column `name` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `label`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
