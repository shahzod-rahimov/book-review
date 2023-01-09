import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription) private subscriptionModel: typeof Subscription,
  ) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionModel.create({ ...createSubscriptionDto });
  }

  findAll() {
    return this.subscriptionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const subscription = await this.subscriptionModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!subscription) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return subscription;
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionModel.update(
      { ...updateSubscriptionDto },
      { where: { id } },
    );

    if (!subscription[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const subscription = await this.subscriptionModel.destroy({
      where: { id },
    });

    if (!subscription) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Deleted';
  }
}
