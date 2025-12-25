import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profiles')
@UseGuards(AuthGuard('jwt'))
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateProfileDto) {
    return this.profilesService.createProfile(req.user.userId, dto);
  }

  @Get()
  getAll(@Req() req) {
    return this.profilesService.getProfiles(req.user.userId);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.profilesService.deleteProfile(req.user.userId, id);
  }
}
