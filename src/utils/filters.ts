import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    // console.log(`---> ${JSON.stringify(exception, null, 2)}`);

    const isHttpException = exception instanceof HttpException;
    const isConflict = exception.code === 'ER_DUP_ENTRY';

    const nonHttpExStatus = isConflict
      ? HttpStatus.CONFLICT
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const status = isHttpException ? exception.getStatus() : nonHttpExStatus;

    const nonHttpExMessage = isConflict
      ? (exception.sqlMessage as string)
          ?.substring(
            0,
            exception.sqlMessage.indexOf('for') || exception.sqlMessage.length,
          )
          .trim() ?? 'Duplicate entry exists'
      : 'An error occurred';
    const message = isHttpException ? exception.message : nonHttpExMessage;

    response.status(status).json({
      status: false,
      message,
      data: null,
    });
  }
}
