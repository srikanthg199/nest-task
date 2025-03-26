import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserRoleDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

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
