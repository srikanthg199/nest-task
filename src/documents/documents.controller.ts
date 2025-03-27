import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
  Req,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { DocumentsService } from './documents.service';
import { RequestWithUser } from 'src/interfaces';
import { ResponseInterceptor } from 'src/interceptor/response.interceptor';

@Controller('documents')
@UseGuards(JwtAuthGuard) // Protect routes
@UseInterceptors(ResponseInterceptor) // Apply response formatting
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueFilename = `${Date.now()}-${file.originalname}`;
          callback(null, uniqueFilename);
        },
      }),
    }),
  )
  async uploadFile(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string },
  ) {
    try {
      const document = await this.documentsService.uploadDocument(
        file,
        body,
        req.user.id,
      );
      return { message: 'File uploaded successfully!', data: document };
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  @Get()
  async getAllDocuments() {
    try {
      const documents = await this.documentsService.getDocuments();
      return { message: 'Documents retrieved successfully', data: documents };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve documents');
    }
  }

  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    try {
      const document = await this.documentsService.getDocumentById(id);
      return { message: 'Document retrieved successfully', data: document };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to retrieve document',
      );
    }
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    try {
      await this.documentsService.deleteDocument(id);
      return { message: 'Document deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to delete document');
    }
  }

  @Get('user/:userId')
  async getUserDocuments(@Param('userId') userId: string) {
    try {
      const documents = await this.documentsService.findByUser(userId);
      return {
        message: 'User documents retrieved successfully',
        data: documents,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve user documents',
      );
    }
  }
}
