import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Subscription } from './entities/subscription.entity';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOperation({ summary: 'Create subscription' })
  @ApiResponse({
    status: 201,
    type: Subscription,
  })
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiResponse({
    status: 201,
    type: [Subscription],
  })
  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @ApiOperation({ summary: 'Get subscription' })
  @ApiResponse({
    status: 201,
    type: Subscription,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update subscription' })
  @ApiResponse({
    status: 201,
    description: 'Retrun msg',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto);
  }

  @ApiOperation({ summary: 'Delete subscription' })
  @ApiResponse({
    status: 201,
    description: 'Retrun msg',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(+id);
  }
}
