import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { PlansModule } from './plans/plans.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MoviesModule } from './movies/movies.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { WatchHistoryModule } from './watch-history/watch-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 FIRST!
    PrismaModule,
    AuthModule,
    UsersModule,
    PlansModule,
    ProfilesModule,
    MoviesModule,
    WatchlistModule,
    WatchHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
