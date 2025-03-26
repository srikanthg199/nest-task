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

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }
  async findOne(filter: object): Promise<User | undefined> {
    return this.userRepository.findOne(filter);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: string, user: UpdateUserRoleDto) {
    return this.userRepository.update(id, user);
  }
}
