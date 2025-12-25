import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async createProfile(userId: string, dto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: {
        user_id: userId,
        name: dto.name,
        is_kid: dto.is_kid ?? false,
      },
    });
  }

  async getProfiles(userId: string) {
    return this.prisma.profile.findMany({
      where: { user_id: userId },
    });
  }

  async deleteProfile(userId: string, profileId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (profile.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.prisma.profile.delete({
      where: { id: profileId },
    });

    return { message: 'Profile deleted successfully' };
  }
}
