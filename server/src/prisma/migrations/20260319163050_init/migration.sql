/*
  Warnings:

  - Added the required column `roomeID` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatRoom" ADD COLUMN     "roomeID" TEXT NOT NULL;
