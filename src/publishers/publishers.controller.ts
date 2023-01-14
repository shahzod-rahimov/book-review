import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { LoginPublisherDto } from './dto/login-publisher.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Public()
  @Post('auth/register')
  @UseInterceptors(FileInterceptor('photo_file'))
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() createPublisherDto: CreatePublisherDto,
    @UploadedFile() image: any,
  ) {
    return this.publishersService.register(createPublisherDto, image, res);
  }

  @Public()
  @Post('auth/login')
  login(
    @Body() loginPublisherDto: LoginPublisherDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.publishersService.login(loginPublisherDto, res);
  }

  @Post('logout')
  logout(
    @GetCurrentUserId() publisherId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(publisherId);
    res.clearCookie('refresh_token');
    return this.publishersService.logout(publisherId);
    // req.admin['id']
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.publishersService.refreshToken(userId, refreshToken, res);
  }

  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publishersService.update(+id, updatePublisherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishersService.remove(+id);
  }
}
