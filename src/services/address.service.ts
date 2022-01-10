import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import ZipCodeResponse from 'src/interfaces/ZipCodeResponse.interface';

@Injectable()
export class AddressService {
  constructor(private readonly httpService: HttpService) {}

  async findZipCode(zipCode: string): Promise<ZipCodeResponse | null> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://viacep.com.br/ws/${zipCode}/json/`),
      );

      if (response.status === HttpStatus.OK) {
        return response.data as ZipCodeResponse;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}
