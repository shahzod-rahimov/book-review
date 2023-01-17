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
import { LoginPublisherDto } from './dto/login-publisher.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Publisher } from './entities/publisher.entity';
import {
  RefreshTokenGuard,
  RolesCookieGuard,
  RolesGuard,
} from '../common/guards';
import { Roles } from '../common/decorators/roles-auth.decorator';
@ApiTags('Publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @ApiOperation({ summary: 'Register publisher' })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
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

  @ApiOperation({ summary: 'Login publisher' })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
  @Public()
  @Post('auth/login')
  login(
    @Body() loginPublisherDto: LoginPublisherDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.publishersService.login(loginPublisherDto, res);
  }

  @ApiOperation({ summary: 'Register publisher' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Roles('ADMIN', 'PUBLISHERS')
  @UseGuards(RolesGuard)
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

  @ApiOperation({ summary: 'Update publisher refreshtoken' })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
  @Public()
  @Roles('ADMIN', 'PUBLISHERS')
  @UseGuards(RolesCookieGuard)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.publishersService.refreshToken(userId, refreshToken, res);
  }

  @ApiOperation({ summary: 'Get all publishers' })
  @ApiResponse({
    status: 201,
    type: [Publisher],
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  @ApiOperation({ summary: 'Get publisher' })
  @ApiResponse({
    status: 201,
    type: Publisher,
  })
  @Roles('ADMIN', 'PUBLISHERS')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update publisher' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Roles('ADMIN', 'PUBLISHERS')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publishersService.update(+id, updatePublisherDto);
  }

  @ApiOperation({ summary: 'Delete publisher' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Roles('ADMIN', 'PUBLISHERS')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishersService.remove(+id);
  }
}
