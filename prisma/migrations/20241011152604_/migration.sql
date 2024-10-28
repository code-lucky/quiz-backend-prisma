/*
  Warnings:

  - Made the column `pid` on table `permission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `permission` MODIFY `pid` INTEGER NOT NULL DEFAULT 0;
