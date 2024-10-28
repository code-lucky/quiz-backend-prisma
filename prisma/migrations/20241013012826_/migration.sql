/*
  Warnings:

  - You are about to drop the column `hidden` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `pid` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `component` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `frame_src` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `hide` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `pid` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `route` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `sort` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `permission` table. All the data in the column will be lost.
  - Added the required column `label` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_id` to the `permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `hidden`,
    DROP COLUMN `path`,
    DROP COLUMN `pid`,
    ADD COLUMN `frame_src` VARCHAR(191) NULL,
    ADD COLUMN `hide` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `pid` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `route` VARCHAR(191) NULL,
    MODIFY `icon` VARCHAR(191) NULL,
    MODIFY `sort` INTEGER NULL;

-- AlterTable
ALTER TABLE `permission` DROP COLUMN `component`,
    DROP COLUMN `frame_src`,
    DROP COLUMN `hide`,
    DROP COLUMN `icon`,
    DROP COLUMN `label`,
    DROP COLUMN `name`,
    DROP COLUMN `pid`,
    DROP COLUMN `route`,
    DROP COLUMN `sort`,
    DROP COLUMN `type`,
    ADD COLUMN `menu_id` INTEGER NOT NULL,
    ADD COLUMN `role_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `permission_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `permission_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
