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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { DocumentsService } from './documents.service';
import { RequestWithUser } from 'src/interfaces';

@Controller('documents')
@UseGuards(JwtAuthGuard) // Protect routes
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
    await this.documentsService.uploadDocument(file, body, req.user.id);
    return { message: 'File uploaded successfully!', filename: file.filename };
  }

  @Get()
  async getAllDocuments() {
    return this.documentsService.getDocuments();
  }

  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    return this.documentsService.getDocumentById(id);
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    return this.documentsService.deleteDocument(id);
  }

  @Get('user/:userId')
  async getUserDocuments(@Param('userId') userId: string) {
    return this.documentsService.findByUser(userId);
  }
}
