-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentorId" TEXT NOT NULL,
    "commentorName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "facebookId" TEXT NOT NULL
);
