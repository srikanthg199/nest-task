import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserRoleDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }
  async getUser(filter: object): Promise<User | undefined> {
    return this.userRepository.findOne(filter);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: string, user: UpdateUserRoleDto) {
    return this.userRepository.update(id, user);
  }

  async removeUser(user: User) {
    return this.userRepository.remove(user);
  }
}
