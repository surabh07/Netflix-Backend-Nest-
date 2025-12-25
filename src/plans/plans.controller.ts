import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create_plan.dto';
import { UpdatePlanDto } from './dto/update_plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  // PUBLIC
  @Get()
  getPlans() {
    return this.plansService.getAllPlans();
  }

  @Get(':id')
  getPlan(@Param('id', ParseIntPipe) id: number) {
    return this.plansService.getPlanById(id);
  }

  // ADMIN-ROUTES (no roles yet)
  @Post()
  createPlan(@Body() dto: CreatePlanDto) {
    return this.plansService.createPlan(dto);
  }

  @Patch(':id')
  updatePlan(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlanDto,
  ) {
    return this.plansService.updatePlan(id, dto);
  }

  @Delete(':id')
  deletePlan(@Param('id', ParseIntPipe) id: number) {
    return this.plansService.deletePlan(id);
  }

  // USER (JWT)
  @UseGuards(AuthGuard('jwt'))
  @Post('subscribe')
  subscribe(@Req() req, @Body('planId', ParseIntPipe) planId: number) {
    return this.plansService.subscribe(req.user.userId, planId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMyPlan(@Req() req) {
    return this.plansService.getMySubscription(req.user.userId);
  }
}
