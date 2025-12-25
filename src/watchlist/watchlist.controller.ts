import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
@UseGuards(AuthGuard('jwt'))
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  @Post(':profileId/:movieId')
  add(
    @Req() req,
    @Param('profileId', ParseIntPipe) profileId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.watchlistService.add(profileId, movieId, req.user.userId);
  }

  @Get(':profileId')
  get(@Req() req, @Param('profileId', ParseIntPipe) profileId: number) {
    return this.watchlistService.get(profileId, req.user.userId);
  }

  @Delete(':profileId/:movieId')
  remove(
    @Req() req,
    @Param('profileId', ParseIntPipe) profileId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.watchlistService.remove(profileId, movieId, req.user.userId);
  }
}
