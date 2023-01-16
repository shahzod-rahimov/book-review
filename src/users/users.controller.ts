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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
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

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
  @Public()
  @Post('auth/login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Post('logout')
  logout(
    @GetCurrentUserId() publisherId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refresh_token');
    return this.usersService.logout(publisherId);
    // req.admin['id']
  }

  @ApiOperation({ summary: 'Update user refreshtoken' })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
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

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 201,
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 201,
    type: User,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
