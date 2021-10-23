import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { getCurrentDateTime } from 'src/utils';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let code: number, msg: string;
    if (exception instanceof HttpException) {
      code = exception.getStatus();
      msg = exception.message;
    } else {
      code = HttpStatus.INTERNAL_SERVER_ERROR,
      msg = exception.toString();
    }

    response
      .status(HttpStatus.OK)
      .json({
        code,
        msg,
        timestamp: getCurrentDateTime(),
        path: request.url,
      });
  }
}