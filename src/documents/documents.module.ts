import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsController } from './documents.controller';
import { Document } from './document.entity';
import { DocumentsService } from './documents.service';
import { UsersModule } from 'src/users/users.module';
import { DocumentRepository } from './document.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), UsersModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentRepository],
})
export class DocumentsModule {}
