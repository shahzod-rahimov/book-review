import { Module } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { SocialsController } from './socials.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Social } from './entities/social.entity';

@Module({ 
  imports: [SequelizeModule.forFeature([Social])],
  controllers: [SocialsController],
  providers: [SocialsService],
})
export class SocialsModule {}
