import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BackendService {
  constructor(private readonly prismaService: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }
}
