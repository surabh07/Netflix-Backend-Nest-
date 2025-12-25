import {
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WatchHistoryService } from './watch-history.service';

@Controller('history')
@UseGuards(AuthGuard('jwt'))
export class WatchHistoryController {
  constructor(private watchHistoryService: WatchHistoryService) {}

  @Post(':profileId/:movieId')
  add(
    @Req() req,
    @Param('profileId', ParseIntPipe) profileId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.watchHistoryService.add(profileId, movieId, req.user.userId);
  }

  @Get(':profileId')
  get(@Req() req, @Param('profileId', ParseIntPipe) profileId: number) {
    return this.watchHistoryService.get(profileId, req.user.userId);
  }
}
