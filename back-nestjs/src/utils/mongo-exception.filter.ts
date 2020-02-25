import {
  Catch,
  ExceptionFilter,
  BadRequestException,
  ArgumentsHost,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.errmsg;
    switch (exception.code) {
      case 11000:
        return response.status(409).json({
          message,
          statusCode: 409,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      default:
        throw new BadRequestException();
    }
  }
}
