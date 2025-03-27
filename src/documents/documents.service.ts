import { Injectable, NotFoundException } from '@nestjs/common';
import { Document } from './document.entity';
import * as fs from 'fs';
import * as path from 'path';
import { UsersService } from 'src/users/users.service';
import { DocumentRepository } from './document.repository';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly userService: UsersService,
  ) {}

  async uploadDocument(
    file: Express.Multer.File,
    body: { title: string },
    userId: string,
  ) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const payload = {
      title: body.title,
      filename: file.filename,
      fileUrl: `/uploads/${file.filename}`,
      uploaded_by: user,
    };
    const document = await this.documentRepository.createDocument(payload);
    return { message: 'File uploaded successfully!', document };
  }

  async getDocuments() {
    return await this.documentRepository.findAllDocuments({});
  }

  async getDocumentById(id: string) {
    const document = await this.documentRepository.findDocumentById({
      where: { id },
      relations: ['uploaded_by'],
    });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async deleteDocument(id: string) {
    const document = await this.getDocumentById(id);
    // Remove file from storage
    const filePath = path.join(__dirname, '../../uploads/', document.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await this.documentRepository.deleteDocument(document);
    return { message: 'Document deleted successfully' };
  }

  async findByUser(userId: string): Promise<Document[]> {
    return await this.documentRepository.findAllDocuments({
      where: { uploaded_by: { id: userId } },
    });
  }
}
