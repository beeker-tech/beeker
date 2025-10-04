import { Request } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerImpl } from '../logger/logger';
import {
  BusinessException,
  ConfigException,
  NotFoundException,
} from '../../../domain/_shared';
import { YAMLException } from 'js-yaml';

interface IError {
  message: string;
  code_error: null;
}

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  constructor(private readonly logger: LoggerImpl) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    const timestamp = new Date().toISOString();
    const path = request.url;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = { message: (exception as Error).message, code_error: null };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.getResponse() as IError;
    } else if (
      exception instanceof BusinessException ||
      exception instanceof ConfigException ||
      exception instanceof YAMLException
    ) {
      statusCode = 400;
    } else if (exception instanceof NotFoundException) {
      statusCode = 404;
    }

    const responseData = {
      ...{
        statusCode,
        timestamp,
        path,
      },
      ...message,
    };

    this.logMessage(request, message, statusCode, exception);

    response.status(statusCode).json(responseData);
  }

  private logMessage(
    request: Request,
    message: IError,
    status: number,
    exception: Error
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : ''
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`
      );
    }
  }
}
