/*
  Warnings:

  - The primary key for the `permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `role_menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `role_menu` DROP FOREIGN KEY `role_menu_menu_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_menu` DROP FOREIGN KEY `role_menu_role_id_fkey`;

-- AlterTable
ALTER TABLE `permission` DROP PRIMARY KEY,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `role_menu`;
