import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SocialsService } from './socials.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from '../admin/entities/admin.entity';
import { Social } from './entities/social.entity';

@ApiTags('Socials')
@Controller('socials')
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @ApiOperation({ summary: 'Create social' })
  @ApiResponse({
    status: 201,
    type: Social,
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createSocialDto: CreateSocialDto, @UploadedFile() image: any) {
    return this.socialsService.create(createSocialDto, image);
  }

  @ApiOperation({ summary: 'Get all socials' })
  @ApiResponse({
    status: 201,
    type: [Social],
  })
  @Get()
  findAll() {
    return this.socialsService.findAll();
  }

  @ApiOperation({ summary: 'Get' })
  @ApiResponse({
    status: 201,
    type: Social,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update social' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialDto: UpdateSocialDto) {
    return this.socialsService.update(+id, updateSocialDto);
  }

  @ApiOperation({ summary: 'Delete social' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialsService.remove(+id);
  }
}
