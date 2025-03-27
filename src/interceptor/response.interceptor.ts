import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data: any) => ({
        status: true,
        message: data?.message || 'Request successful',
        data: data?.data !== undefined ? data.data : data, // Ensure we handle undefined `data`
      })),
      catchError((error) => {
        return throwError(() => ({
          status: false,
          message: error?.response?.message || 'Something went wrong',
          error: error?.response?.data || error?.message || error,
        }));
      }),
    );
  }
}
