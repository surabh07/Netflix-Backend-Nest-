import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // 👈 THIS IS THE KEY
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
