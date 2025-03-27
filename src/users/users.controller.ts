import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserRoleDto } from './dto/user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RequestWithUser } from 'src/interfaces';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  async findAll(@Req() req: RequestWithUser) {
    try {
      const users = await this.usersService.findAll();
      return {
        status: true,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Failed to retrieve users',
        error: error.message || null,
      });
    }
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findUserById(id);
      const { password, ...rest } = user;
      return {
        status: true,
        message: 'User retrieved successfully',
        data: rest,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Failed to retrieve user',
        error: error.message || null,
      });
    }
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRoleDto,
  ) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      return {
        status: true,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Failed to update user',
        error: error.message || null,
      });
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
      return { status: true, message: 'User deleted successfully', data: null };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Failed to delete user',
        error: error.message || null,
      });
    }
  }
}
