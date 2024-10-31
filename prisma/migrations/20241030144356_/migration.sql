/*
  Warnings:

  - A unique constraint covering the columns `[openid]` on the table `client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `client_email_key` ON `client`;

-- CreateIndex
CREATE UNIQUE INDEX `client_openid_key` ON `client`(`openid`);
