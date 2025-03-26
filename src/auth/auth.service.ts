import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginDto } from 'src/users/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from './userToken.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = await this.userService.create(createUserDto);
    return user;
  }
  async login(user: any) {
    const usersTokenPayload = {
      user_id: user.id,
      iv: crypto.randomBytes(32).toString('hex'),
    };
    const userToken = await this.userTokenRepository.save(usersTokenPayload);
    const payload = {
      userId: user.id,
      email: user.email,
      encryptedUUID: userToken.id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async logout(encryptedUUID: string): Promise<any> {
    return await this.userTokenRepository.delete({ id: encryptedUUID });
  }

  async getUserTokenById(encryptId: string) {
    return await this.userTokenRepository.findOne({
      where: { id: encryptId },
    });
  }
}
