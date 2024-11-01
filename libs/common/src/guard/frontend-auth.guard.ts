import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface JwtClientData {
  user_id: number;
  openid: string;
}

declare module 'express' {
  interface Request {
    client: JwtClientData
  }
}

@Injectable()
export class FrontendAuthGuard implements CanActivate {
  
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    
    const requireLogin = this.reflector.getAllAndOverride('require-frontend-login', [
      context.getClass(),
      context.getHandler()
    ]);

    if(!requireLogin) {
      return true;
    }

    const authorization = request.headers.authorization;

    if(!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try{
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify<JwtClientData>(token);

      request.client = {
        user_id: data.user_id,
        openid: data.openid,
      }
      return true;
    } catch(e) {
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}