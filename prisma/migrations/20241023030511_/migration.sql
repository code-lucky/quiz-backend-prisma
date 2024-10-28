/*
  Warnings:

  - You are about to drop the column `pid` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `route` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `pid`,
    DROP COLUMN `route`,
    ADD COLUMN `pid` INTEGER NOT NULL DEFAULT 0;
