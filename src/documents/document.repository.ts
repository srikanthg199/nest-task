import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentRepository {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}

  async createDocument(payload) {
    return await this.documentRepo.save(payload);
  }

  async findAllDocuments(filter: object) {
    return await this.documentRepo.find();
  }

  async findDocumentById(filter: object): Promise<Document> {
    return await this.documentRepo.findOne(filter);
  }

  async deleteDocument(doc: Document): Promise<void> {
    await this.documentRepo.remove(doc);
  }
}
