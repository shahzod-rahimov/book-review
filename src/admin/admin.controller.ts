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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetCurrentUserId, Public } from '../common/decorators';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { Roles } from '../common/decorators/roles-auth.decorator';
import {
  RefreshTokenGuard,
  RolesCookieGuard,
  RolesGuard,
} from '../common/guards';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto';
import { LoginAdminDto } from './dto';
import { UpdateAdminDto } from './dto';
import { Admin } from './entities/admin.entity';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Register admin' })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
  @Public()
  @Post('auth/register')
  register(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.register(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
  @Public()
  @Post('auth/login')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout admin' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @UseGuards(RefreshTokenGuard)
  @Post('logout')
  logout(
    @GetCurrentUserId() adminId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refresh_token');
    return this.adminService.logout(adminId);
    // req.admin['id']
  }

  @ApiOperation({ summary: "Update admin's refreshtoken" })
  @ApiResponse({
    status: 201,
    description: 'Return Access token and Refresh token',
  })
  @Public()
  @Roles('ADMIN')
  @UseGuards(RolesCookieGuard)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(userId, refreshToken, res);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 201,
    type: [Admin],
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get admin' })
  @ApiResponse({
    status: 201,
    type: Admin,
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update admin' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete admin' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
