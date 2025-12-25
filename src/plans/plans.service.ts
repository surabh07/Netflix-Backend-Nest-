import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create_plan.dto';
import { UpdatePlanDto } from './dto/update_plan.dto';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  // ----- GET ALL PLANS -----
  public getAllPlans() {
    return this.prisma.plan.findMany();
  }

  // ----- SUBSCRIBE ------
  async subscribe(userId: string, planId: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new BadRequestException('Plan not found');
    }

    const now = new Date();

    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Expire existing active subscription (if any)
      await tx.subscription.updateMany({
        where: {
          user_id: userId,
          end_at: { gt: now },
        },
        data: {
          end_at: now,
        },
      });

      // 2️⃣ Create new subscription
      const endAt = new Date();
      endAt.setDate(endAt.getDate() + plan.duration);

      return tx.subscription.create({
        data: {
          user_id: userId,
          plan_id: plan.id,
          end_at: endAt,
        },
        include: {
          plan: true,
        },
      });
    });
  }

  //---- GET MY SUBSCRIPTION ----
  async getMySubscription(userId: string) {
    const now = new Date();

    return this.prisma.subscription.findFirst({
      where: {
        user_id: userId,
        end_at: { gt: now },
      },
      include: {
        plan: true,
      },
    });
  }

  async getPlanById(id: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new BadRequestException('Plan not found');
    }

    return plan;
  }

  async createPlan(dto: CreatePlanDto) {
    return this.prisma.plan.create({
      data: dto,
    });
  }

  async updatePlan(id: number, dto: UpdatePlanDto) {
    return this.prisma.plan.update({
      where: { id },
      data: dto,
    });
  }

  async deletePlan(id: number) {
    return this.prisma.plan.delete({
      where: { id },
    });
  }
}
