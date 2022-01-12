import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { AddressService } from '../services/address.service';

@Injectable()
export class ZipCodeInterceptor implements NestInterceptor {
  constructor(private readonly addressService: AddressService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;

    if (body?.zip_code) {
      const zip_code = await this.addressService.findZipCode(body.zip_code);

      if (zip_code) {
        request.body = {
          ...body,
          address: {
            zip_code: body.zip_code,
            street: zip_code.logradouro,
            state: zip_code.uf,
            city: zip_code.localidade,
          },
        };

        return next.handle();
      }
    }

    return throwError(
      () => new BadRequestException('zipcode not provided or invalid'),
    );
  }
}
