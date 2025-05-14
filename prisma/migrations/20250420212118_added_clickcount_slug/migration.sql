-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slug" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "linkId" INTEGER NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "Slug_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Slug_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Slug" ("createdAt", "createdById", "id", "linkId", "slug", "updatedAt") SELECT "createdAt", "createdById", "id", "linkId", "slug", "updatedAt" FROM "Slug";
DROP TABLE "Slug";
ALTER TABLE "new_Slug" RENAME TO "Slug";
CREATE INDEX "Slug_slug_idx" ON "Slug"("slug");
CREATE UNIQUE INDEX "Slug_slug_key" ON "Slug"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
