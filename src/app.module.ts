import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log(
      /encvvv/,
      'JWT_SECRET:',
      this.configService.get<string>('JWT_EXPIRATION'),
    ); // Debugging log
  }
}
