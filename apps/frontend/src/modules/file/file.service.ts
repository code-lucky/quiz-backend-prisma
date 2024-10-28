import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import * as puppeteer from 'puppeteer';

@Injectable()
export class FileService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async getFile(filename: string) {
    //
  }

  async generateImage(htmlContent: string): Promise<Buffer> {
    try{
      const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      });
      const page = await browser.newPage();
  
      await page.setContent(htmlContent);
      const buffer = (await page.screenshot({ type: 'png' })) as Buffer;
  
      await browser.close();
      return buffer;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  }
}
