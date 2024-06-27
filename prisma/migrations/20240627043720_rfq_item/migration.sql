/*
  Warnings:

  - Added the required column `items` to the `Rfq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rfq` ADD COLUMN `items` JSON NOT NULL;
