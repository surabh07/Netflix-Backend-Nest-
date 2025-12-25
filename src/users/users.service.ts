import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // 🔁 Used by AuthService
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });
  }

  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    if (!user || user.is_deleted) {
      throw new NotFoundException('User not found');
    }

    const { password, ...safeUser } = user;
    return safeUser;
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { user_id: userId },
      data: dto,
    });

    const { password, ...safeUser } = user;
    return safeUser;
  }

  async softDelete(userId: string) {
    await this.prisma.user.update({
      where: { user_id: userId },
      data: {
        is_deleted: true,
      },
    });

    return { message: 'Account deleted successfully' };
  }
}
