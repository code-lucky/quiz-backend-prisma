import { Controller, Get, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:filename')
  getFile(@Param('filename') filename: string) {
    return this.fileService.getFile(filename);
  }


  @Post('generate')
  async getImage(@Res() res: Response) {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { background-color: #f0f0f0; }
            h1 { color: purple; }
          </style>
        </head>
        <body>
          <h1>Hello, World!</h1>
        </body>
      </html>
    `;

    const imageBuffer = await this.fileService.generateImage(htmlContent);
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  }

}
