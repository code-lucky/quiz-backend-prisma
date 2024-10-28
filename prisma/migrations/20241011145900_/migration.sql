/*
  Warnings:

  - You are about to drop the column `hide_tab` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `new_feature` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `permission` DROP COLUMN `hide_tab`,
    DROP COLUMN `new_feature`,
    DROP COLUMN `order`,
    DROP COLUMN `status`,
    ADD COLUMN `sort` INTEGER NULL;
