import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion } from './ingestion.entity';

@Injectable()
export class IngestionService {
  constructor(
    @InjectRepository(Ingestion) private ingestionRepo: Repository<Ingestion>,
  ) {}

  async createIngestion(documentId: string) {
    const ingestion = this.ingestionRepo.create({
      document: { id: documentId },
      status: 'pending',
    });
    return this.ingestionRepo.save(ingestion);
  }

  async updateIngestionStatus(id: string, status: string) {
    await this.ingestionRepo.update(id, { status });
    return { message: `Ingestion status updated to ${status}` };
  }

  async getIngestionStatus(id: string) {
    return this.ingestionRepo.findOne({ where: { id } });
  }
}
