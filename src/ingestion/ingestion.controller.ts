import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('ingestion')
export class IngestionController {
  constructor(
    private readonly ingestionService: IngestionService,
    private readonly httpService: HttpService,
  ) {}

  @Post('trigger')
  async triggerIngestion(@Body() data: { documentId: string }) {
    try {
      const pythonBackendUrl = 'http://localhost:5000/start-ingestion';
      const response = await firstValueFrom(
        this.httpService.post(pythonBackendUrl, data),
      );
      return {
        status: true,
        message: 'Ingestion triggered successfully',
        data: response.data,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Failed to trigger ingestion',
        error: error.message || null,
      });
    }
  }

  @Post()
  async createIngestion(@Body() data: { documentId: string }) {
    try {
      const ingestion = await this.ingestionService.createIngestion(
        data.documentId,
      );
      return {
        status: true,
        message: 'Ingestion created successfully',
        data: ingestion,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Failed to create ingestion',
        error: error.message || null,
      });
    }
  }

  @Patch(':id')
  async updateIngestionStatus(
    @Param('id') id: string,
    @Body() data: { status: string },
  ) {
    try {
      const updatedIngestion =
        await this.ingestionService.updateIngestionStatus(id, data.status);
      return {
        status: true,
        message: 'Ingestion status updated successfully',
        data: updatedIngestion,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Failed to update ingestion status',
        error: error.message || null,
      });
    }
  }

  @Get(':id')
  async getIngestionStatus(@Param('id') id: string) {
    try {
      const ingestionStatus =
        await this.ingestionService.getIngestionStatus(id);
      return {
        status: true,
        message: 'Ingestion status retrieved successfully',
        data: ingestionStatus,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: false,
        message: 'Failed to retrieve ingestion status',
        error: error.message || null,
      });
    }
  }
}
