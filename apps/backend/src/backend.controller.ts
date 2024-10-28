import { Controller, Get, Inject } from '@nestjs/common';
import { BackendService } from './backend.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class BackendController {
  constructor(private readonly backendService: BackendService) { }

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get()
  async getHello(){
    return '404';
  }
}
