/*
  Warnings:

  - You are about to drop the column `frameSrc` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `hideTab` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `newFeature` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `permission` DROP COLUMN `frameSrc`,
    DROP COLUMN `hideTab`,
    DROP COLUMN `newFeature`,
    DROP COLUMN `parentId`,
    ADD COLUMN `frame_src` VARCHAR(191) NULL,
    ADD COLUMN `hide_tab` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `new_feature` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `pid` VARCHAR(191) NULL;
