import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as requestIp from 'request-ip';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url } = request;
    const ip = requestIp.getClientIp(request); // 使用 request-ip 获取 IP 地址

    return next.handle().pipe(
      tap(async (data) => {

        // 排除 systemLog 接口，避免无限循环
        if(url.indexOf('systemLog') === -1) {
          // 保存日志记录到数据库
          // await this.systemLogRepository.save(log);
        }
      }),
    );
  }
}
