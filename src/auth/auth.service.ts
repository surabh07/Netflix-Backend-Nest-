import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //Register Function
  async register(dto: RegisterDto) {
    const { email, password, first_name, last_name, phonenumber, roles } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Everything inside this block is "All or Nothing"
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          first_name,
          last_name,
          phonenumber,
          roles: {
            create: roles.map((roleName) => ({
              role: {
                connect: { role_name: roleName },
              },
            })),
          },
        },
        // Include roles in the result so the frontend knows it worked
        include: {
          roles: {
            include: { role: true },
          },
        },
      });

      return user;
    });
  }

  //Login Function
  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid === false) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const roles = user.roles.map((ur) => ur.role.role_name);

    const payload = {
      sub: user.user_id,
      email: user.email,
      roles,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
