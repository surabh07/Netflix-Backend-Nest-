import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchlistService {
  constructor(private prisma: PrismaService) {}

  async add(profileId: number, movieId: number, userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile || profile.user_id !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.watchlist.create({
      data: {
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
      throw new ForbiddenException();
    }

    return this.prisma.watchlist.findMany({
      where: { profile_id: profileId },
      include: { movie: true },
    });
  }

  async remove(profileId: number, movieId: number, userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile || profile.user_id !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.watchlist.delete({
      where: {
        profile_id_movie_id: {
          profile_id: profileId,
          movie_id: movieId,
        },
      },
    });
  }
}
