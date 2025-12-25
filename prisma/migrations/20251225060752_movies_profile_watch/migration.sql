/*
  Warnings:

  - A unique constraint covering the columns `[profile_id,movie_id]` on the table `WatchHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchHistory_profile_id_movie_id_key" ON "WatchHistory"("profile_id", "movie_id");
