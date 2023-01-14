import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenGuard } from '../common/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('auth/register')
  @UseInterceptors(FileInterceptor('image'))
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: any,
  ) {
    return this.usersService.register(createUserDto, image, res);
  }

  @Public()
  @Post('auth/login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  @Post('logout')
  logout(
    @GetCurrentUserId() publisherId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refresh_token');
    return this.usersService.logout(publisherId);
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
    return this.usersService.refreshToken(userId, refreshToken, res);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
