import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.getResponse ? exception.getResponse() : 'Internal server error';
    let msg;
    if (typeof message === 'object' && message !== null && 'message' in message && Array.isArray(message.message)) {
      msg = message.message[0];
    } else if (typeof message === 'string') {
      msg = message;
    } else {
      msg = 'Unknown error';
    }

    if (exception instanceof BadRequestException) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        data: null,
        message: msg,
      });
    } else if (exception instanceof UnauthorizedException) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        data: null,
        message: msg,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        data: null,
        message: msg,
      });
    }
  }
}