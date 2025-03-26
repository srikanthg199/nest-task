import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserRoleDto } from './dto/user.dto';
import { UserRole } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const userPayload = {
      email,
      password: hashedPassword,
      role: role || UserRole.VIEWER, // Default role
    };
    return await this.userRepository.createUser(userPayload);
  }
  findAll() {
    return this.userRepository.findAllUsers();
  }

  findUserById(id: string) {
    return this.userRepository.getUser({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserRoleDto) {
    const res = await this.userRepository.updateUser(id, updateUserDto);
    if (res) {
      return this.findUserById(id);
    }
  }

  async remove(id: string) {
    const user = await this.findUserById(id);
    return this.userRepository.removeUser(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.getUser({ where: { email } });
  }
}
