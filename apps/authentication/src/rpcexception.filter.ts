import { Catch, HttpException, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

type RpcExceptionError =
  | string
  | {
      statusCode: number;
      message: string;
    };

@Catch(RpcException)
export class AllRpcExceptionsFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<any> {
    const rawError = exception.getError();

    let error: RpcExceptionError;

    if (typeof rawError === 'string') {
      error = rawError;
    } else if (
      typeof rawError === 'object' &&
      rawError !== null &&
      'message' in rawError &&
      'statusCode' in rawError
    ) {
      error = rawError as RpcExceptionError;
    } else {
      error = {
        message: 'Internal server error',
        statusCode: 500,
      };
    }

    console.log(error, 'error');

    const message = typeof error === 'string' ? error : error.message;
    const statusCode = typeof error === 'string' ? 500 : error.statusCode;

    const httpException = new HttpException(message, statusCode);

    console.error('Caught RpcException:', error);
    return throwError(() => httpException);
  }
}
