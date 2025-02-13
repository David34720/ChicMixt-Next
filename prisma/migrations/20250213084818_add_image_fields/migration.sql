-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "reference" TEXT NOT NULL DEFAULT '',
    "promotion" BOOLEAN NOT NULL DEFAULT false,
    "nouveaute" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Image" ("createdAt", "description", "id", "position", "title", "url") SELECT "createdAt", "description", "id", "position", "title", "url" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
