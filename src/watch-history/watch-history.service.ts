import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchHistoryService {
  constructor(private prisma: PrismaService) {}

  async add(profileId: number, movieId: number, userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile || profile.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.watchHistory.upsert({
      where: {
        profile_id_movie_id: {
          profile_id: profileId,
          movie_id: movieId,
        },
      },
      update: {
        watched_at: new Date(),
      },
      create: {
        profile_id: profileId,
        movie_id: movieId,
      },
    });
  }

  async get(profileId: number, userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile || profile.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.watchHistory.findMany({
      where: { profile_id: profileId },
      include: { movie: true },
      orderBy: { watched_at: 'desc' },
    });
  }
}
